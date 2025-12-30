import { useEffect, useState } from 'react';
import ImageGrid from '../../modules/gallery/components/ImageGrid';
import useImageSelection from '../../modules/gallery/hooks/useImageSelection';
import { IImage } from '@/types/image';
import { deleteImage, fetchImages, rearrangeOrder } from '@/services/imageService';
import { useAppSelector } from '@/app/hooks';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { showConfirmation, showError, showSuccess } from '@/utils/swal';


const HomePage = () => {
  const { selectedImages, toggleSelection, clearSelection } = useImageSelection();
  const [images, setImages] = useState<IImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isReorderOpen, setIsReorderOpen] = useState(false);
  const [selectedReorder, setSelectedReorder] = useState<IImage[]>([]);

  const userId = useAppSelector((state) => state?.auth?.user?.id);
  const navigate = useNavigate();

  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true);
        const data = await fetchImages();
        setImages(data.images);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadImages();
  }, []);

  const handleDownload = (id: string) => console.log('Download image:', id);

  const handleEdit = (id: string) => navigate(`/edit/${encodeURIComponent(id)}`);

  const handleDelete=async(publicId:string)=>{
    const confirmed = await showConfirmation({
    title: "Delete image?",
    text: "",
    confirmButtonText: "Yes, delete it",
    cancelButtonText: "Cancel",
  });

  if (!confirmed) return;

  try {
      setImages((prev) => prev.filter((img) => img.publicId !== publicId));
      await deleteImage(publicId)
      showSuccess("Image has been removed.");
    } catch (error) {
      showError("Failed to delete image.");
      console.error('Failed to delete image', error);
    }
  }

  const handleReorder = async (newImages: IImage[]) => {
    setImages([...newImages]);
    try {
      await rearrangeOrder(newImages);
    } catch (err) {
      console.error('Failed to update order', err);
    }
  };

  
  const handleSelectedReorder = async (newSelected: IImage[]) => {
    setSelectedReorder([...newSelected]);
  };

  const openSelectedReorderModal = () => {
    setSelectedReorder(selectedImages);
    setIsReorderOpen(true);
  };

  const saveSelectedReorder = async () => {
  let updatedImages = [...images];
  updatedImages = updatedImages.filter(
    (img) => !selectedReorder.some((s) => s.publicId === img.publicId)
  );
  updatedImages = [...selectedReorder, ...updatedImages];
  updatedImages = updatedImages.map((img, index) => ({ ...img, order: index }));

  setImages(updatedImages);

  try {
    console.log('Updated Images:', updatedImages);
    await rearrangeOrder(updatedImages);
    clearSelection()
  } catch (err) {
    console.error('Failed to update order', err);
  }

  setIsReorderOpen(false);
};


  
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const updated = Array.from(selectedReorder);
    const [moved] = updated.splice(result.source.index, 1);
    updated.splice(result.destination.index, 0, moved);
    setSelectedReorder(updated);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
     
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mt-5">Discover</h1>

        {selectedImages.length > 0 && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {selectedImages.length} image{selectedImages.length > 1 ? 's' : ''} selected
            </span>

            {selectedImages.length > 1 && (
              <button
                onClick={openSelectedReorderModal}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
              >
                Rearrange Selected
              </button>
            )}

            <button
              onClick={clearSelection}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors font-medium"
            >
              Clear Selection
            </button>
          </div>
        )}
      </div>

      
      <ImageGrid
        images={images}
        selectedImages={selectedImages}
        onImageSelect={toggleSelection}
        onDownload={handleDownload}
        onEdit={handleEdit}
        onDelete={handleDelete}
        columns={3}
        onReorder={handleReorder} 
      />

      
      {isReorderOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-125 max-w-full">
            <h2 className="text-xl font-semibold mb-4">Rearrange Selected Images</h2>

            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="selected-reorder">
                {(provided) => (
                  <div
                    className="max-h-100 overflow-y-auto border border-gray-200 rounded-lg p-3"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {selectedReorder.map((img, index) => (
                      <Draggable key={img.publicId} draggableId={img.publicId} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="p-2 mb-2 border rounded flex items-center gap-2 cursor-move"
                          >
                            <img src={img.url} alt="" className="w-16 h-16 object-cover rounded" />
                            <span className="text-gray-700">{img.title || `Image ${index + 1}`}</span>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsReorderOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={saveSelectedReorder}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Save Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
