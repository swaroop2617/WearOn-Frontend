import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'

const ProductItem = ({id,image,name,price,sizes}) => {
    
    const [showSizes, setShowSizes] = useState(false);
    const [added, setAdded] = useState(false);
    const navigate = useNavigate();
    const { currency, addToCart, cartItems } = useContext(ShopContext);

    return (
    <div
        onClick={()=>navigate(`/product/${id}`)}
        onMouseLeave={()=>{
            setShowSizes(false);   
            setAdded(false);      
        }}
        className='bg-white border border-gray-100 relative overflow-hidden text-gray-700 cursor-pointer rounded-xl p-3 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block group'
    >
        <div className='relative overflow-hidden rounded-xl bg-gray-50 group'>
            
            <img 
                className='w-full h-72 object-cover transition-all duration-300 group-hover:scale-105' 
                src={image?.[0]} 
                alt="" 
            />

            {/* Subtle Overlay */}
            <div className='absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-all duration-300'></div>

            {/* Cart */}
            <div 
                className="absolute top-3 right-3 group/cart z-20 opacity-0 group-hover:opacity-100 transition-all duration-300"
                onClick={(e)=>e.stopPropagation()}
            >
                {/* CART ICON */}
                <div className={`
                    p-2 rounded-full text-black shadow-md transition-all duration-300 cursor-pointer
                    ${added 
                        ? 'bg-green-500 text-white scale-90' 
                        : 'bg-white text-black hover:bg-orange-600 hover:text-white hover:scale-110 active:scale-95'
                    }
                `}>
                    {added ? '✔ Added' : <ShoppingCart size={18} />}
                </div>

                {/* SIZE POPUP */}
                <div className="
                    absolute top-12 right-0 bg-white shadow-lg rounded-lg p-2 flex gap-2
                    opacity-0 scale-95 group-hover/cart:opacity-100 group-hover/cart:scale-100
                    transition-all duration-200
                ">
                    {sizes?.map((s)=>(
                        <button
                            key={s}
                            disabled={added} 
                            onClick={(e)=>{
                                e.stopPropagation();
                                if (added) return;
                                addToCart(id, s);

                                setAdded(true);
                                setTimeout(() => setAdded(false), 1500);
                            }}
                            className="px-2 py-1 text-xs border rounded hover:bg-orange-600 hover:text-white transition"
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

        </div>

        {/* Product Name */}
        <p className='pt-3 pb-1 text-sm font-medium text-gray-800'>{name}</p>

        {/* Price Section */}
        <p className='text-sm font-medium flex items-center gap-2'>
            <span className='text-gray-900 text-lg font-semibold transition-all duration-300 group-hover:scale-105'>
                {currency}{price}
            </span>
            
            <span className='text-gray-400 line-through text-xs'>
                {currency}{price+500} 
            </span>

            <span className='text-green-600 text-xs font-medium'>
                ({Math.floor((price+500 - price) / (price+500) * 100)}% OFF)
            </span>
        </p>

        {/* Click Effect */}
        <span className="absolute inset-0 bg-black opacity-0 group-active:opacity-10 transition duration-200 rounded-xl"></span>
    </div>
  )
}

export default ProductItem