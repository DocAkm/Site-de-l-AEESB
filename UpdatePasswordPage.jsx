import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const UpdatePasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { updatePassword, session } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();

  useEffect(() => {
    // This page should only be accessible if there's an active session
    // which typically happens after clicking the reset link from email.
    // Supabase handles the token verification in the URL fragment (#access_token=...).
    // The onAuthStateChange listener in AuthContext should pick up this session.
    // If no session after a brief moment, or if it's not a recovery session, redirect.
    
    // We might not need to explicitly check for session type 'recovery' if Supabase handles it.
    // If user is on this page and has a session, assume it's for password update.
    if (!session && !isLoading) { // If no session after initial load
        // Give a brief moment for session to establish from URL fragment
        setTimeout(() => {
            if (!session) { // Re-check session
                 toast({ title: "Accès Invalide", description: "Le lien de réinitialisation est invalide ou a expiré.", variant: "destructive" });
                 navigate('/connexion');
            }
        }, 1000);
    }

  }, [session, navigate, toast, isLoading]);


  const validatePassword = (pass) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(pass);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!validatePassword(password)) {
      toast({
        title: "Mot de passe invalide",
        description: "Le mot de passe doit contenir au moins 8 caractères alphanumériques.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Erreur de mot de passe",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    const success = await updatePassword(password);
    setIsLoading(false);

    if (success) {
      toast({
        title: "Mot de Passe Mis à Jour",
        description: "Votre mot de passe a été modifié avec succès. Vous pouvez maintenant vous connecter.",
      });
      navigate('/connexion');
    }
    // Error toast is handled within updatePassword in AuthContext
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] p-6 bg-gradient-to-br from-aeesb-green-light via-green-50 to-yellow-50">
      <Card className="w-full max-w-md shadow-2xl bg-white">
        <CardHeader className="text-center">
          <div className="mx-auto bg-aeesb-green-dark text-aeesb-gold p-3 rounded-full w-fit mb-4">
            <ShieldCheck size={32} />
          </div>
          <CardTitle className="text-3xl font-heading text-aeesb-green-dark">Mettre à Jour le Mot de Passe</CardTitle>
          <CardDescription className="text-gray-600">Choisissez un nouveau mot de passe sécurisé.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="password" className="font-semibold text-aeesb-green-dark flex items-center">
                <Lock className="mr-2 h-4 w-4 text-aeesb-gold" /> Nouveau Mot de Passe
              </Label>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Minimum 8 caractères alphanumériques" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-gray-800 placeholder-gray-500 focus:border-aeesb-gold pr-10"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-aeesb-gold">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
               <p className="text-xs text-gray-500">Doit contenir lettres et chiffres, minimum 8 caractères.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="font-semibold text-aeesb-green-dark flex items-center">
                <Lock className="mr-2 h-4 w-4 text-aeesb-gold" /> Confirmer le Nouveau Mot de Passe
              </Label>
              <div className="relative">
                <Input 
                  id="confirmPassword" 
                  type={showConfirmPassword ? "text" : "password"} 
                  placeholder="Retapez votre nouveau mot de passe" 
                  required 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="text-gray-800 placeholder-gray-500 focus:border-aeesb-gold pr-10"
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-aeesb-gold">
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <Button type="submit" size="lg" className="w-full bg-aeesb-green-dark hover:bg-green-800 text-white font-bold text-lg shadow-md" disabled={isLoading}>
              {isLoading ? 'Mise à jour en cours...' : 'Mettre à Jour'}
            </Button>
          </form>
        </CardContent>
         <CardFooter className="text-center pt-4">
            <p className="text-sm text-gray-500">Une fois votre mot de passe mis à jour, vous serez redirigé vers la page de connexion.</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UpdatePasswordPage;