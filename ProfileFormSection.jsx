import React from 'react';
import { CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Mail, Phone, Image as ImageIcon, BookUser, Briefcase, School, MapPin } from 'lucide-react';

const ProfileFormFields = ({ isEditing, formData, handleInputChange, isUploadingAvatar }) => {
  const profileFieldsConfig = [
    { id: "first_name", label: "Prénom", icon: <User size={18} />, type: "text" },
    { id: "last_name", label: "Nom", icon: <User size={18} />, type: "text" },
    { id: "email", label: "Email", icon: <Mail size={18} />, type: "email", disabled: true },
    { id: "phone", label: "Téléphone", icon: <Phone size={18} />, type: "tel" },
    { id: "academic_level", label: "Niveau Scolaire", icon: <BookUser size={18} />, type: "text" },
    { id: "profession", label: "Profession", icon: <Briefcase size={18} />, type: "text" },
    { id: "institution", label: "Établissement", icon: <School size={18} />, type: "text" },
    { id: "locality", label: "Localité", icon: <MapPin size={18} />, type: "text" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {profileFieldsConfig.map(field => (
        <div key={field.id} className="space-y-1">
          <Label htmlFor={field.id} className="font-semibold text-aeesb-green-dark flex items-center">
            {React.cloneElement(field.icon, {className: "mr-2 text-aeesb-gold"})} {field.label}
          </Label>
          <Input 
            id={field.id} 
            type={field.type} 
            value={formData[field.id] || ''} 
            onChange={handleInputChange} 
            disabled={!isEditing || field.disabled || isUploadingAvatar}
            className="disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>
      ))}
    </div>
  );
};

const AvatarUploadSection = ({ formData, isEditing, handleAvatarFileChange, isUploadingAvatar, userEmail }) => (
  <div className="items-center flex flex-col sm:flex-row sm:space-x-6">
    <div className="relative mb-4 sm:mb-0">
      <Avatar className="w-32 h-32 border-4 border-aeesb-gold">
        <AvatarImage src={formData.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.first_name || 'U')}+${encodeURIComponent(formData.last_name || 'N')}&background=random&color=fff`} alt={formData.first_name || userEmail} />
        <AvatarFallback className="text-4xl bg-aeesb-green-light text-aeesb-gold">
          {(formData.first_name?.[0] || '') + (formData.last_name?.[0] || '') || (userEmail?.[0].toUpperCase() || 'U')}
        </AvatarFallback>
      </Avatar>
      {isEditing && (
        <Label htmlFor="avatarUpload" className="absolute bottom-0 right-0 bg-aeesb-gold text-aeesb-green-dark p-2 rounded-full cursor-pointer hover:bg-yellow-400 transition-colors">
          <ImageIcon size={18} />
          <Input id="avatarUpload" type="file" accept="image/*" onChange={handleAvatarFileChange} className="hidden" disabled={isUploadingAvatar}/>
        </Label>
      )}
    </div>
    <div>
      <CardTitle className="text-2xl font-heading text-aeesb-green-dark mt-4 sm:mt-0 text-center sm:text-left">{formData.first_name} {formData.last_name}</CardTitle>
      <CardDescription className="text-gray-600 text-center sm:text-left">{formData.email}</CardDescription>
    </div>
  </div>
);

const BioSection = ({ isEditing, formData, handleInputChange, isUploadingAvatar }) => (
  <div>
    <Label htmlFor="bio" className="font-semibold text-aeesb-green-dark flex items-center">
      <User size={18} className="mr-2 text-aeesb-gold" /> Biographie / Présentation
    </Label>
    <Textarea 
      id="bio" 
      value={formData.bio || ''} 
      onChange={handleInputChange} 
      placeholder="Parlez un peu de vous..." 
      rows={4}
      disabled={!isEditing || isUploadingAvatar}
      className="disabled:bg-gray-100 disabled:cursor-not-allowed"
    />
  </div>
);

const ProfileFormSection = ({ user, isEditing, formData, handleInputChange, handleAvatarFileChange, isUploadingAvatar }) => {
  return (
    <CardContent className="space-y-6">
      <AvatarUploadSection 
        formData={formData}
        isEditing={isEditing}
        handleAvatarFileChange={handleAvatarFileChange}
        isUploadingAvatar={isUploadingAvatar}
        userEmail={user?.email} 
      />
      <ProfileFormFields
        isEditing={isEditing}
        formData={formData}
        handleInputChange={handleInputChange}
        isUploadingAvatar={isUploadingAvatar}
      />
      <BioSection
        isEditing={isEditing}
        formData={formData}
        handleInputChange={handleInputChange}
        isUploadingAvatar={isUploadingAvatar}
      />
    </CardContent>
  );
};

export default ProfileFormSection;