

// imporved UI

import { useEffect, useState } from "react";
import { format } from "date-fns";
import HeaderPost from "../headerPost";
import '../App.css'
import { Link, useParams } from "react-router-dom";
import CommentSection from "../comments";
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
    const [isLiked,setIsLiked]=useState(null);
    const [numberOfLike,setNumberOfLike]=useState(0)


    //runs when component mounts
    useEffect(()=>{

            fetch(`${API_URL}/post/${id}`)
            .then(response=>{
                response.json().then(postInfo=>{
                    setPostInfo(postInfo);

                })
            }).catch(error=>setError("Server Down, try again later..."));

            

        
    },[])

    useEffect(() => {
        if (!postInfo || !userInfo || !userInfo.username) return;
        if(userInfo.username!=postInfo.author){
            async function checkIfLiked() {
                console.log("Checking if post is liked...");
        
                try {
                    const response = await fetch(`${API_URL}/checkifliked/${postInfo.id}/${userInfo.username}`);
                    const msg = await response.json();
                    console.log("Does like:", msg);
                    
                    if(msg.userLikedStatus){
                        setIsLiked(true);
                    }
                    else if(!msg.userLikedStatus){
                        setIsLiked(false)
                    }
                } catch (error) {
                    console.error("Error checking like status:", error);
                }
            }
        
            checkIfLiked();
        }
     
    }, [postInfo, userInfo]);

    useEffect(()=>{
        async function getNumberOfLikes(){
            console.log("inside getNubmber of likes")
            try {
                console.log("inside getNubmber of likes try")

                const response = await fetch(`${API_URL}/likescount/${postInfo.id}`);
                const msg = await response.json();
                console.log("LIKKKKKKK:",msg.likeCount)
                setNumberOfLike(msg.likeCount)
                
            } catch (error) {
                
            }
        }

        getNumberOfLikes()
    },[postInfo])

    async function likePost(){
        console.log("liking....");
        try{
            const response=await fetch(`${API_URL}/likepost`,{
                method:'POST',
                headers:{
                'Content-Type':'application/json'
            },
                body:JSON.stringify({post_id:postInfo.id,username:userInfo.username}),
            })
            const res=await response.json();
            if(res.likeStatus){
                setIsLiked(true);
            }
            else{
                alert("Error liking the post")
            }
            console.log("like reply:",res)

            async function getNumberOfLikes(){
                try {
                    const response = await fetch(`${API_URL}/likescount/${postInfo.id}`);
                    const msg = await response.json();
                    setNumberOfLike(msg.likeCount)
                    
                } catch (error) {
                    
                }
            }

            getNumberOfLikes()
            
        }
        catch(err){
            console.log("error liking...", err);
        }
    }

    async function unlikePost(){
        console.log("unliking....");
        try{
            const response=await fetch(`${API_URL}/unlikepost`,{
                method:'POST',
                headers:{
                'Content-Type':'application/json'
            },
                body:JSON.stringify({post_id:postInfo.id,username:userInfo.username}),
            })
            const res=await response.json();
            if(res.unlikeStatus){
                setIsLiked(false);
            }
            else{
                alert("Error unliking the post")
            }

            console.log("unlike reply:",res)

            async function getNumberOfLikes(){
                try {
                    const response = await fetch(`${API_URL}/likescount/${postInfo.id}`);
                    const msg = await response.json();
                    setNumberOfLike(msg.likeCount)
                    
                } catch (error) {
                    
                }
            }

            getNumberOfLikes()
           
            
        }
        catch(err){
            console.log("error liking...", err);
        }
    }
    
    function setPostContext(){
        setPostInfoContext(postInfo);
    }
    if(!postInfo){
        return (
            <div className="loadingContainer">
                <div className="loadingSpinner"></div>
                <p>Loading post...</p>
            </div>
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
        <div className="singlePostContainer">
            <article className="postArticle">
                <div className="postHeader">
                    <h1 className="postTitle">{postInfo.title}</h1>
                    
                    <div className="postMeta">
                        <time className="postTime">{formattedDate}</time>
                        <div className="postAuthor">
                            by
                            <Link to={`/authorpage/${postInfo.author}`} className="authorLink">
                                @{postInfo.author}
                            </Link>
                        </div>

                        <div>
                            {userInfo.username==postInfo.author?null:(userInfo.username==null?null:(isLiked==null?null:<>{isLiked?<button onClick={unlikePost} style={{cursor:"pointer", width:'130px', height:'50px',textAlign:'center',fontSize:'20px', margin:'0px', marginTop:'20px',marginBottom:'20px'}}>❤️ Liked {numberOfLike}</button>: <button onClick={likePost} style={{cursor:"pointer", width:'130px', height:'50px',textAlign:'center',fontSize:'20px', margin:'0px', marginTop:'20px',marginBottom:'20px'}}>❤️ Like {numberOfLike}</button>}
                            
                            </>))}
                        
                        
                        </div>
                    </div>

                    {userInfo?.username === postInfo?.author && (
                        <div className="actionButtonsContainer">
                            <Link to="/create" className="actionLink">
                                <button 
                                    onClick={() => {setPostContext(); setIsClickedOnce(true)}} 
                                    className="editButton actionButton"
                                    disabled={isClickedOnce}
                                >
                                    🖌️ Edit this post
                                </button>
                            </Link>
                            <Link to="/" className="actionLink">
                                <button 
                                    onClick={async () => {await deletePost(); setIsClickedOnce(true)}} 
                                    className="deleteButton actionButton"
                                    disabled={isClickedOnce}
                                >
                                    🗑️ Delete this post
                                </button>
                            </Link>
                        </div>
                    )}
                </div>

                <div className="postCoverImage">
                    <img src={`${API_URL}/${postInfo.cover}`} alt="Post cover" />
                </div>

                <div 
                    className="postContent"
                    dangerouslySetInnerHTML={{ __html: postInfo?.content }} 
                />
                <CommentSection post_id={postInfo.id} PostContext={PostContext} UserContext={UserContext} />
            </article>
        </div>

        <style jsx>{`
            .singlePostContainer {
                max-width: 900px;
                margin: 0 auto;
                padding: 20px;
                font-family: 'Georgia', serif;
            }

            .postArticle {
                background-color: #fff;
                border-radius: 12px;
                box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
                overflow: hidden;
            }

            .postHeader {
                margin-top:120px;
                padding: 30px 40px;
                border-bottom: 1px solid #f0f0f0;
            }

            .postTitle {
                font-size: 36px;
                font-weight: 700;
                color: #333;
                margin: 0 0 20px 0;
                line-height: 1.3;
                text-align: center;
            }

            .postMeta {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
                color: #777;
                font-size: 16px;
            }

            .postTime {
                font-style: italic;
            }

            .postAuthor {
                font-size: 18px;
            }

            .authorLink {
                margin-left: 5px;
                color: #4a90e2;
                font-style: italic;
                font-weight: bold;
                text-decoration: none;
                transition: color 0.2s ease;
            }

            .authorLink:hover {
                color: #2a6db2;
                text-decoration: underline;
            }

            .actionButtonsContainer {
                display: flex;
                justify-content: center;
                gap: 20px;
                margin-top: 25px;
            }

            .actionButton {
                padding: 12px 20px;
                border: none;
                border-radius: 6px;
                font-size: 16px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                min-width: 170px;
            }

            .editButton {
                background-color: #4a90e2;
                color: white;
                height:50px
            }

            .editButton:hover {
                background-color: #3a7bc8;
            }

            .deleteButton {
                background-color: #e74c3c;
                color: white;
                height:50px
            }

            .deleteButton:hover {
                background-color: #c0392b;
            }

            .actionButton:disabled {
                background-color: #ccc;
                cursor: not-allowed;
            }

            .postCoverImage {
                width: 100%;
                height: auto;
                max-height: 500px;
                overflow: hidden;
            }

            .postCoverImage img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.3s ease;
            }

            .postCoverImage:hover img {
                transform: scale(1.02);
            }

            .postContent {
                padding: 40px;
                font-size: 18px;
                line-height: 1.8;
                color: #444;
            }

            .postContent h1, .postContent h2, .postContent h3 {
                color: #333;
                margin-top: 30px;
                margin-bottom: 15px;
            }

            .postContent p {
                margin-bottom: 20px;
            }

            .postContent a {
                color: #4a90e2;
                text-decoration: none;
            }

            .postContent a:hover {
                text-decoration: underline;
            }

            .postContent img {
                max-width: 100%;
                height: auto;
                margin: 20px 0;
                border-radius: 8px;
            }

            .loadingContainer {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 70vh;
                font-family: 'Arial', sans-serif;
            }

            .loadingSpinner {
                width: 50px;
                height: 50px;
                border: 5px solid rgba(74, 144, 226, 0.3);
                border-radius: 50%;
                border-top-color: #4a90e2;
                animation: spin 1s ease-in-out infinite;
                margin-bottom: 20px;
            }

            @keyframes spin {
                to {
                    transform: rotate(360deg);
                }
            }

            @media (max-width: 768px) {
                .postTitle {
                    font-size: 28px;
                }

                .postHeader, .postContent {
                    padding: 20px;
                }

                .actionButtonsContainer {
                    flex-direction: column;
                    align-items: center;
                    gap: 15px;
                }
            }
        `}</style>
        </>
    )
}


//***********first GEN***********


// import { useEffect, useState } from "react";
// import { format } from "date-fns";
// import HeaderPost from "../../headerPost";
// import '../App.css'
// import { Link, useParams } from "react-router-dom";

// import { UserContext } from "../UserContext";
// import { useContext } from "react"
// import { PostContext } from "../postContext";
// const API_URL=import.meta.env.VITE_API_URL;

// export default function SinglePostPage(){
//     const [postInfo,setPostInfo]=useState(null);
//     const {postInfoContext,setPostInfoContext}=useContext(PostContext);
//     const {id}=useParams();
//     const [error,setError]=useState('');
//     const {setUserInfo,userInfo}=useContext(UserContext);
//     const [isClickedOnce,setIsClickedOnce]=useState(false);

//     //runs when component mounts
//     useEffect(()=>{
//             fetch(`${API_URL}/post/${id}`)
//             .then(response=>{
//                 response.json().then(postInfo=>{
//                     setPostInfo(postInfo);

//                 })
//             }).catch(error=>setError("Server Down, try again later..."))
          
//     },[])
    
//     function setPostContext(){
//         setPostInfoContext(postInfo);
//     }
//     if(!postInfo){
//         return (
//             <div>{postInfo}</div>
//         )
//     }

//     async function deletePost(){

//         try{
//             const res=await fetch(`${API_URL}/delete/${id}`,{
//                 method:'DELETE',
//                 headers:{
//                     'Content-Type':'application/json'
//                 }
//             })
    
//             const {msg}=await res.json();
//             console.log("deleted message",msg);
//             if(msg){
//                 alert("Post deleted succesfully. Directing to Home Page...")
//             }
    
//             console.log("Consoling on delete",response);
    
//         }catch(err){
//             console.log("Error on client side",err);
//         }
        
//     }


//     console.log(postInfo?.content);
//     console.log("daterrr:",postInfo)

//     const datemain=postInfo.created_at;

//     function formatDateTime(date2) {
//         const date = new Date(date2);
        
//         // Convert to IST (UTC+5:30)
//         const ISTOffset = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds
//         const ISTTime = new Date(date.getTime() + ISTOffset);
      
//         return ISTTime.toLocaleString("en-GB", { 
//             day: "numeric", 
//             month: "long", 
//             year: "numeric",
//             hour: "2-digit", 
//             minute: "2-digit",
//             second: "2-digit",
//             hour12: false // Set to true if you want AM/PM format
//         });
//       }
    
//       const formattedDate = formatDateTime(datemain);


//     return (
//         <>
//         <HeaderPost/>
//         <div className="homeMain">
//         <div className="title">
//             <p>
//             {postInfo.title}
//             </p>
//         </div>
      
//         <div className="dataAndTime">
//             <time className="time">{formattedDate}
//             </time>
//         </div>
        
//         <div className="author">
            
//             <div style={{fontSize:'20px'}}>by
//             <Link to={`/authorpage/${postInfo.author}`}><p style={{color:'gray', display:'inline', fontStyle:'italic', fontSize:'20px', fontWeight:'bold'}} href="" className="author"> @{postInfo.author}</p></Link> 
            
//             </div>
        
//         </div>

//         {userInfo?.username === postInfo?.author?<Link to="/create" >
//             <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'50px'}}>
//             <button onClick={()=>{setPostContext(); setIsClickedOnce(true)}} style={{cursor:"pointer", width:'170px', height:'50px',textAlign:'center',fontSize:'20px', margin:'0px', marginTop:'20px',marginBottom:'20px'}} disabled={isClickedOnce}>🖌️ Edit this post</button>
//             <Link to="/"> <button onClick={async ()=>{await deletePost();setIsClickedOnce(true); navigate('/')}} style={{cursor:"pointer", width:'170px', height:'50px',textAlign:'center',fontSize:'20px',margin:'0px', marginTop:'10px',marginBottom:'10px'}} disabled={isClickedOnce}>🗑️ Delete this post</button></Link>
           
//             </div>
            
//             </Link>:null}

//         <div  className="imagePost" >
//             <img src={`${API_URL}/${postInfo.cover}`} alt="" />
//         </div>

//         <div 
//   className="content" style={{color:'gray', textAlign:'center', marginLeft:'25px', marginRight:'25px', fontFamily:'-moz-initial', fontSize:'40px',marginTop:'50px'}}
//   dangerouslySetInnerHTML={{ __html: postInfo?.content }} 
// />
//         </div>
//         </>
        
//     )
// }
