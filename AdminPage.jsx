import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, Navigate } from 'react-router-dom';
import { Users, FileText, BarChart2, DollarSign, Settings, ShieldCheck, LogOut, AlertTriangle, UploadCloud, Video, FileUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const AdminPage = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();

  if (!user || user.role !== 'admin') {
    return <Navigate to="/connexion" replace />;
  }
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté de l'espace administrateur.",
    });
  };

  const adminSections = [
    { title: "Gestion des Membres", icon: <Users />, description: "Vérifier, valider, et gérer les adhésions.", link: "/admin/membres", color: "text-blue-500", bgColor: "bg-blue-100", borderColor: "border-blue-500" },
    { title: "Publication Contenu", icon: <FileText />, description: "Publier annonces, événements, articles de blog.", link: "/admin/contenu", color: "text-green-500", bgColor: "bg-green-100", borderColor: "border-green-500" },
    { title: "Gestion des Paiements", icon: <DollarSign />, description: "Suivre les cotisations et les dons.", link: "/admin/paiements", color: "text-yellow-500", bgColor: "bg-yellow-100", borderColor: "border-yellow-500" },
    { title: "Statistiques du Site", icon: <BarChart2 />, description: "Consulter les données d'utilisation et d'adhésion.", link: "/admin/statistiques", color: "text-purple-500", bgColor: "bg-purple-100", borderColor: "border-purple-500" },
    { title: "Paramètres du Site", icon: <Settings />, description: "Configurer les options générales du site.", link: "/admin/parametres", color: "text-gray-500", bgColor: "bg-gray-100", borderColor: "border-gray-500" },
  ];

  return (
    <div className="space-y-8">
      <div className="p-6 bg-gradient-to-r from-aeesb-green-dark to-green-700 text-white rounded-lg shadow-md flex flex-col md:flex-row justify-between items-center">
        <div>
          <h1 className="text-3xl font-heading font-bold flex items-center">
            <ShieldCheck size={32} className="mr-3" /> Espace Administratif
          </h1>
          <p className="text-lg opacity-90">Gestion et configuration du site AEESB. Bienvenue, {user.firstName || user.name} ({user.email}).</p>
        </div>
        <Button onClick={handleLogout} variant="outline" className="mt-4 md:mt-0 border-white text-white hover:bg-white hover:text-aeesb-green-dark">
          <LogOut size={18} className="mr-2"/> Se Déconnecter
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminSections.map(section => (
          <Card key={section.title} className={`hover:shadow-xl transition-shadow duration-300 border-l-4 ${section.borderColor}`}>
            <CardHeader className="flex flex-row items-center space-x-4 pb-3">
               <div className={`p-3 ${section.bgColor} rounded-full`}>
                 {React.cloneElement(section.icon, { size: 28, className: section.color })}
               </div>
              <CardTitle className={`text-xl font-heading ${section.color}`}>{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4 text-sm">{section.description}</p>
              <Button variant="link" asChild className={`${section.color} p-0 h-auto font-semibold hover:opacity-80`}>
                <Link to={section.link}>Accéder à la section</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="font-heading text-2xl text-aeesb-green-dark flex items-center">
            <UploadCloud size={28} className="mr-3 text-aeesb-gold" /> Téléchargement Rapide de Fichiers
          </CardTitle>
          <CardDescription>Chargez rapidement des images, vidéos ou documents pour différentes sections du site.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="image-upload" className="font-semibold text-aeesb-green-dark">Images (pour galerie, articles)</Label>
              <Input id="image-upload" type="file" accept="image/*" multiple className="mt-1" />
            </div>
            <div>
              <Label htmlFor="video-upload" className="font-semibold text-aeesb-green-dark">Vidéos (pour galerie, événements)</Label>
              <Input id="video-upload" type="file" accept="video/*" multiple className="mt-1" />
            </div>
            <div>
              <Label htmlFor="document-upload" className="font-semibold text-aeesb-green-dark">Documents (PV, rapports)</Label>
              <Input id="document-upload" type="file" accept=".pdf,.doc,.docx,.xls,.xlsx" multiple className="mt-1" />
            </div>
          </div>
           <div className="flex justify-end">
            <Button className="bg-aeesb-green-dark hover:bg-green-800">
              <FileUp size={18} className="mr-2" /> Téléverser les fichiers sélectionnés
            </Button>
          </div>
          <p className="text-xs text-gray-500">Note: Le téléversement réel des fichiers nécessite une configuration backend.</p>
        </CardContent>
      </Card>


      <Card className="mt-10 bg-red-50 border-red-300">
        <CardHeader className="flex flex-row items-center gap-3">
            <AlertTriangle className="text-red-500" size={24} />
            <CardTitle className="text-red-700 font-heading text-lg">Attention</CardTitle>
        </CardHeader>
        <CardContent className="text-red-600 text-sm space-y-1">
            <p>Les modifications effectuées dans cette section ont un impact direct sur le site.</p>
            <p>Agissez avec prudence et assurez-vous de vos actions.</p>
        </CardContent>
      </Card>

      <div className="mt-8">
        <h2 className="text-2xl font-heading font-semibold text-aeesb-green-dark mb-4">Exports de Données</h2>
        <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="secondary" className="bg-aeesb-gold hover:bg-yellow-400 text-aeesb-green-dark">Exporter Membres (Excel)</Button>
            <Button variant="secondary" className="bg-aeesb-gold hover:bg-yellow-400 text-aeesb-green-dark">Exporter Paiements (PDF)</Button>
        </div>
         <p className="text-xs text-gray-500 mt-2">Note: La génération d'exports réels nécessite une configuration backend.</p>
      </div>
    </div>
  );
};

export default AdminPage;