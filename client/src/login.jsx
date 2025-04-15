// ******************first GEN code******************

// import Header from "./header"
// import './App.css'
// import { useContext, useState } from "react"
// import { Navigate } from "react-router-dom";
// import { UserContext } from "./UserContext";
// import { IsInContext } from "./LoginContext";

// const API_URL=import.meta.env.VITE_API_URL;

// export default function Login(){
//     const [username,setUsername]=useState('');
//     const [password,setPassword]=useState('');
//     const [redirect,setRedirect]=useState(false);
//     const {setUserInfo,userInfo}=useContext(UserContext);
//     const [isClickedOnce,setIsClickedOnce]=useState(false);
//     const {isIn,setIsIn}=useContext(IsInContext);

//     async function login(ev){
//         setIsClickedOnce(true);
//         ev.preventDefault();

//         try {
//             const res = await fetch(`${API_URL}/login`, {
//                 method: 'POST',
//                 body: JSON.stringify({ username, password }),
//                 headers: { 'Content-Type': 'application/json' },
//                 credentials: 'include',
//             });
        
//             const msgBackend = await res.json();
//             setUserInfo(msgBackend); // Use msgBackend directly

//             console.log("Render BACKEND:",msgBackend,"renderer userinfo", userInfo);
        
//             if (res.ok) {
//                 console.log("Render USERINFO ",userInfo);
//                 alert('Login Successful !!!');
//                 setRedirect(true);
//                 setIsIn(true)
//                 console.log("renderer::::",userInfo)
//             } else {
//                 alert('Login Unsuccessful, check your details - ' + msgBackend.msg);
//             }
        
//             setUsername('');
//             setPassword('');
//         } catch (error) {
//             alert('Login failed. Try again later... ' + error);
//         }
        

//     }
//     if(redirect){
//         return(
//             <Navigate to={'/'}/>
//         )
//     }
//     return(
//         <main>
//             <Header/>
//             <div className="homeMain">
//             <div className="heading" style={{marginBottom:'20px'}}><h1>Login</h1>
//             </div>
            
//             <form className="login" onSubmit={login}>
//                 <input type="text" placeholder="pen name" 
//                 value={username}
//                 onChange={(ev)=>{setUsername(ev.target.value)}
//                 }
//                 />
//                 <input type="password" placeholder="password" value={password}
//                 onChange={(ev)=>{setPassword(ev.target.value)}}/>
//                 <button style={{cursor: isClickedOnce ? 'not-allowed' : 'pointer', 
//             backgroundColor: isClickedOnce ? '#d3d3d3' : '', 
//             color: isClickedOnce ? '#a0a0a0' : ''} } disabled={isClickedOnce}>Login</button>
//             </form>
//             </div>
            
//         </main>
//     )
// }

// improved UI

import Header from "./header"
import './App.css'
import { useContext, useState } from "react"
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { IsInContext } from "./LoginContext";

const API_URL=import.meta.env.VITE_API_URL;

export default function Login(){
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [redirect,setRedirect]=useState(false);
    const {setUserInfo,userInfo}=useContext(UserContext);
    const [isClickedOnce,setIsClickedOnce]=useState(false);
    const {isIn,setIsIn}=useContext(IsInContext);
    
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
                setIsIn(true)
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
        <>
        <Header/>

        <main style={{
            minHeight: '100vh',
            backgroundColor: '#f7f9fc',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        }}>
            <div style={{
                maxWidth: '450px',
                margin: '120px auto',
                padding: '35px',
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
                transition: 'transform 0.3s ease'
            }}>
                <div style={{
                    textAlign: 'center',
                    marginBottom: '30px'
                }}>
                    <h1 style={{
                        color: '#333',
                        fontSize: '2rem',
                        marginBottom: '10px',
                        fontWeight: '600'
                    }}>Login</h1>
                    <div style={{
                        height: '3px',
                        width: '60px',
                        background: 'linear-gradient(90deg, #6859ea, #9e77f3)',
                        margin: '0 auto',
                        borderRadius: '5px'
                    }}></div>
                </div>
                
                <form style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                }} onSubmit={login}>
                    <div style={{
                        position: 'relative'
                    }}>
                        <input 
                            type="text" 
                            placeholder="Pen name"
                            value={username}
                            onChange={(ev)=>{setUsername(ev.target.value)}}
                            required
                            style={{
                                width: '100%',
                                padding: '15px',
                                border: '1px solid #e0e0e0',
                                borderRadius: '8px',
                                fontSize: '16px',
                                transition: 'all 0.3s ease',
                                backgroundColor: '#f8f9fa',
                                color: '#333',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>
                    <div style={{
                        position: 'relative'
                    }}>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password}
                            onChange={(ev)=>{setPassword(ev.target.value)}}
                            required
                            style={{
                                width: '100%',
                                padding: '15px',
                                border: '1px solid #e0e0e0',
                                borderRadius: '8px',
                                fontSize: '16px',
                                transition: 'all 0.3s ease',
                                backgroundColor: '#f8f9fa',
                                color: '#333',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>
                    <button 
                        style={{
                            padding: '15px',
                            border: 'none',
                            borderRadius: '8px',
                            background: isClickedOnce ? '#d3d3d3' : 'linear-gradient(135deg, #6859ea, #9e77f3)',
                            color: isClickedOnce ? '#a0a0a0' : 'white',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: isClickedOnce ? 'not-allowed' : 'pointer',
                            transition: 'all 0.3s ease',
                            marginTop: '50px',
                            boxShadow: isClickedOnce ? 'none' : '0 4px 10px rgba(104, 89, 234, 0.2)'
                        }} 
                        disabled={isClickedOnce}
                    >
                        Login
                    </button>
                </form>
            </div>
        </main>
        </>
        
    )
}