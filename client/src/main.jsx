import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '/Users/rudrarajpurohit/Desktop/blog space /client/src/App.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import "./App.css"
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App /> 
    </BrowserRouter>
  </StrictMode>,
)
