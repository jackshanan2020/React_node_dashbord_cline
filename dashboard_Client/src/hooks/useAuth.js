import React, { useState, useEffect, useContext, createContext } from "react";
import userApi from '../apis/userApi';

const authContext = createContext();
//    Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
   const [user, setUser] = useState(null);

   const signin=async(email,password)=>{
    try{
      const res = await userApi.login(email,password);
      if(res){
        setUser(res.data)
      }
    }catch(error){
      alert('Operation failed !')
    }
      
   }
   const signout=async()=>{
      try{
        const out = await userApi.logout();
        if(out){
          return
        }
      }catch(error){
        alert('Something went wrong !')
      }
   }
 // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
      (
        async function() {
         const res = await userApi.authUserState();
          if (res) {
             setUser(res.data.user);
          }
       
        } )();
       
    // Cleanup subscription on unmount
    return () =>{};
  }, []);
  // Return the user object and auth methods
  return {
    user,
    signin,
    signout,
  };

}