
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileText, Search, Filter, Users, Briefcase, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const AnnouncementsPage = () => {
  const announcements = [
    { id: 1, title: "Assemblée Générale Ordinaire", date: "2025-06-15", category: "Réunion", localite: "Bureau Central", excerpt: "Convocation à l'assemblée générale ordinaire pour discuter des bilans et perspectives..." },
    { id: 2, title: "Lancement Semaine Culturelle", date: "2025-07-01", category: "Activité", localite: "Tous les bureaux", excerpt: "Préparatifs et programme de la semaine culturelle annuelle de l'AEESB..." },
    { id: 3, title: "Campagne de Cotisation Annuelle", date: "2025-05-20", category: "Information", localite: "Bureau Central", excerpt: "Rappel concernant la campagne de cotisation pour l'année en cours..." },
    { id: 4, title: "Atelier d'Orientation Post-Bac", date: "2025-08-10", category: "Formation", localite: "Bureau de Bamako", excerpt: "Un atelier destiné aux nouveaux bacheliers pour les guider dans leurs choix..." },
    { id: 5, title: "Réunion du Bureau Local de Sikasso", date: "2025-06-05", category: "Réunion", localite: "Bureau de Sikasso", excerpt: "Ordre du jour: activités locales et remontée des préoccupations..." },
  ];

  // Placeholder for filter states
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterLocalite, setFilterLocalite] = React.useState('');
  const [filterCategory, setFilterCategory] = React.useState('');

  const filteredAnnouncements = announcements.filter(ann => 
    ann.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterLocalite === '' || ann.localite === filterLocalite) &&
    (filterCategory === '' || ann.category === filterCategory)
  );

  const localites = ["Bureau Central", "Bureau de Bamako", "Bureau de Sikasso", "Bureau de Kayes", "Tous les bureaux"];
  const categories = ["Réunion", "Activité", "Information", "Formation", "Convocation"];

  return (
    <div className="space-y-8">
      <div className="p-6 bg-gradient-to-r from-aeesb-green-dark to-green-700 text-white rounded-lg shadow-md">
        <h1 className="text-3xl font-heading font-bold mb-4 flex items-center">
          <FileText size={32} className="mr-3" /> Mur d'Annonces Internes
        </h1>
        <p className="text-lg opacity-90">Retrouvez ici toutes les communications officielles de l'AEESB.</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-heading text-2xl text-aeesb-green-dark flex items-center">
            <Filter size={24} className="mr-2 text-aeesb-gold" /> Filtres
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input 
            type="search" 
            placeholder="Rechercher par titre..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-gray-800 placeholder-gray-500" 
          />
          <select 
            value={filterLocalite}
            onChange={(e) => setFilterLocalite(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-aeesb-gold focus:border-aeesb-gold"
          >
            <option value="">Toutes les localités</option>
            {localites.map(loc => <option key={loc} value={loc}>{loc}</option>)}
          </select>
          <select 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-aeesb-gold focus:border-aeesb-gold"
          >
            <option value="">Toutes les catégories</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </CardContent>
      </Card>
      
      {filteredAnnouncements.length > 0 ? (
        <div className="space-y-6">
          {filteredAnnouncements.map(ann => (
            <Card key={ann.id} className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="font-heading text-xl text-aeesb-green-dark hover:text-aeesb-gold transition-colors">
                  <Link to={`/annonces/${ann.id}`}>{ann.title}</Link>
                </CardTitle>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mt-1">
                  <span className="flex items-center"><Calendar size={14} className="mr-1" /> {ann.date}</span>
                  <span className="flex items-center"><Briefcase size={14} className="mr-1" /> {ann.category}</span>
                  <span className="flex items-center"><Users size={14} className="mr-1" /> {ann.localite}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-3">{ann.excerpt}</p>
                <Button variant="link" asChild className="text-aeesb-gold p-0 h-auto">
                  <Link to={`/annonces/${ann.id}`}>Lire la suite</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center p-8 shadow-md">
          <CardContent>
            <Search size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-xl text-gray-600">Aucune annonce ne correspond à vos critères de recherche.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AnnouncementsPage;
  