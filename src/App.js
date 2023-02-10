// src/App.js

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllPosts from "./components/AllPosts.jsx";
import "./App.css"



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