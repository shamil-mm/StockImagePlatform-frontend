import { IImage } from '@/types/image';
import { useState } from 'react';

const useImageSelection = () => {
  const [selectedImages, setSelectedImages] = useState<IImage[]>([]);

  const toggleSelection = (image: IImage) => {
    setSelectedImages((prev) =>
      prev.find((img) => img.publicId === image.publicId)
        ? prev.filter((img) => img.publicId !== image.publicId)
        : [...prev, image]
    );
  };

  const clearSelection = () => setSelectedImages([]);

  const selectAll = (images: IImage[]) => setSelectedImages(images);

  return { selectedImages, toggleSelection, clearSelection, selectAll };
};

export default useImageSelection;
