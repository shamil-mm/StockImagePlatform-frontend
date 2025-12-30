
interface ImageOverlayProps{
  isVisible:boolean
}
const ImageOverlay:React.FC<ImageOverlayProps> = ({ isVisible }) => {
  return (
    <div 
      className={`absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/40 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`} 
    />
  );
};

export default ImageOverlay;