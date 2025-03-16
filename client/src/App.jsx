import { Profiler, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import '/Users/rudrarajpurohit/Desktop/blog space /client/src/App.css'
import Post from './post'
import Login from './login'
import Register from './register'
import Header from './header'
import Create from './pages/Create'
import Update from './Update'
import Home from './home'
import {Routes,Route} from "react-router-dom"
import { UserContextProvider } from './UserContext'
import SinglePostPage from './pages/singlePostPage'
import { PostContextProvider } from './postContext'
import UserProfile from './UserProfile'
import AuthorPage from './authorPage'

function App() {

  return (
    <UserContextProvider>
      <PostContextProvider>
      <Routes>
        {/* mention path/url for the page in path attribute and element will have the content in it */}
        {/* this is defining of route */}

          <Route path="/" element={<Home/>}/>
          <Route path={"/login"} element={<Login/>} />
          <Route path={"/register"} element={<Register/>}/>
          <Route path={"/create"} element={<Create/>}></Route>
          <Route path="/post/:id" element={<SinglePostPage/>}></Route>
          <Route path="/update" element={<Update/>}></Route>
          <Route path="/userprofile" element={<UserProfile/>}></Route>
          <Route path="/authorpage/:author" element={<AuthorPage/>}></Route>
      </Routes>
      </PostContextProvider>
    </UserContextProvider>
  )
}


export default App
