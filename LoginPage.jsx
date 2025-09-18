import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogIn, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, user: authUser, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Redirect if already logged in and not loading
    if (!authLoading && authUser) {
      const from = location.state?.from?.pathname || (authUser.role === 'admin' ? '/admin' : '/espace-membre');
      navigate(from, { replace: true });
    }
  }, [authUser, authLoading, navigate, location.state]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const loggedInUserWithProfile = await login(email, password);

    if (loggedInUserWithProfile) {
      toast({
        title: "Connexion réussie!",
        description: "Bienvenue sur votre espace AEESB.",
      });
      // The useEffect above will handle redirection once authUser state is updated.
      // Or, you can navigate immediately based on loggedInUserWithProfile
      const destination = location.state?.from?.pathname || (loggedInUserWithProfile.role === 'admin' ? '/admin' : '/espace-membre');
      navigate(destination, { replace: true });

    } 
    // Error toast is handled within login function in AuthContext
    setIsLoading(false);
  };

  // Show loading spinner or form
  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
        <p className="text-lg text-aeesb-green-dark">Chargement...</p>
      </div>
    );
  }
  
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] p-6 bg-gradient-to-br from-aeesb-green-light via-green-50 to-yellow-50">
      <Card className="w-full max-w-md shadow-2xl bg-white">
        <CardHeader className="text-center">
          <div className="mx-auto bg-aeesb-green-dark text-aeesb-gold p-3 rounded-full w-fit mb-4">
            <LogIn size={32} />
          </div>
          <CardTitle className="text-3xl font-heading text-aeesb-green-dark">Connexion</CardTitle>
          <CardDescription className="text-gray-600">Accédez à votre espace membre AEESB.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-semibold text-aeesb-green-dark flex items-center">
                <Mail className="mr-2 h-4 w-4 text-aeesb-gold" /> Adresse Email
              </Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="votreadresse@email.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-gray-800 placeholder-gray-500 focus:border-aeesb-gold"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="font-semibold text-aeesb-green-dark flex items-center">
                <Lock className="mr-2 h-4 w-4 text-aeesb-gold" /> Mot de Passe
              </Label>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Votre mot de passe" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-gray-800 placeholder-gray-500 focus:border-aeesb-gold pr-10"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-aeesb-gold"
                  aria-label={showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <Button type="submit" size="lg" className="w-full bg-aeesb-green-dark hover:bg-green-800 text-white font-bold text-lg shadow-md" disabled={isLoading || authLoading}>
              {isLoading || authLoading ? 'Connexion en cours...' : 'Se Connecter'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-3 pt-6">
          <Link to="/mot-de-passe-oublie" className="text-sm text-aeesb-gold hover:underline font-medium">
            Mot de passe oublié ?
          </Link>
          <p className="text-sm text-gray-600">
            Pas encore membre ?{' '}
            <Link to="/inscription" className="font-medium text-aeesb-green-dark hover:text-aeesb-gold hover:underline">
              Inscrivez-vous ici
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;