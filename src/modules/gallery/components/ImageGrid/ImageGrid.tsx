import ImageCard from '../ImageCard';
import { IImage } from '../../../../types/image';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

interface ImageGridProps {
  images: IImage[];
  selectedImages: IImage[];
  onImageSelect: (image: IImage) => void;
  onDownload: (imageId: string) => void;
  onEdit: (imageId: string) => void;
  onDelete: (imageId: string) => void;
  onReorder?: (images: IImage[]) => void;
  columns?: 1 | 2 | 3 | 4;
}

const ImageGrid: React.FC<ImageGridProps> = ({
  images,
  selectedImages,
  onImageSelect,
  onDownload,
  onReorder,
  onEdit,
  onDelete,
  columns = 3,
}) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const updatedImages = Array.from(images);
    const [moved] = updatedImages.splice(result.source.index, 1);
    updatedImages.splice(result.destination.index, 0, moved);

    const reorderedImages = updatedImages.map((img, index) => ({
      ...img,
      order: index,
    }));

    onReorder?.(reorderedImages);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="image-grid" direction="horizontal">
        {(provided) => (
          <div
            className={`grid ${gridCols[columns]} gap-4`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {images
              .sort((a, b) => a.order - b.order)
              .map((image, index) => (
                <Draggable key={image.publicId} draggableId={image.publicId} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <ImageCard
                        image={image}
                        isSelected={selectedImages.some((img) => img.publicId === image.publicId)}
                        onSelect={onImageSelect}
                        onDownload={onDownload}
                        onEdit={onEdit}
                        onDelete={onDelete}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ImageGrid;
