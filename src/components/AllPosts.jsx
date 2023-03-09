// src/components/AllPosts.js

import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useParams, useNavigate} from "react-router-dom";
import sanityClient from "../client.js";
import AboutSection from "./AboutSection";
import OnePost from "./OnePost.jsx";
import gsap from "gsap";

import Footer from "./subComponents/Footer.jsx";
import Header from "./subComponents/Header.jsx";

import ResizeSreeen from "./subComponents/ResizeSreeen.jsx";

export default function AllPosts() {

  const {id}= useParams();

  
  
  const [projectTabState, setProjectTabState ] = useState(true);

  const [allPostsData, setAllPosts] = useState(null);
  const [projectState, setProjectState] = useState(null)

  const[homeSlideState, setHomeSlideState] = useState('work')

  let openTab = () => {

    // let projectTab = document.querySelector('.project-tab')
    // let homeWrap = document.querySelector('.home-wrap')

    // projectTab.classList.remove('closed');
    // projectTab.classList.add('open');

    // homeWrap.classList.add('hide-nav-links');
    
    setProjectState(true)
  }

  

  function closeTab(){
    let projectTab = document.querySelector('.project-tab')

    projectTab.classList.add('closed');
    projectTab.classList.remove('open');
    
    
  }

  let navigate = useNavigate()

  const pathName = window.location.pathname 

function pathNameStyleing () {

  
  let workBtn = document.querySelector('.work-link')
    let aboutBtn = document.querySelector('.about-link')

    let homeWrap = document.querySelector('.home-wrap')
    let aboutSection = document.querySelector('.about-section')
    let workSection = document.querySelector('.work-section')

    let projectTab = document.querySelector('.project-tab')

    if ( pathName === '/about'){

      setHomeSlideState('about')
      
      
    
    homeWrap.classList.remove('work-state')
    homeWrap.classList.add('about-state')

    workBtn.classList.remove('btn-inactive')
   
    aboutBtn.classList.add('btn-inactive')
    projectTab.classList.remove('open')

    aboutSection.classList.remove('inactive')
    
    if(aboutSection){
      
    }

   

  } else if (pathName === '/work'){

    

    setHomeSlideState('work')

    workBtn.classList.add('btn-inactive')
    aboutBtn.classList.remove('btn-inactive')
    workSection.classList.remove('inactive')
    homeWrap.classList.add('work-state')
    homeWrap.classList.remove('about-state')
    projectTab.classList.remove('open')

    
  }
}




  function changeHomeState(e){
    let workBtn = document.querySelector('.work-link')
    let aboutBtn = document.querySelector('.about-link')

    let homeWrap = document.querySelector('.home-wrap')
    let aboutSection = document.querySelector('.about-section')
    let workSection = document.querySelector('.work-section')

    if ( e === 'about'){

        
          
          workBtn.classList.remove('btn-inactive')
          aboutBtn.classList.add('btn-inactive')
          
          homeWrap.classList.remove('work-state')
          homeWrap.classList.add('about-state')
          
          if(aboutSection){
            aboutSection.classList.remove('inactive')
          }
         
          workSection.classList.add('inactive')

          
    }else if (e === "work" ) {
      
      aboutBtn.classList.remove('btn-inactive')
      workBtn.classList.add('btn-inactive')
      setProjectState(false)
      document.querySelector('.home-wrap').classList.remove('about-state')
      document.querySelector('.home-wrap').classList.add('work-state')

      document.querySelector('.about-section').classList.add('inactive')
      document.querySelector('.work-section').classList.remove('inactive')
    } 

    closeTab()
  }

 

  function handleEvent(){
    
    setProjectState(false)
  }
  
  // cursor movement / Functionality
// let cursor = () => {
//     document.addEventListener( 'mousemove', (e) => {

//       let hoverImages= document.querySelectorAll('.hover-img')

     
//         var x = e.clientX - 150;
//         var y = e.clientY - 0;
//         hoverImages.forEach((e)=>{
//           e.style.transform= "translate(" + x+ "px," +  y  + "px)";
//         })
        
        

        
//     } )

// }

// cursor()


  useEffect(() => {

    window.addEventListener("popstate", handleEvent)
    pathNameStyleing()

    if(document.querySelector('.project-card')){
    gsap.set('.project-card', {y: '100%', opacity:0 });
    gsap.fromTo(".project-card", {y:'100%', opacity:0 , stagger:0.4}, {y: '0%', opacity:1,stagger:0.1, });
    }
    

    sanityClient
      .fetch(
        `*[_type == "post"] | order(date desc) {
        title,
        slug,
        date,
        comingsoon,
        'categories': categories[] -> title,
        mainImage{
          asset->{
          _id,
          url
        },
        magesGallery,
        
        

      }
    }`
      )
      .then((data) => setAllPosts(data))
      .catch(console.error);
  }, []);

 





  return (
    

    <div className="home-wrap work-state">
    
      <ResizeSreeen />
      
      

      

    
   
      <Header changeHomeState = {changeHomeState} setHomeSlideState={setAllPosts} homeSlideState={homeSlideState}/>
  
    
      <div className="movment-wrap">

        
        <div className= {`work-section section active ${projectState ? "project-open" : ""}`} >
        
            <div className="all-work">


            {allPostsData && allPostsData.map((post, index) => (
             

                <Link to={"/work/" + post.slug.current} key={post.slug.current} onClick = { () => setProjectState(true) } className="project-card">
                    

                    <div className="hover-img">
                      <img className="project-hover-img" src={post.mainImage.asset.url} alt="" />
                    </div>
                    <div className="work-line"  key={index + post.title}  >

                      

                    
                    
                        
                        
                        
                         
                        {/* <p className="work-line-index sub"> { index + 1 < 10 ? `0${index + 1}`: index }</p> */}
                          
                       
                        

                        <p className="work-line-title" >{post.title}</p>
{/* 
                      { !post.categories || (
                      
                        <div className="work-catagory">
                        {post.categories.map( (cat, index) => (
                  
                              <div className= 'line-cat' key={index.toString() + cat }>
                                <p key={cat + post.title }>{cat}</p>
                                
                              </div>
                              
                ))} 


                        
                        </div>

                        )} */}
                        <div className="work-line-date"> 
                        
                        <p className="sub"> - {post.date}</p>
                      
                        </div>
                        
                          
                        
                    </div>

                </Link>
                      
              ))}




            </div>    

            
          </div>

          
          
          <AboutSection  />
          
      </div>
      
     
      <div  className= {`project-tab ${projectState ? "open" : "closed"}`}  >

              
                <Routes>

                  <Route element={ <OnePost setTabState = {closeTab} setProjectState={ setProjectState} /> } path="/:slug" />

                </Routes>      

            </div >

      
      </div>
  );
}