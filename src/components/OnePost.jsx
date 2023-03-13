import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import sanityClient from "../client.js";
// import BlockContent from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";
import CloseBtn from "./CloseBtn.jsx";
import MySwiper from "./subComponents/Gallery.jsx";
import icon from ".././icon/rkicon.png"
import gsap from "gsap";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function OnePost( props ) {
  const [postData, setPostData] = useState(null);
  const { slug } = useParams();


  let mainDoc = document.querySelector('.project-open')





useEffect(()=>{

  if(document.querySelector('.project-img',)){
    gsap.set('.project-img', {y: '100%', opacity:0 });
    gsap.fromTo(".project-img", {y:'100%', opacity:0 , stagger:0.4}, {y: '0%', opacity:1,stagger:0.1, });
  }

})

function handelClose(){


  let tab = document.querySelector('.project-tab')

  tab.classList.remove('open')
  tab.classList.add('closed')

  props.setProjectState(false)

  

  
}
  
  



  useEffect(() => {

    props.setProjectState(true)
 
    
    sanityClient

      

      .fetch(
        `*[slug.current == $slug]{
          title,
          slug,
          date,
          about,
          link,
          color,
          layout,
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



  if (!postData) return <div className="loading"> <div className="ciricle"> <p> Loading </p></div> </div>;

  return (
    

      
        <div className="project-inner" style={{background: postData.color }}>

          

        
         

        <div className="project-main-contnent">
        <div className="project-header" style={{background: postData.color }}>

<div className="project-header-contnet">

      <div className="project-title-wrapper">
        
    <p className="   "> {postData.title}</p>
    </div>

    <Link to="/work" onClick= { () => handelClose() } >
        <CloseBtn  />
      </Link>

</div>




      

</div>
        
        
            <div className={"project-images "} >

          <MySwiper images={postData.images}  />




          </div>


            <div className="project-main-info">
            {/* <h1> {postData.title}</h1> */}
            
            <p className="sub p-info"> Project Infomation </p>

            { !postData.about || (
              <> 

              
              <div className="about-info-block about-block">
              

                <p> {postData.about} </p>
              </div>  

              </>
            )}

            { !postData.title || (
            <> 
           
            <div className="info-block  project-info-block">
              <p className="sub"> Titile </p>

              <p> {postData.title} </p>
            </div>

            </>

            )}


          { !postData.year || (
            <> 
            
            <div className="info-block  project-info-block">
              <p className="sub"> Year </p>

              <p> {postData.date} </p>
            </div>
            </>
          )}


            { !postData.categories || (
            <> 
              
              <div className="info-block  project-info-block">
              <p className="sub"> Servises </p>
                <div className="cats">

                    {postData.categories.map( (cat, index) => (
                      
                      <div key={index + cat + index }>
                        <p>{cat}</p>
                        
                      </div>
                      
                    ))} 

              </div>
              </div>
            </>
            )}
        

        { !postData.names > 0 || (
          <> 
            
              <div className=" info-block project-info-block">
              <p className="sub"> Credits </p>

              

                <div className="credits">
              
                  {postData.names.map( (name, index) => (

                    <div key={index + name}>
                      <p>{name}</p>
                      
                    </div>
                    
                  ))}

                
                  </div>

                </div>
                </>
        )}   

        
        { !postData.link || (
          <> 
            
              <div className=" info-block project-info-block">
              <p className="sub"> Live Site </p>

              

                <div className="link">
              
                  <a target={'_blank'} href={postData.link}> Click Here </a>
                    
                  

                
                  </div>

                </div>
                </>
        )}   
            

            
            

            
          

              
              
              
          

          
            
          
          </div>

         </div>
        
          
          
            
    
    </div>

  )};