// import {Link} from "react-router-dom"
// import './App.css'
// import { useContext, useEffect, useState } from "react"
// import { UserContext } from "./UserContext.jsx"
// import { IsInContext } from "./LoginContext.jsx"
// import { Navigate } from "react-router-dom"

// const API_URL=import.meta.env.VITE_API_URL;


// export default function HeaderPost(){
//   const {setUserInfo,userInfo}=useContext(UserContext)
//   const {isIn,setIsIn}=useContext(IsInContext);
//   const [redirect,setRedirect]=useState(false)

//   useEffect(()=>{
//       fetch(`${API_URL}/profile`,{
//         credentials:'include',
//       }).then(response=>{
//         response.json().then(userInfo=>{
//             //setUserInfo(userInfo)
//         })
//       })
     
//   },[])

//   function logout(){
//     fetch(`${API_URL}/logout`,{
//       credentials:'include',
//       method:'POST',
//     }).then(()=>{
//       setUserInfo(null);
//       setIsIn(false);
//       setRedirect(true);
//     })
    
//   }

//   const username=userInfo?.username

//   if(redirect){
//     return(
//         <Navigate to={'/'}/>
//     )
// }
//     return(

//       <div className="headerPost"> 
//          <header className="helloHeader">
//           <Link to="/" className="logo">Blog Space</Link>
//           <nav>
//             {username?<><Link to="/create">Create new Post</Link><Link to="/userprofile" style={{ color: '#555',
//                 textDecoration: 'none',
//                 fontWeight: '500',
//                 transition: 'color 0.2s ease'}}>My Profile  <p style={{ fontWeight:'bold', display:'inline'}}>
//             ({userInfo.username})
//           </p></Link>
//             <Link to="/" onClick={logout} style={{ cursor: 'pointer', color: '#e74c3c'}}>Logout
// </Link></>:<> <Link to="/login">Login</Link>
//             <Link to="/register">Register</Link></>}
//             {/* this is calling of that route */}
//           </nav>
//         </header>
//       </div>
       
//     )
// }


import {Link} from "react-router-dom" 
import './App.css' 
import { useContext, useEffect, useState } from "react" 
import { UserContext } from "./UserContext.jsx" 
import { IsInContext } from "./LoginContext.jsx" 
import { useNavigate } from "react-router-dom"  

const API_URL=import.meta.env.VITE_API_URL;   

export default function HeaderPost(){   
  const {setUserInfo, userInfo} = useContext(UserContext)   
  const {isIn, setIsIn} = useContext(IsInContext);   
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const username = userInfo?.username;

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/profile`, {
      credentials: 'include',
    }).then(response => {
      response.json().then(userData => {
        setUserInfo(userData)
        setLoading(true)
        console.log("User data:", userData)
      }).catch(err => {
        console.error("Error parsing user data:", err)
        setLoading(false)
      })
    }).catch(err => {
      console.error("Error fetching profile:", err)
      setLoading(false)
    })
  }, [])    

  function logout(){
    fetch(`${API_URL}/logout`, {
      credentials: 'include',
      method: 'POST',
    })
    setUserInfo(null)
    setIsIn(false)
    navigate('/')
  }

  return(
    <div className="headerPost">
      <header className="helloHeader">
        <Link to="/" className="logo">Blog Space</Link>
        <nav>
          {isIn ? (loading ? (
            <>
              <Link to="/create">Create new Post</Link>
              <Link to="/userprofile" style={{ 
                color: '#555',
                textDecoration: 'none',
                fontWeight: '500',
                transition: 'color 0.2s ease'
              }}>
                My Profile  
                <p style={{ fontWeight:'bold', display:'inline'}}>
                  {userInfo?.username ? `(${userInfo.username})` : ''}
                </p>
              </Link>
              <Link to="/" onClick={logout} style={{ cursor: 'pointer', color: '#e74c3c'}}>Logout </Link>
            </>
          ) : (
            <div className="loading-placeholder">
              <div className="loading-dot"></div>
              <div className="loading-dot"></div>
              <div className="loading-dot"></div>
            </div>
          )) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
      
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