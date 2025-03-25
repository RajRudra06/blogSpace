import { format } from "date-fns";
import { Link } from "react-router-dom";
import '/Users/rudrarajpurohit/Desktop/Blog Space/client/src/App.css'


const API_URL=import.meta.env.VITE_API_URL;

export default function AuthorSinglePost({id,title,summary,cover,content,created_at,author}){
  console.log(cover)

  function formatDateTime(created_at) {
    const date = new Date(created_at);
    
    // Convert to IST (UTC+5:30)
    const ISTOffset = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds
    const ISTTime = new Date(date.getTime() + ISTOffset);
  
    return ISTTime.toLocaleString("en-GB", { 
        day: "numeric", 
        month: "long", 
        year: "numeric",
        hour: "2-digit", 
        minute: "2-digit",
        second: "2-digit",
        hour12: false // Set to true if you want AM/PM format
    });
  }

  const formattedDate = formatDateTime(created_at);

    return(
        <div style={{display:'flex', justifyContent:'center', marginBottom:'50px'}}>
        <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
          <div className="image"> 
          <Link to={`/post/${id}`}>
          <img src={`${API_URL}/`+cover} alt="" />
          </Link>
          </div>
           
          <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <Link to={`/post/${id}`}>
            <h2 
  style={{
    color: 'black', 
    fontSize: '40px', 
    textDecoration: 'none',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer'
  }}
  onMouseEnter={(e) => e.target.style.setProperty('--underline-width', '100%')}
  onMouseLeave={(e) => e.target.style.setProperty('--underline-width', '0%')}
>
  {title}
  <style>
    {`
      h2::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -2px;
        width: var(--underline-width, 0%);
        height: 2px;
        background-color: currentColor;
        transition: width 0.2s ease;
      }
    `}
  </style>
</h2>

            </Link>
            
            <div className="about">
              
            <time className="time">{formattedDate}</time>
            </div>
            <p className="summary" style={{ fontSize: '20px', fontFamily: 'Poppins, sans-serif', lineHeight: '1.5', color: '#555', fontWeight: '400', letterSpacing: '0.5px' }}>{summary}</p>




          </div>
        </div>    
            
            
        </div>
       
      
    )
}
