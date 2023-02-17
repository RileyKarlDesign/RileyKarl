// Import Swiper React components

import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../client.js";

import 'swiper/css';

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, FreeMode, A11y, Mousewheel , Autoplay , loop} from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';



const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}


export default (data) => {
  return (
  //   <Swiper
  //   // install Swiper modules
  //   modules={[Navigation, Pagination, Scrollbar,FreeMode,  Mousewheel, Autoplay, A11y,]}
  //   spaceBetween={20}
  //   slidesPerView={1}
  //   navigation
    
  //   autoplay={{
  //     delay: 5000,
  //     disableOnInteraction: true,
  //   }}

  //   // slideToClickedSlide = {true}
   
    
   
  //   onSwiper={(swiper) => console.log(swiper)}
  //   onSlideChange={() => console.log('slide change')}
  // >

  //       {data.images.map( ( img, index) => (
            
           
  //              <SwiperSlide key={index} > 
               
  //             <img  className ="project-img"  src={urlFor(img).url()} alt="" />
  //             </SwiperSlide>
            
            
  //         ))}

      
      
     
  //   </Swiper>

<> 
  {data.images.map( ( img, index) => (
            
           
    
    
   <img  className ="project-img"  key={index} src={urlFor(img).url()} alt="" />
 
 
 
))}
</>
  );
};