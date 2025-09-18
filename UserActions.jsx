import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

const UserActions = ({ selectedUsers, onDeleteSelected }) => {
  if (selectedUsers.length === 0) {
    return null;
  }

  return (
    <div className="mb-4 p-3 bg-aeesb-green-light rounded-md flex items-center justify-between">
      <span className="text-sm text-aeesb-green-dark font-medium">{selectedUsers.length} utilisateur(s) sélectionné(s)</span>
      <Button variant="destructive" size="sm" onClick={onDeleteSelected}>
        <Trash2 className="mr-2 h-4 w-4" /> Supprimer la sélection
      </Button>
    </div>
  );
};

export default UserActions;