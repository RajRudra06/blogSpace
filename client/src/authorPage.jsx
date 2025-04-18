import { useParams } from "react-router-dom"
import Header from "./header";
import { useContext,useEffect, useState } from "react";
import AuthorSinglePost from "./authorSinglePost.jsx";
import { UserContext } from "./UserContext";
import Post from "./post.jsx";

const API_URL=import.meta.env.VITE_API_URL;


export default function AuthorPage(){

    const {author}=useParams();
    const [authorPosts,setAuthorPosts]=useState([])
    const {setUserInfo,userInfo}=useContext(UserContext)
    const [isFollowed,setIsFollowed]=useState(null);
    const [postCount,setPostCount]=useState(null);
    const [isLoaded,setIsLoaded]=useState(false);

    useEffect(() => {
        // make the func as async and call it dont make the func of useEffect func as async
        async function fetchAuthorPost() {
            const response = await fetch(`${API_URL}/authorpost/${author}`,{
                method: 'GET',
            });
            const msg = await response.json();
            setAuthorPosts(msg);
        }
        async function checkAuthorFollow(){
            if (!userInfo || !userInfo.username) return; 

            const response=await fetch(`${API_URL}/checkFollow/${userInfo.username}/${author}`,{
                method:'GET',
            })
            const msg=await response.json();
            if(msg.value){

                setIsFollowed(true);
            }
            else if(!msg.value){
                setIsFollowed(false);
            }
        }

        async function getPostCountByAuthor(){
            const response=await fetch(`${API_URL}/postcount/${author}`)

            const msg=await response.json();

            setPostCount(msg.postCount);
            setIsLoaded(true)
        }

        fetchAuthorPost(); 
        checkAuthorFollow();
        getPostCountByAuthor();
        
    }, [userInfo]); 

    async function followAuthor(){
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
        
        {userInfo.username==null?null:(userInfo.username==author?null: (isFollowed==null?null:(isFollowed?<button onClick={unfollowAuthor}style={{cursor:"pointer", width:'130px', height:'50px',textAlign:'center',fontSize:'20px', margin:'0px', marginTop:'20px',marginBottom:'20px'}}>📌 Following</button>:<button onClick={followAuthor} style={{cursor:"pointer", width:'130px', height:'50px',textAlign:'center',fontSize:'20px', margin:'0px', marginTop:'20px',marginBottom:'20px'}}>📌 Follow</button>)))}
        
        </div>
        
        <div style={{display:'flex', justifyContent:'center', fontWeight:'bold',color:'#0D9488', fontSize:'25px'}}>
        {isLoaded?<p >Total Post: {postCount}</p>:<p style={{fontSize:'15px'}}>Getting total post by {author}...</p>}
        </div>
        
        
        <div style={{marginTop:'30px'}}>
        {authorPosts.length>0 && authorPosts.map(post=>(
            <Post key={post._id} {...post}/>
        ))}
        </div>

        {/* <button style={{cursor:"pointer", width:'170px', height:'50px',textAlign:'center',fontSize:'20px', margin:'0px', marginTop:'20px',marginBottom:'20px'}}>🖌️ Edit this post</button> */}
        </>
        
    )
}