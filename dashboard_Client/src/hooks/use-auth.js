import React,{useEffect,useState,useContext,createContext} from 'react';
import { useNavigate } from 'react-router-dom';
import httpAxios from '../config/axios'
import redirect from '../redirects';
//-----------------------------------------------------------------------------
export const authContext = createContext();

export function ProvideAuth({children}){
    const auth = useProvideAuth();
   return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth=()=>{
    return useContext(authContext)
}
function useProvideAuth(){
    const navigate = useNavigate();
    const [user,setUser]=useState(null);
    const [errors,setErrors]=useState([]);
    const [canProceed,setCanProceed] =useState(false)
    const [isLoading,setIsLoading]= useState(true);
    //useEffect
    useEffect(()=>{
        verifyUser();
    },[])
    //add signin function
    const signout=()=>{
        httpAxios.post('/user/logout')
        .then(res=>{
            redirect()
        })
    }
   
    const verifyUser=()=>{
        setErrors([])
      
        httpAxios.post(`/user/verify`)
        .then(res=>{
            setIsLoading(false)
            if(res.status===200){
                const user = res.data.user;
                user['level']=user.level.toLowerCase()
                setUser(user)
                setIsLoading(false)
                setCanProceed(true)
            }else{
                setCanProceed(true)
            }
            
        }).catch(error=>{
            setErrors(['operation failed!'])
            setIsLoading(false)
            setCanProceed(true)
         
        })
    }
   
    //return user object and auth methods
    return {
        user,
        signout,
        errors,
        isLoading,
        canProceed
    }
}