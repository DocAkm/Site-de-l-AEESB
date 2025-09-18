import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Newspaper, Search, Edit, BookOpen, Award, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogPage = () => {
  const articles = [
    { 
      id: 1, 
      title: "L'importance de l'orientation scolaire pour les jeunes du Bafing", 
      category: "Orientation", 
      date: "2025-05-10", 
      author: "Comité Pédagogique AEESB",
      excerpt: "Découvrez pourquoi une bonne orientation est cruciale et comment l'AEESB vous accompagne...",
      imageSrc: "https://storage.googleapis.com/hostinger-horizons-assets-prod/21448308-0160-4b8b-8699-bb57b08aef3b/cf1c61964fe077660e71ce82dd74cc59.jpg"
    },
    { 
      id: 2, 
      title: "Concours nationaux : comment bien se préparer ?", 
      category: "Concours", 
      date: "2025-04-25", 
      author: "M. Fanta KOUYATE, Ancien lauréat",
      excerpt: "Conseils pratiques et stratégies pour aborder sereinement les concours d'entrée aux grandes écoles...",
      imageSrc: "https://storage.googleapis.com/hostinger-horizons-assets-prod/21448308-0160-4b8b-8699-bb57b08aef3b/dce2d6fcfe8f1933d89e72631c69e043.jpg"
    },
    { 
      id: 3, 
      title: "Portrait : Fatoumata Cissé, une initiative inspirante pour l'éducation des filles", 
      category: "Initiatives", 
      date: "2025-04-12", 
      author: "Rédaction AEESB",
      excerpt: "Rencontre avec une membre active de l'AEESB qui mène un projet remarquable dans sa localité...",
      imageSrc: "https://storage.googleapis.com/hostinger-horizons-assets-prod/21448308-0160-4b8b-8699-bb57b08aef3b/853a64fb50a97b50e2f142b4680dbb9b.jpg"
    },
  ];

  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterCategory, setFilterCategory] = React.useState('');

  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterCategory === '' || article.category === filterCategory)
  );

  const categories = ["Orientation", "Concours", "Initiatives", "Vie Associative", "Témoignages"];

  return (
    <div className="space-y-8">
      <div className="p-6 bg-gradient-to-r from-aeesb-green-dark to-green-700 text-white rounded-lg shadow-md">
        <h1 className="text-3xl font-heading font-bold mb-2 flex items-center">
          <Newspaper size={32} className="mr-3" /> Blog et Actualités de l'AEESB
        </h1>
        <p className="text-lg opacity-90">Articles, interviews, et réflexions sur l'éducation et la jeunesse.</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-heading text-2xl text-aeesb-green-dark">Filtrer les Articles</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            type="search" 
            placeholder="Rechercher un article..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-gray-800 placeholder-gray-500" 
          />
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
      
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map(article => (
            <Card key={article.id} className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <img  alt={article.title} className="w-full h-48 object-cover" src={article.imageSrc} />
              <CardHeader className="flex-grow">
                <span className="text-xs bg-aeesb-gold text-aeesb-green-dark font-semibold px-2 py-1 rounded-full mb-2 inline-block">{article.category}</span>
                <CardTitle className="font-heading text-lg text-aeesb-green-dark hover:text-aeesb-gold transition-colors">
                  <Link to={`/blog/${article.id}`}>{article.title}</Link>
                </CardTitle>
                <CardDescription className="text-xs text-gray-500 mt-1">
                  Publié le {article.date} par {article.author}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-gray-700 mb-3">{article.excerpt}</p>
              </CardContent>
              <div className="p-4 pt-0">
                <Button variant="link" asChild className="text-aeesb-gold p-0 h-auto font-semibold">
                  <Link to={`/blog/${article.id}`}>Lire la suite →</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center p-8 shadow-md col-span-full">
          <CardContent>
            <Search size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-xl text-gray-600">Aucun article ne correspond à vos critères.</p>
          </CardContent>
        </Card>
      )}

      <Card className="mt-10 bg-green-50 border-green-300">
        <CardHeader className="flex flex-row items-center gap-3">
            <Edit className="text-green-600" size={24} />
            <CardTitle className="text-green-700 font-heading text-lg">Contribuer au Blog</CardTitle>
        </CardHeader>
        <CardContent className="text-green-600 text-sm space-y-1">
            <p>Vous avez une idée d'article, un témoignage à partager ? Contactez la rédaction !</p>
            <Button variant="link" className="text-green-700 p-0 h-auto font-semibold hover:text-green-800">Proposer un article</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogPage;