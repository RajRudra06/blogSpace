import { useEffect, useState } from "react";
import { format } from "date-fns";
import HeaderPost from "../../headerPost";
import '/Users/rudrarajpurohit/Desktop/blog space /client/src/App.css'
import { Link, useParams } from "react-router-dom";

import { UserContext } from "../UserContext";
import { useContext } from "react"
import { PostContext } from "../postContext";

export default function SinglePostPage(){
    const [postInfo,setPostInfo]=useState(null);
    const {postInfoContext,setPostInfoContext}=useContext(PostContext);
    const {id}=useParams();
    const [error,setError]=useState('');
    const {setUserInfo,userInfo}=useContext(UserContext)


    //runs when component mounts
    useEffect(()=>{
            fetch(`http://localhost:3000/post/${id}`)
            .then(response=>{
                response.json().then(postInfo=>{
                    setPostInfo(postInfo);

                })
            }).catch(error=>setError("Server Down, try again later..."))
          
    },[])
    
    function setPostContext(){
        setPostInfoContext(postInfo);
    }
    if(!postInfo){
        return (
            <div>{postInfo}</div>
        )
    }

    console.log(postInfo?.content);


    return (
        <>
        <HeaderPost/>
        <div className="homeMain">
        <div className="title">
            <p>
            {postInfo.title}
            </p>
        </div>
      
        <div className="dataAndTime">
            <time className="time">{format(new Date(postInfo.createdAt), 'MMM d yyyy HH:mm')}
            </time>
        </div>
        
        <div className="author">
            
            <div style={{fontSize:'20px'}}>by
            <Link to={`/authorpage/${postInfo.author}`}><p style={{color:'gray', display:'inline', fontStyle:'italic', fontSize:'20px', fontWeight:'bold'}} href="" className="author"> @{postInfo.author}</p></Link> 
            
            </div>
        
        </div>

        {userInfo?.username === postInfo?.author?<Link to="/create" ><button onClick={setPostContext} style={{cursor:"pointer", width:'170px', height:'50px',textAlign:'center',fontSize:'20px'}}>🖌️ Edit this post</button></Link>:null}
       
        <div  className="imagePost" >
            <img src={`http://localhost:3000/${postInfo.cover}`} alt="" />
        </div>

        <div 
  className="content" 
  dangerouslySetInnerHTML={{ __html: postInfo?.content }} 
/>


        </div>
        
        
        </>
        
    )
}