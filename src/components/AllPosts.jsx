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

    // document.querySelector('.work-section').style.background="var(--blk)"

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

    // aboutSection.classList.add('active')
    // aboutSection.classList.remove('inactive')

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
                        {post.categories.map( (cat, index) => (
                  
                              <div className= 'line-cat' key={index}>
                                <p>{cat}</p>
                                
                              </div>
                              
                ))} 
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