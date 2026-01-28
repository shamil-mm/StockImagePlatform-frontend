import { IImage } from "@/types/image";
import api from "./api";




export const uploadImage =async(formData:FormData)=>{
    try {
        return await api.post(`/auth/upload`,formData,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
        
    } catch (error) {
        console.log('error from uploadImage service',error)
    } 
}

export const fetchImages = async (page = 1, limit = 9) => {
    try {
        const response= await api.get(`/auth/fetch`,{
            params: { page, limit },
        })
        return response.data;
    } catch (error) {
        console.log('error from fetchImages service',error)
    }
};

export const getImagesById=async(id:string)=>{
    try {
        const response= await api.get(`/auth/image`,{
            params: { id },
        })
        return response.data
    } catch (error) {
        console.log('error from getImagesById service',error)
    }
}

export const updateImages=async(formData:FormData)=>{
    try {
        const res = await api.patch(`/auth/upload`, formData,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        });
        return res.data;
    } catch (error) {
        console.log('error from updateImages service',error)
    }
}
export const rearrangeOrder=async(images: IImage[])=>{
    try {
        const res = await api.patch('/auth/reorder', {images: images.map(img => ({ publicId: img.publicId, order: img.order })) });
    return res.data;
    } catch (error) {
        console.log('error from updateImages service',error)
    }
}
export const deleteImage=async(publicId:string)=>{
    try {
        const res = await api.delete('/auth/image',{ data: { publicId } });
    return res.data;
    } catch (error) {
        console.log('error from deleteImage service',error)
    }
}