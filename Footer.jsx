import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Info, MessageSquare, Users, Mail, DollarSign, Phone, MapPin } from 'lucide-react';
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  const quickLinks = [
    { to: '/', text: 'Accueil', icon: <Home size={16} /> },
    { to: '/a-propos', text: 'À Propos', icon: <Info size={16} /> },
    { to: '/forum', text: 'Forum', icon: <MessageSquare size={16} /> },
    { to: '/adhesion', text: 'Adhésion', icon: <Users size={16} /> },
    { to: '/contact', text: 'Contact', icon: <Mail size={16} /> },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: <FaFacebook size={22} />, url: 'https://www.facebook.com/share/19PhzuwBT2/', color: "hover:text-blue-500" },
    { name: 'Instagram', icon: <FaInstagram size={22} />, url: 'https://www.instagram.com/aeesb2025', color: "hover:text-pink-500" },
    { name: 'TikTok', icon: <FaTiktok size={22} />, url: 'https://vm.tiktok.com/ZMS2APUmb/', color: "hover:text-black" },
    { name: 'YouTube', icon: <FaYoutube size={22} />, url: '#', color: "hover:text-red-500" }, // Replace #
    { name: 'WhatsApp', icon: <FaWhatsapp size={22} />, url: 'https://wa.me/22365107854', color: "hover:text-green-500" },
  ];

  return (
    <footer className="bg-aeesb-green-dark text-aeesb-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <img  src="/logo-aeesb.svg" alt="Logo AEESB" className="h-10 w-auto filter brightness-0 invert" />
              <span className="font-heading text-lg font-bold">AEESB</span>
            </Link>
            <p className="text-sm text-gray-300">Association des Élèves, Étudiants et Sympathisants du Bafing. Unir, Soutenir, Inspirer.</p>
          </div>

          <div>
            <p className="font-semibold text-lg mb-3 text-aeesb-gold">Liens Rapides</p>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-gray-300 hover:text-aeesb-gold transition-colors flex items-center text-sm">
                    {link.icon} <span className="ml-2">{link.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold text-lg mb-3 text-aeesb-gold">Contact Info</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center text-gray-300">
                <MapPin size={16} className="mr-2 flex-shrink-0" /> Magnambougou-Projet, Bamako, Mali
              </li>
              <li className="flex items-center text-gray-300">
                <Mail size={16} className="mr-2 flex-shrink-0" /> <a href="mailto:contact@aeesb.org" className="hover:text-aeesb-gold">contact@aeesb.org</a>
              </li>
              <li className="flex items-center text-gray-300">
                <Phone size={16} className="mr-2 flex-shrink-0" /> <a href="tel:+22365107854" className="hover:text-aeesb-gold">+223 65 10 78 54</a> (SG Dembélé)
              </li>
            </ul>
          </div>
          
          <div>
            <p className="font-semibold text-lg mb-3 text-aeesb-gold">Paiement Adhésion/Don</p>
             <div className="flex items-center space-x-3 bg-gray-700 p-3 rounded-md">
                <img  src="/orange-money-logo.png" alt="Orange Money" className="h-8 w-auto bg-white p-1 rounded" />
                <div>
                    <p className="text-sm font-medium">Orange Money</p>
                    <p className="text-xs text-gray-300">+223 65 10 78 54</p>
                </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">Utilisez ce numéro pour vos cotisations et dons.</p>
          </div>

        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} AEESB. Tous droits réservés.
            <Link to="/politique-confidentialite" className="ml-3 hover:text-aeesb-gold">Politique de Confidentialité</Link>
          </p>
          <div className="flex space-x-4">
            {socialLinks.map(link => (
              <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name} className={`text-gray-300 transition-colors ${link.color}`}>
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;