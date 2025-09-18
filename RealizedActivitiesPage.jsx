import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, MapPin, Users, Image as ImageIcon, Video, FileText, ChevronRight, AlertTriangle, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';

const RealizedActivitiesPage = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('realized_activities')
        .select('*')
        .order('date', { ascending: false });

      if (error) {
        console.error("Error fetching realized activities:", error);
        toast({
          title: "Erreur de chargement",
          description: "Impossible de charger les activités réalisées.",
          variant: "destructive",
        });
        setActivities([]);
      } else {
        setActivities(data);
      }
      setLoading(false);
    };

    fetchActivities();
  }, [toast]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
        <div className="flex flex-col items-center">
          <Zap size={48} className="text-aeesb-gold animate-ping mb-4" />
          <p className="text-xl font-semibold text-aeesb-green-dark">Chargement des activités réalisées...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      <div className="p-6 bg-gradient-to-r from-aeesb-green-dark to-green-700 text-white rounded-lg shadow-md">
        <h1 className="text-3xl font-heading font-bold mb-2 flex items-center">
          <Zap size={32} className="mr-3" /> Activités Réalisées
        </h1>
        <p className="text-lg opacity-90">Découvrez le bilan de nos actions et projets passés.</p>
      </div>

      {activities.length === 0 && !loading && (
        <Card className="shadow-lg border-l-4 border-yellow-400">
          <CardHeader className="flex flex-row items-center gap-3">
            <AlertTriangle className="text-yellow-500" size={28} />
            <CardTitle className="font-heading text-xl text-yellow-700">Aucune activité pour le moment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Aucune activité réalisée n'a été publiée pour l'instant. Revenez bientôt pour découvrir nos accomplissements !</p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map(activity => (
          <Card key={activity.id} className="overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col bg-white">
            {activity.photos_urls && activity.photos_urls.length > 0 && (
              <img  alt={activity.title} className="w-full h-48 object-cover" src={activity.photos_urls[0]} />
            )}
            {(!activity.photos_urls || activity.photos_urls.length === 0) && (
                 <div className="w-full h-48 bg-gradient-to-br from-aeesb-green-light to-yellow-100 flex items-center justify-center">
                    <Zap size={48} className="text-aeesb-gold opacity-50" />
                 </div>
            )}
            <CardHeader className="flex-grow">
              <CardTitle className="font-heading text-xl text-aeesb-green-dark hover:text-aeesb-gold transition-colors">
                {activity.title}
              </CardTitle>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-gray-500 mt-1">
                <span className="flex items-center"><CalendarDays size={14} className="mr-1" /> {new Date(activity.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                {activity.location && <span className="flex items-center"><MapPin size={14} className="mr-1" /> {activity.location}</span>}
              </div>
              {activity.nature && <p className="text-xs bg-aeesb-gold text-aeesb-green-dark px-2 py-0.5 rounded-full inline-block mt-2 font-medium">{activity.nature}</p>}
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-gray-700 text-sm mb-3 line-clamp-3">{activity.description || "Aucune description détaillée disponible."}</p>
              {activity.participants_count && <p className="text-xs text-gray-500 flex items-center"><Users size={12} className="mr-1" /> {activity.participants_count} participants</p>}
            </CardContent>
            <CardFooter className="bg-gray-50 p-4 border-t">
              <Button asChild variant="link" className="text-aeesb-gold p-0 h-auto font-semibold hover:text-aeesb-green-dark w-full justify-start">
                {/* This link should ideally go to a detailed activity page: /activites-realisees/${activity.id} */}
                {/* For now, let's assume it opens a modal or expands content, or perhaps no action if no detail page exists */}
                <span className="flex items-center">
                  En savoir plus <ChevronRight size={16} className="ml-1" />
                </span>
              </Button>
              {/* Example for report download if available */}
              {activity.report_url && (
                <a href={activity.report_url} target="_blank" rel="noopener noreferrer" className="ml-auto">
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:text-aeesb-green-dark">
                    <FileText size={18} />
                  </Button>
                </a>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RealizedActivitiesPage;