import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Send, Users, User, Briefcase, Award, UserCheck } from 'lucide-react';
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

const ContactPage = () => {
  const { toast } = useToast();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add form submission logic here (e.g., send email or save to database)
    toast({
      title: "Message Envoyé!",
      description: "Merci de nous avoir contactés. Nous vous répondrons bientôt.",
    });
    event.target.reset();
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  const contacts = [
    { name: "M. Simaro Dembélé", role: "Secrétaire Général (Responsable AEESB)", phone: "+223 65 10 78 54", icon: <Briefcase className="h-5 w-5 text-aeesb-gold" /> },
    { name: "M. Abdoul Karim MAIGA", role: "Secrétaire Général Adjoint", phone: "+223 75 89 34 93", icon: <UserCheck className="h-5 w-5 text-aeesb-gold" /> },
    { name: "Fadouba Sidibé", role: "Président d'Honneur", phone: "N/A (Contact via SG)", icon: <Award className="h-5 w-5 text-aeesb-gold" /> },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: <FaFacebook size={28} />, url: 'https://www.facebook.com/share/19PhzuwBT2/', color: "text-blue-600 hover:text-blue-700" },
    { name: 'Instagram', icon: <FaInstagram size={28} />, url: 'https://www.instagram.com/aeesb2025', color: "text-pink-600 hover:text-pink-700" },
    { name: 'TikTok', icon: <FaTiktok size={28} />, url: 'https://vm.tiktok.com/ZMS2APUmb/', color: "text-black hover:text-gray-700" },
    { name: 'YouTube', icon: <FaYoutube size={28} />, url: '#', color: "text-red-600 hover:text-red-700" }, // Replace # with actual URL
    { name: 'WhatsApp', icon: <FaWhatsapp size={28} />, url: 'https://wa.me/22365107854', color: "text-green-500 hover:text-green-600" }, // Example WhatsApp link
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
              Contactez-Nous
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Nous sommes là pour répondre à vos questions et vous accompagner.
            </motion.p>
          </CardHeader>
        </Card>
      </motion.section>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeIn}>
          <Card className="shadow-lg rounded-lg overflow-hidden">
            <CardHeader className="bg-aeesb-green-light p-6">
              <CardTitle className="text-2xl font-heading text-aeesb-green-dark">Envoyez-nous un Message</CardTitle>
              <CardDescription className="text-gray-600">Remplissez le formulaire ci-dessous.</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="name" className="font-semibold text-aeesb-green-dark">Nom Complet</Label>
                    <Input id="name" placeholder="Votre nom et prénom" required />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email" className="font-semibold text-aeesb-green-dark">Adresse Email</Label>
                    <Input id="email" type="email" placeholder="votreadresse@email.com" required />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="subject" className="font-semibold text-aeesb-green-dark">Sujet</Label>
                  <Input id="subject" placeholder="Objet de votre message" required />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="message" className="font-semibold text-aeesb-green-dark">Message</Label>
                  <Textarea id="message" placeholder="Écrivez votre message ici..." rows={5} required />
                </div>
                <Button type="submit" size="lg" className="w-full bg-aeesb-gold hover:bg-yellow-400 text-aeesb-green-dark font-bold text-lg shadow-md">
                  <Send className="mr-2 h-5 w-5" /> Envoyer le Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.section>

        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeIn} className="space-y-8">
          <Card className="shadow-lg rounded-lg overflow-hidden">
            <CardHeader className="bg-aeesb-green-light p-6">
              <CardTitle className="text-2xl font-heading text-aeesb-green-dark">Nos Coordonnées</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {contacts.map(contact => (
                <div key={contact.name} className="flex items-start">
                  {React.cloneElement(contact.icon, { className: "h-6 w-6 text-aeesb-gold mr-3 mt-1 flex-shrink-0"})}
                  <div>
                    <p className="font-semibold text-aeesb-green-dark">{contact.name} <span className="text-sm text-gray-500">({contact.role})</span></p>
                    {contact.phone !== "N/A (Contact via SG)" && <a href={`tel:${contact.phone}`} className="text-gray-700 hover:text-aeesb-gold flex items-center"><Phone size={14} className="mr-1.5"/>{contact.phone}</a>}
                    {contact.phone === "N/A (Contact via SG)" && <p className="text-sm text-gray-600 italic">{contact.phone}</p>}
                  </div>
                </div>
              ))}
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-aeesb-gold mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-aeesb-green-dark">Email Général</p>
                  <a href="mailto:contact@aeesb.org" className="text-gray-700 hover:text-aeesb-gold">contact@aeesb.org</a>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-aeesb-gold mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-aeesb-green-dark">Siège Social</p>
                  <p className="text-gray-700">Magnambougou-Projet, Bamako, Mali</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg rounded-lg overflow-hidden">
            <CardHeader className="bg-aeesb-green-light p-6">
              <CardTitle className="text-2xl font-heading text-aeesb-green-dark">Suivez-Nous</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex justify-around items-center">
                {socialLinks.map(link => (
                  <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name} className={`transform transition-transform hover:scale-110 ${link.color}`}>
                    {link.icon}
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>

      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeIn}>
        <Card className="shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="bg-aeesb-green-light p-6">
            <CardTitle className="text-2xl font-heading text-aeesb-green-dark">Localisation du Siège</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=--8.000779151916506%2C12.60900185780829%2C-7.97900676727295%2C12.62200213974991&amp;layer=mapnik&amp;marker=12.61550201880297%2C-7.989892959594727"
                className="w-full h-96 border-0 rounded-b-lg"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Carte de localisation du siège de l'AEESB"
              ></iframe>
            </div>
          </CardContent>
        </Card>
      </motion.section>
    </div>
  );
};

export default ContactPage;