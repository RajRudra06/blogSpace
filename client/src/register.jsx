// first GEN code 

// import Header from "./header"
// import './App.css'
// import { useState } from "react"
// import { data } from "react-router-dom"

// const API_URL=import.meta.env.VITE_API_URL;

// export default function Register(){
//     const [username,setUsername]=useState('')
//     const [password,setPassword]=useState('')
//     const [firstName,setFirstName]=useState('')
//     const [lastName, setLastName]=useState('')
//     const [isClickedOnce,setIsClickedOnce]=useState(false)
//     const[email,setEmail]=useState('')
//     const [confirmPassword,setConfirmPassword]=useState('')
//     const isValidEmail = (email) => {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     };

//     async function register(){
//         // ev.preventDefault();

//         if (!isValidEmail(email)) {
//             alert("Invalid email format");
//             setEmail('')
            
//         }

//         else{

//             if(password==confirmPassword){ try {
//                 const res=await fetch(`${API_URL}/register`,{
//                 method:'POST',
//                 body:JSON.stringify({username,password,firstName,lastName,email}),
//                 headers:{'Content-Type':'application/json'}
//             })
//             const msgBackend=await res.json()
//             if(res.ok){
//                 alert('Registration Successful !!!'+msgBackend.msg);
//             }
//             else{
//                 alert('Registration Unsuccessful'+'-'+msgBackend.msg);
//             }
            
//             setUsername('');
//             setPassword('');
//             setConfirmPassword('');
//             setEmail('');
//             setFirstName('');
//             setLastName('');
    
//             } catch (error) {
//                 alert("Registration failed. Try again later...");
//                 console.log("Eror o f regsi:",error);
//             }}
    
//             else{
//                 alert("Confirm password correctly");
//                 setPassword('')
//                 setConfirmPassword('')
//             }

//         }

       
        

//     }
//     const isFormValid = username && password && firstName && confirmPassword && email && firstName && lastName;
//     function registerAndClickOnce(ev){
//         ev.preventDefault();
//         //setIsClickedOnce(false)
//         register();
//         //isFormValid=false;
//     }

//     return(

//         <main>
//         <Header/>
//         <div className="homeMain">
//         <div className="heading" style={{marginBottom:'20ppx'}}><h1>Register</h1>
//             </div>
//         <form className="register" onSubmit={registerAndClickOnce}>
                
//                 <input type="text" 
//                 placeholder="first name" 
//                 value={firstName}
//                 onChange={(ev)=>{setFirstName(ev.target.value)}
//                 }/>

//                 <input type="text" 
//                 placeholder="last name" 
//                 value={lastName}
//                 onChange={(ev)=>{setLastName(ev.target.value)}
//                 }/>

//                 <input type="text" 
//                 placeholder="pen name (for anonymity)" 
//                 value={username}
//                 onChange={(ev)=>{setUsername(ev.target.value)}
//                 }/>

//                 <input type="text" 
//                 placeholder="email" 
//                 value={email}
//                 onChange={(ev)=>{setEmail(ev.target.value)}
//                 }/>

//                 <input type="password" placeholder="password"
//                 value={password}
//                 onChange={(ev)=>{setPassword(ev.target.value)}}/>

//                 <input type="password" placeholder="confirm password"
//                 value={confirmPassword}
//                 onChange={(ev)=>{setConfirmPassword(ev.target.value)}}/>


// <button 
//                         style={{
//                             backgroundColor: isFormValid ? '#4CAF50' : '#D3D3D3', // Light gray when disabled
//                             color: isFormValid ? 'black' : '#A9A9A9', // Lighter text color when disabled
//                             cursor: isFormValid ? 'pointer' : 'not-allowed',
//                             border: 'none',
//                             padding: '12px 20px',
//                             borderRadius: '4px',
//                             fontSize: '16px',
//                             transition: 'background-color 0.3s ease',
//                             outline: 'none'
//                         }}
//                         disabled={!isFormValid&&!isClickedOnce}
//                     >
//                         Register
//                     </button>

//             </form>
//         </div>
        
//         </main>
        
//     )
// }

// improved UI

import Header from "./header"
import './App.css'
import { useState } from "react"
import { data } from "react-router-dom"

const API_URL=import.meta.env.VITE_API_URL;

export default function Register(){
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const [firstName,setFirstName]=useState('')
    const [lastName, setLastName]=useState('')
    const [isClickedOnce,setIsClickedOnce]=useState(false)
    const[email,setEmail]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    async function register(){
        // ev.preventDefault();

        if (!isValidEmail(email)) {
            alert("Invalid email format");
            setEmail('')
            
        }

        else{

            if(password==confirmPassword){ try {
                const res=await fetch(`${API_URL}/register`,{
                method:'POST',
                body:JSON.stringify({username,password,firstName,lastName,email}),
                headers:{'Content-Type':'application/json'}
            })
            const msgBackend=await res.json()
            if(res.ok){
                alert('Registration Successful !!!'+msgBackend.msg);
            }
            else{
                alert('Registration Unsuccessful'+'-'+msgBackend.msg);
            }
            
            setUsername('');
            setPassword('');
            setConfirmPassword('');
            setEmail('');
            setFirstName('');
            setLastName('');
    
            } catch (error) {
                alert("Registration failed. Try again later...");
                console.log("Eror o f regsi:",error);
            }}
    
            else{
                alert("Confirm password correctly");
                setPassword('')
                setConfirmPassword('')
            }

        }
    }
    const isFormValid = username && password && firstName && confirmPassword && email && firstName && lastName;
    function registerAndClickOnce(ev){
        ev.preventDefault();
        //setIsClickedOnce(false)
        register();
        //isFormValid=false;
    }

    return(
        <>
        <Header/>
        <main style={{
            minHeight: '100vh',
            backgroundColor: '#f7f9fc',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            marginTop:'50px'
        }}>
            
            <div style={{
                maxWidth: '550px',
                margin: '30px auto',
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
                    }}>Register</h1>
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
                    gap: '16px'
                }} onSubmit={registerAndClickOnce}>
                    <div style={{
                        display: 'flex',
                        gap: '16px',
                        width: '100%'
                    }}>
                        <input 
                            type="text" 
                            placeholder="First Name" 
                            value={firstName}
                            onChange={(ev)=>{setFirstName(ev.target.value)}}
                            style={{
                                width: '50%',
                                padding: '14px',
                                borderRadius: '8px',
                                border: '1px solid #e0e0e0',
                                fontSize: '16px',
                                backgroundColor: '#f8f9fa',
                                transition: 'border-color 0.3s, box-shadow 0.3s',
                                outline: 'none'
                            }}
                        />

                        <input 
                            type="text" 
                            placeholder="Last Name" 
                            value={lastName}
                            onChange={(ev)=>{setLastName(ev.target.value)}}
                            style={{
                                width: '50%',
                                padding: '14px',
                                borderRadius: '8px',
                                border: '1px solid #e0e0e0',
                                fontSize: '16px',
                                backgroundColor: '#f8f9fa',
                                transition: 'border-color 0.3s, box-shadow 0.3s',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <input 
                        type="text" 
                        placeholder="Pen Name (for anonymity)" 
                        value={username}
                        onChange={(ev)=>{setUsername(ev.target.value)}}
                        style={{
                            width: '100%',
                            padding: '14px',
                            borderRadius: '8px',
                            border: '1px solid #e0e0e0',
                            fontSize: '16px',
                            backgroundColor: '#f8f9fa',
                            transition: 'border-color 0.3s, box-shadow 0.3s',
                            outline: 'none'
                        }}
                    />

                    <input 
                        type="text" 
                        placeholder="Email" 
                        value={email}
                        onChange={(ev)=>{setEmail(ev.target.value)}}
                        style={{
                            width: '100%',
                            padding: '14px',
                            borderRadius: '8px',
                            border: '1px solid #e0e0e0',
                            fontSize: '16px',
                            backgroundColor: '#f8f9fa',
                            transition: 'border-color 0.3s, box-shadow 0.3s',
                            outline: 'none'
                        }}
                    />

                    <input 
                        type="password" 
                        placeholder="Password"
                        value={password}
                        onChange={(ev)=>{setPassword(ev.target.value)}}
                        style={{
                            width: '100%',
                            padding: '14px',
                            borderRadius: '8px',
                            border: '1px solid #e0e0e0',
                            fontSize: '16px',
                            backgroundColor: '#f8f9fa',
                            transition: 'border-color 0.3s, box-shadow 0.3s',
                            outline: 'none'
                        }}
                    />

                    <input 
                        type="password" 
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(ev)=>{setConfirmPassword(ev.target.value)}}
                        style={{
                            width: '100%',
                            padding: '14px',
                            borderRadius: '8px',
                            border: '1px solid #e0e0e0',
                            fontSize: '16px',
                            backgroundColor: '#f8f9fa',
                            transition: 'border-color 0.3s, box-shadow 0.3s',
                            outline: 'none'
                        }}
                    />

                    <button 
                        style={{
                            backgroundColor: isFormValid ? 'linear-gradient(135deg, #6859ea, #9e77f3)' : '#D3D3D3',
                            background: isFormValid ? 'linear-gradient(135deg, #6859ea, #9e77f3)' : '#D3D3D3',
                            color: isFormValid ? 'white' : '#A9A9A9',
                            cursor: isFormValid ? 'pointer' : 'not-allowed',
                            border: 'none',
                            padding: '15px 20px',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: '600',
                            transition: 'all 0.3s ease',
                            outline: 'none',
                            marginTop: '10px',
                            boxShadow: isFormValid ? '0 4px 10px rgba(104, 89, 234, 0.2)' : 'none'
                        }}
                        disabled={!isFormValid&&!isClickedOnce}
                    >
                        Create Account
                    </button>
                </form>
            </div>
        </main>
        </>
       
    )
}