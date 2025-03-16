import Header from "./header"
import '/Users/rudrarajpurohit/Desktop/blog space /client/src/App.css'
import { useContext, useState } from "react"
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Login(){
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [redirect,setRedirect]=useState(false);
    const {setUserInfo,userInfo}=useContext(UserContext);

    async function login(ev){
        ev.preventDefault();

        try {
            const res=await fetch("http://localhost:3000/login",{
            method:'POST',
            body:JSON.stringify({username,password}),
            headers:{'Content-Type':'application/json'},
            credentials:'include',
        })
        const msgBackend=await res.json()
        console.log(msgBackend)
        if(res.ok){
            res.json().then(userInfo=>{
                // setting the values from server to common userContext
                setUserInfo(userInfo)
            })
            alert('Login Successful !!!');
            setRedirect(true)
        }
        else{
            alert('Login Unsuccessful, check your details'+'-'+msgBackend.msg);
        }
        
        setUsername('');
        setPassword('');
        } catch (error) {
            alert("Login failed. Try again later... "+error)
        }

    }
    if(redirect){
        return(
            <Navigate to={'/'}/>
        )
    }
    return(
        <main>
            <Header/>
            <div className="homeMain">
            <div className="heading" style={{marginBottom:'20px'}}><h1>Login</h1>
            </div>
            
            <form className="login" onSubmit={login}>
                <input type="text" placeholder="pen name" 
                value={username}
                onChange={(ev)=>{setUsername(ev.target.value)}
                }
                />
                <input type="password" placeholder="password" value={password}
                onChange={(ev)=>{setPassword(ev.target.value)}}/>
                <button style={{cursor:'pointer'}}>Login</button>
            </form>
            </div>
            
        </main>
    )
}