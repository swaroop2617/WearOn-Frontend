import React, { useContext, useEffect, useState, useRef } from 'react'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';
const SearchBar = () => {

    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const [visible, setVisible] = useState(false);
    const location = useLocation();
    const inputRef = useRef(null)
   
  useEffect(() => {
    setVisible(true)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [location])

  return showSearch ?(
      <div className={`flex items-center border border-gray-300 rounded-full px-3 py-1 bg-white  transition-all duration-300 ease-in-out transform ${showSearch ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>     
        <div className='flex items-center'>        
          <input
            ref={inputRef}
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className='outline-none text-sm w-full'
            type="text"
            placeholder='Search'
          />

        </div>
        <img
          onClick={()=>setShowSearch(false)}
          className='w-4 ml-3 cursor-pointer'
          src={assets.cross_icon}
          alt=""
        />    
      </div>
  ):null
}

export default SearchBar
