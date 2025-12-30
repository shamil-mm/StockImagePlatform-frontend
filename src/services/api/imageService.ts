import { Image } from "@/types/image";
export const mockImages:Image[] = [
  {
    id: "1",
    userId:"1",
    url: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800',
    title: 'Greenhouse Farming',
    height: 300
  },
  {
    id: "2",
    userId:"2",
    url: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800',
    title: 'Golden Decorative Tree',
    height: 600
  },
  {
    id: "3",
    userId:"3",
    url: 'https://images.unsplash.com/photo-1511576661531-b34d7da5d0bb?w=800',
    title: 'Outdoor String Lights',
    height: 300
  },
  {
    id: "4",
    userId:"4",
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    title: 'Mountain Lake Reflection',
    height: 600
  },
  {
    id: "5",
    userId:"5",
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800',
    title: 'Nature Landscape',
    height: 400
  },
  {
    id: "6",
    userId:"6",
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
    title: 'Forest Path',
    height: 500
  }
];

export const fetchImages = async (page = 1, limit = 20) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockImages);
    }, 500);
  });
};

export const downloadImage = async (imageId:string) => {
  console.log('Downloading image:', imageId);
  return { success: true, imageId };
};