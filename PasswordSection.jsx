import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock } from 'lucide-react';

const PasswordSection = ({ newPassword, setNewPassword, confirmNewPassword, setConfirmNewPassword, isSubmitting }) => {
  return (
    <div className="space-y-4 pt-6 border-t border-gray-200">
      <h3 className="text-lg font-semibold text-aeesb-green-dark flex items-center">
        <Lock size={20} className="mr-2 text-aeesb-gold" /> Changer de Mot de Passe (Optionnel)
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <Label htmlFor="newPassword">Nouveau Mot de Passe</Label>
          <Input 
            id="newPassword" 
            type="password" 
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)} 
            placeholder="Laissez vide pour ne pas changer" 
            disabled={isSubmitting} 
            autoComplete="new-password"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="confirmNewPassword">Confirmer Nouveau Mot de Passe</Label>
          <Input 
            id="confirmNewPassword" 
            type="password" 
            value={confirmNewPassword} 
            onChange={(e) => setConfirmNewPassword(e.target.value)} 
            placeholder="Confirmez le nouveau mot de passe" 
            disabled={isSubmitting}
            autoComplete="new-password"
          />
        </div>
      </div>
      <p className="text-xs text-gray-500">Le mot de passe doit contenir lettres et chiffres, minimum 8 caractères.</p>
    </div>
  );
};

export default PasswordSection;