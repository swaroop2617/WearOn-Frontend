import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import Title from './Title'

const CategorySection = () => {

  const navigate = useNavigate()

  const categories = [
    { name: "Men", image: assets.category_men },
    { name: "Women", image: assets.category_women },
    { name: "Kids", image: assets.category_kids }
  ]

  return (
    <div className="py-12 px-4">
        <div className='text-center py-8 text-3xl'>
                <Title text1={"Shop by "} text2={"Category"}/>
        </div>
      

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

        {categories.map((cat, index) => (
          <div
            key={index}
            onClick={() => navigate(`/collection?category=${cat.name.toLocaleLowerCase()}`)}
            className="relative cursor-pointer group overflow-hidden rounded-lg"
          >

            {/* Image */}
            <img 
              src={cat.image} 
              className="w-full h-64 object-cover rounded-lg group-hover:scale-110 transition duration-300"
              alt={cat.name}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
              <p className="text-white text-xl font-semibold tracking-wide">
                {cat.name}
              </p>
            </div>

          </div>
        ))}

      </div>
    </div>
  )
}

export default CategorySection