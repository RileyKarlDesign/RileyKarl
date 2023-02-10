import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../client.js";

import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function AboutSection() {

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

      <p className="sub" >Favourite Pens</p>
  

        {aboutData.pens.map( (pen, index) => (
                    
                    <div key={index}>
                      <p>{pen}</p>
                    
                    </div>
                    
        ))}

  </div>

        
       </div>



      
          
          <div className="social-block">

          <p className="sub" >Social</p>
          <p> insta  {aboutData.instagram} </p>
          <p> linkedin  {aboutData.linkedin} </p>

          </div>

          <div className="contact-block">
          <p className="sub">Contact</p>
          <p> Email  {aboutData.email} </p>
          <p> Phone  {aboutData.phone} </p>

          </div>
          
      </div>
      
    </div>


  );
}