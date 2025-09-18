import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserPlus, Mail, Lock, User, Eye, EyeOff, Phone, BookUser, Briefcase, School, MapPin, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import FileUpload from '@/components/FileUpload'; // Import FileUpload

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    academicLevel: '',
    profession: '',
    institution: '',
    locality: '',
    password: '',
    confirmPassword: '',
  });
  const [identityPhotoFile, setIdentityPhotoFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFileUploaded = (fileInfo) => {
    // Assuming FileUpload directly gives us the File object after selection (or simulated upload)
    // If FileUpload uploads to Supabase itself, this logic would be different.
    // For now, let's assume FileUpload just provides the selected file.
    if (fileInfo && fileInfo.file) {
        setIdentityPhotoFile(fileInfo.file);
         toast({ title: "Photo d'identité sélectionnée", description: fileInfo.file.name });
    } else if (typeof fileInfo === 'string' && fileInfo.startsWith('simulated/public/url')) {
        // This case is if FileUpload component's onFileUpload returns a URL directly (after its own upload simulation)
        // We still need the raw file for actual Supabase upload in `register` service
        // This part might need adjustment based on how FileUpload is implemented.
        // For now, we will assume FileUpload in this context is used more as a "file picker".
        // So, we will rely on a separate state `identityPhotoFile` which should be set by a simpler file input for now.
        // Or, adjust FileUpload to give the raw file object to parent.
        console.warn("FileUpload returned a URL, but raw file is needed for registration. Ensure FileUpload is configured to provide the File object or handle upload internally.");
    }
  };

  const handleDirectFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setIdentityPhotoFile(e.target.files[0]);
      toast({ title: "Photo d'identité sélectionnée", description: e.target.files[0].name });
    }
  };


  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!identityPhotoFile) {
      toast({
        title: "Photo d'identité requise",
        description: "Veuillez téléverser une photo d'identité.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (!validatePassword(formData.password)) {
      toast({
        title: "Mot de passe invalide",
        description: "Le mot de passe doit contenir au moins 8 caractères alphanumériques.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erreur de mot de passe",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    const registrationData = {
      ...formData,
      identityPhotoFile, // Pass the file object to the register function
      role: 'member', 
    };
    
    const result = await register(registrationData);
    setIsLoading(false);

    if (result && result.success) {
      navigate('/connexion');
    }
  };

  const formFields = [
    { id: "firstName", label: "Prénom", type: "text", icon: <User className="mr-2 h-4 w-4 text-aeesb-gold" />, placeholder: "Votre prénom" },
    { id: "lastName", label: "Nom", type: "text", icon: <User className="mr-2 h-4 w-4 text-aeesb-gold" />, placeholder: "Votre nom" },
    { id: "email", label: "Adresse Email", type: "email", icon: <Mail className="mr-2 h-4 w-4 text-aeesb-gold" />, placeholder: "votreadresse@email.com" },
    { id: "phone", label: "Téléphone", type: "tel", icon: <Phone className="mr-2 h-4 w-4 text-aeesb-gold" />, placeholder: "+223 XX XX XX XX" },
    { id: "academicLevel", label: "Niveau Scolaire", type: "text", icon: <BookUser className="mr-2 h-4 w-4 text-aeesb-gold" />, placeholder: "Ex: Licence 2" },
    { id: "profession", label: "Profession", type: "text", icon: <Briefcase className="mr-2 h-4 w-4 text-aeesb-gold" />, placeholder: "Étudiant, Enseignant..." },
    { id: "institution", label: "Établissement", type: "text", icon: <School className="mr-2 h-4 w-4 text-aeesb-gold" />, placeholder: "Nom de votre école/université" },
    { id: "locality", label: "Localité", type: "text", icon: <MapPin className="mr-2 h-4 w-4 text-aeesb-gold" />, placeholder: "Votre ville/commune" },
  ];

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] py-12 px-6 bg-gradient-to-br from-aeesb-green-light via-green-50 to-yellow-50">
      <Card className="w-full max-w-2xl shadow-2xl bg-white">
        <CardHeader className="text-center">
          <div className="mx-auto bg-aeesb-green-dark text-aeesb-gold p-3 rounded-full w-fit mb-4">
            <UserPlus size={32} />
          </div>
          <CardTitle className="text-3xl font-heading text-aeesb-green-dark">Devenir Membre AEESB</CardTitle>
          <CardDescription className="text-gray-600">Créez votre compte et rejoignez-nous. C'est gratuit !</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formFields.map(field => (
                 <div key={field.id} className="space-y-1">
                  <Label htmlFor={field.id} className="font-semibold text-aeesb-green-dark flex items-center">
                    {field.icon} {field.label} <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input 
                    id={field.id} 
                    type={field.type} 
                    placeholder={field.placeholder} 
                    required 
                    value={formData[field.id]}
                    onChange={handleChange}
                    className="text-gray-800 placeholder-gray-500 focus:border-aeesb-gold"
                  />
                </div>
              ))}
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="identityPhoto" className="font-semibold text-aeesb-green-dark flex items-center">
                <ImageIcon className="mr-2 h-4 w-4 text-aeesb-gold" /> Photo d'Identité <span className="text-red-500 ml-1">*</span>
              </Label>
              {/* Using a simple file input for now, can be replaced by styled FileUpload */}
              <Input 
                id="identityPhoto" 
                type="file" 
                accept="image/png, image/jpeg, image/jpg" 
                required 
                onChange={handleDirectFileChange}
                className="text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-aeesb-gold file:text-aeesb-green-dark hover:file:bg-yellow-400"
              />
              {identityPhotoFile && <p className="text-xs text-green-600 mt-1">Fichier sélectionné: {identityPhotoFile.name}</p>}
              <p className="text-xs text-gray-500">Sera utilisée pour votre carte de membre.</p>
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="password" className="font-semibold text-aeesb-green-dark flex items-center">
                <Lock className="mr-2 h-4 w-4 text-aeesb-gold" /> Mot de Passe <span className="text-red-500 ml-1">*</span>
              </Label>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Minimum 8 caractères alphanumériques" 
                  required 
                  value={formData.password}
                  onChange={handleChange}
                  className="text-gray-800 placeholder-gray-500 focus:border-aeesb-gold pr-10"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-aeesb-gold">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="text-xs text-gray-500">Doit contenir lettres et chiffres, minimum 8 caractères.</p>
            </div>

            <div className="space-y-1">
              <Label htmlFor="confirmPassword" className="font-semibold text-aeesb-green-dark flex items-center">
                <Lock className="mr-2 h-4 w-4 text-aeesb-gold" /> Confirmer le Mot de Passe <span className="text-red-500 ml-1">*</span>
              </Label>
              <div className="relative">
                <Input 
                  id="confirmPassword" 
                  type={showConfirmPassword ? "text" : "password"} 
                  placeholder="Retapez votre mot de passe" 
                  required 
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="text-gray-800 placeholder-gray-500 focus:border-aeesb-gold pr-10"
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-aeesb-gold">
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <p className="text-xs text-gray-500 pt-2">
              En cliquant sur "Créer mon compte et Adhérer", vous acceptez nos <Link to="/politique-confidentialite" className="text-aeesb-gold hover:underline">Conditions d'Utilisation</Link> et notre <Link to="/politique-confidentialite" className="text-aeesb-gold hover:underline">Politique de Confidentialité</Link>.
            </p>

            <Button type="submit" size="lg" className="w-full bg-aeesb-green-dark hover:bg-green-800 text-white font-bold text-lg shadow-md" disabled={isLoading}>
              {isLoading ? 'Création en cours...' : 'Créer mon Compte et Adhérer'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-3 pt-6">
          <p className="text-sm text-gray-600">
            Déjà inscrit ?{' '}
            <Link to="/connexion" className="font-medium text-aeesb-green-dark hover:text-aeesb-gold hover:underline">
              Connectez-vous ici
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage;
