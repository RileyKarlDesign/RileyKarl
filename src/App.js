// src/App.js

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllPosts from "./components/AllPosts.jsx";
import "./components/scss/App.scss"
import OnePost from "./components/OnePost.jsx";
import AboutSection from "./components/AboutSection.jsx";



function App() {

  let vh= 0;

  window.addEventListener('load', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });
  
  
  window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });

  
  return (

    <BrowserRouter>
      <div className="fragment">
      <Routes>
        
          <Route element={ <AllPosts /> } path="/*" />
          <Route element={ <AllPosts /> } path="/work/*"  />  
          <Route element={ <AllPosts /> } path="/about/*"  />  
          

       </Routes>
      </div>
    </BrowserRouter>

  );

  
}
export default App;