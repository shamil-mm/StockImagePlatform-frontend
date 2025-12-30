import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle, UploadCloud } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { getImagesById, updateImages } from '@/services/imageService';

interface EditImageData {
  publicId: string;
  url: string;
  title: string;
  order: number;
}

const EditImage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [image, setImage] = useState<EditImageData | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate=useNavigate()


  useEffect(() => {
    const fetchImage = async () => {
      try {
        if (!id) return;
        const res = await getImagesById(id);
        setImage(res.image);
      } catch (error) {
        console.error('Failed to fetch image', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [id]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);



  const handleTitleChange = (title: string) => {
    if (!image) return;
    setImage({ ...image, title });
  };

  const handleFile = (file: File) => {
    if (!image) return;
    setSelectedFile(file);
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFile(e.target.files[0]);
    }
  };



  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!image || image.title.trim() === '') return;

    try {
      setSubmitting(true);
    
      const formData = new FormData();
      formData.append('title', image.title);
      formData.append('publicId', image.publicId);


       if(selectedFile){
        console.log('selected file appended')
        formData.append('image', selectedFile);
       }
       
      const updated=await updateImages(formData);
      console.log('res from handle submit',updated)
      if (updated.image)setImage(updated.image);
        setPreviewUrl(null);
        setSelectedFile(null);
        navigate('/home')

    } catch (error) {
      console.error('Title update failed', error);
    } finally {
      setSubmitting(false);
    }
  };


  if (loading) return <div className="p-10 text-center">Loading image...</div>;
  if (!image) return <div className="p-10 text-center">Image not found</div>;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12">

        <h1 className="text-4xl font-bold mb-2">Edit Image</h1>
        <p className="text-gray-500 mb-10">Update title or replace image</p>

        <div className="border-2 border-gray-200 p-6 space-y-6">

          {/* DRAG & DROP ZONE */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative w-full max-w-md h-64 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer transition
              ${isDragging ? 'border-black bg-gray-100' : 'border-gray-300'}
            `}
          >
            <img
              src={previewUrl ?? image.url}
              alt={image.title}
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
            />

            <div className="relative z-10 bg-white/80 px-4 py-2 rounded flex items-center gap-2 text-sm font-semibold">
              <UploadCloud className="w-4 h-4" />
              Drag & drop or click to replace
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileInputChange}
            />
          </div>

          {/* TITLE */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Image Title
            </label>
            <input
              type="text"
              value={image.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black outline-none"
            />
          </div>

          {/* ACTIONS */}
          <button
            onClick={handleSubmit}
            disabled={submitting || image.title.trim() === ''}
            className={`px-8 py-3 font-semibold flex items-center gap-2 ${
              submitting || image.title.trim() === ''
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            <CheckCircle className="w-5 h-5" />
            Save Changes
          </button>

        </div>
      </div>
    </div>
  );
};

export default EditImage;
