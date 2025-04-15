export default function FilterTrendingAuthor({ username, post_count }) {
    return (
      <div className="authorCard">
        <div className="authorName">@{username}</div>
        <div className="postCount">{post_count} posts</div>
  
        <style jsx>{`
          .authorCard {
            padding: 16px 24px;
            background: linear-gradient(145deg, #f0f0f0, #ffffff);
            border-radius: 16px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            cursor: pointer;
            width: fit-content;
            max-width: 90%;
            margin: 12px auto;
          }
  
          .authorCard:hover {
            transform: translateY(-4px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
          }
  
          .authorName {
            font-size: 1.25rem;
            font-weight: 600;
            color: #333;
          }
  
          .postCount {
            font-size: 0.95rem;
            color: #777;
            margin-top: 6px;
          }
  
          @media (max-width: 600px) {
            .authorCard {
              padding: 14px 20px;
            }
  
            .authorName {
              font-size: 1.1rem;
            }
  
            .postCount {
              font-size: 0.9rem;
            }
          }
        `}</style>
      </div>
    );
  }
  