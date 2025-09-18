import { supabase } from '@/lib/supabaseClient';

export const fetchUserProfileCallback = async (authUser, toast) => {
  if (!authUser || !authUser.id) {
    console.warn("fetchUserProfileCallback: authUser is null or missing ID.", authUser);
    return null;
  }

  try {
    const { data: profile, error, status } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authUser.id)
      .single();

    if (error) {
      if (status === 404 || error.code === 'PGRST116') { 
        console.warn(`fetchUserProfileCallback: No profile found for user ID: ${authUser.id}. This might be a new user.`);
        return { 
          id: authUser.id,
          email: authUser.email, 
          role: 'member', // Default role
          first_name: '', 
          last_name: '',
          // Initialize other expected profile fields to prevent undefined errors in UI
          phone: '',
          academic_level: '',
          profession: '',
          institution: '',
          locality: '',
          avatar_url: '',
          bio: '',
          identity_photo_url: '',
          membership_status: 'pending_profile', // A status to indicate profile needs completion
        };
      } else {
        console.error('fetchUserProfileCallback: Error fetching profile:', { message: error.message, status, code: error.code });
        if (toast) {
          toast({ 
            title: "Erreur de Profil", 
            description: `Impossible de charger le profil (${error.code}): ${error.message}`, 
            variant: "destructive" 
          });
        }
        return null; 
      }
    }
    
    if (profile) {
      const userProfile = { 
        ...authUser, // Includes id, email, and other specific auth fields from Supabase like `created_at`
        ...profile,  // Includes custom fields from your 'profiles' table
        email: authUser.email || profile.email, // Ensure authUser.email is primary
        id: authUser.id, // Ensure authUser.id is primary
        role: profile.role || 'member' // Default role if not explicitly set
      };
      return userProfile;
    } else {
      // This case should ideally be covered by status 404 / PGRST116, but acts as a fallback.
      console.warn(`fetchUserProfileCallback: Profile data was unexpectedly null for user ID: ${authUser.id}, though no explicit error or 404 status was thrown.`);
      return { 
          id: authUser.id,
          email: authUser.email, 
          role: 'member', 
          first_name: '', 
          last_name: '',
          phone: '',
          academic_level: '',
          profession: '',
          institution: '',
          locality: '',
          avatar_url: '',
          bio: '',
          identity_photo_url: '',
          membership_status: 'pending_profile_fallback',
      };
    }

  } catch (e) {
    console.error('fetchUserProfileCallback: Exception during profile fetch:', e.message);
    if (toast) {
      toast({ 
        title: "Erreur Critique de Profil", 
        description: "Une exception s'est produite lors du chargement du profil.", 
        variant: "destructive" 
      });
    }
    // Return a minimal structure or null to signify failure.
    // Returning null might be better to indicate a true error state.
    return null; 
  }
};