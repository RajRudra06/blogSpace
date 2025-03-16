import { format } from "date-fns";
import { Link } from "react-router-dom";
import '/Users/rudrarajpurohit/Desktop/blog space /client/src/App.css'
export default function AuthorSinglePost({_id,title,summary,cover,content,createdAt,author}){
  console.log(cover)
    return(
        <div style={{display:'flex', justifyContent:'center', marginBottom:'50px'}}>
        <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
          <div className="image"> 
          <Link to={`/post/${_id}`}>
          <img src={'http://localhost:3000/'+cover} alt="" />
          </Link>
          </div>
           
          <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <Link to={`/post/${_id}`}>
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
              
              <time className="time">{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time>
            </div>
            <p className="summary" style={{ fontSize: '20px', fontFamily: 'Poppins, sans-serif', lineHeight: '1.5', color: '#555', fontWeight: '400', letterSpacing: '0.5px' }}>{summary}</p>




          </div>
        </div>    
            
            
        </div>
       
      
    )
}
