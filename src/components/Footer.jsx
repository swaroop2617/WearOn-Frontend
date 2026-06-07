import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='bg-[#f5f1e9] px-6 md:px-16 lg:px-24'>
      {/* Top Section */}
      <div className='flex flex-col sm:grid grid-cols-[2fr_1fr_1fr] gap-12 py-16 text-sm'>

        {/* Logo + About */}
        <div>
          <img src={assets.logo} className=' w-72' alt="WearOn Logo" />
          <p className='text-gray-600 leading-6 max-w-md'>
            WearOn brings you modern, comfortable, and trend-driven fashion designed 
            for everyday confidence. Discover styles that match your vibe and elevate 
            your wardrobe effortlessly.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className='text-lg font-semibold mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-3 text-gray-600'>

            <li>
              <Link to='/' className='hover:text-black transition'>
                Home
              </Link>
            </li>

            <li>
              <Link to='/about' className='hover:text-black transition'>
                About
              </Link>
            </li>

            <li>
              <Link to='/delivery' className='hover:text-black transition'>
                Delivery
              </Link>
            </li>

            <li>
              <Link to='/policy' className='hover:text-black transition'>
                Privacy Policy
              </Link>
            </li>

          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className='text-lg font-semibold mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-3 text-gray-600'>
            <li className='hover:text-black transition cursor-pointer'>
              +91 9876543210
            </li>
            <li className='hover:text-black transition cursor-pointer'>
              contact@wearon.com
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Section */}
      <div>
        <hr className='border-gray-300' />
        <p className='py-6 text-sm text-center text-gray-600'>
          © 2026 WearOn. All rights reserved.
        </p>
      </div>

    </div>
  )
}

export default Footer