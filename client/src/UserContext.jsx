import '/Users/rudrarajpurohit/Desktop/Blog Space/client/src/App.css'


import { createContext, useState } from "react";

export const UserContext=createContext({});

export function UserContextProvider({children}){
    const [userInfo, setUserInfo]=useState({msg:"hello"})
    return( 
       <UserContext.Provider value={{userInfo, setUserInfo}}>
            {children}
       </UserContext.Provider>
     )
} 