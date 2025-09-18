import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash2, CheckCircle, XCircle, Clock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const UserTable = ({ users, selectedUsers, setSelectedUsers, onStatusChange, onRoleChange, onDeleteUser }) => {

  const toggleUserSelection = (userId) => {
    setSelectedUsers(prev =>
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedUsers.length === users.length && users.length > 0) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map(user => user.id));
    }
  };

  const getStatusIcon = (status) => {
    if (status === 'active') return <CheckCircle className="h-5 w-5 text-green-500" />;
    if (status === 'pending_payment' || status === 'pending') return <Clock className="h-5 w-5 text-yellow-500" />;
    if (status === 'expired') return <XCircle className="h-5 w-5 text-red-500" />;
    return <Clock className="h-5 w-5 text-gray-500" />;
  };
  
  const statusOptions = [
    { value: 'active', label: 'Actif' },
    { value: 'pending_payment', label: 'Paiement en attente' },
    { value: 'expired', label: 'Expiré' },
    { value: 'suspended', label: 'Suspendu' },
  ];

  const roleOptions = [
    { value: 'member', label: 'Membre' },
    { value: 'admin', label: 'Admin' },
  ];

  return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="w-[50px] px-4">
              <Checkbox
                checked={selectedUsers.length === users.length && users.length > 0}
                onCheckedChange={toggleSelectAll}
                aria-label="Tout sélectionner"
              />
            </TableHead>
            <TableHead>Nom</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-center">Rôle</TableHead>
            <TableHead className="text-center">Statut</TableHead>
            <TableHead>Date d'adhésion</TableHead>
            <TableHead>Localité</TableHead>
            <TableHead>Niveau Scolaire</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length > 0 ? users.map((user) => (
            <TableRow key={user.id} data-state={selectedUsers.includes(user.id) ? 'selected' : ''}>
              <TableCell className="px-4">
                <Checkbox
                  checked={selectedUsers.includes(user.id)}
                  onCheckedChange={() => toggleUserSelection(user.id)}
                  aria-label={`Sélectionner ${user.name}`}
                />
              </TableCell>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="text-center">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.role === 'admin' ? 'bg-aeesb-gold text-aeesb-green-dark' : 'bg-green-100 text-green-700'}`}>
                  {user.role === 'admin' ? <Shield className="inline mr-1 h-3 w-3"/> : null}
                  {roleOptions.find(r => r.value === user.role)?.label || user.role}
                </span>
              </TableCell>
              <TableCell className="text-center flex items-center justify-center">
                {getStatusIcon(user.status)}
                <span className="ml-2">{statusOptions.find(s => s.value === user.status)?.label || user.status}</span>
              </TableCell>
              <TableCell>{user.joinedDate}</TableCell>
              <TableCell>{user.locality}</TableCell>
              <TableCell>{user.academicLevel}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Ouvrir menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => alert(`Voir profil ${user.name}`)}>
                      <Edit className="mr-2 h-4 w-4" /> Voir/Modifier Profil
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Changer Statut</DropdownMenuLabel>
                    {statusOptions.map(opt => (
                       <DropdownMenuItem key={opt.value} onClick={() => onStatusChange(user.id, opt.value)} disabled={user.status === opt.value}>
                          {opt.label}
                       </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                     <DropdownMenuLabel>Changer Rôle</DropdownMenuLabel>
                    {roleOptions.map(opt => (
                       <DropdownMenuItem key={opt.value} onClick={() => onRoleChange(user.id, opt.value)} disabled={user.role === opt.value}>
                          {opt.label}
                       </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onDeleteUser(user.id)} className="text-red-600 hover:text-red-600 hover:bg-red-50">
                      <Trash2 className="mr-2 h-4 w-4" /> Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          )) : (
            <TableRow>
              <TableCell colSpan={9} className="h-24 text-center">
                Aucun utilisateur trouvé.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;