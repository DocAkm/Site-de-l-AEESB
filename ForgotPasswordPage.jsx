import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, KeyRound, Send } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext'; // Import useAuth

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { sendPasswordResetEmail } = useAuth(); // Use the new function from AuthContext

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const success = await sendPasswordResetEmail(email);
    setIsLoading(false);
    if (success) {
      setIsSubmitted(true);
    }
    // Error toast is handled within sendPasswordResetEmail in AuthContext
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] p-6 bg-gradient-to-br from-aeesb-green-light via-green-50 to-yellow-50">
      <Card className="w-full max-w-md shadow-2xl bg-white">
        <CardHeader className="text-center">
          <div className="mx-auto bg-aeesb-green-dark text-aeesb-gold p-3 rounded-full w-fit mb-4">
            <KeyRound size={32} />
          </div>
          <CardTitle className="text-3xl font-heading text-aeesb-green-dark">Mot de Passe Oublié</CardTitle>
          {!isSubmitted ? (
            <CardDescription className="text-gray-600">Entrez votre email pour recevoir un lien de réinitialisation.</CardDescription>
          ) : (
             <CardDescription className="text-green-600 font-semibold pt-2">Vérifiez votre boîte de réception (et vos spams) pour les instructions.</CardDescription>
          )}
        </CardHeader>
        {!isSubmitted ? (
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
              <Button type="submit" size="lg" className="w-full bg-aeesb-green-dark hover:bg-green-800 text-white font-bold text-lg shadow-md" disabled={isLoading}>
                {isLoading ? (
                  'Envoi en cours...'
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" /> Envoyer le Lien
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        ) : (
          <CardContent className="text-center">
            <p className="text-gray-700">Un email a été envoyé à <strong className="text-aeesb-green-dark">{email}</strong> avec les instructions pour réinitialiser votre mot de passe. Ce lien expirera bientôt.</p>
          </CardContent>
        )}
        <CardFooter className="flex flex-col items-center space-y-3 pt-6">
          <Link to="/connexion" className="text-sm text-aeesb-gold hover:underline font-medium">
            Retour à la Connexion
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;