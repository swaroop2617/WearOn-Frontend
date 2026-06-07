import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Product = () => {

    const{productId}=useParams();
    const {products,currency,addToCart,setBuyNowItem}=useContext(ShopContext);
    const [productData,setProductData]=useState();
    const [image,setImage]=useState('')
    const [size,setSize]=useState('')
    const [added,setAdded]=useState(false)
    const navigate = useNavigate();

    const fetchProductData=async()=>{
        products.map((item)=>{
            if(item._id===productId){
                setProductData(item);
                setImage(item.image[0])
                return null;
            }
        })
    }

    const handleBuyNow = () => {
        if(!size){
            toast.error("Select Product Size");
            return;
        }

        setBuyNowItem({
            ...productData,
            quantity: 1,
            size
        });

        navigate('/place-order');
    };

    useEffect(()=>{
        fetchProductData();
    },[productId,products])


  return productData ?(
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Data*/}
      <div className='flex gap-12 sm:gap flex-col sm:flex-row'>
        {/* Product Images*/}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
            <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justiry-between sm:justify-normal sm:w-[18.7%] w-full'>
                {
                    productData.image.map((item,index)=>(
                        <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shirnk-0 cursor-pointer' alt="" />
                    ))
                }
            </div>
            <div className='w-full sm:w-[80%]'>
                <img className='w-full h-auto' src={image} alt="" />
            </div>
        </div>
        {/* Product Info */}
        <div className='flex-1'>
            <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
            <div className='flex items-center gap-1 mt-2'>
                <img src={assets.star_icon} alt="" className="w-3 5" />
                <img src={assets.star_icon} alt="" className="w-3 5" />
                <img src={assets.star_icon} alt="" className="w-3 5" />
                <img src={assets.star_icon} alt="" className="w-3 5" />
                <img src={assets.star_dull_icon} alt="" className="w-3 5" />
                <p className='pl-2' >(122)</p>
            </div>
            <p className='mt-5 text-3xl font-medium flex items-center gap-3'>
                <span className='text-primary'>{currency}{productData.price}</span>

                <span className='text-gray-400 line-through text-lg'>
                    {currency}{productData.price + 500}
                </span>

                <span className='text-green-600 text-sm'>
                    ({Math.floor(((productData.price + 500 - productData.price) / (productData.price + 500)) * 100)}% OFF)
                </span>
            </p>
            <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>    
            <div className='flex flex-col gap-4 my-8'>
                <p>Select Size</p>
                <div className='flex gap-2'>
                    {productData.sizes.map((item,index)=>(
                        <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item===size?'border-orange-500':''}`} key={index}>{item}</button>
                    ))}
                </div>
            </div>
            {/* ADD TO CART */}
            <button 
                onClick={()=>{
                    if(!size){
                        toast.error("Select Product Size");
                        return;
                    }

                    if(added) return;

                    addToCart(productData._id,size);
                    setAdded(true);
                    setTimeout(()=>setAdded(false),2000);
                }}
                disabled={added}
                className={`w-64 px-8 py-3 text-sm font-medium rounded-md transition-all duration-300 
                flex items-center justify-center gap-2
                ${added 
                    ? 'bg-green-500 text-white shadow-md scale-105' 
                    : 'bg-gray-900 text-white shadow-sm hover:shadow-lg hover:scale-105 active:scale-95'
                }`}
            >
                {added ? (
                    <>
                    ✔ <span>Added</span>
                    </>
                ) : (
                    'ADD TO CART'
                )}
            </button>


            {/* DESKTOP BUY NOW */}
            <div className='mt-6 hidden sm:flex'>
                <button 
                    onClick={handleBuyNow}
                    className="w-64 px-10 py-3 text-sm font-medium rounded-md transition-all duration-300 
                    flex items-center justify-center gap-2
                    bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-sm
                    hover:shadow-lg hover:scale-105 active:scale-95"
                >
                     BUY NOW
                </button>
            </div>


            {/* MOBILE BUY NOW STICKY */}
            <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-3 z-50">
                <button
                    onClick={handleBuyNow}
                    className="w-full py-3 text-sm font-semibold rounded-md transition-all duration-300 
                    flex items-center justify-center gap-2
                    bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-md
                    hover:shadow-lg active:scale-95"
                >
                    BUY NOW
                </button>
            </div>

            <hr  className='mt-8 sm:w-4/5'/>
            <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                    <p>100% Original Product</p>
                    <p>Cash on delivery is available on this product.</p>
                    <p> Easy return and exchange policy within 7 days</p>
            </div>
        </div>
      </div>
      {/* Review section*/}
            <div className='mt-20'>
                <div className='flex'>
                    <b className='border px-5 py-3 text-sm'>Description</b>
                    <p className='border py-5 px-3 text-sm'>Reviews (122)</p>
                </div>
                <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
                    <p> Crafted from premium-quality fabric, this piece offers all-day comfort and breathability.
                        Its modern design and perfect fit make it ideal for everyday wear.
                        Soft on the skin and durable for long-term use.
                        Pair it effortlessly with your favorite bottoms for a stylish look.
                        A must-have addition to your wardrobe.
                    </p>
                    <p>
                        These bottoms are tailored for both comfort and durability.
                        Featuring a sleek fit that enhances your overall appearance.
                        Made with high-quality fabric that retains shape after multiple washes.
                        Perfect for daily wear or a smart casual look.
                        A versatile essential for every wardrobe.
                    </p>
                </div>  
            </div>
            {/* Display related products*/}
            <RelatedProducts category={productData.category} subCategory={productData.subCategory} currentId={productData._id}/> 
    </div>
  ): <div className='opacity-0'></div>
}

export default Product
