import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Users, Award, Calendar, TrendingUp, HeartHandshake as Handshake, Target, Eye, Zap, Landmark, Home as HomeIcon, Utensils, Users2, BookOpen, School, Building } from 'lucide-react';
import { motion } from 'framer-motion';

// Extracted Sections (Refactoring)
const WelcomeSection = ({ fadeIn }) => (
  <motion.section 
    className="relative rounded-lg overflow-hidden shadow-2xl bg-aeesb-green-dark p-8 md:p-16 text-center"
    initial="hidden" animate="visible" variants={fadeIn}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-aeesb-green-dark via-green-800 to-aeesb-gold opacity-30"></div>
    <div className="relative z-10">
      <motion.h1 
        className="text-4xl md:text-6xl font-heading font-extrabold mb-6 text-black" // Changed text color to black
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Bienvenue à l'AEESB
      </motion.h1>
      <motion.p 
        className="text-lg md:text-2xl mb-8 max-w-3xl mx-auto font-sans text-gray-800" // Adjusted for better contrast with black title
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        L'Association des Élèves, Étudiants et Sympathisants du Bafing. Unir, Soutenir, Inspirer.
      </motion.p>
      <motion.div 
        className="space-x-0 space-y-4 sm:space-y-0 sm:space-x-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Button size="lg" asChild className="bg-aeesb-gold hover:bg-yellow-500 text-aeesb-green-dark font-bold text-lg px-8 py-6 shadow-lg transform hover:scale-105 transition-transform">
          <Link to="/adhesion">
            <Users className="mr-2 h-5 w-5" /> Adhérer Maintenant
          </Link>
        </Button>
        <Button size="lg" variant="outline" className="border-aeesb-gold text-aeesb-gold hover:bg-aeesb-gold hover:text-aeesb-green-dark font-bold text-lg px-8 py-6 shadow-lg transform hover:scale-105 transition-transform">
          <Award className="mr-2 h-5 w-5" /> Faire un Don
        </Button>
      </motion.div>
    </div>
  </motion.section>
);

const CulturalSection = ({ fadeIn, culturalAspects }) => (
  <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeIn}>
    <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-aeesb-green-dark mb-3">Culture et Patrimoine du Bafing</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Découvrez la richesse culturelle et les traditions ancestrales de notre région.</p>
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {culturalAspects.map((aspect, index) => (
        <motion.div key={index} variants={fadeIn} custom={index}>
          <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full bg-white rounded-lg">
            <div className="w-full h-56 bg-gray-200 flex items-center justify-center">
              <img  alt={aspect.title} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1675023112817-52b789fd2ef0" />
            </div>
            <CardHeader>
              <div className="flex items-center mb-2">
                <div className="bg-aeesb-green-light text-aeesb-gold p-3 rounded-full w-fit mr-3 shadow-sm">{aspect.icon}</div>
                <CardTitle className="font-heading text-xl text-aeesb-green-dark">{aspect.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm">{aspect.description}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  </motion.section>
);

const EducationSection = ({ fadeIn, schools }) => (
  <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeIn}>
    <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-aeesb-green-dark mb-3">Éducation dans le Bafing</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Un aperçu des établissements scolaires qui forment la jeunesse de notre région.</p>
    </div>
    <div className="space-y-8">
      {schools.map((school, index) => (
        <motion.div key={index} variants={fadeIn}>
          <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-white rounded-lg overflow-hidden">
            <CardHeader className="bg-aeesb-green-light p-6">
              <CardTitle className="font-heading text-2xl text-aeesb-green-dark flex items-center"><School className="mr-3 h-7 w-7 text-aeesb-gold"/>{school.name}</CardTitle>
              <CardDescription className="text-aeesb-green-dark">Date de création : {school.creationDate}</CardDescription>
            </CardHeader>
            <CardContent className="p-6 grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg text-aeesb-green-dark mb-2">Direction</h3>
                <p className="text-sm text-gray-700">Premier Directeur : {school.firstDirector}</p>
                <p className="text-sm text-gray-700">Directeur Actuel : {school.currentDirector}</p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                   <div className="w-full h-24 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs">
                     <img  alt={`Photo de ${school.firstDirector}`} className="w-full h-full object-cover rounded" src="https://images.unsplash.com/photo-1549814803-5f8cf460c238" />
                   </div>
                   <div className="w-full h-24 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs">
                     <img  alt={`Photo de ${school.currentDirector}`} className="w-full h-full object-cover rounded" src="https://images.unsplash.com/photo-1646315449332-f1246af4feba" />
                   </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-aeesb-green-dark mb-2">Aperçu de l'école</h3>
                <div className="grid grid-cols-2 gap-4">
                  {school.images.map((imgDesc, imgIdx) => (
                    <div key={imgIdx} className="w-full h-32 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 text-xs overflow-hidden">
                       <img  alt={imgDesc} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1675023112817-52b789fd2ef0" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
     <div className="text-center mt-10">
      <Button asChild variant="outline" className="border-aeesb-green-dark text-aeesb-green-dark hover:bg-aeesb-green-dark hover:text-white">
        <Link to="/education/etablissements">Voir tous les établissements</Link>
      </Button>
    </div>
  </motion.section>
);

const ValuesSection = ({ fadeIn }) => (
  <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeIn}>
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-aeesb-green-dark mb-3">Nos Valeurs Fondamentales</h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">Ce qui nous guide et nous unit dans toutes nos actions.</p>
    </div>
    <div className="grid md:grid-cols-3 gap-8">
      {[
        { icon: <Target className="h-12 w-12 text-aeesb-gold" />, title: "Mission", description: "Promouvoir l'excellence académique et l'entraide entre les jeunes du Bafing, en favorisant leur épanouissement." },
        { icon: <Eye className="h-12 w-12 text-aeesb-gold" />, title: "Vision", description: "Devenir une référence en matière de développement socio-éducatif et culturel pour la jeunesse du Bafing et au-delà." },
        { icon: <Handshake className="h-12 w-12 text-aeesb-gold" />, title: "Valeurs", description: "Solidarité, Intégrité, Excellence, Engagement citoyen et Respect mutuel sont au cœur de notre association." },
      ].map((item, index) => (
        <motion.div key={index} variants={fadeIn} custom={index}>
          <Card className="text-center shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full bg-white p-6 rounded-lg">
            <CardHeader className="items-center">
              <div className="mx-auto bg-aeesb-green-light text-aeesb-gold p-4 rounded-full w-fit mb-4 shadow-md">{item.icon}</div>
              <CardTitle className="font-heading text-2xl text-aeesb-green-dark">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-base">{item.description}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  </motion.section>
);

const RecentActivitiesSection = ({ fadeIn, activityImageUrls }) => (
  <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeIn}>
    <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-aeesb-green-dark mb-3">Activités Récentes</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Un aperçu de nos moments forts et de l'engagement de nos membres.</p>
    </div>
    <div className="grid md:grid-cols-3 gap-6">
      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white rounded-lg">
        <img alt="Semaine culturelle" className="w-full h-56 object-cover" src={activityImageUrls[0]} />
        <CardContent className="p-6">
          <CardTitle className="font-heading text-xl text-aeesb-green-dark mb-2">Semaine Culturelle</CardTitle>
          <CardDescription className="text-gray-600">Célébration de la richesse culturelle du Bafing.</CardDescription>
        </CardContent>
      </Card>
      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white rounded-lg">
        <img alt="Journée d'intégration" className="w-full h-56 object-cover" src={activityImageUrls[1]} />
        <CardContent className="p-6">
          <CardTitle className="font-heading text-xl text-aeesb-green-dark mb-2">Journée d'Intégration</CardTitle>
          <CardDescription className="text-gray-600">Accueil chaleureux des nouveaux membres.</CardDescription>
        </CardContent>
      </Card>
      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white rounded-lg">
        <img alt="Atelier de formation" className="w-full h-56 object-cover" src={activityImageUrls[2]} />
        <CardContent className="p-6">
          <CardTitle className="font-heading text-xl text-aeesb-green-dark mb-2">Ateliers de Formation</CardTitle>
          <CardDescription className="text-gray-600">Renforcement des capacités de nos membres.</CardDescription>
        </CardContent>
      </Card>
    </div>
  </motion.section>
);

const NewsSection = ({ fadeIn }) => (
  <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeIn} className="bg-aeesb-green-light p-8 rounded-lg shadow-inner">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-aeesb-green-dark mb-3">Actualités et Annonces</h2>
      <p className="text-lg text-gray-700 max-w-2xl mx-auto">Restez informé des dernières nouvelles de l'association.</p>
    </div>
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="shadow-md bg-white">
        <CardHeader>
          <CardTitle className="font-heading text-xl text-aeesb-green-dark">Message du Secrétaire Général</CardTitle>
          <CardDescription className="text-sm text-gray-500">24 Mai 2025</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">"Chers membres, ensemble nous construisons un avenir meilleur pour la jeunesse du Bafing. Votre engagement est notre force." - M. Simaro Dembélé</p>
          <Button variant="link" asChild className="text-aeesb-gold p-0 h-auto hover:text-yellow-500">
            <Link to="/annonces/message-sg">Lire la suite</Link>
          </Button>
        </CardContent>
      </Card>
      <Card className="shadow-md bg-white">
        <CardHeader>
          <CardTitle className="font-heading text-xl text-aeesb-green-dark">Prochaine Assemblée Générale</CardTitle>
          <CardDescription className="text-sm text-gray-500">Date: 15 Juillet 2025</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">L'assemblée générale annuelle se tiendra à Bamako. Ordre du jour et détails à venir prochainement.</p>
          <Button variant="link" asChild className="text-aeesb-gold p-0 h-auto hover:text-yellow-500">
            <Link to="/evenements/ag-2025">Plus d'infos</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
    <div className="text-center mt-10">
      <Button asChild variant="outline" className="border-aeesb-green-dark text-aeesb-green-dark hover:bg-aeesb-green-dark hover:text-white">
        <Link to="/annonces">Voir toutes les annonces</Link>
      </Button>
    </div>
  </motion.section>
);


const HomePage = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const activityImageUrls = [
    "https://storage.googleapis.com/hostinger-horizons-assets-prod/21448308-0160-4b8b-8699-bb57b08aef3b/853a64fb50a97b50e2f142b4680dbb9b.jpg",
    "https://storage.googleapis.com/hostinger-horizons-assets-prod/21448308-0160-4b8b-8699-bb57b08aef3b/436cf68c8ab815a3acb105b81134fd42.jpg",
    "https://storage.googleapis.com/hostinger-horizons-assets-prod/21448308-0160-4b8b-8699-bb57b08aef3b/cf1c61964fe077660e71ce82dd74cc59.jpg"
  ];

  const culturalAspects = [
    { title: "Barrage de Manantali", description: "Le barrage hydroélectrique de Manantali, sur le fleuve Bafing, est une infrastructure clé pour la région, fournissant énergie et eau pour l'irrigation.", icon: <Zap className="h-10 w-10 text-aeesb-gold" />, imageName: "Barrage de Manantali" },
    { title: "Architecture Traditionnelle : La Case Ronde", description: "Les cases rondes au toit de chaume sont emblématiques de l'habitat traditionnel du Bafing, parfaitement adaptées au climat local.", icon: <HomeIcon className="h-10 w-10 text-aeesb-gold" />, imageName: "Case ronde traditionnelle du Bafing" },
    { title: "Tenues Traditionnelles", description: "Les vêtements traditionnels, riches en couleurs et en motifs, comme le bazin et les pagnes tissés, sont portés avec fierté lors des cérémonies.", icon: <Users2 className="h-10 w-10 text-aeesb-gold" />, imageName: "Tenues traditionnelles colorées du Bafing" },
    { title: "Mariage Traditionnel", description: "Le mariage dans le Bafing est une célébration communautaire vibrante, marquée par des rituels ancestraux, des chants, des danses et des festins.", icon: <Handshake className="h-10 w-10 text-aeesb-gold" />, imageName: "Cérémonie de mariage traditionnel au Bafing" },
    { title: "Culture de l'Arachide", description: "L'arachide est une culture vivrière et économique importante dans le Bafing, façonnant le paysage agricole et les traditions culinaires.", icon: <Utensils className="h-10 w-10 text-aeesb-gold" />, imageName: "Champ d'arachide verdoyant dans le Bafing" }
  ];

  const schools = [
    { name: "Lycée de Ouan", creationDate: "1998", firstDirector: "M. Traoré Adama", currentDirector: "Mme. Diarra Fatoumata", images: ["Lycée de Ouan bâtiment principal", "Élèves du Lycée de Ouan en classe"] },
    { name: "École Fondamentale de Kéniéba", creationDate: "1985", firstDirector: "M. Sissoko Modibo", currentDirector: "M. Keita Moussa", images: ["Cour de l'École Fondamentale de Kéniéba", "Élèves jouant dans la cour de Kéniéba"] },
    { name: "CFP Manantali (Centre de Formation Professionnelle)", creationDate: "2005", firstDirector: "M. Diallo Ibrahim", currentDirector: "Mme. Camara Aïssata", images: ["Atelier de formation au CFP Manantali", "Étudiants en formation professionnelle à Manantali"] },
  ];

  return (
    <div className="space-y-16">
      <WelcomeSection fadeIn={fadeIn} />
      <CulturalSection fadeIn={fadeIn} culturalAspects={culturalAspects} />
      <EducationSection fadeIn={fadeIn} schools={schools} />
      <ValuesSection fadeIn={fadeIn} />
      <RecentActivitiesSection fadeIn={fadeIn} activityImageUrls={activityImageUrls} />
      <NewsSection fadeIn={fadeIn} />
    </div>
  );
};

export default HomePage;