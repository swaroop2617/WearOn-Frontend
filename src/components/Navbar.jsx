import React, { useContext, useEffect, useState } from 'react'
import {assets} from '../assets/assets'
import { NavLink,Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import Login from '../pages/Login'
import SearchBar from '../components/SearchBar'
import { useLocation } from 'react-router-dom'


const Navbar = () => {
    const [visible,setVisible]=useState(false);

    const {user,setUser, showSearch, setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

    const location = useLocation()

    useEffect(() => {
    setVisible(false)
    }, [location])

   const logout = () => {
        navigate('/login')

        localStorage.removeItem('token')
        localStorage.removeItem('user')   

        setToken('')
        setUser(null)                     
        setCartItems({})
    }

    useEffect(() => {
        if (visible) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
    }, [visible])

  return (
    <div className="p-4 sticky top-0 z-50 backdrop-blur-md bg-[#FFF7ED]/80 flex items-center justify-between py-4 font-medium">

        <div className='flex items-center gap-10'>

            {/*  LOGO  */}
            <Link to='/' className='flex items-center'>
                <div className="h-18 sm:h-16 w-[200px] overflow-hidden flex items-center">
                    <img 
                    src={assets.logo}
                    alt="WearOn"
                    className=" object-contain scale-[2] "
                    />
                </div>
            </Link>
        
        
        {token ? (
            <div className='group relative flex items-center gap-2 cursor-pointer'>

                {/* PROFILE ICON */}
                <img 
                className='w-5 cursor-pointer' 
                src={assets.profile_icon} 
                alt="" 
                />

                {/* USER NAME */}
                <div>
                <p className='text-sm text-gray-600'>Hello,</p>
                <p className='font-semibold text-black'>{user?.name}</p>
                </div>

                {/* DROPDOWN */}
                <div className='absolute top-10 left-0 hidden group-hover:block z-50'>
                <div className='flex flex-col gap-2 w-52 py-3 px-3 bg-[#fff5ee] shadow-md border border-gray-200 rounded-lg'>

                    <p onClick={()=>navigate('/profile')} className='px-3 py-2 hover:bg-[#f3e8dc] rounded-md cursor-pointer'>
                    My Profile
                    </p>

                    <p onClick={()=>navigate('/orders')} className='px-3 py-2 hover:bg-[#f3e8dc] rounded-md cursor-pointer'>
                    Orders
                    </p>

                    <p onClick={logout} className='px-3 py-2 hover:bg-red-100 hover:text-red-500 rounded-md cursor-pointer'>
                    Logout
                    </p>

                </div>
                </div>

            </div>
            ) : (
            <button
                onClick={() => navigate('/login')}
                className='px-4 py-1 border border-gray-400 rounded hover:bg-black hover:text-white transition text-sm'
            >
                Login / Signup
            </button>
        )}
        

        </div>
        
        {/* DESKTOP MENU (UNCHANGED) */}
        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
            <NavLink to='/' className='flex flex-col items-center gap-1'>
                <p>HOME</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden group-hover:block' />
            </NavLink>
            <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                <p>COLLECTION</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden group-hover:block' />
            </NavLink>
            <NavLink to='/about' className='flex flex-col items-center gap-1'>
                <p>ABOUT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden group-hover:block' />
            </NavLink>
            <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                <p>CONTACT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden group-hover:block' />
            </NavLink>
        </ul>

        <div className='flex items-center gap-4 justify-end'>

            <div className="w-[180px]">
                {showSearch && <SearchBar />}
            </div>

            <img
            onClick={()=>setShowSearch(prev => !prev)}
            src={assets.search_icon}
            className='w-5 cursor-pointer'
            alt=''
            />

            <Link to='/cart' className='relative'>
                <img id='cart-icon' src={assets.cart_icon} className='w-5 min-w-5' alt="" />
                <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
            </Link>

            <img onClick={()=>setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
        </div>

        {/* OVERLAY (FIX ADDED) */}
        {visible && (
            <div 
                onClick={() => setVisible(false)}
                className="fixed inset-0 bg-black/30 z-[9998]"
            />
        )}

        {/* SIDEBAR (ONLY FIXED LOGIC) */}
        <div className={`
            fixed top-0 right-0 h-full bg-[#fff5ee]
            w-[75%] max-w-[300px]
            transform transition-transform duration-300 ease-in-out
            ${visible ? 'translate-x-0' : 'translate-x-full'}
            shadow-lg
            z-[9999] pointer-events-auto
        `}>

            <div className="flex flex-col h-full text-gray-700">

                <div 
                onClick={() => setVisible(false)} 
                className="flex items-center gap-3 p-4 border-b cursor-pointer bg-white"
                >
                <span className="text-lg">←</span>
                <p className="font-medium">Back</p>
                </div>

                <NavLink onClick={()=>setVisible(false)} className='py-3 pl-6 border-b hover:bg-gray-100' to='/'>HOME</NavLink>
                <NavLink onClick={()=>setVisible(false)} className='py-3 pl-6 border-b hover:bg-gray-100' to='/collection'>COLLECTION</NavLink>
                <NavLink onClick={()=>setVisible(false)} className='py-3 pl-6 border-b hover:bg-gray-100' to='/about'>ABOUT</NavLink>
                <NavLink onClick={()=>setVisible(false)} className='py-3 pl-6 border-b hover:bg-gray-100' to='/contact'>CONTACT</NavLink>

            </div>
        </div>

    </div>
  )
}

export default Navbar