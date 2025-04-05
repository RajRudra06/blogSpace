import Header from "./header"
import './App.css'
import { useContext, useState } from "react"
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const API_URL=import.meta.env.VITE_API_URL;

export default function Login(){
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [redirect,setRedirect]=useState(false);
    const {setUserInfo,userInfo}=useContext(UserContext);
    const [isClickedOnce,setIsClickedOnce]=useState(false);

    async function login(ev){
        setIsClickedOnce(true);
        ev.preventDefault();

        try {
            const res = await fetch(`${API_URL}/login`, {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
        
            const msgBackend = await res.json();
            setUserInfo(msgBackend); // Use msgBackend directly

            console.log("Render BACKEND:",msgBackend,"renderer userinfo", userInfo);
        
            if (res.ok) {
                console.log("Render USERINFO ",userInfo);
                alert('Login Successful !!!');
                setRedirect(true);
                console.log("renderer::::",userInfo)
            } else {
                alert('Login Unsuccessful, check your details - ' + msgBackend.msg);
            }
        
            setUsername('');
            setPassword('');
        } catch (error) {
            alert('Login failed. Try again later... ' + error);
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
                <button style={{cursor: isClickedOnce ? 'not-allowed' : 'pointer', 
            backgroundColor: isClickedOnce ? '#d3d3d3' : '', 
            color: isClickedOnce ? '#a0a0a0' : ''} } disabled={isClickedOnce}>Login</button>
            </form>
            </div>
            
        </main>
    )
}