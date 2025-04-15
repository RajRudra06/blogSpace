import { useState, useEffect, useContext } from 'react';
//import { UserContext } from "../UserContext";
//import { useContext } from "react"
//import { PostContext } from "../postContext";
//import { UserContext } from "../UserContext";

const API_URL = import.meta.env.VITE_API_URL;

export default function CommentSection({ post_id,PostContext,UserContext }) {
    
  const {postInfoContext,setPostInfoContext}=useContext(PostContext);
  const {setUserInfo,userInfo}=useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [noComments, setNoComments]=useState(null);

  useEffect(() => {
    fetchComments();
  }, [post_id]);

  const fetchComments = async () => {
    try {
   
      const response = await fetch(`${API_URL}/comments/${post_id}`);
      const data = await response.json();
      console.log("result got",data.comments, post_id);

      if(data.gotComments){
        console.log("comments",data.comments);
        setIsLoading(false);
        setNoComments(false)
        setComments(data.comments);
      }

      else if(!data.gotComments){
        setComments([])
      }

      if(data.number==0){
        setNoComments(true)
      }
     
    } catch (err) {
      setError('Error loading comments. Please try again later.');
      console.error('Error fetching comments:', err);
    } 
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    
    if (!userInfo?.username) {
      alert('Please log in to comment');
      return;
    }
    
    if (!newComment.trim()) return;
    
    try {
      const response = await fetch(`${API_URL}/postcomments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          post_id: post_id,
          username: userInfo.username,
          content: newComment
        })
      });
      
      const data = await response.json();
      
      if(data.commentInserted){
        setNewComment('');
        fetchComments(); // Refresh comments after adding a new one
        alert("Comment Inserted")

      }
      else if(data.commentInserted){
        alert("Comment not Inserted")
        setError('Failed to add comment');
      }
       else {
        //setError('Failed to add comment');
      }
    } 
    
    catch (err) {
      setError('Error adding comment. Please try again later.');
      console.error('Error adding comment:', err);
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    
    // Convert to IST (UTC+5:30)
    const ISTOffset = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds
    const ISTTime = new Date(date.getTime() + ISTOffset);
  
    return ISTTime.toLocaleString("en-GB", { 
      day: "numeric", 
      month: "long", 
      year: "numeric",
      hour: "2-digit", 
      minute: "2-digit",
      hour12: false
    });
  };

  return (
    <div className="commentSection">
      <h3 className="commentTitle">Comments</h3>
      
      {error && <div className="errorMessage">{error}</div>}
      
      {userInfo?.username ? (
        <form className="commentForm" onSubmit={handleSubmitComment}>
          <textarea
            className="commentInput"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            required
          />
          <button type="submit" className="commentSubmitBtn">Post Comment</button>
        </form>
      ) : (
        <div className="loginPrompt">Please log in to comment on this post.</div>
      )}
      
     
            <div className="commentsContainer">

            {
  noComments ? (
    <div className="loadingComments">Be the first to write...</div>
  ) : isLoading ? (
    <div className="loadingComments">Loading comments...</div>
  ) : comments.length > 0 ? (
    comments.map((comment) => (
      <div
        className={`commentItem ${comment.username === (UserContext?.username || userInfo?.username) ? 'ownComment' : ''}`}
        key={comment.comment_id}
      >
        <div className="commentHeader">
          <span className="commentAuthor">@{comment.username}</span>
          <span className="commentDate">{formatDateTime(comment.created_at)}</span>
        </div>
        <div className="commentContent">{comment.comment_text}</div>
      </div>
    ))
  ) : (
    <div className="noComments">No comments yet. Be the first to comment!</div>
  )
}

           
            </div>
      <style jsx>{`
        .commentSection {
          margin-top: 40px;
          padding: 30px;
          background-color: #f9f9f9;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .commentTitle {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 20px;
          color: #333;
        }

        .commentForm {
          margin-bottom: 30px;
        }

        .commentInput {
          width: 100%;
          padding: 15px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 16px;
          min-height: 100px;
          margin-bottom: 15px;
          resize: vertical;
          font-family: inherit;
        }

        .commentSubmitBtn {
          padding: 10px 20px;
          background-color: #4a90e2;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .commentSubmitBtn:hover {
          background-color: #3a7bc8;
        }

        .loginPrompt {
          padding: 15px;
          background-color: #f0f0f0;
          border-radius: 8px;
          margin-bottom: 20px;
          text-align: center;
          color: #666;
        }

        .commentsContainer {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .commentItem {
          padding: 15px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }

        .commentHeader {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-size: 14px;
        }

        .commentAuthor {
          font-weight: 600;
          color: #4a90e2;
        }

        .commentDate {
          color: #888;
          font-style: italic;
        }

        .commentContent {
          font-size: 16px;
          line-height: 1.6;
          color: #444;
        }

        .errorMessage {
          padding: 10px;
          background-color: #ffebee;
          color: #c62828;
          border-radius: 6px;
          margin-bottom: 15px;
        }

        .loadingComments, .noComments {
          text-align: center;
          padding: 20px;
          color: #777;
          font-style: italic;
        }

        @media (max-width: 768px) {
          .commentSection {
            padding: 20px;
          }
          
          .commentTitle {
            font-size: 20px;
          }
        }
      `}</style>
    </div>
  );
}