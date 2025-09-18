import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, MapPin, Users, Download, Image as ImageIcon, Video } from 'lucide-react';
import { Link } from 'react-router-dom';

const EventsPage = () => {
  const events = [
    { 
      id: 1, 
      title: "Assemblée Générale Annuelle", 
      date: "2025-09-15", 
      time: "09:00 - 17:00",
      location: "Salle de conférence, Hôtel de Ville, Bamako", 
      description: "Bilan de l'année, élections du nouveau bureau, et planification des activités futures. Présence de tous les membres souhaitée.",
      imageSrc: "https://storage.googleapis.com/hostinger-horizons-assets-prod/21448308-0160-4b8b-8699-bb57b08aef3b/dce2d6fcfe8f1933d89e72631c69e043.jpg",
      posterUrl: "/posters/ag_2025.pdf"
    },
    { 
      id: 2, 
      title: "Journée Culturelle du Bafing", 
      date: "2025-10-20", 
      time: "10:00 - 22:00",
      location: "Terrain Municipal, Magnambougou", 
      description: "Célébration de la richesse culturelle du Bafing : danses, musiques, expositions artisanales, et dégustations culinaires.",
      imageSrc: "https://storage.googleapis.com/hostinger-horizons-assets-prod/21448308-0160-4b8b-8699-bb57b08aef3b/853a64fb50a97b50e2f142b4680dbb9b.jpg",
      posterUrl: "/posters/journee_culturelle_2025.pdf"
    },
    { 
      id: 3, 
      title: "Rencontre Inter-générationnelle", 
      date: "2025-11-05", 
      time: "14:00 - 18:00",
      location: "Siège de l'AEESB, Bamako", 
      description: "Échanges et partages d'expériences entre les anciens, les membres actifs et les nouveaux adhérents.",
      imageSrc: "https://storage.googleapis.com/hostinger-horizons-assets-prod/21448308-0160-4b8b-8699-bb57b08aef3b/436cf68c8ab815a3acb105b81134fd42.jpg",
      posterUrl: "/posters/rencontre_intergeneration_2025.pdf"
    },
  ];

  const galleryImages = [
    "https://storage.googleapis.com/hostinger-horizons-assets-prod/21448308-0160-4b8b-8699-bb57b08aef3b/dce2d6fcfe8f1933d89e72631c69e043.jpg",
    "https://storage.googleapis.com/hostinger-horizons-assets-prod/21448308-0160-4b8b-8699-bb57b08aef3b/853a64fb50a97b50e2f142b4680dbb9b.jpg",
    "https://storage.googleapis.com/hostinger-horizons-assets-prod/21448308-0160-4b8b-8699-bb57b08aef3b/436cf68c8ab815a3acb105b81134fd42.jpg",
    "https://storage.googleapis.com/hostinger-horizons-assets-prod/21448308-0160-4b8b-8699-bb57b08aef3b/cf1c61964fe077660e71ce82dd74cc59.jpg"
  ];


  return (
    <div className="space-y-8">
      <div className="p-6 bg-gradient-to-r from-aeesb-green-dark to-green-700 text-white rounded-lg shadow-md">
        <h1 className="text-3xl font-heading font-bold mb-2 flex items-center">
          <CalendarDays size={32} className="mr-3" /> Événements et Activités
        </h1>
        <p className="text-lg opacity-90">Découvrez nos prochains rendez-vous et revivez nos moments forts.</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-heading text-2xl text-aeesb-green-dark">Calendrier des Événements</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Un composant de calendrier interactif sera intégré ici pour une vue d'ensemble de nos activités.</p>
          <ul className="list-disc list-inside mt-4 space-y-1 text-gray-700">
            {events.map(event => (
              <li key={event.id}><span className="font-semibold">{event.title}</span> - {event.date}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {events.map(event => (
          <Card key={event.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
            <img  alt={event.title} className="w-full h-56 object-cover md:h-64 lg:h-72" src={event.imageSrc} />
            <CardHeader>
              <CardTitle className="font-heading text-2xl text-aeesb-green-dark hover:text-aeesb-gold transition-colors">
                <Link to={`/evenements/${event.id}`}>{event.title}</Link>
              </CardTitle>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 mt-1">
                <span className="flex items-center"><CalendarDays size={16} className="mr-1" /> {event.date} à {event.time}</span>
                <span className="flex items-center"><MapPin size={16} className="mr-1" /> {event.location}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{event.description}</p>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="bg-aeesb-green-dark hover:bg-green-800">
                  <Link to={`/evenements/${event.id}/inscription`}>
                    <Users size={18} className="mr-2" /> S'inscrire / Participer
                  </Link>
                </Button>
                {event.posterUrl && (
                  <Button asChild variant="outline" className="border-aeesb-gold text-aeesb-gold hover:bg-aeesb-gold hover:text-aeesb-green-dark">
                    <a href={event.posterUrl} download>
                      <Download size={18} className="mr-2" /> Télécharger l'Affiche
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-heading text-2xl text-aeesb-green-dark">Galerie Photos et Vidéos</CardTitle>
          <CardDescription className="text-gray-600">Revivez les meilleurs moments de nos activités passées.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">Une galerie multimédia interactive sera disponible ici.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((imgSrc, i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-md flex items-center justify-center overflow-hidden hover:opacity-80 transition-opacity">
                <img src={imgSrc} alt={`Galerie image ${i+1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
           <div className="text-center mt-6">
             <Button variant="secondary" className="bg-aeesb-gold hover:bg-yellow-400 text-aeesb-green-dark">
                <ImageIcon size={18} className="mr-2" /> Voir toutes les photos
             </Button>
             <Button variant="secondary" className="bg-aeesb-gold hover:bg-yellow-400 text-aeesb-green-dark ml-3">
                <Video size={18} className="mr-2" /> Voir toutes les vidéos
             </Button>
           </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventsPage;