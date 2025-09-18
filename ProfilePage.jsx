import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Edit3, Save } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';
import MemberCard from '@/components/MemberCard';
import ProfileFormSection from '@/components/profile/ProfileFormSection';
import PasswordSection from '@/components/profile/PasswordSection';

const ProfilePage = () => {
  const { user, updateUser, updatePassword: authUpdatePassword } = useAuth();
  const { toast } = useToast();
  
  const initialFormData = useCallback(() => ({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
    avatar_url: user?.avatar_url || '',
    academic_level: user?.academic_level || '',
    profession: user?.profession || '',
    institution: user?.institution || '',
    locality: user?.locality || '',
    identity_photo_url: user?.identity_photo_url || '',
  }), [user]);

  const [formData, setFormData] = useState(initialFormData());
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData(initialFormData());
    }
  }, [user, initialFormData]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleAvatarFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar_url: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const uploadAvatar = async () => {
    if (!avatarFile || !user) return formData.avatar_url;
    setIsUploadingAvatar(true);
    const fileExt = avatarFile.name.split('.').pop();
    const fileName = `profiles/${user.id}/avatar-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars') 
      .upload(fileName, avatarFile, { upsert: true });

    setIsUploadingAvatar(false);
    if (uploadError) {
      toast({ title: "Erreur de téléversement Avatar", description: uploadError.message, variant: "destructive" });
      return null;
    }

    const { data: publicUrlData } = supabase.storage.from('avatars').getPublicUrl(fileName);
    return publicUrlData.publicUrl;
  };

  const validatePassword = (password) => {
    if (!password) return true; 
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (!user) {
      toast({ title: "Erreur", description: "Aucun utilisateur connecté.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);

    let newAvatarUrl = formData.avatar_url;
    if (avatarFile) {
      newAvatarUrl = await uploadAvatar();
      if (newAvatarUrl === null) {
        setIsSubmitting(false);
        return;
      }
    }
    
    const profileUpdates = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      phone: formData.phone,
      bio: formData.bio,
      avatar_url: newAvatarUrl,
      academic_level: formData.academic_level,
      profession: formData.profession,
      institution: formData.institution,
      locality: formData.locality,
      // identity_photo_url is usually set at registration and not editable here
    };
    
    const profileUpdateResult = await updateUser(profileUpdates);
    
    if (profileUpdateResult?.success) {
       setAvatarFile(null); 
    } else {
      setIsSubmitting(false);
      setIsEditing(true); // Keep editing mode if profile update failed
      return; 
    }

    if (newPassword) {
      if (!validatePassword(newPassword)) {
        toast({ title: "Mot de passe invalide", description: "Le nouveau mot de passe doit faire au moins 8 caractères alphanumériques.", variant: "destructive" });
        setIsSubmitting(false);
        setIsEditing(true);
        return;
      }
      if (newPassword !== confirmNewPassword) {
        toast({ title: "Erreur", description: "Les nouveaux mots de passe ne correspondent pas.", variant: "destructive" });
        setIsSubmitting(false);
        setIsEditing(true);
        return;
      }
      
      const passwordUpdateResult = await authUpdatePassword(newPassword);
      if (passwordUpdateResult?.success) {
        setNewPassword('');
        setConfirmNewPassword('');
      } else {
        setIsSubmitting(false);
        setIsEditing(true); // Keep editing mode if password update failed
        return; 
      }
    }
    setIsEditing(false); // Exit editing mode only if all updates were successful
    setIsSubmitting(false);
  };
  
  if (!user) return <div className="flex justify-center items-center h-screen"><p className="text-xl">Chargement du profil...</p></div>;

  return (
    <div className="space-y-8 p-4 md:p-8">
       <div className="p-6 bg-gradient-to-r from-aeesb-green-dark to-green-700 text-white rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-3xl font-heading font-bold flex items-center mb-4 sm:mb-0">
          <User size={32} className="mr-3" /> Mon Profil
        </h1>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} variant="outline" className="border-white text-white hover:bg-white hover:text-aeesb-green-dark">
            <Edit3 size={18} className="mr-2" /> Modifier le Profil
          </Button>
        ) : (
           <div className="flex space-x-2">
            <Button type="button" variant="outline" onClick={() => { setIsEditing(false); setAvatarFile(null); setFormData(initialFormData()); setNewPassword(''); setConfirmNewPassword(''); }} className="border-white text-white hover:bg-gray-200 hover:text-aeesb-green-dark" disabled={isSubmitting}>
              Annuler
            </Button>
             <Button onClick={handleProfileUpdate} className="bg-aeesb-gold hover:bg-yellow-400 text-aeesb-green-dark" disabled={isSubmitting || isUploadingAvatar}>
              {isSubmitting || isUploadingAvatar ? <><Save size={18} className="mr-2 animate-spin" />Sauvegarde...</> : <><Save size={18} className="mr-2" /> Enregistrer</>}
            </Button>
           </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={handleProfileUpdate} className="lg:col-span-2 space-y-6">
          <Card className="shadow-xl">
            <ProfileFormSection 
              user={user} // Pass the user object
              isEditing={isEditing}
              formData={formData}
              handleInputChange={handleInputChange}
              handleAvatarFileChange={handleAvatarFileChange}
              isUploadingAvatar={isUploadingAvatar}
            />
            {isEditing && (
              <CardContent>
                <PasswordSection 
                  isEditing={isEditing} // This prop might be redundant as the component is only rendered when isEditing is true
                  newPassword={newPassword}
                  setNewPassword={setNewPassword}
                  confirmNewPassword={confirmNewPassword}
                  setConfirmNewPassword={setConfirmNewPassword}
                  isSubmitting={isSubmitting}
                />
              </CardContent>
            )}
          </Card>
        </form>
        <div className="lg:col-span-1 space-y-6">
          <MemberCard user={user} /> {/* Use user from auth context for MemberCard to reflect real-time data */}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;