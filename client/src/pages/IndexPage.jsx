import { useEffect, useState } from "react"
import Post from "../post"
import '/Users/rudrarajpurohit/Desktop/blog space /client/src/App.css'


export default function IndexPage(){
    const [posts,setPosts]=useState([]);
    useEffect(() => {
        // make the func as async and call it dont make the func of useEffect func as async
        async function fetchPosts() {
            const response = await fetch('http://localhost:3000/posts',{
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
            <Post key={post._id} {...post}/>
        ))}
        
        </>
    )
}