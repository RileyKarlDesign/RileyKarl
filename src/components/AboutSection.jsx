import React, { useEffect, useState } from "react";

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

  if (!aboutData) return <div className=" about-section  "><div>Loading</div></div>;



  return (
      

    <div className="about-section  section ">


      
    <div className="all-about">
    
        

    <div className="about-contact">

    <div className="contact-block">

          <p className="sub"> Contact </p>

          <div className="c-line">
            <p className="">P: </p>
          <p>  {aboutData.phone}   </p>
          </div>
          <div className="c-line">
            <p className="">E: </p>
          <a href="mailto:rileykarldesign@gmail.com">  {aboutData.email}   </a>
          </div>
          <div className="c-line">
            <p className="">I: </p>
          <a href="">  @{aboutData.instagram}   </a>
          </div>
          
        

          </div>

          

          <div className="profile-img">

              <img  src={aboutData.mainImage.asset.url} alt='rileykarl' />
              
          </div>

          
            

            
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
                          
                            <> 

                              <a  key={rec.name} href={rec.link} target="_blank">{rec.name}</a>
                            </> 
                             
                          
                            
                          
                        ))}
                  </div>

                  <div className="pen-block i-block ">

                  
                  <div className="pen-block-wrap i-block ">
                      <p className="sub" >Pen Recomendations</p>
                  

                        {aboutData.pens.map( (pen, index) => (
                                    
                                    <div key={pen}>
                                      <p>{pen}</p>
                                    
                                    </div>
                                    
                        ))}
                  </div>
                  </div>

        
       </div>

       </div>

   
          
      </div>

        
      </div>
      
    </div>


  );
}