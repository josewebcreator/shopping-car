import { useEffect, useState } from 'react'
import { FaShoppingCart } from "react-icons/fa";
import './Products.css'
import { useAppContext } from '../../context/context';



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
      const response = await fetch(`https://dummyjson.com/products?limit=10&skip=10`);
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
            <FaShoppingCart className='product--car'/>
          </div>
        ))
      : null
      
    }
  </div>
 )
}