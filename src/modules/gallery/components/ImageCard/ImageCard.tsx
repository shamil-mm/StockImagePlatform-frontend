import {  Download, Edit, Trash } from 'lucide-react';
import ActionButton from '../../../../shared/components/ActionButton';
import Badge from '../../../../shared/components/Badge';
import ImageOverlay from '../ImageOverlay';
import useImageHover from '../../hooks/useImageHover';
import { IImage } from '@/types/image';

interface ImageCardProps {
  image: IImage;
  isSelected: boolean;
  onSelect: (image: IImage) => void; 
  onDownload?: (imageId: string) => void;
  onEdit?: (imageId: string) => void;
  onDelete?: (imageId: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, isSelected, onSelect, onDownload, onEdit ,onDelete}) => {
  const { isHovered, handleMouseEnter, handleMouseLeave } = useImageHover();

  const handleClick = () => {
    onSelect(image); 
  };

  const handleDownloadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDownload?.(image.publicId);
  };

  const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onEdit?.(image.publicId);
  };
  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDelete?.(image.publicId);
  };

  return (
    <div
      className={`relative rounded-lg overflow-hidden cursor-pointer group transition-all duration-300 ${
        isSelected ? 'ring-4 ring-blue-500 shadow-2xl' : ''
      }`}
      style={{
        aspectRatio: image.width && image.height ? `${image.width} / ${image.height}` : undefined,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <img
        src={image.url}
        alt={image.title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />

      <ImageOverlay isVisible={isHovered || isSelected} />

      {isSelected && (
        <Badge variant="primary" className="absolute top-3 left-3 shadow-lg">
          Selected
        </Badge>
      )}

 
      <div
        className={`absolute top-3 right-15 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}
      >
        <ActionButton icon={Edit} onClick={handleEditClick} label="Edit" />
      </div>
      <div
        className={`absolute top-3 right-25 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}
      >
        <ActionButton icon={Trash} onClick={handleDeleteClick} label="Delete" />
      </div>

      <div
        className={`absolute top-3 right-3 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}
      >
        <ActionButton icon={Download} onClick={handleDownloadClick} label="Download" />
      </div>

     
      <div
        className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-300 ${
          isHovered || isSelected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        <h3 className="text-base font-semibold text-white drop-shadow-lg">
          {image.title}
        </h3>
      </div>
    </div>
  );
};

export default ImageCard;
