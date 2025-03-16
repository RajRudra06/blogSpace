import '/Users/rudrarajpurohit/Desktop/blog space /client/src/App.css'


import { createContext, useState } from "react";

export const PostContext=createContext({});

export function PostContextProvider({children}){
    const [postInfoContext, setPostInfoContext]=useState({})
    return( 
       <PostContext.Provider value={{postInfoContext, setPostInfoContext}}>
            {children}
       </PostContext.Provider>
     )
} 