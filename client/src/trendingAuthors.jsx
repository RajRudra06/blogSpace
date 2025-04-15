// first GEN code

// import { useState } from "react";
// import { useEffect } from "react"
// import Header from "./header";
// import FilterTrendingAuthor from "./authorFilter";

// const API_URL=import.meta.env.VITE_API_URL;

// export default function TrendingAuthor(){
//     const [trendingAuthors,setTrendingAuthors]=useState([]);

//     useEffect(()=>{
//         async function getTrendingAuthors(){
//             const req=await fetch(`${API_URL}/topauthors`);
//             const res=await req.json();
//             setTrendingAuthors(res);
//             console.log("trenindg ait",res);

//         }

//         getTrendingAuthors()
//     })
//     return (
//         <>
//           <Header />
//           <div style={{ marginTop: "100px", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px",}}>
//             {trendingAuthors.length > 0 &&
//               trendingAuthors.map((author, index) => (
//                 <FilterTrendingAuthor
//                   key={author.username}
//                   index={index + 1} // pass the number
//                   username={author.username || "unknown"}
//                   post_count={author.post_count || 0}
//                 />
//               ))}
//           </div>
//         </>
//       );
      
// }

// improved UI

import { useState } from "react";
import { useEffect } from "react"
import Header from "./header";
import FilterTrendingAuthor from "./authorFilter";
const API_URL=import.meta.env.VITE_API_URL;

export default function TrendingAuthor(){
    const [trendingAuthors,setTrendingAuthors]=useState([]);
    
    useEffect(()=>{
        async function getTrendingAuthors(){
            const req=await fetch(`${API_URL}/topauthors`);
            const res=await req.json();
            setTrendingAuthors(res);
            console.log("trenindg ait",res);
        }
        getTrendingAuthors()
    })
    
    // Array of background colors for the cards
    const cardColors = [
        "#FFD700", // Gold for 1st place
        "#C0C0C0", // Silver for 2nd place
        "#CD7F32", // Bronze for 3rd place
        "#87CEEB", // SkyBlue
        "#98FB98", // PaleGreen
        "#FFA07A", // LightSalmon
        "#DDA0DD", // Plum
        "#FFDAB9", // PeachPuff
        "#B0E0E6", // PowderBlue
        "#F0E68C"  // Khaki
    ];
    
    return (
        <>
          <Header />
          <div style={{ 
            marginTop: "100px", 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            gap: "20px",
            width: "100%",
            maxWidth: "800px",  // Wider container
            margin: "100px auto 0",
            padding: "0 20px"
          }}>
            <h2 style={{
              fontSize: "28px",
              fontWeight: "bold",
              marginBottom: "20px",
              color: "#333"
            }}>Trending Authors</h2>
            
            {trendingAuthors.length > 0 &&
              trendingAuthors.map((author, index) => (
                <div key={author.username} style={{
                  display: "flex",
                  width: "100%",
                  backgroundColor: cardColors[index % cardColors.length],
                  borderRadius: "12px",
                  padding: "16px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s ease",
                  cursor: "pointer",
                }}>
                  <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255,255,255,0.7)",
                    marginRight: "20px",
                    fontWeight: "bold",
                    fontSize: "24px",
                    color: "#333"
                  }}>
                    {index + 1}
                  </div>
                  <FilterTrendingAuthor
                    key={author.username}
                    index={index + 1}
                    username={author.username || "unknown"}
                    post_count={author.post_count || 0}
                  />
                </div>
              ))}
          </div>
        </>
      );
}
