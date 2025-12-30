import api from "./api";

export const login =async(data:{email:string;password:string})=>{
    try {
        const result= api.post('/auth/login',data)
        return result;
    } catch (error) {
        console.log('error from login service',error)
    } 
}
export const register =async(data:any)=>{
   try {
    const result= api.post("/auth/register",data);
    return result;
   } catch (error) {
    
    console.log('error from register service',error)
   }
}
export const appLogout =async()=>{
    try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error('error from appLogout service', error);
  }
}

export const changePassword = async (password: string) => {
  const res = await api.put('/auth/change-password', { password });
  return res.data;
};
