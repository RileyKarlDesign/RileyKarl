// src/components/AllPosts.js

import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import sanityClient from "../client.js";
import AboutSection from "./AboutSection";
import OnePost from "./OnePost.jsx";

import Footer from "./subComponents/Footer.jsx";
import Header from "./subComponents/Header.jsx";
import gsap from "gsap";
import ResizeSreeen from "./subComponents/ResizeSreeen.jsx";

export default function AllPosts() {

  const {id}= useParams();

  console.log(id)



if(document.querySelector('.line')){
  gsap.from(".line", {rotation:0, x: "60%" , opacity:0.6, duration: 0.3, stagger: 0.1,   delay: 0,  ease:"sine.out"})
  gsap.to(".line", { rotation:0 , x: 0 , opacity:1, duration: 0.3, stagger: 0.1 ,   delay: 0, ease:"sine.out"})
}
if(document.querySelector('.line')){
  gsap.fromTo(".sub-num", {x: 100, opacity:0}, {x: 0, opacity:1});
  gsap.set('.line', {x: 100, opacity:0 });
  gsap.fromTo(".line", {x: 100, opacity:0 , stagger:0.1 , delay: 0}, {x: 0, opacity:1,stagger:0.1, });
}
  
  
  const [projectTabState, setProjectTabState ] = useState(true);

  const [allPostsData, setAllPosts] = useState(null);

  function openTab(){

    let projectTab = document.querySelector('.project-tab')
    let homeWrap = document.querySelector('.home-wrap')

    projectTab.classList.remove('closed');
    projectTab.classList.add('open');

    // homeWrap.classList.add('hide-nav-links');
    

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

    let projectTab = document.querySelector('.project-tab')

    if ( pathName === '/about'){
    
    homeWrap.classList.remove('work-state')
    homeWrap.classList.add('about-state')

    workBtn.classList.add('btn-inactive')
   
    aboutBtn.classList.remove('btn-inactive')
    projectTab.classList.remove('open')

    aboutSection.classList.remove('inactive')
    

    console.log(" removing open")

  } else if (pathName === '/work'){

    workBtn.classList.remove('btn-inactive')
    aboutBtn.classList.add('btn-inactive')
    workSection.classList.remove('inactive')
    homeWrap.classList.add('work-state')
    homeWrap.classList.remove('about-state')
    projectTab.classList.remove('open')

    console.log(" removing open")
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
    
      <ResizeSreeen />
      

      <h1 className="footer-name">Riley Karl </h1>
      <div className="landing-animation"  >
        <h1>Riley Karl </h1>
      </div>

   
      <Header changeHomeState = {changeHomeState} />
  
    
      <div className="movment-wrap">

        
        <div className="work-section section active" >
            <div className="all-work">
           
            
              
              <div className="catagorys-title">

                
                <p className="work-line-index" > Index </p>
                <p className="work-line-title" > Title </p>
                <p className="work-line-cat" > Catagories </p>
                <p className="work-line-date" > Year </p>
                
                
              </div>
        

            {allPostsData && allPostsData.map((post, index) => (

                <Link to={"/work/" + post.slug.current} key={post.slug.current} onClick = { () => openTab() }>
                    <div className="line"></div>
                    <div className="work-line"  key={index}  >

                      <div className="work-box">
                        </div>  

                        <img src={post.mainImage.asset.url} alt="" />
                        
                         
                        <p className="work-line-index"> {index}</p>
                          
                        
                        

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
            </div>    

            
          </div>

          
          
          <AboutSection  />

      </div>

      <div  className= 'project-tab closed'  >

              
                <Routes>

                  <Route element={ <OnePost setTabState = {closeTab}  /> } path="/:slug" />

                </Routes>      

            </div >

      <Footer/>  
      </div>
  );
}