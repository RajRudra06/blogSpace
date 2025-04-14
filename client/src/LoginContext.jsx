import './App.css'


import { createContext, useState } from "react";

export const IsInContext=createContext({});

export function IsInContextProvider({children}){
    const [isIn, setIsIn]=useState(null)
    return( 
       <IsInContext.Provider value={{isIn, setIsIn}}>
            {children}
       </IsInContext.Provider>
     )
} 