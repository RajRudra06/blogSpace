import { useParams } from "react-router-dom"
import Header from "./header";
import { useEffect, useState } from "react";
import authorSinglePost from '/Users/rudrarajpurohit/Desktop/blog space /client/src/authorSinglePost.jsx'
import AuthorSinglePost from "/Users/rudrarajpurohit/Desktop/blog space /client/src/authorSinglePost.jsx";

export default function AuthorPage(){


    const {author}=useParams();
    const [authorPosts,setAuthorPosts]=useState([])

    useEffect(() => {
        // make the func as async and call it dont make the func of useEffect func as async
        async function fetchAuthorPost() {
            const response = await fetch(`http://localhost:3000/authorpost/${author}`,{
                method: 'GET',
            });
            const msg = await response.json();
            setAuthorPosts(msg);
            console.log("author all post", msg)
        }
        
        fetchAuthorPost(); 
        
    }, []); 

    
    return(
        <>
        <Header/>
        <div style={{marginTop:'200px', display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center', color:'gray'}}>All posts by  <p style={{display:'flex', fontStyle:'italic', justifyContent:'center', color:'#444444', fontWeight:'bold', fontSize:'30px'}}> @ {author}</p></div>

        <div style={{marginTop:'30px'}}>
        {authorPosts.length>0 && authorPosts.map(post=>(
            <AuthorSinglePost key={post._id} {...post}/>
        ))}
        </div>
        
        </>
        
    )
}