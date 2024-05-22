import { useReducer } from 'react'
import './App.css'
import Filters from './components/Filters/Filters'
import Products from './components/Products/Products'
import { reducer } from './reducer/reducer'
import initialState from './reducer/initialState'
import AppContext from './context/context'
import Car from './components/Car/Car'

function App() {

  const [appState, dispatch] = useReducer(reducer, initialState);

  const providerState = {
    appState,
    dispatch
  }

  return (
    <AppContext.Provider value={providerState}>
      <>
        <Filters/>
        <Products/>
        <Car/>
      </>  
    </AppContext.Provider>
    
  )
}

export default App
