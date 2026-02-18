import { useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { login, register } from '@/services/authService';
import { useAppSelector,useAppDispatch } from '@/app/hooks';
import { loginSuccess } from '@/modules/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { showError, showInfo,showSuccess } from '@/utils/swal';
import {validateLogin,validateRegister} from '../../utils/validation'

export default function AuthPages() {
  const [currentPage, setCurrentPage] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    rePassword: ''
  });
  const dispatch=useAppDispatch();
  const navigate=useNavigate()
  const isAuthenticated=useAppSelector((state)=>state.auth.isAuthenticated)
  useEffect(()=>{
    if(isAuthenticated){
      navigate('/home');
    }
  },[isAuthenticated])

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: '',
    }));
  };

  const handleSubmit = async() => {
    setErrors({});
    if (currentPage === 'login') {

       const validationErrors = validateLogin(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
    
      console.log('Login submitted:', { email: formData.email, password: formData.password });
      try {
        const result=await login(formData)
        console.log('result',result)
        if(result?.data){
          const { accessToken, user, message } = result?.data;
          
          dispatch(loginSuccess({accessToken,user}))
          console.log('its comming here')
          navigate('/home');
        }
      } catch (error:any) {
        if(error?.response?.data?.validationError){
          showError(error?.response?.data?.message)
        }
        console.log("error from login",error)
      }
 
    } else {
      const validationErrors = validateRegister(formData);

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      
      try {
        if(formData.password!==formData.rePassword){
          showInfo('Passwords do not match')
          return
        }
        const result=await register(formData)
        if(result?.data){
          showSuccess(result?.data?.message)
          setCurrentPage("login")
        }
      } catch (error:any) {
        if(error?.response?.data?.validationError){
          showError(error?.response?.data?.message)
        }
        console.log("error from registeration",error)
      }
     
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-black text-white p-8 text-center">
          <h1 className="text-3xl font-bold mb-2">
            {currentPage === 'login' ? 'Welcome Back' : 'Get Started'}
          </h1>
          <p className="text-gray-300 text-sm">
            {currentPage === 'login' 
              ? 'Sign in to continue' 
              : 'Create your account'}
          </p>
        </div>

        {/* Form Section */}
        <div className="p-8">
          
          {/* Register Fields */}
          {currentPage === 'register' && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Full Name
                </label>
                 {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name}
                  </p>
                )}
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                  placeholder="Enter Your Name"
                />
               

              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Phone Number
                </label>
                 {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phone}
                  </p>
                )}
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                  placeholder="Enter Your Number"
                />

               
              </div>
            </>
          )}

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>
            {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </p>
                )}
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
              placeholder="You@example.com"
            />

               
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password}
                  </p>
                )}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                placeholder="••••••••"
              />
                
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Re-enter Password Field */}
          {currentPage === 'register' && (
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Confirm Password
              </label>
               {errors.rePassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.rePassword}
                  </p>
                )}
              <input
                type={showPassword ? 'text' : 'password'}
                name="rePassword"
                value={formData.rePassword}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                placeholder="••••••••"
              />
             
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            {currentPage === 'login' ? 'Sign In' : 'Create Account'}
          </button>

          {/* Toggle Link */}
          <div className="mt-6 text-center">
            <span className="text-gray-600 text-sm">
              {currentPage === 'login' ? "Don't have an account? " : "Already have an account? "}
            </span>
            <button
              onClick={() => {
                setErrors({});
                setCurrentPage(currentPage === 'login' ? 'register' : 'login')
              }}
              className="text-black font-semibold text-sm hover:underline"
            >
              {currentPage === 'login' ? 'Sign Up' : 'Sign In'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}