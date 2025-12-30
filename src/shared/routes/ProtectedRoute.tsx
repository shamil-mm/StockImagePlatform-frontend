import { Navigate } from "react-router-dom";
import {useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import {  JSX, useEffect } from "react";
import { logout } from "@/modules/auth/authSlice";

interface ProtectedRouteProps{
    children:JSX.Element;
}

const ProtectedRoute=({children}:ProtectedRouteProps)=>{
    const dispatch=useDispatch()
    const isAuthenticated=useSelector((state:RootState)=>state.auth.isAuthenticated)
    const accessToken=useSelector((state:RootState)=>state.auth.accessToken)
    useEffect(()=>{
        if(!isAuthenticated || !accessToken){
            dispatch(logout())
        }
    },[isAuthenticated,accessToken,dispatch])

    if(!isAuthenticated||!accessToken){
        return <Navigate to="/" replace />
    }
    return children
}
export default ProtectedRoute;