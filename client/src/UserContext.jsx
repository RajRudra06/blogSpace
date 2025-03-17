import '/Users/rudrarajpurohit/Desktop/blog space /client/src/App.css'


import { createContext, useState } from "react";

export const UserContext=createContext({});

export function UserContextProvider({children}){
    const [userInfo, setUserInfo]=useState(null)
    return( 
       <UserContext.Provider value={{userInfo, setUserInfo}}>
            {children}
       </UserContext.Provider>
     )
} 