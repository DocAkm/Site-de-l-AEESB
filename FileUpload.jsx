import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileText, XCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';

const FileUpload = ({ onFileUpload, acceptedFileTypes, maxFileSizeMB = 5, multiple = false, storagePath = 'uploads/' }) => {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const { toast } = useToast();

  const onDrop = useCallback(acceptedFiles => {
    const validFiles = acceptedFiles.filter(file => {
      if (file.size > maxFileSizeMB * 1024 * 1024) {
        toast({
          title: "Fichier trop volumineux",
          description: `Le fichier ${file.name} dépasse la taille maximale de ${maxFileSizeMB}MB.`,
          variant: "destructive",
        });
        return false;
      }
      return true;
    });

    if (multiple) {
      setFiles(prevFiles => [...prevFiles, ...validFiles.map(file => Object.assign(file, { preview: URL.createObjectURL(file), status: 'pending' }))]);
    } else {
      setFiles(validFiles.map(file => Object.assign(file, { preview: URL.createObjectURL(file), status: 'pending' })));
    }
  }, [maxFileSizeMB, multiple, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes ? acceptedFileTypes : undefined,
    multiple,
  });

  const handleRemoveFile = (fileName) => {
    setFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
    setUploadProgress(prev => {
      const newState = { ...prev };
      delete newState[fileName];
      return newState;
    });
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      toast({ title: "Aucun fichier sélectionné", description: "Veuillez sélectionner ou déposer des fichiers à téléverser.", variant: "warning" });
      return;
    }

    for (const currentFile of files) {
      if (currentFile.status === 'uploaded') continue;

      setUploadProgress(prev => ({ ...prev, [currentFile.name]: 0 }));
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (progress <= 100) {
          setUploadProgress(prev => ({ ...prev, [currentFile.name]: progress }));
        } else {
          clearInterval(interval);
          setFiles(prev => prev.map(f => f.name === currentFile.name ? { ...f, status: 'uploaded', publicUrl: `simulated/public/url/${storagePath}${currentFile.name}` } : f));
          if (onFileUpload) {
            onFileUpload({ name: currentFile.name, url: `simulated/public/url/${storagePath}${currentFile.name}`, type: currentFile.type, size: currentFile.size });
          }
          toast({ title: "Téléversement Réussi", description: `${currentFile.name} a été téléversé.` });
        }
      }, 200);
    }
  };

  const renderFileIcon = (fileToRender) => {
    if (fileToRender.type.startsWith('image/')) return <img  src={fileToRender.preview} alt={fileToRender.name} className="h-10 w-10 object-cover rounded" />;
    return <FileText className="h-10 w-10 text-gray-500" />;
  };


  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors
          ${isDragActive ? 'border-aeesb-gold bg-aeesb-gold/10' : 'border-gray-300 hover:border-aeesb-green-dark'}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center text-center">
          <UploadCloud className={`h-12 w-12 mb-3 ${isDragActive ? 'text-aeesb-gold' : 'text-gray-400'}`} />
          {isDragActive ? (
            <p className="text-aeesb-gold font-semibold">Déposez les fichiers ici...</p>
          ) : (
            <>
              <p className="text-gray-700 font-medium">Glissez-déposez {multiple ? "des fichiers" : "un fichier"} ici, ou cliquez pour sélectionner.</p>
              <p className="text-xs text-gray-500 mt-1">
                {acceptedFileTypes ? `Types acceptés: ${Object.values(acceptedFileTypes).flat().join(', ')}. ` : ''}
                Taille max: {maxFileSizeMB}MB {multiple ? "par fichier" : ""}.
              </p>
            </>
          )}
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-800">Fichiers sélectionnés :</h4>
          {files.map(currentFile => (
            <div key={currentFile.name} className="p-3 border rounded-md flex items-center justify-between bg-white shadow-sm">
              <div className="flex items-center space-x-3">
                {renderFileIcon(currentFile)}
                <div>
                  <p className="text-sm font-medium text-gray-800 truncate max-w-xs">{currentFile.name}</p>
                  <p className="text-xs text-gray-500">{(currentFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {currentFile.status === 'uploaded' ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : currentFile.status === 'uploading' || uploadProgress[currentFile.name] > 0 ? (
                  <div className="w-20">
                     {typeof Progress !== 'undefined' && <Progress value={uploadProgress[currentFile.name] || 0} className="h-2" />}
                  </div>
                ) : (
                  <Button variant="ghost" size="sm" onClick={() => handleRemoveFile(currentFile.name)} aria-label="Supprimer le fichier">
                    <XCircle className="h-5 w-5 text-red-500 hover:text-red-700" />
                  </Button>
                )}
              </div>
            </div>
          ))}
          <Button onClick={handleUpload} disabled={files.every(f => f.status === 'uploaded')} className="bg-aeesb-green-dark hover:bg-green-800">
            Téléverser {files.filter(f => f.status !== 'uploaded').length} fichier(s)
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;