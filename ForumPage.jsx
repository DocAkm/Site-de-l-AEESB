
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Search, Edit3, Users, Lock, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForumPage = () => {
  // Simulating authentication state
  const isAuthenticated = false; // Change to true to see member view

  const categories = [
    { id: 1, name: "Orientation Scolaire/Universitaire", description: "Conseils, choix de filières, parcours...", posts: 120, icon: <Users /> },
    { id: 2, name: "Aide Académique", description: "Sujets, corrigés, bourses d'études...", posts: 85, icon: <Edit3 /> },
    { id: 3, name: "Projets Associatifs", description: "Idées, collaborations, appels à projets...", posts: 45, icon: <MessageSquare /> },
    { id: 4, name: "Petites Annonces", description: "Logement, livres, stages, covoiturage...", posts: 210, icon: <Search /> },
  ];

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
        <Card className="max-w-md shadow-xl p-8 bg-white">
          <CardHeader className="items-center">
            <Lock size={48} className="text-aeesb-gold mb-4" />
            <CardTitle className="text-3xl font-heading text-aeesb-green-dark">Accès Réservé aux Membres</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-lg text-gray-600 mb-6">
              Le forum est un espace d'échange privilégié pour les membres de l'AEESB. Pour participer aux discussions, veuillez vous connecter ou adhérer à l'association.
            </CardDescription>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-aeesb-green-dark hover:bg-green-700">
                <Link to="#login">Se Connecter</Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="bg-aeesb-gold hover:bg-yellow-400 text-aeesb-green-dark">
                <Link to="/adhesion">Adhérer Maintenant</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-6 bg-gradient-to-r from-aeesb-green-dark to-green-700 text-white rounded-lg shadow-md">
        <h1 className="text-3xl font-heading font-bold">Forum de l'AEESB</h1>
        <div className="flex gap-2">
          <Input type="search" placeholder="Rechercher dans le forum..." className="max-w-xs bg-white text-gray-800 placeholder-gray-500" />
          <Button variant="secondary" className="bg-aeesb-gold hover:bg-yellow-400 text-aeesb-green-dark">
            <Search size={18} className="mr-2 md:hidden lg:inline-block" />
            <span className="hidden md:inline-block">Rechercher</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map(category => (
          <Card key={category.id} className="hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-heading text-aeesb-green-dark">{category.name}</CardTitle>
              <div className="p-2 bg-aeesb-gold text-aeesb-green-dark rounded-md">
                {React.cloneElement(category.icon, { size: 24 })}
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 mb-3">{category.description}</CardDescription>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{category.posts} discussions</span>
                <Button variant="link" asChild className="text-aeesb-gold p-0 h-auto">
                  <Link to={`/forum/${category.id}`}>Voir la catégorie</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8">
        <Button size="lg" className="bg-aeesb-green-dark hover:bg-green-700">
          <Edit3 size={20} className="mr-2" /> Créer une Nouvelle Discussion
        </Button>
      </div>

      <Card className="mt-10 bg-yellow-50 border-yellow-300">
        <CardHeader className="flex flex-row items-center gap-3">
            <AlertTriangle className="text-yellow-500" size={24} />
            <CardTitle className="text-yellow-700 font-heading text-lg">Règles du Forum</CardTitle>
        </CardHeader>
        <CardContent className="text-yellow-600 text-sm space-y-1">
            <p>Soyez respectueux envers tous les membres.</p>
            <p>Pas de spam ou de publicité non sollicitée.</p>
            <p>Restez pertinent par rapport au sujet de la discussion.</p>
        </CardContent>
      </Card>

    </div>
  );
};

export default ForumPage;
  