import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      
      {/* Title */}
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      {/* Main Section */}
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>

        {/* Image */}
        <img className='w-full md:max-w-[480px] rounded-lg shadow-md' src={assets.contact_img} alt="contact" />

        {/* Content */}
        <div className='flex flex-col justify-center items-start gap-6'>

          {/* Store Info */}
          <p className='font-semibold text-xl text-gray-700'>Our Store</p>

          <p className='text-gray-600 leading-relaxed'>
            WearOn Fashion Pvt. Ltd. <br />
            5th Floor, Tech Park One <br />
            Hitech City, Madhapur <br />
            Hyderabad, Telangana - 500081 <br />
            India
          </p>

          {/* Contact */}
          <p className='text-gray-600'>
            Tel: +91 91234 56789 <br />
            Email: support@wearon.com
          </p>

          {/* Careers */}
          <p className='text-gray-700 font-semibold text-xl'>
            Careers at WearOn
          </p>

          <p className='text-gray-600'>
            Join our team and help shape the future of fashion.
          </p>

          <button className='cursor-pointer border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>
            Explore Jobs
          </button>

        </div>
      </div>

      {/* Newsletter */}
      <NewsletterBox />

    </div>
  )
}

export default Contact