import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import ProductItem from '../components/ProductItem';
import Title from '../components/Title';
import Loader from '../Loader';
import { useLocation } from "react-router-dom";


const Collection = () => {
    const { products,search, showSearch,loading }=useContext(ShopContext);
    const [showFilter, setShowFilter]=useState(false);
    const [filterProducts,setFilterProducts]=useState([])
    const [category,setCategory]=useState([])
    const [subCategory, setSubCategory]=useState([])
    const [sortType,setSortType]=useState('relavant')
    const location = useLocation();
    const categories = ["men", "women", "kids"];

    const toggleCategory=(e)=>{
        if(category.includes(e.target.value)){
            setCategory(prev=>prev.filter(item=>item!== e.target.value))
        }
        else{
            setCategory(prev=>[...prev,e.target.value])
        }
    }
    const toggleSubCategory=(e)=>{
            if(subCategory.includes(e.target.value)){
                setSubCategory(prev=>prev.filter(item=>item!== e.target.value))
            }
            else{
                setSubCategory(prev=>[...prev,e.target.value])
            }
    }

    const applyFilter = () => {

        let productsCopy = products.slice();

        if(showSearch){
            productsCopy =productsCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
        }

        if (category.length > 0) {
            productsCopy = productsCopy.filter(item => category.includes(item.category.toLowerCase()));
        }
        if (subCategory.length > 0) {
            productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
        }

        setFilterProducts(productsCopy);
    }

    const sortProduct=()=>{
        let fpCopy=filterProducts.slice();
        switch(sortType){
            case 'low-high':
                setFilterProducts(fpCopy.sort((a,b)=>(a.price - b.price)));
                break;

            case 'high-low':
                setFilterProducts(fpCopy.sort((a,b)=>(b.price - a.price)));
                break;

            default:
                applyFilter();
                break;
        }
    }

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const cat = params.get("category");

        if (cat) {
            setCategory([cat]); // set filter
        }
        }, [location.search]);

    useEffect(()=>{
        setFilterProducts(products)
    },[products])

    useEffect(()=>{
        applyFilter();
    },[category,subCategory,search,showSearch,products])

    useEffect(()=>{
        sortProduct();
    },[sortType])

  return (
    <div className='max-w-7xl mx-auto px-3 sm:px-4 flex flex-col sm:flex-row gap-6 sm:gap-10 pt-10 border-t'>
      {/* Filter Options*/}
      <div className='min-w-60 sticky top-20 h-fit'>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-lg font-semibold flex items-center cursor-pointer gap-2 text-primary'>FILTERS
            <img className={`h-3 sm:hidden ${showFilter?'rotate-90':''}`} src={assets.dropdown_icon} alt="" />
        </p>
        
        {/* Category Filter*/}
        <div className={ `border border-border pl-5 py-4 mt-6 rounded-lg bg-card shadow-sm ${showFilter ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-semibold text-primary'>CATEGORIES</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                <p className='flex items-center gap-3'>
                    <input className='w-3' type="checkbox" value={'men'} checked={category.includes('men')} onChange={toggleCategory}/>Men
                </p>
                <p className='flex items-center gap-3'>
                    <input className='w-3' type="checkbox" value={'women'} checked={category.includes('women')} onChange={toggleCategory} />Women
                </p>
                <p className='flex items-center gap-3'>
                    <input className='w-3' type="checkbox" value={'kids'} checked={category.includes('kids')} onChange={toggleCategory} />Kids
                </p>
            </div>
        </div>
        {/* Sub Category Filter*/}
        <div className={ `border border-border pl-5 py-4 mt-6 rounded-lg bg-card shadow-sm ${showFilter ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-semibold text-primary'>CATEGORIES</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                <p className='flex items-center gap-3'>
                    <input className='w-3' type="checkbox" value={'Topwear'} onChange={toggleSubCategory}/>Topwear
                </p>
                <p className='flex items-center gap-3'>
                    <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory}/>Bottomwear
                </p>
                <p className='flex items-center gap-3'>
                    <input className='w-3' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory}/>Winterwear
                </p>
            </div>
        </div>
      </div>
      {/* Right Side */}
        <div className='flex-1'>

            <div className='flex items-center justify-between text-base sm:text-2xl mb-6 text-primary'>
                <Title text1={'ALL'} text2={'COLLECTIONS'} />
                
                {/* Product Sort */}
                <select onChange={(e)=>setSortType(e.target.value)} className='border border-border text-sm px-3 py-1 rounded-md bg-card text-primary'>
                <option  value="relevant">Sort by: Relevant</option>
                <option value="low-high">Sort by: Low to High</option>
                <option value="high-low">Sort by: High to Low</option>
                </select>
            </div>

            {/* Map Products */}
            {loading ? (
                <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 gap-y-10'>
                    {Array(8).fill('').map((_, i) => (
                    <div key={i} className='animate-pulse'>
                        <div className='bg-gray-200 h-72 rounded-lg'></div>
                        <div className='h-4 bg-gray-200 mt-3 rounded w-3/4'></div>
                        <div className='h-4 bg-gray-200 mt-2 rounded w-1/2'></div>
                    </div>
                    ))}
                </div>
                ) : filterProducts.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                    <p className="text-lg font-medium">No products found</p>
                    <p className="text-sm">Try changing filters</p>
                </div>
                ) : (
                <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-10'>
                    {filterProducts.map((item, index) => (
                    <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} sizes={item.sizes}/>
                    ))}
                </div>
            )}

        </div>
    </div>
  )
}

export default Collection
