import Header from "../header";
import '/Users/rudrarajpurohit/Desktop/blog space /client/src/App.css'
import 'react-quill-new/dist/quill.snow.css';
import ReactQuill from "react-quill-new" 
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useContext, useEffect} from "react"
import { UserContext } from "/Users/rudrarajpurohit/Desktop/blog space /client/src/UserContext.jsx"
import { PostContext } from "/Users/rudrarajpurohit/Desktop/blog space /client/src/postContext.jsx";

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
    const [redirect,setRedirect]=useState(false);
    

    useEffect(() => {
        if (postInfoContext) {
            setTitle(postInfoContext.title);
            setSummary(postInfoContext.summary);
            setContent(postInfoContext.content);
        }
    }, [postInfoContext]);
    
    async function updatePost(ev){
        const postContextData={
            _id:postInfoContext._id,
            title:title,
            summary:summary,
            content:content
        }
        ev.preventDefault();
        

        try{
            const responseUpdate =await fetch('http://localhost:3000/updatepost',{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(postContextData),
        });

        console.log(responseUpdate);

        if(responseUpdate.ok){
            setContent('');
            setTitle('');
            setSummary('');
            alert("Post Updated succesfully");
            setRedirect(true);
            console.log(userInfo.username);
        }


        }
        catch(err){
            alert("Server Down, try again later")
        }


    }

    async function createNewPost(ev){
        const data=new FormData();
        data.set('title',title);
        data.set('summary',summary);
        data.set('content',content);
        data.set('author',userInfo.username);
        data.set('file',files[0]);
        ev.preventDefault();


        // State Updates Should Happen:
        // Inside an event handler (like onClick, onChange, onSubmit, etc.).
        // Inside a useEffect (when you want to update state based on props, context, or other state).

       try { 
        const response =await fetch('http://localhost:3000/createpost',{
            method:'POST',
            body:data,
        });

        const msgPost =  await response.json();
        //console.log(msgPost);
        if(response.ok){
            setContent('');
            setTitle('');
            setSummary('');
            alert("Post created succesfully and saved");
            setRedirect(true);
            console.log(userInfo.username);
        }

        else{
            alert("Response from server not OK"+response.ok);
        }
        
        }

        catch(err){
            alert("Server down. try again later")
            console.log(msgPost.msg);
        }
    
    }

    
    if(redirect){
        return <Navigate to ={'/'}/>    
    }

    return (
    <>

        <Header/>
        <div className="homeMain">
        <div className="createComponent">

<form className="createPostForm" onSubmit={createNewPost}>
    <input type="text" placeholder="title" value={title} onChange={ev=>setTitle(ev.target.value)}/>  
    <input type="summary" placeholder="summary"
    value={summary}
    onChange={ev=>setSummary(ev.target.value)}/>
    <input type="file" onChange={ev=>setFiles(ev.target.files)}/>  
    <ReactQuill value={content} modules={modules} 
    onChange={newValue=>setContent(newValue)}
    formats={formats}/>

    {postInfoContext?<button style={{marginTop:'10px', cursor:'pointer'}}onClick={updatePost}>Update Post</button>:<button style={{marginTop:'10px'}}>Create Post</button>}
</form>  

</div>
        </div>
        
    </>
        
    )
}

