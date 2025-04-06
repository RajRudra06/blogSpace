import { useParams } from "react-router-dom"
import Header from "./header";
import { useContext,useEffect, useState } from "react";
import AuthorSinglePost from "./authorSinglePost.jsx";
import { UserContext } from "./UserContext";

const API_URL=import.meta.env.VITE_API_URL;


export default function AuthorPage(){

    const {author}=useParams();
    const [authorPosts,setAuthorPosts]=useState([])
    const {setUserInfo,userInfo}=useContext(UserContext)
    const [isFollowed,setIsFollowed]=useState(null);

    useEffect(() => {
        // make the func as async and call it dont make the func of useEffect func as async
        async function fetchAuthorPost() {
            const response = await fetch(`${API_URL}/authorpost/${author}`,{
                method: 'GET',
            });
            const msg = await response.json();
            setAuthorPosts(msg);
            console.log("author all post", msg)
        }
        async function checkAuthorFollow(){
            if (!userInfo || !userInfo.username) return; 

            const response=await fetch(`${API_URL}/checkFollow/${userInfo.username}/${author}`,{
                method:'GET',
            })
            const msg=await response.json();
            console.log("does follow:   ",msg,"userrrr:",userInfo.username)
            if(msg.value){
                console.log("kmkmkm2",msg.value)

                setIsFollowed(true);
            }
            else if(!msg.value){
                console.log("kmkmkm",msg.value)
                setIsFollowed(false);
            }
        }
        fetchAuthorPost(); 
        checkAuthorFollow();
        
    }, [userInfo]); 
    console.log("userrrr:2",userInfo.username)

    async function followAuthor(){
        console.log("done",userInfo.username," authro anme",author);
        try{
            const response=await fetch(`${API_URL}/followauthor`,{
                method:'POST',
                headers:{
                'Content-Type':'application/json'
            },
                body:JSON.stringify({author:author,username:userInfo.username}),
            })
            const res=await response.json();

            if(res.value>0){
                    setIsFollowed(true);
                }
            
            
        }
        catch(err){
            console.log("error following...", err);
        }
    }

    async function unfollowAuthor(){
        try{
            const response=await fetch(`${API_URL}/unfollowauthor/${userInfo.username}/${author}`,{
                method:'DELETE',
            })
            const res=await response.json();
            console.log("dele:de",res);
            if(res.value){
                    setIsFollowed(false);
                }
            
        }
        catch(err){
            console.log("error unfollowing...", err);
        }
    }
    
    return(
        <>
        <Header/>
        <div style={{marginTop:'200px', display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center', color:'gray'}}>All posts by  <p style={{display:'flex', fontStyle:'italic', justifyContent:'center', color:'#444444', fontWeight:'bold', fontSize:'30px'}}> @ {author}</p></div>
        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
        {isFollowed==null?null:(isFollowed?<button onClick={unfollowAuthor}style={{cursor:"pointer", width:'130px', height:'50px',textAlign:'center',fontSize:'20px', margin:'0px', marginTop:'20px',marginBottom:'20px'}}>📌 Following</button>:<button onClick={followAuthor} style={{cursor:"pointer", width:'130px', height:'50px',textAlign:'center',fontSize:'20px', margin:'0px', marginTop:'20px',marginBottom:'20px'}}>📌 Follow</button>)}
        </div>
        <div style={{marginTop:'30px'}}>
        {authorPosts.length>0 && authorPosts.map(post=>(
            <AuthorSinglePost key={post._id} {...post}/>
        ))}
        </div>

        {/* <button style={{cursor:"pointer", width:'170px', height:'50px',textAlign:'center',fontSize:'20px', margin:'0px', marginTop:'20px',marginBottom:'20px'}}>🖌️ Edit this post</button> */}
        </>
        
    )
}