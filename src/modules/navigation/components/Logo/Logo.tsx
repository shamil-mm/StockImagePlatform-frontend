import { useNavigate } from 'react-router-dom';

const Logo = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/')}
      className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white font-bold text-xl hover:bg-gray-800 transition-colors cursor-pointer"
      aria-label="Home"
    >
      S
    </button>
  );
};

export default Logo;