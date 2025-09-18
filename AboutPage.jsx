import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Users, Target, Eye, ShieldCheck, Briefcase, UserCheck, MapPin, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const AboutPage = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const teamMembers = [
    { name: "Fadouba Sidibé", role: "Président d'Honneur", imageDesc: "Portrait de Fadouba Sidibé, Président d'Honneur de l'AEESB", icon: <Award className="h-6 w-6 text-aeesb-gold" /> },
    { name: "M. Simaro Dembélé", role: "Secrétaire Général (Responsable AEESB)", imageDesc: "Portrait de M. Simaro Dembélé, Secrétaire Général de l'AEESB", icon: <Briefcase className="h-6 w-6 text-aeesb-gold" /> },
    { name: "M. Abdoul Karim MAIGA", role: "Secrétaire Général Adjoint", imageDesc: "Portrait de M. Abdoul Karim MAIGA, Secrétaire Général Adjoint", icon: <UserCheck className="h-6 w-6 text-aeesb-gold" /> },
    { name: "Daby F KEITA", role: "Secrétaire Général (Bureau Local Kayes)", imageDesc: "Portrait de Daby F KEITA, SG Bureau Local Kayes", icon: <MapPin className="h-6 w-6 text-aeesb-gold" /> },
    { name: "Sekou Sissoko", role: "Secrétaire Général (Bureau Local Manantali)", imageDesc: "Portrait de Sekou Sissoko, SG Bureau Local Manantali", icon: <MapPin className="h-6 w-6 text-aeesb-gold" /> },
  ];

  const organigramme = [
    {
      level: "Bureau Central",
      members: [
        { name: "Fadouba Sidibé", role: "Président d'Honneur" },
        { name: "M. Simaro Dembélé", role: "Secrétaire Général" },
        { name: "M. Abdoul Karim MAIGA", role: "Secrétaire Général Adjoint" },
        { name: "Autres membres du bureau central...", role: "Postes divers" }
      ]
    },
    {
      level: "Bureau Local - Kayes",
      members: [
        { name: "Daby F KEITA", role: "Secrétaire Général" },
        { name: "Autres membres Kayes...", role: "Postes divers" }
      ]
    },
    {
      level: "Bureau Local - Manantali",
      members: [
        { name: "Sekou Sissoko", role: "Secrétaire Général" },
        { name: "Autres membres Manantali...", role: "Postes divers" }
      ]
    },
     {
      level: "Autres Bureaux Locaux",
      members: [
        { name: "Représentants locaux...", role: "Postes divers" }
      ]
    }
  ];


  return (
    <div className="space-y-12">
      <motion.section initial="hidden" animate="visible" variants={fadeIn}>
        <Card className="shadow-xl bg-gradient-to-br from-aeesb-green-dark via-green-700 to-aeesb-green-dark text-white rounded-lg">
          <CardHeader className="text-center p-8">
            <motion.h1 
              className="text-4xl md:text-5xl font-heading font-extrabold mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Qui Sommes-Nous ?
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              L'AEESB : Une communauté unie pour l'avenir des jeunes du Bafing.
            </motion.p>
          </CardHeader>
        </Card>
      </motion.section>

      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeIn}>
        <Card className="shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-aeesb-green-light p-6">
            <CardTitle className="text-2xl font-heading text-aeesb-green-dark">Notre Histoire</CardTitle>
          </CardHeader>
          <CardContent className="p-6 text-gray-700 space-y-4">
            <p>L'Association des Élèves, Étudiants et Sympathisants du Bafing (AEESB) a été fondée avec la conviction profonde que l'union fait la force. Depuis sa création, notre association s'est engagée à soutenir les jeunes de la région du Bafing dans leur parcours éducatif, professionnel et personnel.</p>
            <p>Née de la volonté de créer un réseau solide d'entraide et de solidarité, l'AEESB rassemble des individus passionnés par le développement de leur communauté. Nous œuvrons pour l'excellence académique, la promotion de la culture du Bafing et l'épanouissement de chaque membre.</p>
          </CardContent>
        </Card>
      </motion.section>

      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeIn}>
        <Card className="shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-aeesb-green-light p-6">
            <CardTitle className="text-2xl font-heading text-aeesb-green-dark">Buts et Objectifs</CardTitle>
          </CardHeader>
          <CardContent className="p-6 grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start">
                <Target className="h-8 w-8 text-aeesb-gold mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg text-aeesb-green-dark">Promouvoir l'Éducation</h3>
                  <p className="text-gray-700">Encourager l'excellence scolaire et universitaire, faciliter l'accès à l'information et aux ressources pédagogiques.</p>
                </div>
              </div>
              <div className="flex items-start">
                <Users className="h-8 w-8 text-aeesb-gold mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg text-aeesb-green-dark">Renforcer la Solidarité</h3>
                  <p className="text-gray-700">Créer un réseau d'entraide solide entre les membres, favoriser le partage d'expériences et le soutien mutuel.</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start">
                <Eye className="h-8 w-8 text-aeesb-gold mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg text-aeesb-green-dark">Valoriser la Culture du Bafing</h3>
                  <p className="text-gray-700">Organiser des événements culturels, promouvoir les traditions et le patrimoine de la région.</p>
                </div>
              </div>
               <div className="flex items-start">
                <ShieldCheck className="h-8 w-8 text-aeesb-gold mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg text-aeesb-green-dark">Favoriser l'Insertion Socio-Professionnelle</h3>
                  <p className="text-gray-700">Aider les jeunes diplômés à s'insérer dans le monde du travail à travers des conseils, des formations et des mises en relation.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeIn}>
        <Card className="shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-aeesb-green-light p-6">
            <CardTitle className="text-2xl font-heading text-aeesb-green-dark">Notre Équipe Dirigeante</CardTitle>
            <CardDescription className="text-gray-600">Les piliers de notre association, dévoués à la cause des jeunes du Bafing.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div key={index} variants={fadeIn} custom={index}>
                <Card className="text-center h-full shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="items-center">
                    <div className="w-24 h-24 rounded-full bg-gray-200 mb-3 flex items-center justify-center overflow-hidden">
                       <img  alt={member.imageDesc} className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1675023112817-52b789fd2ef0" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-aeesb-green-dark">{member.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-aeesb-gold font-medium flex items-center justify-center">
                      {member.icon} <span className="ml-2">{member.role}</span>
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.section>
      
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeIn}>
        <Card className="shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-aeesb-green-light p-6">
            <CardTitle className="text-2xl font-heading text-aeesb-green-dark">Organigramme</CardTitle>
            <CardDescription className="text-gray-600">Structure organisationnelle de l'AEESB.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {organigramme.map((bureau, index) => (
              <div key={index}>
                <h3 className="text-xl font-semibold text-aeesb-green-dark mb-3 border-b-2 border-aeesb-gold pb-1">{bureau.level}</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {bureau.members.map((member, memberIndex) => (
                    <li key={memberIndex}><strong>{member.name}</strong> - {member.role}</li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.section>


      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeIn}>
        <Card className="shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-aeesb-green-light p-6">
            <CardTitle className="text-2xl font-heading text-aeesb-green-dark">Documents Officiels</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <p className="text-gray-700">Consultez nos statuts et règlement intérieur pour mieux comprendre notre fonctionnement et nos engagements.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-aeesb-gold hover:bg-yellow-400 text-aeesb-green-dark font-semibold">
                <a href="/documents/statuts-aeesb.pdf" download>
                  <Download className="mr-2 h-5 w-5" /> Télécharger les Statuts (PDF)
                </a>
              </Button>
              <Button asChild variant="outline" className="border-aeesb-green-dark text-aeesb-green-dark hover:bg-aeesb-green-dark hover:text-white">
                <a href="/documents/reglement-interieur-aeesb.pdf" download>
                  <Download className="mr-2 h-5 w-5" /> Télécharger le Règlement Intérieur (PDF)
                </a>
              </Button>
            </div>
            <p className="text-xs text-gray-500">Note: Les fichiers PDF sont des exemples. Ils devront être téléversés par un administrateur.</p>
          </CardContent>
        </Card>
      </motion.section>
    </div>
  );
};

export default AboutPage;