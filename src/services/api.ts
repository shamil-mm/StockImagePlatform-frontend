import { store } from "@/app/store";
import { logout, setAccessToken } from "@/modules/auth/authSlice";
import axios from "axios";

const api=axios.create({
    baseURL:import.meta.env.VITE_API_BASE_URL,
    withCredentials:true,
    headers:{
        'content-Type':'application/json'
    }
})

api.interceptors.request.use(
   (config)=>{
        const token= store.getState().auth.accessToken
        if(token){
            config.headers.Authorization=`Bearer ${token}`
        }
        return config
    },
    (error)=>{
        Promise.reject(error)
    }
)
api.interceptors.response.use(
    res=>res,
    async error=>{
        const originalRequest = error.config;
        if(error.response.status===401 && error.response.data.code==="ACCESS_TOKEN_EXPIRED" &&  !originalRequest._retry){
            originalRequest._retry = true;
            try {
                const refreshRes = await api.post('/auth/refresh');
                const newAccessToken = refreshRes.data.accessToken;
                 store.dispatch(setAccessToken(newAccessToken));
                api.defaults.headers.common.Authorization =`Bearer ${newAccessToken}`;
                originalRequest.headers.Authorization =`Bearer ${newAccessToken}`;

            return api(originalRequest);
            } catch (refreshError) {
                store.dispatch(logout());
                return Promise.reject(refreshError);
            }
            
        }
        return Promise.reject(error)
    }
)

export default api;
