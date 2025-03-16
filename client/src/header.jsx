import {Link} from "react-router-dom"
import '/Users/rudrarajpurohit/Desktop/blog space /client/src/App.css'
import { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserContext"
import '/Users/rudrarajpurohit/Desktop/blog space /client/src/App.css'
import { Navigate } from "react-router-dom"

export default function Header(){
  const {setUserInfo,userInfo}=useContext(UserContext)
  useEffect(()=>{
      fetch("http://localhost:3000/profile",{
        credentials:'include',
      }).then(response=>{
        response.json().then(userInfo=>{
            setUserInfo(userInfo)
        })
      })
     
  },[])

  function logout(){
    fetch('http://localhost:3000/logout',{
      credentials:'include',
      method:'POST',
    })
    setUserInfo(null)
    window.location.reload();    
  }

  console.log("from header:::::", userInfo)

  const username=userInfo?.username

    return(
      <div className="headerMain">
 <header className="helloHeader">
          <a href="/" className="logo">Blog Space</a>
          <nav>
            {username?<><Link to="/create">Create new Post</Link>
            <Link to="/userprofile">My Profile <p style={{ fontWeight: 'bold', fontStyle: 'italic', display:'inline'}}>
            ({userInfo.username})
          </p></Link>
            <Link to="/" onClick={logout}>Logout 
</Link></>:<> <Link to="/login">Login</Link>
            <Link to="/register">Register</Link></>}
            {/* this is calling of that route */}
          </nav>
        </header>
      </div>
       
    )
}