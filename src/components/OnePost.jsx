import React, { useEffect, useState } from "react";
import { useParams, Routes, Route, Link } from "react-router-dom";
import sanityClient from "../client.js";
// import BlockContent from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";
import CloseBtn from "./CloseBtn.jsx";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function OnePost( props ) {
  const [postData, setPostData] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    sanityClient
      .fetch(
        `*[slug.current == $slug]{
          title,
          slug,
          date,
          mainImage{
            asset->{
              _id,
              url
             }
           },
          
          
         body,
         
        'categories': categories[] -> title,
        'images': imagesGallery[].asset->{_id,url},
         
       }`,
        { slug }
      )
      .then((data) => setPostData(data[0]))
      .catch(console.error);
  }, [slug]);

  if (!postData) return <div>Loading...</div>;

  return (

      
        <div className="project-inner">

          


          <div className="project-header">

                 
          <p> {postData.title}</p>

                <Link to="/" onClick= { () => props.handelClose() } >
                  <CloseBtn />
                </Link>

          </div>
        
       

          <div className="project-title-ani">
          <h1> {postData.title}</h1>
          <p> Year: {postData.date}</p>

          {postData.categories.map( (cat, index) => (
            
            <div key={index}>
               <p>{cat}</p>
              
            </div>
            
          ))} 
          
          </div>
        
        
        
        
          
          

          {postData.images.map( (img, index) => (
            
            <div className="img-wrap" key={index}>
               <p>{index}</p>
              <img src={urlFor(img).url()} alt="" />
            </div>
            
          ))}

          

          
        
          <div>
            <h4>{postData.name}</h4>
          </div>
        
      
      <div>

        

        {/* <BlockContent
          blocks={postData.body}
          projectId={sanityClient.clientConfig.projectId}
          dataset={sanityClient.clientConfig.dataset}
        /> */}
        
      </div>
    </div>
  );
}