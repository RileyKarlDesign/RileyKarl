import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../../client.js";

import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}


export default function Footer(props) {
  const [footData, setFooterData] = useState(null);

  useEffect(() => {
   

    sanityClient
      .fetch(
        `*[_type == "about"]{
          phone,
          footerimg{
            asset->{
            _id,
            url
          },
         



           }
       }` 
      )

      
      .then((data) => setFooterData(data[0]) && console.log(data))
      .catch(console.error);


   
      
  }, []);

  if (!footData) return <div className=" about-section  "><div>Loading...</div></div>;


  return (

    
   
    <div className='main-footer'> 

     
       <img  src={footData.footerimg.asset.url} alt='rileykarl' /> 

    
    
    </div>
  )
}
