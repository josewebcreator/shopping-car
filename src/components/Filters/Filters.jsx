import { useEffect, useState } from "react"
import { useAppContext }from '../../context/context'
import  actionTypes  from "../../reducer/actionTypes";
import "./Filters.css"

export default function Filters(){

  const [categories, setCategories] = useState({});
  const {appState, dispatch} = useAppContext();


  const fetchCategories = async () => {
    try{
      const response = await fetch(`https://dummyjson.com/products/categories`);
      if(!response.ok){
        throw new Error("failed to fetch data")
      }else{
        const data = await response.json();
        setCategories(data);
      }    
    }catch(error){
      console.error("Error in fetch data: ", error);
    }
  
  }

  useEffect(()=>{
    fetchCategories();

  },[])

  function handlePrice(price){

    dispatch({
      type : actionTypes.CHANGE_PRICE,
      payload :price
    })
  }

  function handleCategorie(categorie){

    dispatch({
      type : actionTypes.CHANGE_CATEGORIE,
      payload : categorie
    })
  }

  return(
    <div className="Filters">
      <div>
        <label htmlFor="price-select" >Precio minimo</label>
        <select id="price-select" onChange={(e)=>{handlePrice(e.target.value)}}>
          <option value="0">0$</option>
          <option value="10">10$</option>
          <option value="100">100$</option>
          <option value="1000">1000$</option>
        </select>
      </div>
      <div>
        <label htmlFor="category-select">Categorias</label>
        <select id="category-select" onChange={(e)=>{handleCategorie(e.target.value)}}>
        <option value="all">all</option>
          {
            categories && categories.length &&(
              categories.map(categorie =>(
                <option value={categorie} key={categorie}>{categorie}</option>
              ))
            )
          }
        </select>
      </div>
    </div>
  )

}