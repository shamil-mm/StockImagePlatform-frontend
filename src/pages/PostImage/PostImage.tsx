import React, { useState } from 'react';
import { Upload, X, CheckCircle, Image } from 'lucide-react';
import { uploadImage } from '@/services/imageService';
import {ImageData}from "../../types/image"
import { useAppSelector } from '@/app/hooks';
import { useNavigate } from 'react-router-dom';


const PostImagePage: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate=useNavigate()


  const handleDrag = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files).filter(
      (file: File) => file.type.startsWith('image/')
    );
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]): void => {
    const newImages: ImageData[] = files.map((file: File) => ({
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).substr(2, 9),
      title: ''
    }));
    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (id: string): void => {
    setImages(prev => {
      const updated = prev.filter(img => img.id !== id);
      const removed = prev.find(img => img.id === id);
      if (removed) URL.revokeObjectURL(removed.preview);
      return updated;
    });
  };

  const updateImageTitle = (id: string, title: string): void => {
    setImages(prev => prev.map(img => 
      img.id === id ? { ...img, title } : img
    ));
  };

  const handleSubmit = async():Promise<void> => {
    const allTitlesFilled = images.every(img => img.title.trim() !== '');
     if (!images.length || !allTitlesFilled) return;
    if (images.length > 0 && allTitlesFilled) {
      setIsLoading(true);
      setSubmitted(false);
      const formData = new FormData();
      images.forEach((img, index) => {
      formData.append('files', img.file); 
      formData.append('titles', img.title);
      });

      try {
        const response=await uploadImage(formData)
        if(response?.data.message=="Uploaded successfully"){
          setSubmitted(true);
          setImages([]);
          navigate("/home")
        }
      } catch (error) {
        console.error('Upload failed', error);
      }finally{
        setIsLoading(false)
      }
    }
  };

  const allTitlesFilled = images.every(img => img.title.trim() !== '');
  const canSubmit = images.length > 0 && allTitlesFilled;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2 text-black">Post Images</h1>
        <p className="text-gray-500 mb-10">Upload images with individual titles</p>

        <div className="space-y-8">
          {/* Upload Area */}
          <div>
            <label className="block text-sm font-semibold text-black mb-2">
              Upload Images
            </label>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed transition-all ${
                dragActive 
                  ? 'border-black bg-gray-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input
                type="file"
                id="file-upload"
                multiple
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center py-16 cursor-pointer"
              >
                <Upload className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-sm font-medium text-black mb-1">
                  Drop images here or click to upload
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF - Multiple files supported
                </p>
              </label>
            </div>
          </div>

        
          {images.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Image className="w-4 h-4" />
              <span>{images.length} {images.length === 1 ? 'image' : 'images'} uploaded</span>
              {!allTitlesFilled && (
                <span className="text-red-600 ml-2">• All images need titles</span>
              )}
            </div>
          )}


          {images.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-black">Images & Titles</h2>
              <div className="space-y-4">
                {images.map((image: ImageData, index: number) => (
                  <div
                    key={image.id}
                    className="border-2 border-gray-200 p-4 hover:border-gray-300 transition-colors"
                  >
                    <div className="flex gap-4">
                      {/* Image Preview */}
                      <div className="relative shrink-0 w-32 h-32 border-2 border-gray-200 overflow-hidden">
                        <img
                          src={image.preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Title Input & Actions */}
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <label className="text-sm font-semibold text-black">
                            Image {index + 1} Title
                          </label>
                          <button
                            onClick={() => removeImage(image.id)}
                            className="text-gray-400 hover:text-black transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                        <input
                          type="text"
                          value={image.title}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                            updateImageTitle(image.id, e.target.value)
                          }
                          placeholder="Enter image title..."
                          className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black focus:outline-none transition-colors"
                        />
                        <p className="text-xs text-gray-500 mt-2">
                          {image.file.name}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {images.length > 0 && (
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleSubmit}
                disabled={!canSubmit || isLoading}
                className={`px-8 py-3 font-semibold transition-all flex items-center justify-center gap-2 ${
                  !canSubmit || isLoading
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                {isLoading ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Uploading...
                      </>
                    ) : submitted ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Posted Successfully!
                      </>
                    ) : (
                      `Post ${images.length} ${images.length === 1 ? 'Image' : 'Images'}`
                    )}
              </button>
              
              <button
                onClick={() => setImages([])}
                className="px-8 py-3 font-semibold border-2 border-black text-black hover:bg-black hover:text-white transition-all"
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostImagePage;