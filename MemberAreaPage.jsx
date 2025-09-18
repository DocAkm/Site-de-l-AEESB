import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Edit, ShieldCheck, CalendarCheck, FileText, LogOut, Settings, Eye, AlertTriangle } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const MemberAreaPage = () => {
  const { user, logout, loading: authLoading } = useAuth();
  const { toast } = useToast();

  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-aeesb-green-light via-green-50 to-yellow-50">
        <div className="text-center">
          <img  src="https://storage.googleapis.com/hostinger-horizons-assets-prod/21448308-0160-4b8b-8699-bb57b08aef3b/91ea98d32157f4895708d6cb7333f80b.jpg" alt="Logo AEESB" className="h-24 w-auto animate-pulse mx-auto rounded-full" />
          <p className="text-xl font-semibold text-aeesb-green-dark mt-4">Chargement de votre espace...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // This should be handled by ProtectedRoute, but as a safeguard
    toast({
      title: "Accès non autorisé",
      description: "Redirection vers la page de connexion.",
      variant: "destructive",
    });
    return <Navigate to="/connexion" replace />;
  }
  
  // Check for essential user data for this page. If critical data is missing, redirect.
  // Example: if firstName is essential for the dashboard greeting.
  if (!user.firstName && !user.name) { 
    // Assuming 'name' could be a fallback from Supabase Auth if 'firstName' from profile is not yet set
    // Or redirect to profile completion if that's a step
    toast({
      title: "Profil incomplet",
      description: "Veuillez compléter votre profil. Redirection vers la page d'accueil.",
      variant: "warning",
    });
    return <Navigate to="/" replace />; 
  }


  const handleLogout = () => {
    logout();
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté de votre espace membre.",
    });
  };

  const dashboardItems = [
    { title: "Mon Profil", icon: <User className="text-aeesb-gold" />, description: "Voir et modifier mes informations personnelles.", link: "/espace-membre/profil" },
    { title: "Statut d'Adhésion", icon: <ShieldCheck className="text-aeesb-gold" />, description: `Votre adhésion est ${user.membership_status || 'Active'}. ${user.membership_expiry_date ? `Valide jusqu'au ${new Date(user.membership_expiry_date).toLocaleDateString()}` : 'Veuillez vérifier votre statut.'}`, link: "/espace-membre/adhesion-statut" },
    { title: "Mes Événements", icon: <CalendarCheck className="text-aeesb-gold" />, description: "Voir les événements auxquels je suis inscrit.", link: "/espace-membre/evenements" },
    { title: "Mes Documents", icon: <FileText className="text-aeesb-gold" />, description: "Télécharger reçus, attestations, etc.", link: "/espace-membre/documents" },
    { title: "Paramètres du compte", icon: <Settings className="text-aeesb-gold" />, description: "Gérer les notifications, la confidentialité.", link: "/espace-membre/parametres" },
    { title: "Consulter le Forum", icon: <Eye className="text-aeesb-gold" />, description: "Accéder aux discussions des membres.", link: "/forum" },
  ];

  return (
    <div className="space-y-8">
      <div className="p-6 bg-gradient-to-r from-aeesb-green-dark to-green-700 text-white rounded-lg shadow-md flex flex-col md:flex-row justify-between items-center">
        <div>
          <h1 className="text-3xl font-heading font-bold">Tableau de Bord Personnel</h1>
          <p className="text-lg opacity-90">Bienvenue, {user.firstName || user.name || 'Membre'} !</p>
        </div>
        <Avatar className="h-20 w-20 mt-4 md:mt-0 border-4 border-aeesb-gold">
          <AvatarImage src={user.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.firstName || 'A')}+${encodeURIComponent(user.lastName || 'B')}&background=random&color=fff`} alt={user.firstName || user.name} />
          <AvatarFallback className="bg-aeesb-gold text-aeesb-green-dark text-2xl font-bold">
            {(user.firstName?.[0] || '') + (user.lastName?.[0] || '') || (user.name?.[0] || 'U')}
          </AvatarFallback>
        </Avatar>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dashboardItems.map(item => (
          <Card key={item.title} className="hover:shadow-xl transition-shadow duration-300 border-l-4 border-aeesb-green-dark">
            <CardHeader className="flex flex-row items-center space-x-4 pb-2">
              <div className="p-3 bg-aeesb-green-light rounded-md">{React.cloneElement(item.icon, { size: 28, className: "text-aeesb-gold" })}</div>
              <div>
                <CardTitle className="text-xl font-heading text-aeesb-green-dark">{item.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4 text-sm">{item.description}</p>
              <Button variant="link" asChild className="text-aeesb-gold p-0 h-auto font-semibold hover:text-aeesb-green-dark">
                <Link to={item.link}>Accéder</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
        <Button asChild variant="outline" className="border-aeesb-gold text-aeesb-gold hover:bg-aeesb-gold hover:text-aeesb-green-dark">
          <Link to="/espace-membre/profil">
            <Edit size={18} className="mr-2" /> Modifier mon Profil
          </Link>
        </Button>
        <Button onClick={handleLogout} variant="destructive" className="bg-red-600 hover:bg-red-700 text-white">
          <LogOut size={18} className="mr-2" /> Se Déconnecter
        </Button>
      </div>
      
      <Card className="mt-10 bg-blue-50 border-blue-300">
        <CardHeader className="flex flex-row items-center gap-3">
            <AlertTriangle className="text-blue-500" size={24} />
            <CardTitle className="text-blue-700 font-heading text-lg">Informations importantes</CardTitle>
        </CardHeader>
        <CardContent className="text-blue-600 text-sm space-y-1">
            <p>Pensez à mettre à jour régulièrement vos informations personnelles.</p>
            <p>Votre participation active est essentielle pour la vie de l'association.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MemberAreaPage;