import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, PlusCircle, List, Edit2, Trash2, UploadCloud, CalendarPlus, BellPlus, Mic2, BookOpen, Building, Save, Zap } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import FileUpload from '@/components/FileUpload';
import { supabase } from '@/lib/supabaseClient';

// Component for rendering individual form fields
const FormField = ({ id, label, type, value, onChange, options = {} }) => {
  const { placeholder, rows, acceptedFileTypes, storagePath, multiple, onFileUploadCallback, currentFileUrl, fieldName, required } = options;

  if (type === 'file') {
    return (
      <div className="space-y-1">
        <Label htmlFor={id} className={required ? "after:content-['*'] after:ml-0.5 after:text-red-500" : ""}>{label}</Label>
        <FileUpload 
          onFileUpload={(file) => onFileUploadCallback(file, fieldName, multiple)} 
          acceptedFileTypes={acceptedFileTypes} 
          storagePath={storagePath}
          multiple={multiple}
        />
        {currentFileUrl && (
          Array.isArray(currentFileUrl) ? (
            currentFileUrl.map((url, idx) => typeof url === 'string' && <a key={idx} href={url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline block mt-1">Fichier actuel {idx+1}</a>)
          ) : (
            typeof currentFileUrl === 'string' && <a href={currentFileUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline block mt-1">Fichier actuel</a>
          )
        )}
        {currentFileUrl && Array.isArray(currentFileUrl) && currentFileUrl.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {currentFileUrl.map((url, idx) => (
              typeof url === 'string' && <img  key={idx} src={url} alt={`Aperçu ${idx+1}`} className="h-16 w-auto rounded object-cover"/>
            ))}
          </div>
        )}
        {currentFileUrl && !Array.isArray(currentFileUrl) && typeof currentFileUrl === 'string' && currentFileUrl.startsWith('http') && (
           <img  src={currentFileUrl} alt="Aperçu" className="mt-2 max-h-32 rounded object-cover"/>
        )}
      </div>
    );
  }
  if (type === 'textarea') {
    return (
      <div className="space-y-1">
        <Label htmlFor={id} className={required ? "after:content-['*'] after:ml-0.5 after:text-red-500" : ""}>{label}</Label>
        <Textarea id={id} value={value || ''} onChange={onChange} rows={rows || 3} placeholder={placeholder} required={required}/>
      </div>
    );
  }
  return (
    <div className="space-y-1">
      <Label htmlFor={id} className={required ? "after:content-['*'] after:ml-0.5 after:text-red-500" : ""}>{label}</Label>
      <Input id={id} type={type} value={value || ''} onChange={onChange} placeholder={placeholder} required={required}/>
    </div>
  );
};


const AdminContentPage = () => {
  const { toast } = useToast();
  
  const [data, setData] = useState({ announcements: [], events: [], blog_posts: [], cultural_entries: [], schools: [], realized_activities: [] });
  const [currentView, setCurrentView] = useState('list');
  const [editingItem, setEditingItem] = useState(null);
  const [activeTab, setActiveTab] = useState("announcements");

  const initialFormState = { 
    title: '', content: '', date: '', type: '', locality: '', 
    location: '', description:'', category:'', author:'', 
    image_url: '', video_url: '', document_url: '',
    school_name: '', creation_date: '', first_director_name: '', first_director_photo_url: '',
    current_director_name: '', current_director_photo_url: '', school_images_urls: [],
    // Realized Activities fields
    nature: '', photos_urls: [], videos_urls: [], report_url: '', participants_count: null, organizers: '', partners: ''
  };
  const [formState, setFormState] = useState(initialFormState);

  const fetchDataForTab = useCallback(async (tabName) => {
    const { data: items, error } = await supabase.from(tabName).select('*').order('created_at', { ascending: false });
    if (error) {
      toast({ title: `Erreur de chargement ${tabName}`, description: error.message, variant: "destructive" });
    } else {
      setData(prevData => ({ ...prevData, [tabName]: items }));
    }
  }, [toast]);

  useEffect(() => {
    fetchDataForTab(activeTab);
  }, [fetchDataForTab, activeTab]);

  const handleInputChange = (e) => {
    const { id, value, type: inputType } = e.target;
    setFormState(prev => ({ ...prev, [id]: inputType === 'number' ? (value === '' ? null : Number(value)) : value }));
  };
  
  const handleFileUploadCallback = (uploadedFile, fieldName, isMultiple = false) => {
    if (isMultiple) {
      setFormState(prev => ({ ...prev, [fieldName]: [...(prev[fieldName] || []), uploadedFile.url] }));
    } else {
      setFormState({ ...formState, [fieldName]: uploadedFile.url });
    }
    toast({ title: "Fichier Prêt", description: `${uploadedFile.name} est prêt à être sauvegardé avec l'entrée.` });
  };

  const getTableAndDataForTab = (tab) => {
    switch(tab) {
      case "announcements": return { tableName: 'announcements', dataToSave: { title: formState.title, content: formState.content, date: formState.date, type: formState.type, locality: formState.locality, document_url: formState.document_url }};
      case "events": return { tableName: 'events', dataToSave: { title: formState.title, description: formState.description, date: formState.date, location: formState.location, image_url: formState.image_url, video_url: formState.video_url }};
      case "blog_posts": return { tableName: 'blog_posts', dataToSave: { title: formState.title, content: formState.content, category: formState.category, author: formState.author, image_url: formState.image_url }};
      case "cultural_entries": return { tableName: 'cultural_entries', dataToSave: { title: formState.title, description: formState.description, image_url: formState.image_url }};
      case "schools": return { tableName: 'schools', dataToSave: { name: formState.school_name, creation_date: formState.creation_date, first_director_name: formState.first_director_name, first_director_photo_url: formState.first_director_photo_url, current_director_name: formState.current_director_name, current_director_photo_url: formState.current_director_photo_url, images_urls: formState.school_images_urls, description: formState.description }};
      case "realized_activities": return { tableName: 'realized_activities', dataToSave: { title: formState.title, nature: formState.nature, description: formState.description, date: formState.date, location: formState.location, photos_urls: formState.photos_urls, videos_urls: formState.videos_urls, report_url: formState.report_url, participants_count: formState.participants_count, organizers: formState.organizers, partners: formState.partners }};
      default: return { tableName: null, dataToSave: null };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { tableName, dataToSave } = getTableAndDataForTab(activeTab);
    if (!tableName || !dataToSave) {
      toast({ title: "Erreur", description: "Onglet ou données invalides.", variant: "destructive" });
      return;
    }

    let response;
    if (editingItem && editingItem.id) {
      response = await supabase.from(tableName).update(dataToSave).eq('id', editingItem.id).select();
    } else {
      response = await supabase.from(tableName).insert(dataToSave).select();
    }

    if (response.error) {
      toast({ title: "Erreur de Sauvegarde", description: response.error.message, variant: "destructive" });
    } else {
      toast({ title: "Contenu Sauvegardé", description: `${dataToSave.title || dataToSave.name} a été ${editingItem ? 'mis à jour' : 'ajouté'}.` });
      fetchDataForTab(tableName);
      setEditingItem(null);
      setFormState(initialFormState);
      setCurrentView('list');
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    const mappedItem = {
      ...initialFormState, ...item,
      school_name: item.name || '', school_images_urls: item.images_urls || [],
      photos_urls: item.photos_urls || [], videos_urls: item.videos_urls || [], 
      participants_count: item.participants_count === null || typeof item.participants_count === 'undefined' ? '' : item.participants_count,
    };
    setFormState(mappedItem);
    setCurrentView('form');
  };

  const handleDelete = async (itemId) => {
    if(window.confirm("Êtes-vous sûr de vouloir supprimer cet élément ?")) {
      const { tableName } = getTableAndDataForTab(activeTab);
      const { error } = await supabase.from(tableName).delete().eq('id', itemId);
      if (error) {
        toast({ title: "Erreur de Suppression", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Contenu Supprimé", variant: "default" });
        fetchDataForTab(tableName);
      }
    }
  };
  
  const renderList = (items, fieldsToShow) => (
    <div className="space-y-3">
      {items.map(item => (
        <Card key={item.id} className="flex flex-col sm:flex-row justify-between sm:items-center p-4 hover:shadow-md transition-shadow">
          <div className="flex-grow">
            <p className="font-semibold text-aeesb-green-dark">{item.title || item.name}</p>
            {fieldsToShow.map(field => (
              item[field.key] && <p key={field.key} className="text-xs text-gray-500">{field.label}: {item[field.key]}</p>
            ))}
             {item.image_url && <img  src={item.image_url} alt={item.title || item.name} className="h-10 w-auto rounded mt-1"/>}
             {item.photos_urls && item.photos_urls[0] && <img  src={item.photos_urls[0]} alt={item.title || item.name} className="h-10 w-auto rounded mt-1"/>}
          </div>
          <div className="space-x-2 mt-2 sm:mt-0 flex-shrink-0">
            <Button variant="ghost" size="sm" onClick={() => handleEdit(item)}><Edit2 className="h-4 w-4 text-blue-600" /></Button>
            <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)}><Trash2 className="h-4 w-4 text-red-600" /></Button>
          </div>
        </Card>
      ))}
       {items.length === 0 && <p className="text-gray-500 text-center py-4">Aucun élément à afficher.</p>}
    </div>
  );

  const getFormFieldsForTab = () => {
    const commonFileTypes = {'image/*': ['.jpeg', '.jpg', '.png', '.gif']};
    const docFileTypes = {'application/pdf': ['.pdf'], 'application/msword': ['.doc'], 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']};
    const videoFileTypes = {'video/*': ['.mp4', '.mov', '.avi']};


    switch(activeTab) {
      case "announcements": return [
        { id: "title", label: "Titre", type: "text", value: formState.title, required: true },
        { id: "content", label: "Contenu", type: "textarea", value: formState.content, rows: 5, required: true },
        { id: "date", label: "Date", type: "date", value: formState.date, required: true },
        { id: "type", label: "Type (Réunion, Activité...)", type: "text", value: formState.type },
        { id: "locality", label: "Localité (Central, Kayes...)", type: "text", value: formState.locality },
        { id: "document_url", label: "Document (PDF, Word)", type: "file", fieldName: "document_url", currentFileUrl: formState.document_url, acceptedFileTypes: docFileTypes, storagePath: `documents/announcements/` }
      ];
      case "events": return [
        { id: "title", label: "Titre de l'événement", type: "text", value: formState.title, required: true },
        { id: "description", label: "Description", type: "textarea", value: formState.description, rows: 4, required: true },
        { id: "date", label: "Date", type: "date", value: formState.date, required: true },
        { id: "location", label: "Lieu", type: "text", value: formState.location },
        { id: "image_url", label: "Affiche/Image", type: "file", fieldName: "image_url", currentFileUrl: formState.image_url, acceptedFileTypes: commonFileTypes, storagePath: `images/events/` },
        { id: "video_url", label: "Lien Vidéo (YouTube...)", type: "url", value: formState.video_url, placeholder: "https://youtube.com/watch?v=..." }
      ];
      case "blog_posts": return [
        { id: "title", label: "Titre de l'article", type: "text", value: formState.title, required: true },
        { id: "content", label: "Contenu (Markdown)", type: "textarea", value: formState.content, rows: 10, required: true },
        { id: "category", label: "Catégorie", type: "text", value: formState.category },
        { id: "author", label: "Auteur", type: "text", value: formState.author },
        { id: "image_url", label: "Image de couverture", type: "file", fieldName: "image_url", currentFileUrl: formState.image_url, acceptedFileTypes: commonFileTypes, storagePath: `images/blog/` }
      ];
      case "cultural_entries": return [
        { id: "title", label: "Titre de l'élément culturel", type: "text", value: formState.title, required: true },
        { id: "description", label: "Description", type: "textarea", value: formState.description, rows: 5, required: true },
        { id: "image_url", label: "Image représentative", type: "file", fieldName: "image_url", currentFileUrl: formState.image_url, acceptedFileTypes: commonFileTypes, storagePath: `images/culture/` }
      ];
      case "schools": return [
        { id: "school_name", label: "Nom de l'école", type: "text", value: formState.school_name, required: true },
        { id: "description", label: "Description de l'école", type: "textarea", value: formState.description, rows: 3 },
        { id: "creation_date", label: "Date de création", type: "text", value: formState.creation_date, placeholder: "Ex: 1998" },
        { id: "first_director_name", label: "Nom du 1er directeur", type: "text", value: formState.first_director_name },
        { id: "first_director_photo_url", label: "Photo du 1er directeur", type: "file", fieldName: "first_director_photo_url", currentFileUrl: formState.first_director_photo_url, acceptedFileTypes: commonFileTypes, storagePath: `images/schools/directors/` },
        { id: "current_director_name", label: "Nom du dir. actuel", type: "text", value: formState.current_director_name },
        { id: "current_director_photo_url", label: "Photo du dir. actuel", type: "file", fieldName: "current_director_photo_url", currentFileUrl: formState.current_director_photo_url, acceptedFileTypes: commonFileTypes, storagePath: `images/schools/directors/` },
        { id: "school_images_urls", label: "Images de l'école (multiples)", type: "file", fieldName: "school_images_urls", currentFileUrl: formState.school_images_urls, acceptedFileTypes: commonFileTypes, storagePath: `images/schools/gallery/`, multiple: true }
      ];
      case "realized_activities": return [
        { id: "title", label: "Titre de l'activité", type: "text", value: formState.title, required: true },
        { id: "nature", label: "Nature (Conférence, Atelier...)", type: "text", value: formState.nature },
        { id: "description", label: "Description détaillée", type: "textarea", value: formState.description, rows: 5, required: true },
        { id: "date", label: "Date de réalisation", type: "date", value: formState.date, required: true },
        { id: "location", label: "Lieu", type: "text", value: formState.location },
        { id: "photos_urls", label: "Photos (multiples)", type: "file", fieldName: "photos_urls", currentFileUrl: formState.photos_urls, acceptedFileTypes: commonFileTypes, storagePath: `images/realized_activities/photos/`, multiple: true },
        { id: "videos_urls", label: "Vidéos (liens ou fichiers)", type: "file", fieldName: "videos_urls", currentFileUrl: formState.videos_urls, acceptedFileTypes: videoFileTypes, storagePath: `videos/realized_activities/`, multiple: true, placeholder: "Ou URL directe de vidéo (Youtube, Vimeo...)" },
        { id: "report_url", label: "Rapport d'activité (PDF)", type: "file", fieldName: "report_url", currentFileUrl: formState.report_url, acceptedFileTypes: docFileTypes, storagePath: `documents/realized_activities/reports/` },
        { id: "participants_count", label: "Nombre de participants", type: "number", value: formState.participants_count },
        { id: "organizers", label: "Organisateurs", type: "text", value: formState.organizers, placeholder: "AEESB, Bureau Local X..." },
        { id: "partners", label: "Partenaires", type: "text", value: formState.partners, placeholder: "UNICEF, Mairie..." },
      ];
      default: return [];
    }
  };

  const tabConfig = {
    announcements: { icon: BellPlus, label: "Annonces", fields: [{key: 'date', label: 'Date'}, {key: 'type', label: 'Type'}] },
    events: { icon: CalendarPlus, label: "Événements", fields: [{key: 'date', label: 'Date'}, {key: 'location', label: 'Lieu'}] },
    realized_activities: { icon: Zap, label: "Activités Réal.", fields: [{key: 'date', label: 'Date'}, {key: 'nature', label: 'Nature'}] },
    blog_posts: { icon: Mic2, label: "Blog", fields: [{key: 'category', label: 'Catégorie'}, {key: 'author', label: 'Auteur'}] },
    cultural_entries: { icon: BookOpen, label: "Culture", fields: [{key: 'description', label: 'Desc.'}] },
    schools: { icon: Building, label: "Écoles", fields: [{key: 'creation_date', label: 'Création'}, {key: 'current_director_name', label: 'Dir.'}] },
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-heading text-aeesb-green-dark flex items-center">
            <FileText size={28} className="mr-3 text-aeesb-gold"/> Publication de Contenu
          </CardTitle>
          <CardDescription>Gérer les annonces, événements, activités réalisées, articles de blog, éléments culturels et écoles du site.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={value => { setActiveTab(value); setCurrentView('list'); setEditingItem(null); setFormState(initialFormState); }} className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1 mb-4">
              {Object.entries(tabConfig).map(([key, { icon: Icon, label }]) => (
                <TabsTrigger key={key} value={key} className="text-xs px-2 py-1.5 sm:text-sm sm:px-3 sm:py-2"><Icon className="mr-1 h-4 w-4"/>{label}</TabsTrigger>
              ))}
            </TabsList>

            <div className="flex justify-end mb-4">
              {currentView === 'list' ? (
                <Button onClick={() => { setEditingItem(null); setFormState(initialFormState); setCurrentView('form');}} className="bg-aeesb-green-dark hover:bg-green-800">
                  <PlusCircle className="mr-2 h-5 w-5" /> Ajouter
                </Button>
              ) : (
                <Button onClick={() => { setCurrentView('list'); setEditingItem(null); setFormState(initialFormState); }} variant="outline">
                  <List className="mr-2 h-5 w-5" /> Voir la Liste
                </Button>
              )}
            </div>

            {currentView === 'form' ? (
              <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md bg-gray-50/50">
                <h3 className="text-lg font-semibold text-aeesb-green-dark">{editingItem ? 'Modifier' : 'Ajouter'} : {tabConfig[activeTab]?.label || 'élément'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {getFormFieldsForTab().map(field => <FormField key={field.id} {...field} onChange={handleInputChange} onFileUploadCallback={handleFileUploadCallback}/>)}
                </div>
                <Button type="submit" className="bg-aeesb-gold hover:bg-yellow-400 text-aeesb-green-dark">
                  <Save size={18} className="mr-2"/> {editingItem ? 'Mettre à jour' : 'Publier'}
                </Button>
              </form>
            ) : (
              Object.entries(tabConfig).map(([key, { fields }]) => (
                <TabsContent key={key} value={key}>
                  {renderList(data[key] || [], fields)}
                </TabsContent>
              ))
            )}
          </Tabs>
        </CardContent>
      </Card>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="font-heading text-xl text-aeesb-green-dark flex items-center">
            <UploadCloud size={24} className="mr-2 text-aeesb-gold" /> Gestionnaire de Médias (Global)
          </CardTitle>
          <CardDescription>Utilisez ce module pour téléverser des fichiers qui pourront être liés manuellement si besoin. Les téléversements spécifiques à un contenu (annonce, événement, etc.) se font directement dans le formulaire de cet élément.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
           <FileUpload 
             onFileUpload={(file) => {
               console.log("Global file uploaded (simulated, copy URL manually):", file);
               toast({title: "Fichier téléversé (global)", description: `URL (simulée): ${file.url}. Copiez cette URL si besoin.`});
             }} 
             multiple 
             storagePath="global_media/"
           />
          <p className="text-xs text-gray-500">Ce module de téléversement est une simulation pour les fichiers globaux. L'intégration complète avec Supabase Storage pour le stockage, le listage et la suppression des fichiers est nécessaire pour une fonctionnalité complète.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminContentPage;