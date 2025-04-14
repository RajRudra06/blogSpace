import Header from "./header"
import Post from "./post"
import './App.css'
import IndexPage from "./pages/IndexPage"
import { useContext } from "react"
import { PostContext } from './postContext.jsx';
import { useEffect } from "react"

export default function Home(){
    const {postInfoContext,setPostInfoContext}=useContext(PostContext);
    useEffect(() => {
        setPostInfoContext(null);
    }, []);
    return(
    <main>
        <Header />
        <div className="homeMain">        <IndexPage />
</div>
    </main>
    )
}