// src/components/AllPosts.js

import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import sanityClient from "../client.js";
import AboutSection from "./AboutSection";
import OnePost from "./OnePost.jsx";


export default function AllPosts() {

  const {id}= useParams();

  console.log(id)
  
  const [projectTabState, setProjectTabState ] = useState(true);

  const [allPostsData, setAllPosts] = useState(null);

  function openTab(){

    let projectTab = document.querySelector('.project-tab')

    projectTab.classList.remove('closed');
    projectTab.classList.add('open');

  }

  function closeTab(){
    let projectTab = document.querySelector('.project-tab')

    projectTab.classList.add('closed');
    projectTab.classList.remove('open');
  }

  const pathName = window.location.pathname 

function pathNameStyleing () {

  
  let workBtn = document.querySelector('.work-link')
    let aboutBtn = document.querySelector('.about-link')

    let homeWrap = document.querySelector('.home-wrap')
    let aboutSection = document.querySelector('.about-section')
    let workSection = document.querySelector('.work-section')

    if ( pathName === '/about'){
    
    homeWrap.classList.remove('work-state')
    homeWrap.classList.add('about-state')

    workBtn.classList.add('btn-inactive')
    aboutBtn.classList.remove('btn-inactive')

  } else{

    workBtn.classList.remove('btn-inactive')
    aboutBtn.classList.add('btn-inactive')

    homeWrap.classList.add('work-state')
    homeWrap.classList.remove('about-state')
  }
}




  function changeHomeState(e){
    let workBtn = document.querySelector('.work-link')
    let aboutBtn = document.querySelector('.about-link')

    let homeWrap = document.querySelector('.home-wrap')
    let aboutSection = document.querySelector('.about-section')
    let workSection = document.querySelector('.work-section')

    if ( e === 'about'){

        console.log('click about state active ')
          
          workBtn.classList.remove('btn-inactive')
          aboutBtn.classList.add('btn-inactive')
          
          homeWrap.classList.remove('work-state')
          homeWrap.classList.add('about-state')
          

          aboutSection.classList.remove('inactive')
          workSection.classList.add('inactive')

          
    }else if (e === "work" ) {
      
      aboutBtn.classList.remove('btn-inactive')
      workBtn.classList.add('btn-inactive')

      document.querySelector('.home-wrap').classList.remove('about-state')
      document.querySelector('.home-wrap').classList.add('work-state')

      document.querySelector('.about-section').classList.add('inactive')
      document.querySelector('.work-section').classList.remove('inactive')
    }

    closeTab()
  }

  useEffect(() => {

    pathNameStyleing()

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

      <div className="nav">
      
        <Link to={'/about'} onClick={() => changeHomeState('about')}> 
           <p className="about-link btn"  >  About </p> 
        </Link>
      
      </div>
    
      <div className="movment-wrap">

        
        <div className="work-section section active" >
       
       
        
        
          <div className="resize" onClick={() => changeHomeState()}> 

            {/* <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.43934 13.0607C-0.146447 12.4749 -0.146447 11.5252 0.43934 10.9394L9.98528 1.39344C10.5711 0.807655 11.5208 0.807655 12.1066 1.39344C12.6924 1.97923 12.6924 2.92898 12.1066 3.51476L5.12132 10.5H26.5C27.3284 10.5 28 11.1716 28 12V12C28 12.8285 27.3284 13.5 26.5 13.5H5.12132L12.1066 20.4853C12.6924 21.0711 12.6924 22.0209 12.1066 22.6066C11.5208 23.1924 10.5711 23.1924 9.98528 22.6066L0.43934 13.0607Z" fill="black"/>
            </svg> */}

          </div>

       
        <Link to={'/work'} onClick={() => changeHomeState('work')}> 
        <p className="work-link btn btn-inactive"  >  Work </p>
        </Link>
        


              <div className="catagorys-title">

                <p className="work-line-index" > Index </p>
                <p className="work-line-title" > Title </p>
                <p className="work-line-cat" > Catagories </p>
                <p className="work-line-date" > Year </p>
                
              </div>
        

            {allPostsData && allPostsData.map((post, index) => (

                <Link to={"/work/" + post.slug.current} key={post.slug.current} onClick = { () => openTab()}>
                    <div className="line"></div>
                    <div className="work-line"  key={index}  >

                      <div className="work-box">
                        </div>  

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


            <div  className= 'project-tab closed'  >

              
                <Routes>

                  <Route element={ <OnePost setTabState = {closeTab}  /> } path="/:slug" />

                </Routes>      

            </div >
          </div>
          
          <AboutSection  />

      </div>
    </div>
  );
}