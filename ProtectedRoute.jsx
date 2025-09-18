import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading: authLoading } = useAuth();
  const location = useLocation();
  const { toast } = useToast();
  const aeesbLogoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/21448308-0160-4b8b-8699-bb57b08aef3b/91ea98d32157f4895708d6cb7333f80b.jpg";

  if (authLoading) {
    // You can show a loading indicator specific to the route or rely on the global one in App.jsx
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-aeesb-green-light via-green-50 to-yellow-50">
        <div className="text-center">
          <img  src={aeesbLogoUrl} alt="Logo AEESB" className="h-24 w-auto animate-pulse mx-auto rounded-full object-cover" />
          <p className="text-xl font-semibold text-aeesb-green-dark mt-4">Vérification de l'accès...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    toast({
      title: "Accès non autorisé",
      description: "Veuillez vous connecter pour accéder à cette page.",
      variant: "destructive",
    });
    return <Navigate to="/connexion" state={{ from: location }} replace />;
  }

  // Ensure user.role is available. If not, it might mean profile is still loading or missing.
  // This check might be redundant if AuthContext ensures 'user' always has 'role' when not loading.
  if (requiredRole && typeof user.role === 'undefined') {
     console.warn("User role is undefined in ProtectedRoute. Profile might not be fully loaded.");
     // Potentially redirect to a profile completion page or show a specific message.
     // For now, treat as unauthorized for the specific role.
      toast({
        title: "Erreur de profil",
        description: "Les informations de rôle sont manquantes. Veuillez réessayer ou contacter le support.",
        variant: "destructive",
      });
     return <Navigate to="/connexion" state={{ from: location }} replace />;
  }


  if (requiredRole && user.role !== requiredRole) {
     toast({
      title: "Accès refusé",
      description: "Vous n'avez pas les droits nécessaires pour accéder à cette page.",
      variant: "destructive",
    });
    // Redirect to a more appropriate page based on role, or just home
    return <Navigate to={user.role === 'admin' ? "/admin" : "/espace-membre"} replace />;
  }

  return children;
};

export default ProtectedRoute;