import { useEffect, useState } from 'react'
import { FaShoppingCart } from "react-icons/fa";
import './Products.css'
import { useAppContext } from '../../context/context';
import actionTypes from '../../reducer/actionTypes';



export default function Products(){

  const [products, setProducts] = useState({});
  const {appState, dispatch} = useAppContext();

  const filterProducts = (products) => {
    return products.filter(product => {
      return (
        product.price >= appState.minPrice &&
        (
          appState.category === 'all' ||
          product.category === appState.category
        )
      )
    })
  }

  const fetchProducts = async () =>{

    try{
      const response = await fetch(`https://dummyjson.com/products?limit=${appState.limit}&skip=0`);
      if(!response.ok){
        throw new Error("failed to fetch data")
      }else{
        const data = await response.json();
        setProducts(filterProducts(data.products));
      }    
    }catch(error){
      console.error("Error in fetch data: ", error);
    }
  
  }
  
  useEffect(()=>{
    fetchProducts()
  },[appState]);

  useEffect(()=>{
    function handleScroll (){
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.scrollHeight;
      const scrollTop = window.scrollY;

      if((scrollTop+windowHeight >= documentHeight)&&(appState.limit<100)){
        dispatch({
          type : actionTypes.LOAD_MORE_PRODUCTS,
          payload : (appState.limit + 10)
        })
      }
    }

    window.addEventListener("scroll",handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  },[appState])

  function addProductToCar(id,thumbnail,description,title,price){

    if (process.env.NODE_ENV === 'development') {
      // Development mode warning
      alert(
        '**Warning:** Executing `addProductToCar` in development mode may cause incorrect product summation. Ensure you are testing in production mode for accurate results.'
      );
    }

    dispatch({
      type : actionTypes.ADD_TO_CAR,
      payload : {
        id : id,
        thumbnail : thumbnail,
        description : description,
        title : title,
        price : price,
        amount : 1
      }
    })
  }

  return(
  <div className="Products">
    { //si no ha cargado la lista filtrada imprime los productios por defecto
      
      (products && products.length > 0 ) ?
        products.map(product =>(
          <div className='product' key={product.id}>
            <img src={product.thumbnail} alt={product.description} />
            <div className="product--data">
              <h3>{product.title}</h3>
              <h4>Price: ${product.price}</h4>  
            </div>
            <FaShoppingCart className='product--car' onClick={()=>addProductToCar(product.id,product.thumbnail,product.description,product.title,product.price)}/>
          </div>
        ))
      : null
      
    }
  </div>
 )
}