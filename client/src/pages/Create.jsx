
import Header from "../header";
import '../App.css'
import ReactQuill from "react-quill-new" 
import 'react-quill-new/dist/quill.snow.css'
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useContext, useEffect} from "react"
import { UserContext } from "../UserContext.jsx"
import { PostContext } from "../postContext.jsx";
const API_URL=import.meta.env.VITE_API_URL;

const modules={
    toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline','strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image'],
        ['clean']
      ],
}

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
]

export default function Create(){
    const {setUserInfo,userInfo}=useContext(UserContext);
    const {postInfoContext,setPostInfoContext}=useContext(PostContext);
    const [title,setTitle]=useState('');
    const [summary,setSummary]=useState('');
    const [content,setContent]=useState('');
    const [files,setFiles]=useState('');
    const [isClickedOnce,setIsClickedOnce]=useState(false);
    const [redirect,setRedirect]=useState(false);
    
    useEffect(() => {
        if (postInfoContext) {
            setTitle(postInfoContext.title);
            setSummary(postInfoContext.summary);
            setContent(postInfoContext.content);
        }
    }, [postInfoContext]);
    
    async function updatePost(ev){
        setIsClickedOnce(true);
        const postContextData={
            id:postInfoContext.id,
            title:title,
            summary:summary,
            content:content
        }
        ev.preventDefault();
        
        try{
            const responseUpdate=await fetch(`${API_URL}/updatepost`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(postContextData),
        });
        const res=await responseUpdate.json()

        if(responseUpdate.ok){
            setContent('');
            setTitle('');
            setSummary('');
            alert("Post Updated succesfully");
            setRedirect(true);
        }
        }
        catch(err){
            alert("Server Down, try again later")
        }
    }

    async function createNewPost(ev){
        setIsClickedOnce(true);
        const data=new FormData();
        data.set('title',title);
        data.set('summary',summary);
        data.set('content',content);
        data.set('author',userInfo.username);
        data.set('file',files[0]);
        ev.preventDefault();


       try { 
        const response =await fetch(`${API_URL}/createpost`,{
            method:'POST',
            body:data,
        });

        const msgPost =  await response.json();
        if(response.ok){
            setContent('');
            setTitle('');
            setSummary('');
            alert("Post created succesfully and saved");
            setRedirect(true);
        }

        else{
            alert("Response from server not OK"+response.ok);
        }
        
        }

        catch(err){
            alert("Server down. try again later")
        }
    }

    
    if(redirect){
        return <Navigate to ={'/'}/>    
    }

    return (
    <>
        <Header/>
        <div style={{
            backgroundColor: '#f7f9fc',
            minHeight: 'calc(100vh - 60px)',
            padding: '40px 20px',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            marginTop:'50px'
        }}>
            <div style={{
                maxWidth: '900px',
                margin: '0 auto',
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
                padding: '30px',
                transition: 'transform 0.3s ease'
            }}>
                <h2 style={{
                    textAlign: 'center',
                    marginBottom: '25px',
                    color: '#333',
                    fontSize: '28px',
                    fontWeight: '600'
                }}>
                    {postInfoContext ? 'Update Post' : 'Create New Post'}
                </h2>
                <div style={{
                    width: '60px',
                    height: '3px',
                    background: 'linear-gradient(90deg, #6859ea, #9e77f3)',
                    margin: '0 auto 25px',
                    borderRadius: '5px'
                }}></div>

                <form style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }} onSubmit={createNewPost}>
                    <input 
                        type="text" 
                        placeholder="Title" 
                        value={title} 
                        onChange={ev=>setTitle(ev.target.value)}
                        style={{
                            padding: '15px',
                            borderRadius: '8px',
                            border: '1px solid #e0e0e0',
                            fontSize: '16px',
                            transition: 'all 0.3s ease',
                            backgroundColor: '#f8f9fa',
                            color: '#333'
                        }}
                    />  
                    <input 
                        type="summary" 
                        placeholder="Summary"
                        value={summary}
                        onChange={ev=>setSummary(ev.target.value)}
                        style={{
                            padding: '15px',
                            borderRadius: '8px',
                            border: '1px solid #e0e0e0',
                            fontSize: '16px',
                            transition: 'all 0.3s ease',
                            backgroundColor: '#f8f9fa',
                            color: '#333'
                        }}
                    />
                    <div style={{
                        position: 'relative',
                        marginBottom: '10px'
                    }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            color: '#555',
                            fontWeight: '500'
                        }}>Upload Feature Image</label>
                        <input 
                            type="file" 
                            onChange={ev=>setFiles(ev.target.files)}
                            style={{
                                padding: '10px 0',
                                width: '100%',
                                color: '#333'
                            }}
                        />
                    </div>
                    <div style={{
                        marginBottom: '15px'
                    }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            color: '#555',
                            fontWeight: '500'
                        }}>Content</label>
                        <div style={{
                            border: '1px solid #e0e0e0',
                            borderRadius: '8px',
                            overflow: 'hidden'
                        }}>
                            <ReactQuill 
                                value={content} 
                                modules={modules} 
                                onChange={newValue=>setContent(newValue)}
                                formats={formats}
                                style={{
                                    height: '300px',
                                    fontSize: '16px'
                                }}
                            />
                        </div>
                    </div>

                    {postInfoContext ? 
                        <button 
                            style={{
                                padding: '15px',
                                borderRadius: '8px',
                                border: 'none',
                                backgroundColor: isClickedOnce ? '#d3d3d3' : '#6859ea',
                                color: isClickedOnce ? '#a0a0a0' : 'white',
                                fontWeight: 'bold',
                                fontSize: '16px',
                                cursor: isClickedOnce ? 'not-allowed' : 'pointer',
                                transition: 'all 0.3s ease',
                                marginTop: '15px',
                                boxShadow: isClickedOnce ? 'none' : '0 4px 10px rgba(104, 89, 234, 0.2)'
                            }} 
                            onClick={updatePost} 
                            disabled={isClickedOnce}
                        >
                            Update Post
                        </button> 
                        : 
                        <button 
                            style={{
                                padding: '15px',
                                borderRadius: '8px',
                                border: 'none',
                                backgroundColor: isClickedOnce ? '#d3d3d3' : '#6859ea',
                                color: isClickedOnce ? '#a0a0a0' : 'white',
                                fontWeight: 'bold',
                                fontSize: '16px',
                                cursor: isClickedOnce ? 'not-allowed' : 'pointer',
                                transition: 'all 0.3s ease',
                                marginTop: '15px',
                                boxShadow: isClickedOnce ? 'none' : '0 4px 10px rgba(104, 89, 234, 0.2)'
                            }} 
                            disabled={isClickedOnce}
                        >
                            Create Post
                        </button>
                    }
                </form>  
            </div>
        </div>
    </>    
    )
}

