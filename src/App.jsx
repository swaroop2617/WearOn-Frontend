import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About.jsx'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import Footer from './components/Footer.jsx'
import SearchBar from './components/SearchBar.jsx'
import { ToastContainer, toast } from 'react-toastify';
import Verify from './pages/Verify.jsx'
import MyProfile from './pages/MyProfile'
import Delivery from './pages/Delivery'
import Policy from './pages/Policy.jsx'
import ScrollToTop from './components/ScrollToTop';

const App = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <ScrollToTop/>
    <ToastContainer/>
    <Navbar />
    <div className=" max-w-7xl mx-auto  px-4 sm:px-6 md:px-8">
      
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/collection' element={<Collection/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/product/:productId' element={<Product/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/place-order' element={<PlaceOrder/>} />
        <Route path='/orders' element={<Orders/>} />
        <Route path='/verify' element={<Verify/>} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path='/delivery' element={<Delivery />} />
        <Route path='/policy' element={<Policy />} />
      </Routes>
    </div>
      <Footer/>

    </div>
  )
}

export default App
