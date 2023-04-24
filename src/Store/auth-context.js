
 import React, { useState } from "react"
const AuthContext = React.createContext({
    token:'',
    isLoggedIn:false,
    login :(token)=>{},
    logout:()=>{}    
}) 

  export const AuthContextProvider =(props)=>{
    const [userEmail, setEmail]= useState(localStorage.getItem('email'));


     const initialToken = localStorage.getItem('token');
   const [token , setToken] =  useState(initialToken);

   const userIsLoggedIn = !!token;
   const LoginHandler =(token ,userEmail)=>{
           setToken(token)
           setEmail(userEmail);
           localStorage.setItem('token',token)
           localStorage.setItem('email', userEmail);
   }
    const logoutHandler =()=>{
          setToken(null)
           localStorage.removeItem('token');
           localStorage.removeItem('email');
    }

    const contextValue ={
        token:token,
        isLoggedIn:userIsLoggedIn,
        login:LoginHandler,
        logout:logoutHandler,
        email: userEmail,
    }

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext;