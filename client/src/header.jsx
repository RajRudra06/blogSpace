// // ************first GEN************


import {Link} from "react-router-dom"
import './App.css'
import { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserContext"
import { Navigate } from "react-router-dom"
import { IsInContext } from "./LoginContext"
import { useNavigate } from "react-router-dom";


const API_URL=import.meta.env.VITE_API_URL;

export default function Header(){
  const {setUserInfo,userInfo}=useContext(UserContext)
  const {isIn,setIsIn}=useContext(IsInContext);
  // const [redirect,setRedirect]=useState(false)
  const navigate = useNavigate();


  useEffect(()=>{
      fetch(`${API_URL}/profile`,{
        credentials:'include',
      }).then(response=>{
        response.json().then(userInfo=>{
            setUserInfo(userInfo)
        })
      })
     
  },[])

  function logout(){
    fetch(`${API_URL}/logout`,{
      credentials:'include',
      method:'POST',
    })
    setUserInfo(null)
    setIsIn(false)
    navigate('/');
  
  }

  const username=userInfo?.username

  const headerStyle = {
    position: 'sticky',    
    top: 0,                
    zIndex: 1000,           
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  };


    return(
      <div className="header" style={headerStyle}>
        <div className="headerMain">
      <header className="helloHeader" style={{maxWidth:'1200px',width:'100%'}}>
        <Link to="/" className="logo" style={{
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
    textDecoration: 'none'
  }}>Blog Space</Link>
        <nav>
          {isIn ? (username ? (
            <>

            <Link to="/trendingauthor" style={{
                color: '#555',
                textDecoration: 'none',
                fontWeight: '500',
                transition: 'color 0.2s ease'
              }}>Trending Authors</Link>


              <Link to="/create" style={{
                color: '#555',
                textDecoration: 'none',
                fontWeight: '500',
                transition: 'color 0.2s ease'
              }}>Create new Post</Link>
              <Link to="/userprofile" style={{ color: '#555',
                textDecoration: 'none',
                fontWeight: '500',
                transition: 'color 0.2s ease'}} >My Profile 
                <p style={{fontWeight:'bold', display:'inline'}}>
                ({userInfo.username})
              </p>
              </Link>

              <Link  to="/followingposts">Following Posts</Link>
              <Link to="/" onClick={logout} style={{ cursor: 'pointer', color: '#e74c3c'}}>Logout</Link>
            </>
          ) : (
             <><div className="loading-placeholder">
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
          </div></>
          )):<><Link to="/login">Login</Link>
          <Link to="/register">Register</Link></>}
          
        </nav>
      </header>
      </div>
      
      
      <style jsx>{`
        .loading-placeholder {
          display: flex;
          align-items: center;
          gap: 6px;
          height: 24px;
        }
        
        .loading-dot {
          width: 8px;
          height: 8px;
          background-color: #4a90e2;
          border-radius: 50%;
          animation: pulse 1.5s infinite ease-in-out;
        }
        
        .loading-dot:nth-child(2) {
          animation-delay: 0.3s;
        }
        
        .loading-dot:nth-child(3) {
          animation-delay: 0.6s;
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
        }
      `}</style>
    </div>
       
    )
}


