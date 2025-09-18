import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart2, Users, DollarSign, Eye, TrendingUp, TrendingDown, CalendarDays } from 'lucide-react';

const AdminStatsPage = () => {
  // Mock data for stats - in a real app, this would come from an API
  const stats = {
    totalMembers: 1250,
    newMembersThisMonth: 75,
    activeMembers: 980,
    membershipRevenueThisMonth: 375000, // FCFA
    totalDonations: 1200000, // FCFA
    siteVisitsToday: 350,
    siteVisitsThisMonth: 8500,
    forumPostsThisWeek: 120,
    eventRegistrationsUpcoming: 55,
  };

  const StatCard = ({ title, value, icon, trend, unit, description }) => (
    <Card className="shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-aeesb-green-dark">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-aeesb-green-dark">{value}{unit && <span className="text-lg font-normal">{unit}</span>}</div>
        {description && <p className="text-xs text-gray-500">{description}</p>}
        {trend && (
          <p className={`text-xs ${trend.direction === 'up' ? 'text-green-600' : 'text-red-600'} flex items-center`}>
            {trend.direction === 'up' ? <TrendingUp className="h-4 w-4 mr-1"/> : <TrendingDown className="h-4 w-4 mr-1"/>}
            {trend.value} {trend.period}
          </p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-heading text-aeesb-green-dark flex items-center">
            <BarChart2 size={28} className="mr-3 text-aeesb-gold" /> Statistiques du Site
          </CardTitle>
          <CardDescription>Aperçu des indicateurs clés de la plateforme AEESB.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <StatCard 
              title="Total Membres" 
              value={stats.totalMembers} 
              icon={<Users className="h-5 w-5 text-aeesb-gold" />}
              trend={{direction: 'up', value: '+5%', period: 'ce mois-ci'}}
            />
            <StatCard 
              title="Nouveaux Membres (Mois)" 
              value={stats.newMembersThisMonth} 
              icon={<Users className="h-5 w-5 text-aeesb-gold" />}
            />
             <StatCard 
              title="Membres Actifs" 
              value={stats.activeMembers} 
              icon={<Users className="h-5 w-5 text-green-500" />}
              description={`${((stats.activeMembers / stats.totalMembers) * 100).toFixed(1)}% du total`}
            />
            <StatCard 
              title="Revenus Adhésions (Mois)" 
              value={stats.membershipRevenueThisMonth.toLocaleString()} 
              unit=" FCFA"
              icon={<DollarSign className="h-5 w-5 text-aeesb-gold" />}
            />
            <StatCard 
              title="Total Dons Collectés" 
              value={stats.totalDonations.toLocaleString()} 
              unit=" FCFA"
              icon={<DollarSign className="h-5 w-5 text-green-500" />}
            />
             <StatCard 
              title="Visites du Site (Aujourd'hui)" 
              value={stats.siteVisitsToday} 
              icon={<Eye className="h-5 w-5 text-aeesb-gold" />}
            />
            <StatCard 
              title="Visites du Site (Mois)" 
              value={stats.siteVisitsThisMonth} 
              icon={<Eye className="h-5 w-5 text-blue-500" />}
            />
            <StatCard 
              title="Publications Forum (Semaine)" 
              value={stats.forumPostsThisWeek} 
              icon={<BarChart2 className="h-5 w-5 text-aeesb-gold" />}
            />
            <StatCard 
              title="Inscriptions Événements (Prochains)" 
              value={stats.eventRegistrationsUpcoming} 
              icon={<CalendarDays className="h-5 w-5 text-purple-500" />}
            />
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-aeesb-green-dark mb-3">Graphiques (Simulation)</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader><CardTitle className="text-base">Croissance des Membres</CardTitle></CardHeader>
                <CardContent>
                  <div className="h-60 bg-gray-100 flex items-center justify-center rounded">
                    <BarChart2 className="h-16 w-16 text-gray-300"/>
                    <p className="text-gray-400 ml-2">Graphique à barres ici</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-base">Répartition des Revenus</CardTitle></CardHeader>
                <CardContent>
                  <div className="h-60 bg-gray-100 flex items-center justify-center rounded">
                    <DollarSign className="h-16 w-16 text-gray-300"/>
                    <p className="text-gray-400 ml-2">Graphique circulaire ici</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
           <p className="text-xs text-gray-500 mt-6">Note: L'affichage de statistiques et graphiques réels nécessite une collecte de données et une intégration backend.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStatsPage;