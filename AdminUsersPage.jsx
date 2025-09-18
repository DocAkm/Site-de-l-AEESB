import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserPlus, Search, AlertTriangle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import UserTable from '@/components/admin/UserTable';
import UserActions from '@/components/admin/UserActions';
import { supabase } from '@/lib/supabaseClient';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";


const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [userToDelete, setUserToDelete] = useState(null);
  const [usersToDelete, setUsersToDelete] = useState([]);


  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, email, role, membership_status, created_at, locality, academic_level');

      if (error) {
        throw error;
      }
      
      const formattedUsers = profiles.map(u => ({
        id: u.id,
        name: `${u.first_name || ''} ${u.last_name || 'N/A'}`,
        email: u.email || 'Email non défini', 
        role: u.role || 'member',
        status: u.membership_status || 'pending',
        joinedDate: u.created_at ? new Date(u.created_at).toLocaleDateString('fr-FR') : 'N/A',
        locality: u.locality || 'N/A',
        academicLevel: u.academic_level || 'N/A',
      }));
      setUsers(formattedUsers);
    } catch (error) {
      toast({
        title: "Erreur de chargement",
        description: "Impossible de charger la liste des utilisateurs. " + error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  
  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm) ||
    user.email.toLowerCase().includes(searchTerm) ||
    user.role.toLowerCase().includes(searchTerm) ||
    user.status.toLowerCase().includes(searchTerm)
  );

  const handleStatusChange = async (userId, newStatus) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ membership_status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', userId);
      if (error) throw error;
      await fetchUsers(); // Refresh list
      toast({ title: "Statut Mis à Jour", description: `Le statut de l'utilisateur a été changé en ${newStatus}.` });
    } catch (error) {
      toast({ title: "Erreur de mise à jour", description: "Impossible de changer le statut. " + error.message, variant: "destructive" });
    }
  };
  
  const handleRoleChange = async (userId, newRole) => {
     try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole, updated_at: new Date().toISOString() })
        .eq('id', userId);
      if (error) throw error;
      await fetchUsers(); // Refresh list
      toast({ title: "Rôle Mis à Jour", description: `Le rôle de l'utilisateur a été changé en ${newRole}.` });
    } catch (error) {
      toast({ title: "Erreur de mise à jour", description: "Impossible de changer le rôle. " + error.message, variant: "destructive" });
    }
  };

  const confirmDeleteUser = (userId) => {
    const user = users.find(u => u.id === userId);
    setUserToDelete(user);
  };
  
  const confirmDeleteSelectedUsers = () => {
    setUsersToDelete(selectedUsers.map(id => users.find(u => u.id === id)).filter(Boolean));
  };


  const executeDeleteUser = async () => {
    if (!userToDelete) return;
    setIsLoading(true);
    try {
      // Note: Deleting from 'profiles' doesn't delete the auth.users entry automatically
      // A more robust solution would use a Supabase Edge Function with service_role key
      // to delete both profile and auth user, or handle this server-side.
      // For client-side, we can only delete the profile entry.
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userToDelete.id);
      if (error) throw error;
      
      // To actually delete the user from auth.users, this needs admin privileges (service_role key)
      // const { error: authError } = await supabase.auth.admin.deleteUser(userToDelete.id);
      // if (authError) { /* Handle partial deletion or inform admin */ }
      
      toast({ title: "Utilisateur (Profil) Supprimé", description: `Le profil de ${userToDelete.name} a été supprimé. La suppression du compte d'authentification nécessite des privilèges élevés.`, variant: "default" });
      await fetchUsers();
      setSelectedUsers(prev => prev.filter(id => id !== userToDelete.id));
    } catch (error) {
      toast({ title: "Erreur de Suppression", description: error.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
      setUserToDelete(null);
    }
  };

  const executeDeleteSelectedUsers = async () => {
    if (usersToDelete.length === 0) return;
    setIsLoading(true);
    try {
      const idsToDelete = usersToDelete.map(u => u.id);
      const { error } = await supabase
        .from('profiles')
        .delete()
        .in('id', idsToDelete);
      if (error) throw error;

      // Similar to single delete, deleting auth.users entries requires service_role.
      toast({ title: "Utilisateurs (Profils) Supprimés", description: `${usersToDelete.length} profils ont été supprimés. La suppression des comptes d'authentification nécessite des privilèges élevés.`, variant: "default" });
      await fetchUsers();
      setSelectedUsers([]);
    } catch (error) {
      toast({ title: "Erreur de Suppression Multiple", description: error.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
      setUsersToDelete([]);
    }
  };


  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-heading text-aeesb-green-dark">Gestion des Membres</CardTitle>
          <CardDescription>Rechercher, filtrer et gérer les utilisateurs de la plateforme.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Rechercher par nom, email, rôle, statut..."
                className="pl-10 w-full"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <Button className="bg-aeesb-green-dark hover:bg-green-800" onClick={() => toast({title: "Action non disponible", description: "L'ajout manuel d'utilisateur sera bientôt disponible."})}>
              <UserPlus className="mr-2 h-5 w-5" /> Ajouter un Membre (Simulé)
            </Button>
          </div>

          <UserActions
            selectedUsers={selectedUsers}
            onDeleteSelected={confirmDeleteSelectedUsers}
          />
          
          {isLoading && <p>Chargement des utilisateurs...</p>}

          {!isLoading && (
            <UserTable
              users={filteredUsers}
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
              onStatusChange={handleStatusChange}
              onRoleChange={handleRoleChange}
              onDeleteUser={confirmDeleteUser}
            />
          )}
        </CardContent>
      </Card>

      <Dialog open={!!userToDelete} onOpenChange={() => setUserToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center"><AlertTriangle className="mr-2 text-red-500"/>Confirmer la Suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer le profil de {userToDelete?.name}? Cette action supprimera les données de profil. La suppression complète du compte d'authentification nécessite une intervention manuelle avec des droits d'administration élevés sur Supabase.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Annuler</Button>
            </DialogClose>
            <Button variant="destructive" onClick={executeDeleteUser} disabled={isLoading}>
              {isLoading ? "Suppression..." : "Supprimer le Profil"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={usersToDelete.length > 0} onOpenChange={() => setUsersToDelete([])}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center"><AlertTriangle className="mr-2 text-red-500"/>Confirmer la Suppression Multiple</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer les profils de {usersToDelete.length} utilisateur(s) sélectionné(s)? Cette action supprimera leurs données de profil. La suppression complète des comptes d'authentification nécessite une intervention manuelle.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Annuler</Button>
            </DialogClose>
            <Button variant="destructive" onClick={executeDeleteSelectedUsers} disabled={isLoading}>
              {isLoading ? "Suppression..." : `Supprimer ${usersToDelete.length} Profil(s)`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default AdminUsersPage;