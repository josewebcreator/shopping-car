import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import './Car.css'
import { useState } from "react";


export default function Car(){
  
  const [display,setDisplay] = useState(false);

  function handleDisplay(){
    setDisplay(!display);
  }

  return(
    <div className={`Car`}>
      <div className={`car--inner ${display ? `show-car`: `hide-car`}`}
      style={{
        transition: "transform 0.5s ease-in-out",
        transform: display ? "translateX(0)" : "translateX(-270px)",
      }}>
        {/*contenido del carrito*/}
      </div>
    
      <div className={`display--arrow ${display ? `show-arrow` : `hide-arrow`}`}
      style={{
        transition: "transform 0.5s ease-in-out",
        transform: display ? "translateX(0)" : "translateX(-270px)",
      }}
      onClick={()=>handleDisplay()}>
        {  
          display ? <MdOutlineArrowBackIosNew /> : <MdOutlineArrowForwardIos />
        }
      </div>
    </div>
    
  )
}