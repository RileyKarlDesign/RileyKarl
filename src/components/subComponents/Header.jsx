import React from 'react'
import { Link } from 'react-router-dom'
import icon from "../../icon/rkicon.png"

export default function Header(props) {
  return (

    <> 
    
    
   
    
    <div className= {`nav ${props.projectState ? "dim" : ""}`}>
    
    <p className='logo'> Riley Isiaiah Karl </p>
        <div className='nav-links' >
      
        <Link to={'/about'} onClick={() => props.changeHomeState('about')}> 
            <p className="about-link btn"  >  About </p> 
        </Link>
       
        <Link to={'/work'} onClick={() => props.changeHomeState('work')}> 
            <p className="work-link btn-inactive btn">  Work </p> 
        </Link>
        
        
        </div>
    </div>
    </>
    
  )
}
