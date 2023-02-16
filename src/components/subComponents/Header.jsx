import React from 'react'
import { Link } from 'react-router-dom'

export default function Header(props) {
  return (

    <> 
    <p className='logo'> Riley Isiaiah Karl</p>
    
    <div className="nav">
        

        <div className='nav-links' >
      
        <Link to={'/about'} onClick={() => props.changeHomeState('about')}> 
            <p className="about-link btn"  >  Infomation </p> 
        </Link>
       
        <Link to={'/work'} onClick={() => props.changeHomeState('work')}> 
            <p className="work-link work-link btn">  Work </p> 
        </Link>
        
        
        </div>
    </div>
    </>
    
  )
}
