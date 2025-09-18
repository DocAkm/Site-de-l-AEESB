import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogIn, Mail, Lock, ShieldAlert, ShieldCheck, UserX } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

const AdminAccessPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, user: authUser, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // If user is already logged in and is an admin, redirect to admin dashboard
    if (!authLoading && authUser && authUser.role === 'admin') {
      navigate('/admin', { replace: true });
    }
  }, [authUser, authLoading, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const loggedInUserContext = await login(email, password);

    if (loggedInUserContext && loggedInUserContext.user) {
      // AuthContext's fetchUserProfile should populate role correctly
      // We wait for authUser state to update from context
      // The useEffect above will catch the role change and redirect if admin
      // If login was successful but user is not admin:
      if (loggedInUserContext.user.role !== 'admin') {
        toast({
          title: "Accès Refusé",
          description: "Vous n'avez pas les droits d'administrateur.",
          variant: "destructive",
        });
        // Optionally log them out if they shouldn't stay logged in from this page
        // await logout(); 
      } else {
         toast({
          title: "Connexion Admin Réussie!",
          description: "Redirection vers le tableau de bord...",
        });
        // useEffect will handle navigation.
      }
    } else {
      // Error toast is handled within login function in AuthContext or authService
      // If not, we can add a generic one here.
      // toast({ title: "Échec de la connexion", description: "Veuillez vérifier vos identifiants.", variant: "destructive" });
    }
    setIsLoading(false);
  };

  // If user is logged in but NOT an admin, show an access denied message.
  if (!authLoading && authUser && authUser.role !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] p-6 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Card className="w-full max-w-md shadow-2xl bg-white p-8">
            <UserX size={64} className="mx-auto text-red-500 mb-4" />
            <CardTitle className="text-3xl font-heading text-red-700">Accès Réservé</CardTitle>
            <CardDescription className="text-gray-600 mt-2 mb-6">
              Cette section est réservée aux administrateurs du site. Votre compte actuel (<span className="font-semibold">{authUser.email}</span>) n'a pas les permissions nécessaires.
            </CardDescription>
            <Button onClick={() => navigate('/')} className="bg-aeesb-green-dark hover:bg-green-800">
              Retour à l'Accueil
            </Button>
          </Card>
        </motion.div>
      </div>
    );
  }
  
  // Show loading spinner or form
  if (authLoading && !authUser) { // Only show global load if not already decided non-admin
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
        <p className="text-lg text-aeesb-green-dark">Chargement...</p>
      </div>
    );
  }


  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] p-6 bg-gradient-to-br from-aeesb-green-light via-green-100 to-yellow-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md shadow-2xl bg-white">
          <CardHeader className="text-center">
            <div className="mx-auto bg-aeesb-gold text-aeesb-green-dark p-3 rounded-full w-fit mb-4">
              <ShieldCheck size={32} />
            </div>
            <CardTitle className="text-3xl font-heading text-aeesb-green-dark">Accès Administrateur</CardTitle>
            <CardDescription className="text-gray-600">Veuillez vous identifier pour accéder au panneau d'administration.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="admin-email" className="font-semibold text-aeesb-green-dark flex items-center">
                  <Mail className="mr-2 h-4 w-4 text-aeesb-gold" /> Email Administrateur
                </Label>
                <Input 
                  id="admin-email" 
                  type="email" 
                  placeholder="admin@aeesb.com" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-gray-800 placeholder-gray-500 focus:border-aeesb-gold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-password" className="font-semibold text-aeesb-green-dark flex items-center">
                  <Lock className="mr-2 h-4 w-4 text-aeesb-gold" /> Mot de Passe Administrateur
                </Label>
                <Input 
                  id="admin-password" 
                  type="password" 
                  placeholder="Votre mot de passe admin" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-gray-800 placeholder-gray-500 focus:border-aeesb-gold"
                />
              </div>
              <Button type="submit" size="lg" className="w-full bg-aeesb-gold hover:bg-yellow-500 text-aeesb-green-dark font-bold text-lg shadow-md" disabled={isLoading || authLoading}>
                {isLoading || authLoading ? 'Vérification...' : 'Se Connecter en Admin'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-center pt-6">
            <p className="text-xs text-red-600 flex items-center justify-center">
              <ShieldAlert className="mr-2 h-4 w-4" />
              Attention: L'accès à cette interface est strictement réservé aux personnels autorisés. Toute tentative d'accès non autorisé sera enregistrée.
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminAccessPage;