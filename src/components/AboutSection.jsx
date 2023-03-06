import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../client.js";

import imageUrlBuilder from "@sanity/image-url";


const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

// back event lister 

document.addEventListener('onbeforeunload', (event) => { 

  let projectTab = document.querySelector('.project-tab')
    
    console.log('back')
    projectTab.classList.remove('open');

});










export default function AboutSection(props) {

  const [aboutData, setAboutData] = useState(null);






  // if(document.querySelector('.sub-num')){
  //   gsap.from(".sub-num", {rotation:0, x: "60%" , opacity:0.6, duration: 0.3, stagger: 0.1,   delay: 5,  ease:"sine.out"})
  //   gsap.to(".sub-num", { rotation:0 , x: 0 , opacity:1, duration: 0.3, stagger: 0.1 ,   delay: 5, ease:"sine.out"})
  // }

  
  useEffect(() => {
   

    sanityClient
      .fetch(
        `*[_type == "about"]{
          hero,
          clients,
          recognition,
          pens,
          instagram,
          linkedin,
          email,
          phone,
          mainImage{
            asset->{
            _id,
            url
          },



           }
       }` 
      )

      
      .then((data) => setAboutData(data[0]) && console.log(data))
      .catch(console.error);


   
      
  }, []);

  if (!aboutData) return <div className=" about-section  "><div>Loading...</div></div>;



  return (
      

    <div className="about-section inactive section ">


      
    <div className="all-about">
    

    <div className="about-contact">
          {/* <div className="profile-img">

          <img  src={aboutData.mainImage.asset.url} alt='rileykarl' />
           
          </div> */}
          <p className="sub"> Contact </p>
        <p> P : 027 456 374  </p>
        <p> E : rileykarldesign@gmail.com  </p>
        <p> I : @riley.karl </p>
      </div>

    <div className="about-info">

      <div>
        <div className="hero-block i-block">

        
        
        <p className="sub hero-title"> Introduction </p>
        <p className="hero-statement"> {aboutData.hero} </p>

        </div>
    
        <div className="about-body">

                  <div className="clinets-block i-block">

                      
                      
                <p className="sub"> Selected Clients </p>

                    {aboutData.clients.map( (client, index) => (
                          
                          <div key={index.toString()}>

                              <p>{client}</p>
                          
                            </div>
                          
                        ))}

                  </div>
                  <div className="reconition-block i-block">
                    <p className="sub" >Reconition</p>
                        {aboutData.recognition.map( (rec, index) => (
                              
                              <div key={index.toString()}>
                                <p>{rec}</p>
                              
                              </div>
                              
                            ))}
                  </div>

                  <div className="pen-block i-block ">

                  
                  <div className="pen-block-wrap i-block ">
                      <p className="sub" >Pen Recomendations</p>
                  

                        {aboutData.pens.map( (pen, index) => (
                                    
                                    <div key={index.toString()}>
                                      <p>{pen}</p>
                                    
                                    </div>
                                    
                        ))}
                  </div>
                  </div>

        
       </div>

       </div>

      {/* <div className="footer">

      
          
          <div className="social-block">

          <p className="sub" >Social</p>
          <a className="underline" href= {" https://www.instagram.com/"+  aboutData.instagram } target="_blank" > Instagram  </a>
          <a className="underline" href={ " https://www.linkedin.com/in/"+ aboutData.linkedin + "/" }target="_blank" > linkedin  </a>

          </div>

          <div className="contact-block">
          <p className="sub">Contact</p>
          <a className="unerline" href={"mailto:"+ aboutData.email } target="_blank"> Email : {aboutData.email} </a>
          <p> Phone :  {aboutData.phone} </p>

          </div>

          </div> */}
          
      </div>

    
      </div>
      
    </div>


  );
}