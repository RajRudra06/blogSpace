import { useEffect, useState } from "react";
import { format } from "date-fns";
import HeaderPost from "../../headerPost";
import '../App.css'
import { Link, useParams } from "react-router-dom";

import { UserContext } from "../UserContext";
import { useContext } from "react"
import { PostContext } from "../postContext";
const API_URL=import.meta.env.VITE_API_URL;

export default function SinglePostPage(){
    const [postInfo,setPostInfo]=useState(null);
    const {postInfoContext,setPostInfoContext}=useContext(PostContext);
    const {id}=useParams();
    const [error,setError]=useState('');
    const {setUserInfo,userInfo}=useContext(UserContext);
    const [isClickedOnce,setIsClickedOnce]=useState(false);

    //runs when component mounts
    useEffect(()=>{
            fetch(`${API_URL}/post/${id}`)
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

    async function deletePost(){

        try{
            const res=await fetch(`${API_URL}/delete/${id}`,{
                method:'DELETE',
                headers:{
                    'Content-Type':'application/json'
                }
            })
    
            const {msg}=await res.json();
            console.log("deleted message",msg);
            if(msg){
                alert("Post deleted succesfully. Directing to Home Page...")
            }
    
            console.log("Consoling on delete",response);
    
        }catch(err){
            console.log("Error on client side",err);
        }
        
    }


    console.log(postInfo?.content);
    console.log("daterrr:",postInfo)

    const datemain=postInfo.created_at;

    function formatDateTime(date2) {
        const date = new Date(date2);
        
        // Convert to IST (UTC+5:30)
        const ISTOffset = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds
        const ISTTime = new Date(date.getTime() + ISTOffset);
      
        return ISTTime.toLocaleString("en-GB", { 
            day: "numeric", 
            month: "long", 
            year: "numeric",
            hour: "2-digit", 
            minute: "2-digit",
            second: "2-digit",
            hour12: false // Set to true if you want AM/PM format
        });
      }
    
      const formattedDate = formatDateTime(datemain);


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
            <time className="time">{formattedDate}
            </time>
        </div>
        
        <div className="author">
            
            <div style={{fontSize:'20px'}}>by
            <Link to={`/authorpage/${postInfo.author}`}><p style={{color:'gray', display:'inline', fontStyle:'italic', fontSize:'20px', fontWeight:'bold'}} href="" className="author"> @{postInfo.author}</p></Link> 
            
            </div>
        
        </div>

        {userInfo?.username === postInfo?.author?<Link to="/create" >
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'50px'}}>
            <button onClick={()=>{setPostContext(); setIsClickedOnce(true)}} style={{cursor:"pointer", width:'170px', height:'50px',textAlign:'center',fontSize:'20px', margin:'0px', marginTop:'20px',marginBottom:'20px'}} disabled={isClickedOnce}>🖌️ Edit this post</button>
            <Link to="/"> <button onClick={async ()=>{await deletePost();setIsClickedOnce(true); navigate('/')}} style={{cursor:"pointer", width:'170px', height:'50px',textAlign:'center',fontSize:'20px',margin:'0px', marginTop:'10px',marginBottom:'10px'}} disabled={isClickedOnce}>🗑️ Delete this post</button></Link>
           
            </div>
            
            </Link>:null}

        <div  className="imagePost" >
            <img src={`${API_URL}/${postInfo.cover}`} alt="" />
        </div>

        <div 
  className="content" style={{color:'gray', textAlign:'center', marginLeft:'25px', marginRight:'25px', fontFamily:'-moz-initial', fontSize:'40px',marginTop:'50px'}}
  dangerouslySetInnerHTML={{ __html: postInfo?.content }} 
/>
        </div>
        </>
        
    )
}