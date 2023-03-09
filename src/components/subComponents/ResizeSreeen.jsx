import React from 'react'
import icon from "../../icon/rkicon.png"

export default function ResizeSreeen() {

    let widthText = document.querySelector('.client-width')
    let heightText = document.querySelector('.client-height')
    let resizeWindow = document.querySelector('.resize-window')

    function resizedw(){
        if(resizeWindow){

            resizeWindow.classList.remove('resizeing')

        }
        
    }
    
    var doit;

    if(resizeWindow){
    window.addEventListener('resize' , ()=>{
        
        clearTimeout(doit);

        resizeWindow.classList.add('resizeing')
       
        widthText.textContent = `${window.innerHeight} px`
        heightText.textContent = `${window.innerWidth} px`

        document.addEventListener('mouseup', () => {
            
        })

        doit = setTimeout(resizedw, 1000);


    })
}

  return (
    <div className='resize-window'>
        <p> Riley Isaiah Karl </p>

        <img src={icon} alt="" height='300vw'/>
        <div className="mesurments">
            
            
            <p className='client-width'> 0000 </p>
            <p className=''> X </p>
            <p className='client-height'> 0000 </p>

        </div>
        
        
        
        </div>
  )
}
