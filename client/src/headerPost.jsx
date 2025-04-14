import {Link} from "react-router-dom"
import '/Users/rudrarajpurohit/Desktop/Blog Space/client/src/App.css'
import { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserContext.jsx"
import { IsInContext } from "./LoginContext.jsx"
import { Navigate } from "react-router-dom"

const API_URL=import.meta.env.VITE_API_URL;


export default function HeaderPost(){
  const {setUserInfo,userInfo}=useContext(UserContext)
  const {isIn,setIsIn}=useContext(IsInContext);
  const [redirect,setRedirect]=useState(false)

  useEffect(()=>{
      fetch(`${API_URL}/profile`,{
        credentials:'include',
      }).then(response=>{
        response.json().then(userInfo=>{
            //setUserInfo(userInfo)
        })
      })
     
  },[])

  function logout(){
    fetch(`${API_URL}/logout`,{
      credentials:'include',
      method:'POST',
    }).then(()=>{
      setUserInfo(null);
      setIsIn(false);
      setRedirect(true);
    })
    
  }

  const username=userInfo?.username

  if(redirect){
    return(
        <Navigate to={'/'}/>
    )
}
    return(

      <div className="headerPost"> 
         <header className="helloHeader">
          <Link to="/" className="logo">Blog Space</Link>
          <nav>
            {username?<><Link to="/create">Create new Post</Link><Link to="/userprofile" style={{ color: '#555',
                textDecoration: 'none',
                fontWeight: '500',
                transition: 'color 0.2s ease'}}>My Profile  <p style={{ fontWeight:'bold', display:'inline'}}>
            ({userInfo.username})
          </p></Link>
            <Link to="/" onClick={logout} style={{ cursor: 'pointer', color: '#e74c3c'}}>Logout
</Link></>:<> <Link to="/login">Login</Link>
            <Link to="/register">Register</Link></>}
            {/* this is calling of that route */}
          </nav>
        </header>
      </div>
       
    )
}