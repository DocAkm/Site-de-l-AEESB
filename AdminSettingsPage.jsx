import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Settings, Save, Palette, Bell, Shield, Users, Info, Upload } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AdminSettingsPage = () => {
  const { toast } = useToast();
  // Mock settings data - in a real app, this would come from a config file or database
  const [settings, setSettings] = useState({
    siteName: "AEESB – Association des Élèves, Étudiants et Sympathisants du Bafing",
    presidentName: "Mr Simaro Dembélé",
    sgName: "Mr Abdoul Karim MAIGA",
    contactEmail: "contact@aeesb.org",
    logoUrl: "/logo-aeesb.svg",
    maintenanceMode: false,
    allowNewRegistrations: true,
    defaultMembershipFee: 5000, // FCFA
    forumModeration: "pre_approval", // none, pre_approval, post_moderation
    emailNotifications: {
      newMember: true,
      newEvent: true,
      newAnnouncement: true,
    },
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setSettings(prev => ({ ...prev, [name]: checked }));
    } else {
      setSettings(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleNestedInputChange = (category, name, value, type, checked) => {
     if (type === 'checkbox') {
      setSettings(prev => ({
        ...prev,
        [category]: {
          ...prev[category],
          [name]: checked,
        },
      }));
    } else {
       setSettings(prev => ({
        ...prev,
        [category]: {
          ...prev[category],
          [name]: value,
        },
      }));
    }
  };

  const handleLogoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Simulate logo upload - in real app, upload to server and get URL
      const newLogoUrl = URL.createObjectURL(file);
      setSettings(prev => ({ ...prev, logoUrl: newLogoUrl }));
      toast({ title: "Logo Mis à Jour", description: "Le nouveau logo a été chargé (simulation)." });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate saving settings to backend/config
    console.log("Settings saved:", settings);
    toast({ title: "Paramètres Enregistrés", description: "Les modifications ont été sauvegardées avec succès." });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-heading text-aeesb-green-dark flex items-center">
              <Settings size={28} className="mr-3 text-aeesb-gold" /> Paramètres Généraux du Site
            </CardTitle>
            <CardDescription>Configurer les options globales de la plateforme AEESB.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">

            <section>
              <h3 className="text-lg font-semibold text-aeesb-green-dark mb-3 flex items-center"><Info className="mr-2 text-aeesb-gold"/>Informations Générales</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><Label htmlFor="siteName">Nom du Site</Label><Input id="siteName" name="siteName" value={settings.siteName} onChange={handleInputChange} /></div>
                <div><Label htmlFor="contactEmail">Email de Contact Principal</Label><Input id="contactEmail" name="contactEmail" type="email" value={settings.contactEmail} onChange={handleInputChange} /></div>
                <div><Label htmlFor="presidentName">Nom du Président</Label><Input id="presidentName" name="presidentName" value={settings.presidentName} onChange={handleInputChange} /></div>
                <div><Label htmlFor="sgName">Nom du Secrétaire Général</Label><Input id="sgName" name="sgName" value={settings.sgName} onChange={handleInputChange} /></div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-aeesb-green-dark mb-3 flex items-center"><Palette className="mr-2 text-aeesb-gold"/>Apparence</h3>
               <div className="space-y-2">
                <Label htmlFor="logoUpload">Logo du Site</Label>
                <div className="flex items-center gap-4">
                  <img  src={settings.logoUrl} alt="Logo actuel" className="h-16 w-auto bg-gray-200 p-1 rounded" />
                  <Input id="logoUpload" type="file" accept="image/svg+xml, image/png, image/jpeg" onChange={handleLogoUpload} className="max-w-xs"/>
                </div>
                <p className="text-xs text-gray-500">Format recommandé : SVG. Max 2MB.</p>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-aeesb-green-dark mb-3 flex items-center"><Users className="mr-2 text-aeesb-gold"/>Adhésions et Utilisateurs</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox id="allowNewRegistrations" name="allowNewRegistrations" checked={settings.allowNewRegistrations} onCheckedChange={(checked) => handleInputChange({ target: { name: 'allowNewRegistrations', checked, type: 'checkbox' }})} />
                  <Label htmlFor="allowNewRegistrations">Autoriser les nouvelles inscriptions</Label>
                </div>
                <div>
                  <Label htmlFor="defaultMembershipFee">Frais d'adhésion par défaut (FCFA)</Label>
                  <Input id="defaultMembershipFee" name="defaultMembershipFee" type="number" value={settings.defaultMembershipFee} onChange={handleInputChange} />
                </div>
              </div>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold text-aeesb-green-dark mb-3 flex items-center"><Bell className="mr-2 text-aeesb-gold"/>Notifications par Email</h3>
               <div className="space-y-2">
                <div className="flex items-center space-x-2"><Checkbox id="emailNewMember" name="newMember" checked={settings.emailNotifications.newMember} onCheckedChange={(checked) => handleNestedInputChange('emailNotifications', 'newMember', checked, 'checkbox')} /><Label htmlFor="emailNewMember">Notifier admin pour chaque nouveau membre</Label></div>
                <div className="flex items-center space-x-2"><Checkbox id="emailNewEvent" name="newEvent" checked={settings.emailNotifications.newEvent} onCheckedChange={(checked) => handleNestedInputChange('emailNotifications', 'newEvent', checked, 'checkbox')} /><Label htmlFor="emailNewEvent">Notifier membres pour nouveaux événements (selon préférences utilisateur)</Label></div>
                <div className="flex items-center space-x-2"><Checkbox id="emailNewAnnouncement" name="newAnnouncement" checked={settings.emailNotifications.newAnnouncement} onCheckedChange={(checked) => handleNestedInputChange('emailNotifications', 'newAnnouncement', checked, 'checkbox')} /><Label htmlFor="emailNewAnnouncement">Notifier membres pour nouvelles annonces importantes</Label></div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-aeesb-green-dark mb-3 flex items-center"><Shield className="mr-2 text-aeesb-gold"/>Sécurité et Maintenance</h3>
              <div className="flex items-center space-x-2">
                <Checkbox id="maintenanceMode" name="maintenanceMode" checked={settings.maintenanceMode} onCheckedChange={(checked) => handleInputChange({ target: { name: 'maintenanceMode', checked, type: 'checkbox' }})} />
                <Label htmlFor="maintenanceMode">Activer le mode maintenance (le site sera inaccessible aux non-admins)</Label>
              </div>
              <div className="mt-4">
                <Label htmlFor="forumModeration">Modération du Forum</Label>
                <select id="forumModeration" name="forumModeration" value={settings.forumModeration} onChange={handleInputChange} className="block w-full md:w-1/2 mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-aeesb-gold focus:border-aeesb-gold">
                  <option value="none">Aucune modération (non recommandé)</option>
                  <option value="pre_approval">Approbation préalable des messages</option>
                  <option value="post_moderation">Modération après publication</option>
                </select>
              </div>
            </section>

            <div className="flex justify-end pt-6 border-t">
              <Button type="submit" className="bg-aeesb-green-dark hover:bg-green-800">
                <Save className="mr-2 h-5 w-5" /> Enregistrer les Paramètres
              </Button>
            </div>
             <p className="text-xs text-gray-500 text-center">Certains changements peuvent nécessiter un rechargement du site pour prendre effet.</p>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default AdminSettingsPage;