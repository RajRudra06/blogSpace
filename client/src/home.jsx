import Header from "./header"
import Post from "./post"
import '/Users/rudrarajpurohit/Desktop/Blog Space/client/src/App.css'
import IndexPage from "./pages/IndexPage"
import { useContext } from "react"
import { PostContext } from '/Users/rudrarajpurohit/Desktop/Blog Space/client/src/postContext.jsx';
import { useEffect } from "react"

export default function Home(){
    const {postInfoContext,setPostInfoContext}=useContext(PostContext);
    useEffect(() => {
        setPostInfoContext(null);
    }, []);
    //console.log("popoppoppopperererererere"+postInfoContext)
    return(
    <main>
        <Header />
        <div className="homeMain">        <IndexPage />
</div>
    </main>
    )
}