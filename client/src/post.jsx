import { format } from "date-fns";
import { Link } from "react-router-dom";
import './App.css'

const API_URL=import.meta.env.VITE_API_URL;

export default function Post({id,title,summary,cover,content,created_at,author}){

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
    <div className="post">
      <Link to={`/post/${id}`} className="postLink">
        <div className="imageContainer">
          <img src={`${API_URL}/`+cover} alt={title} className="postImage" />
          <div className="imageOverlay"></div>
        </div>
      </Link>
      
      <div className="postContent">
        <Link to={`/post/${id}`} className="titleLink">
          <h2 className="postTitle">{title}</h2>
        </Link>
        
        <div className="postMeta">
          {author ? (
            <Link to={`/authorpage/${author}`} className="authorLink">
              <span className="author">@{author}</span>
            </Link>
          ) : null}
          <p style={{marginTop:'6px'}}><time className="postTime">{formattedDate}</time></p>
        </div>
        
        <p className="postSummary">{summary}</p>
        
        <Link to={`/post/${id}`} className="readMoreLink">
          <span>Read more</span>
        </Link>
      </div>

      <style jsx>{`
        .post {
          display: flex;
          flex-direction: column;
          background-color: #fff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          margin-bottom: 30px;
        }
        
        .post:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }
        
        .postLink {
          text-decoration: none;
          color: inherit;
          display: block;
        }
        
        .imageContainer {
          height: 250px;
          position: relative;
          overflow: hidden;
        }
        
        .postImage {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .imageOverlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .imageContainer:hover .postImage {
          transform: scale(1.05);
        }
        
        .imageContainer:hover .imageOverlay {
          opacity: 1;
        }
        
        .postContent {
          padding: 25px;
        }
        
        .titleLink {
          text-decoration: none;
          color: inherit;
        }
        
        .postTitle {
          margin: 0 0 15px 0;
          font-size: 24px;
          font-weight: 700;
          color: #333;
          position: relative;
          display: inline-block;
          transition: color 0.2s ease;
        }
        
        .postTitle::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 0;
          height: 2px;
          background-color: #0D9488;
          transition: width 0.3s ease;
        }
        
        .titleLink:hover .postTitle {
          color: #0D9488;
        }
        
        .titleLink:hover .postTitle::after {
          width: 100%;
        }
        
        .postMeta {
          display: flex;
          align-items:center;
          margin-bottom: 15px;
          color: #777;
          flex-wrap: wrap;
          gap: 15px;
        }
        
        .author {
          font-size: 16px;
          color: #0D9488;
          font-style: italic;
          font-weight: 500;
          transition: color 0.2s ease;
        }
        
        .authorLink {
          text-decoration: none;
          position: relative;
        }
        
        .authorLink:hover .author {
          color: #0a6d63;
        }
        
        .postTime {
          font-size: 14px;
          color: #888;
        }
        
        .postSummary {
          font-size: 16px;
          line-height: 1.6;
          color: #555;
          margin-bottom: 20px;
        }
        
        .readMoreLink {
          display: inline-flex;
          align-items: center;
          color: #0D9488;
          font-weight: 500;
          text-decoration: none;
          font-size: 15px;
          transition: color 0.2s ease;
        }
        
        .readMoreLink:hover {
          color: #0a6d63;
        }
        
        .readMoreLink span {
          position: relative;
        }
        
        .readMoreLink span::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 1px;
          background-color: currentColor;
          left: 0;
          bottom: -2px;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.3s ease;
        }
        
        .readMoreLink:hover span::after {
          transform: scaleX(1);
          transform-origin: left;
        }
        
        @media (max-width: 768px) {
          .post {
            margin-bottom: 20px;
          }
          
          .imageContainer {
            height: 200px;
          }
          
          .postTitle {
            font-size: 20px;
          }
          
          .postContent {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  )
}