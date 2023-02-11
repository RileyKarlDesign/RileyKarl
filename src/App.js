// src/App.js

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllPosts from "./components/AllPosts.jsx";
import "./App.css"
import OnePost from "./components/OnePost.jsx";
import AboutSection from "./components/AboutSection.jsx";



function App() {
  return (

    <BrowserRouter>
      <div>
      <Routes>
        
          <Route element={ <AllPosts /> } path="/*" exact /> 




          
          
       </Routes>
      </div>
    </BrowserRouter>

  );

  
}
export default App;