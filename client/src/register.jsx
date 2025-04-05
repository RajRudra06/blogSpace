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

        <main>
        <Header/>
        <div className="homeMain">
        <div className="heading" style={{marginBottom:'20ppx'}}><h1>Register</h1>
            </div>
        <form className="register" onSubmit={registerAndClickOnce}>
                
                <input type="text" 
                placeholder="first name" 
                value={firstName}
                onChange={(ev)=>{setFirstName(ev.target.value)}
                }/>

                <input type="text" 
                placeholder="last name" 
                value={lastName}
                onChange={(ev)=>{setLastName(ev.target.value)}
                }/>

                <input type="text" 
                placeholder="pen name (for anonymity)" 
                value={username}
                onChange={(ev)=>{setUsername(ev.target.value)}
                }/>

                <input type="text" 
                placeholder="email" 
                value={email}
                onChange={(ev)=>{setEmail(ev.target.value)}
                }/>

                <input type="password" placeholder="password"
                value={password}
                onChange={(ev)=>{setPassword(ev.target.value)}}/>

                <input type="password" placeholder="confirm password"
                value={confirmPassword}
                onChange={(ev)=>{setConfirmPassword(ev.target.value)}}/>


<button 
                        style={{
                            backgroundColor: isFormValid ? '#4CAF50' : '#D3D3D3', // Light gray when disabled
                            color: isFormValid ? 'black' : '#A9A9A9', // Lighter text color when disabled
                            cursor: isFormValid ? 'pointer' : 'not-allowed',
                            border: 'none',
                            padding: '12px 20px',
                            borderRadius: '4px',
                            fontSize: '16px',
                            transition: 'background-color 0.3s ease',
                            outline: 'none'
                        }}
                        disabled={!isFormValid&&!isClickedOnce}
                    >
                        Register
                    </button>

            </form>
        </div>
        
        </main>
        
    )
}