import { UserContext } from "./UserContext"
import { useContext, useEffect, useState } from "react"
import './App.css'
import Post from "./post"
import Header from "./header"

const API_URL=import.meta.env.VITE_API_URL;


export default function FollowingPost(){
    const {setUserInfo,userInfo}=useContext(UserContext)
    const [posts,setPosts]=useState([]);


    useEffect(()=>{

        async function getFollowingPost(){
            const req=await fetch(`${API_URL}/followedposts/${userInfo.username}`);
            const posts=await req.json();
            setPosts(posts)
        }

        getFollowingPost()

        
    },[])

    return(
        <>
        <Header />
        <div style={{
            marginTop: '100px', 
            maxWidth: '800px',
            margin: '100px auto 0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            padding: '0 15px'
        }}>
            {posts.length>0 && posts.map(post=>(
                <div style={{ width: '100%' }}>
                    <Post key={post._id} {...post} author={post.author||"unkonwn"}/>
                </div>
            ))}
        </div>
        </>
    )
   
}