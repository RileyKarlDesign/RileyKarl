import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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
        names,
        'images': imagesGallery[].asset->{_id,url},
         
       }`,
        { slug }
      )
      .then((data) => setPostData(data[0]))
      .catch(console.error);
  }, [slug]);



  if (!postData) return <div className="loading"><p>Loading</p></div>;

  return (
    

      
        <div className="project-inner">

          


          <div className="project-header">

        
          <div className="project-title-wrapper">
        <p className=" btn btn-inactive  "> {postData.title}</p>
        </div>

                <Link to="/work" onClick= { () => props.setTabState() } >
                  <CloseBtn  />
                </Link>

          </div>
        
       

          <div className="project-main-info">
          {/* <h1> {postData.title}</h1> */}
          

          
          <div className="project-info-block">
            <p className="sub"> Titile </p>

            <p> {postData.title} </p>
          </div>

          <div className="project-info-block">
            <p className="sub"> Year </p>

            <p> {postData.date} </p>
          </div>
          
          <div className="project-info-block">
          <p className="sub"> Servises </p>
            <div className="cats">

                {postData.categories.map( (cat, index) => (
                  
                  <div key={index}>
                    <p>{cat}</p>
                    
                  </div>
                  
                ))} 

          </div>
          </div>

          <div className="project-info-block">
          <p className="sub"> Credits </p>
            <div className="credits">
            
            
            {postData.names.map( (name, index) => (
                  
                  <div key={index}>
                    <p>{name}</p>
                    
                  </div>
                  
                ))}

            
              
            
         

          </div>
          </div>

          
          </div>
        
        
        
        
          
          

          {postData.images.map( (img, index) => (
            
            <div className="img-wrap project-img" key={index}>
               
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