import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ShieldCheck, UserCircle, Calendar, Mail, Phone, MapPin } from 'lucide-react';

const MemberCard = ({ user }) => {
  if (!user) {
    return (
      <Card className="shadow-lg animate-pulse">
        <CardHeader className="bg-gradient-to-br from-aeesb-green-dark to-green-700 p-4 rounded-t-lg">
          <div className="h-8 bg-slate-700 rounded w-3/4"></div>
          <div className="h-4 bg-slate-700 rounded w-1/2 mt-1"></div>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center space-x-3">
            <div className="rounded-full bg-slate-700 h-16 w-16"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-700 rounded w-3/4"></div>
              <div className="h-4 bg-slate-700 rounded w-1/2"></div>
            </div>
          </div>
          <div className="h-4 bg-slate-700 rounded w-full"></div>
          <div className="h-4 bg-slate-700 rounded w-5/6"></div>
        </CardContent>
      </Card>
    );
  }

  const fallbackName = `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}` || 'AE';
  const registrationDate = user.created_at ? new Date(user.created_at).toLocaleDateString('fr-FR') : 'N/A';
  const memberSinceText = user.created_at ? `Membre depuis le ${registrationDate}` : "Membre";
  const aeesbLogoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/21448308-0160-4b8b-8699-bb57b08aef3b/91ea98d32157f4895708d6cb7333f80b.jpg";


  return (
    <Card className="shadow-xl overflow-hidden bg-white border-2 border-aeesb-gold rounded-lg">
      <CardHeader className="p-0 relative">
        <div className="bg-gradient-to-br from-aeesb-green-dark to-green-600 p-6 text-white rounded-t-lg">
          <div className="flex justify-between items-center">
            <img  src={aeesbLogoUrl} alt="Logo AEESB" className="h-10 w-auto rounded-full opacity-80" />
            <ShieldCheck size={36} className="text-aeesb-gold opacity-90" />
          </div>
          <h2 className="text-2xl font-heading font-bold mt-3">Carte de Membre</h2>
          <p className="text-sm opacity-80">Association des Élèves et Étudiants du Bafing</p>
        </div>
         <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-20 h-20">
             <Avatar className="w-full h-full border-4 border-white shadow-lg">
                <AvatarImage src={user.identity_photo_url || user.avatar_url || `https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}&background=aeesb-gold&color=aeesb-green-dark`} alt={`${user.first_name} ${user.last_name}`} />
                <AvatarFallback className="bg-aeesb-gold text-aeesb-green-dark text-2xl">{fallbackName}</AvatarFallback>
            </Avatar>
         </div>
      </CardHeader>
      <CardContent className="pt-16 p-6 text-center"> {/* Added pt-16 for spacing due to absolute positioned avatar */}
        <CardTitle className="text-xl font-bold text-aeesb-green-dark">{user.first_name} {user.last_name}</CardTitle>
        <CardDescription className="text-sm text-gray-600">{user.profession || 'Profession non spécifiée'}</CardDescription>
        
        <div className="mt-6 space-y-3 text-left text-sm text-gray-700">
          <div className="flex items-center">
            <Mail size={16} className="mr-3 text-aeesb-gold" />
            <span>{user.email}</span>
          </div>
          {user.phone && (
            <div className="flex items-center">
              <Phone size={16} className="mr-3 text-aeesb-gold" />
              <span>{user.phone}</span>
            </div>
          )}
          {user.locality && (
            <div className="flex items-center">
              <MapPin size={16} className="mr-3 text-aeesb-gold" />
              <span>{user.locality}</span>
            </div>
          )}
          <div className="flex items-center">
            <Calendar size={16} className="mr-3 text-aeesb-gold" />
            <span>{memberSinceText}</span>
          </div>
          <div className="flex items-center">
            <UserCircle size={16} className="mr-3 text-aeesb-gold" />
            <span className="capitalize">Rôle: {user.role || 'Membre'}</span>
          </div>
        </div>
      </CardContent>
      <div className="bg-gray-50 px-6 py-3 text-xs text-gray-500 text-center border-t">
        Valide tant que le membre respecte les statuts de l'AEESB.
      </div>
    </Card>
  );
};

export default MemberCard;
