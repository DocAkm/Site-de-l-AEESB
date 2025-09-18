import { supabase } from '@/lib/supabaseClient';

const siteUrl = 'https://aeesb.com';

export const loginUser = async (email, password, toast) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast({ title: "Erreur de Connexion", description: error.message, variant: "destructive" });
      return { success: false, user: null, error: error };
    }
    // data contains user and session. The user object here is the auth.users record.
    // The profile (role, first_name etc.) will be fetched by AuthContext.
    return { success: true, user: data.user, session: data.session };
  } catch(e) {
     toast({ title: "Erreur de Connexion", description: "Une erreur inattendue est survenue.", variant: "destructive" });
     return { success: false, user: null, error: e };
  }
};

export const registerUser = async (userData, toast) => {
  try {
    const { email, password, identityPhotoFile, ...profileData } = userData;
    
    let identityPhotoUrl = null;
    if (identityPhotoFile) {
      const fileExt = identityPhotoFile.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `member_id_photos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('member_id_photos') // Bucket name from previous setup
        .upload(filePath, identityPhotoFile);

      if (uploadError) {
        toast({ title: "Erreur de téléversement Photo", description: uploadError.message, variant: "destructive" });
        return { success: false, error: uploadError };
      }
      const { data: urlData } = supabase.storage.from('member_id_photos').getPublicUrl(filePath);
      identityPhotoUrl = urlData.publicUrl;
    }

    const { data: signUpResponse, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${siteUrl}/connexion`, // Redirect after email confirmation
        data: { 
          first_name: profileData.firstName,
          last_name: profileData.lastName,
          phone: profileData.phone,
          academic_level: profileData.academicLevel,
          profession: profileData.profession,
          institution: profileData.institution,
          locality: profileData.locality,
          role: 'member', // Default role for new sign-ups
          membership_status: 'active', 
          identity_photo_url: identityPhotoUrl, // This will be in raw_user_meta_data
          // Supabase automatically creates a profile row if you have a trigger for it.
          // If not, ensure these fields match your 'profiles' table if you are creating it manually
          // or relying on `options.data` to also populate `profiles` (this is less direct).
        }
      }
    });

    if (signUpError) {
      toast({ title: "Erreur d'Inscription", description: signUpError.message, variant: "destructive" });
      return { success: false, error: signUpError };
    }

    // After successful signUp, if you need to create/update a 'profiles' table entry and don't have a trigger:
    if (signUpResponse.user) {
        const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          { 
            id: signUpResponse.user.id, // Link to auth.users
            email: signUpResponse.user.email,
            first_name: profileData.firstName,
            last_name: profileData.lastName,
            phone: profileData.phone,
            academic_level: profileData.academicLevel,
            profession: profileData.profession,
            institution: profileData.institution,
            locality: profileData.locality,
            role: 'member',
            membership_status: 'active', 
            identity_photo_url: identityPhotoUrl,
            updated_at: new Date().toISOString(),
          }
        ]);

        if (profileError) {
            // This is a critical error if profile creation fails.
            // User account in auth.users exists, but profile is missing.
            // May need to inform user or admin. For now, just log and toast.
            console.error("Error creating profile after sign up:", profileError);
            toast({ title: "Erreur de création de profil", description: profileError.message, variant: "destructive" });
            // Decide if this constitutes a full failure of registration
            // return { success: false, error: profileError }; 
        }
    }


    if (signUpResponse.user && signUpResponse.user.email_confirmed_at) {
       toast({ 
        title: "Inscription Réussie!", 
        description: "Votre compte a été créé et confirmé. Bienvenue !",
      });
    } else if (signUpResponse.user) { // User exists but email not confirmed
       toast({ 
        title: "Inscription Presque Terminée!", 
        description: "Veuillez vérifier votre boîte de réception pour confirmer votre adresse e-mail.",
      });
    }
    return { success: true, data: signUpResponse }; // data contains user and session if auto-confirmed
  } catch(e) {
    toast({ title: "Erreur d'Inscription", description: "Une erreur inattendue est survenue: " + e.message, variant: "destructive" });
    return { success: false, error: e };
  }
};

export const logoutUser = async (toast) => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({ title: "Erreur de Déconnexion", description: error.message, variant: "destructive" });
      return { success: false, error };
    }
    return { success: true };
  } catch(e) {
    toast({ title: "Erreur de Déconnexion", description: "Une erreur inattendue est survenue.", variant: "destructive" });
    return { success: false, error: e };
  }
};

export const updateUserProfile = async (user, updatedData, toast) => {
  if (!user) return { success: false, error: "Utilisateur non défini" };
  try {
    const { email: newEmail, ...profileUpdates } = updatedData; 
    
    // Ensure `updated_at` is set
    profileUpdates.updated_at = new Date().toISOString();
    
    // Prevent direct update of id or email through this profile update
    delete profileUpdates.id; 
    delete profileUpdates.email; // email is handled by auth.updateUser

    const { error: profileError } = await supabase
      .from('profiles')
      .update(profileUpdates)
      .eq('id', user.id);

    if (profileError) {
      toast({ title: "Erreur de Mise à Jour Profil", description: profileError.message, variant: "destructive" });
      return { success: false, error: profileError };
    }
    
    let emailUpdateStatus = { success: true };
    if (newEmail && newEmail !== user.email) {
      const { error: emailError } = await supabase.auth.updateUser({ email: newEmail });
      if (emailError) {
        emailUpdateStatus = { success: false, error: emailError };
        toast({ title: "Erreur de Mise à Jour Email", description: emailError.message, variant: "destructive" });
      } else {
        toast({ title: "Email Mis à Jour", description: "Veuillez confirmer votre nouvelle adresse email via le lien envoyé." });
      }
    }
    
    if (emailUpdateStatus.success) {
      toast({ title: "Profil Mis à Jour", description: "Vos informations ont été enregistrées." });
    }
    // If profile update succeeded but email update failed, it's a partial success.
    return { success: !profileError && emailUpdateStatus.success, profileError, emailError: emailUpdateStatus.error };

  } catch(e) {
     toast({ title: "Erreur de Mise à Jour", description: "Une erreur inattendue est survenue.", variant: "destructive" });
     return { success: false, error: e };
  }
};
  
export const sendPasswordResetEmailUser = async (email, toast) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${siteUrl}/mise-a-jour-mot-de-passe`,
    });
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
      return { success: false, error };
    }
    toast({ title: "Email Envoyé", description: "Si un compte existe pour cet email, un lien de réinitialisation a été envoyé." });
    return { success: true };
  } catch(e) {
    toast({ title: "Erreur", description: "Une erreur inattendue est survenue.", variant: "destructive" });
    return { success: false, error: e };
  }
};

export const updateUserPassword = async (newPassword, toast) => {
  try {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      toast({ title: "Erreur de mise à jour MDP", description: error.message, variant: "destructive" });
      return { success: false, error };
    }
    toast({ title: "Mot de passe mis à jour", description: "Votre mot de passe a été changé avec succès." });
    return { success: true };
  } catch(e) {
    toast({ title: "Erreur de mise à jour MDP", description: "Une erreur inattendue est survenue.", variant: "destructive" });
    return { success: false, error: e };
  }
};
