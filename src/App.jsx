import React, { createContext, useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Products from './pages/Products/Products';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import Orders from './pages/Orders/Orders';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Login from './pages/LogIn/Login';
import Register from './pages/Register/Register';
import MainLayout from './layouts/MainLayout';
import Header from './components/Header'; 
import ProductDetails from './components/ProductsDetails'

export const TokenContext = createContext('');
export const UserContext = createContext('');

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState({})

  useEffect(() => {
    if(localStorage.getItem('user')){
      setUser(JSON.parse(localStorage.getItem('user')))
    }
  }, [])

  return (
    <UserContext.Provider value={{user, setUser}}>
      <TokenContext.Provider value={{token, setToken}}>
      <Routes>
        <Route path='/header' element = {<Header></Header>}></Route>
        <Route path='/' element={<MainLayout><Home></Home></MainLayout>} />
        <Route path='/about' element={<MainLayout><About></About></MainLayout>} />
        <Route path='/products' element={<MainLayout><Products></Products></MainLayout>} />
        <Route path='/cart' element={<MainLayout><Cart></Cart></MainLayout>} />
        <Route path='/products/:id' element={<ProductDetails></ProductDetails>} />
        {
          token && <>
            <Route path='/checkout' element={<Checkout></Checkout>} />
            <Route path='/orders' element={<Orders></Orders >} />
          </>
        }
        <Route path='/login' element={<Login></Login >} />
        <Route path='/register' element={<Register></Register >} />
        <Route path='*' element={<ErrorPage></ErrorPage>} />
      </Routes>
      </TokenContext.Provider>
    </UserContext.Provider>
  )
}

export default App
