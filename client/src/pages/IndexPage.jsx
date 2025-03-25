import { useEffect, useState } from "react"
import Post from "../post"
import '/Users/rudrarajpurohit/Desktop/Blog Space/client/src/App.css'

const API_URL=import.meta.env.VITE_API_URL;

export default function IndexPage(){
    const [posts,setPosts]=useState([]);
    useEffect(() => {
        // make the func as async and call it dont make the func of useEffect func as async
        async function fetchPosts() {
            const response = await fetch(`${API_URL}/posts`,{
                method: 'GET',
            });
            const msg = await response.json();
            setPosts(msg);
            console.log(msg);
        }

        fetchPosts(); 
    }, []); 
    return(
     
       
        <>
        {posts.length>0 && posts.map(post=>(
            <Post key={post._id} {...post} author={post.author||"unkonwn"}/>
        ))}
        
        </>
    )
}