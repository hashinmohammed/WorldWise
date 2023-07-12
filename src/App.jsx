import React, { useEffect } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './pages/AppLayout';
import Login from './pages/Login';
import CityList from './components/CityList';
import {useState} from 'react'

const BASE_URL= 'http://localhost:9000'
const App = () => {
const [cities,setCities]=useState([])
const [isLoading,setIsLoading]=useState(false)
  useEffect(()=>{
    const fetchCities=async ()=>{
      try {
        setIsLoading(true)
        const res=await fetch(`${BASE_URL}/cities`)
        const data=await res.json()
        setCities(data)
        console.log(data);
      } catch (error) {
        console.log('there was an error');
      }
      finally{
        setIsLoading(false)
      }
    }
    fetchCities()
  },[])
  return (
<BrowserRouter>
<Routes>
<Route index element={<Homepage />}/>
<Route path='product' element={<Product/> }/>
<Route path='pricing' element={ <Pricing/> }/>
<Route path='login' element={<Login/> }/>

<Route path='app' element={ <AppLayout/> }>
<Route index element={<CityList isLoading={isLoading} cities={cities}/>} />

  <Route path='cities' element={<CityList isLoading={isLoading} cities={cities}/>} />
  <Route path='countries' element={<p>countries</p>} />
  <Route path='form' element={<p>countries</p>} />


</Route>

<Route path='*' element={ <PageNotFound/> }/>


</Routes>
</BrowserRouter>
  )
}

export default App