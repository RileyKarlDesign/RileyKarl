import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../client.js";

import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function AboutSection(props) {

  const [aboutData, setAboutData] = useState(null);

  
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

  if (!aboutData) return <div>Loading...</div>;



  return (
      

    <div className="about-section  inactive section ">

      

    

    <div className="profilepic">
      <img src={aboutData.mainImage.asset.url} alt="" />
    </div>

    <div className="about-info">

      <div>
        <h1 className="hero-statement"> {aboutData.hero} </h1>

    
        <div className="about-body">

                        <div className="clinets-block">

                      
                      
                <p className="sub"> Selected Clients </p>

                    {aboutData.clients.map( (client, index) => (
                          
                          <div key={index}>

                              <p>{client}</p>
                          
                            </div>
                          
                        ))}

                  </div>
                  <div className="reconition-block">
                    <p className="sub" >Reconition</p>
                        {aboutData.recognition.map( (rec, index) => (
                              
                              <div key={index}>
                                <p>{rec}</p>
                              
                              </div>
                              
                            ))}
  </div>

  <div className="pen-block">
  <div className="pen-block-wrap">
      <p className="sub" >Favourite Pens</p>
  

        {aboutData.pens.map( (pen, index) => (
                    
                    <div key={index}>
                      <p>{pen}</p>
                    
                    </div>
                    
        ))}
  </div>
  </div>

        
       </div>

       </div>

      <div className="footer">

      
          
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

          </div>
          
      </div>
      
    </div>


  );
}