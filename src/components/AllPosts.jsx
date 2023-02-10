// src/components/AllPosts.js

import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import sanityClient from "../client.js";
import AboutSection from "./AboutSection";
import OnePost from "./OnePost.jsx";

export default function AllPosts() {
  
  const [projectTabState, setProjectTabState ] = useState('project-tab closed');

  

  const [allPostsData, setAllPosts] = useState(false);
 
  function closeTab(){
    setProjectTabState('project-tab closed')
  }

  function chnageHomeState(){
    if ( document.querySelector('.home-wrap').classList.contains('work-state')){
      
      document.querySelector('.home-wrap').classList.add('about-state')
      document.querySelector('.home-wrap').classList.remove('work-state')

      document.querySelector('.about-section').classList.remove('inactive')
      document.querySelector('.work-section').classList.add('inactive')
    }else{

      document.querySelector('.home-wrap').classList.remove('about-state')
      document.querySelector('.home-wrap').classList.add('work-state')

      document.querySelector('.about-section').classList.add('inactive')
      document.querySelector('.work-section').classList.remove('inactive')
    }
  }

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "post"]{
        title,
        slug,
        date,
        'categories': categories[] -> title,
        mainImage{
          asset->{
          _id,
          url
        },
        
        

      }
    }`
      )
      .then((data) => setAllPosts(data))
      .catch(console.error);
  }, []);



  return (

    

    <div className="home-wrap work-state">
      <h4 className="about-link btn">  About </h4> 
      <div className="movment-wrap">

        
        <div className="work-section section active" onClick={()=> chnageHomeState()}>

        <p className="work-link btn btn-inactive">  Work </p>
          


              <div className="catagorys-title">

                <p className="work-line-index" > Index </p>
                <p className="work-line-title" > Title </p>
                <p className="work-line-cat" > Catagories </p>
                <p className="work-line-date" > Year </p>
                
              </div>
        

            {allPostsData && allPostsData.map((post, index) => (

                <Link to={"/" + post.slug.current} key={post.slug.current} >
                    <div className="line"></div>
                    <div className="work-line"  key={index} onClick={() => setProjectTabState('project-tab open')}>
                        
                        <img src={post.mainImage.asset.url} alt="" />
                        

                        <p className="work-line-index">{index + 1}</p>

                        <p className="work-line-title" >{post.title}</p>

                        <div className="work-catagory">
                        <p className="work-line-cat">  {post.categories} </p>
                        </div>
                        

                        <p className="work-line-date"> {post.date}</p>
                      
                        
                    </div>

                </Link>

              ))}


            <div  className= {projectTabState}  >

              
                <Routes>

                <Route element={ <OnePost handelClose = {closeTab} /> } path="/:slug" />

                </Routes>      

            </div >
          </div>
          
          <AboutSection />

      </div>
    </div>
  );
}