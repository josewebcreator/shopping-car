import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { TbTrashX } from "react-icons/tb";
import './Car.css'
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/context";
import actionTypes from "../../reducer/actionTypes";


export default function Car(){
  
  const {appState, dispatch} = useAppContext();
  const [display,setDisplay] = useState(false);
  const [carProducts, setCarProducts] = useState([]);


  function handleDisplay(){
    setDisplay(!display);
  }

  useEffect(()=>{
    setCarProducts(appState.onCar);
  },[appState.onCar])

  function deleteProductOnCar(id){
    dispatch({
      type : actionTypes.DELETE_TO_CAR,
      payload : id
    })
  }

  return(
    <div className={`Car`}>
      <div className={`car--inner ${display ? `show-car`: `hide-car`}`}
      style={{
        transition: "transform 0.5s ease-in-out",
        transform: display ? "translateX(0)" : "translateX(-270px)",
      }}>
        {
          (carProducts && carProducts.length > 0 ) ?
            carProducts.map((carProduct, x) =>(
              <div className="car--product" key={`car-${x}`}>
                <img src={carProduct.thumbnail} alt={carProduct.description} />

                <div className="car--data">
                  <h5>{carProduct.title}</h5>
                  <h5> Price: ${carProduct.price}</h5>
                  <h6>Amount: {carProduct.amount} Total: ${carProduct.amount * carProduct.price}</h6>
                </div>
                <TbTrashX className="car--delete" onClick={()=>deleteProductOnCar(carProduct.id)}/>
              </div>
              
            ))
          : null
          
        }
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