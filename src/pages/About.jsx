import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div className='max-w-6xl mx-auto px-4'>

  <div className='text-2xl text-center pt-8 border-t'>
    <Title text1={'ABOUT'} text2={'US'} />
  </div>

  <div className='my-10 flex flex-col md:flex-row items-center gap-10'>

    <img 
      className='w-full md:w-1/2 max-w-[450px]' 
      src={assets.about_img} 
      alt="" 
    />

    <div className='flex flex-col justify-center gap-4 md:w-1/2 text-gray-600 leading-relaxed text-sm md:text-base'>
      <p>
        At WearOn, we believe shopping should be simple, enjoyable, and accessible to everyone.
        We bring you a curated collection of quality products that combine style and comfort.
        Our goal is to provide a seamless online shopping experience with fast delivery.
        Customer satisfaction is at the heart of everything we do.
        WearOn is more than just a store — it's your everyday shopping companion.
      </p>
      <p>
        At WearOn, we offer a refined selection of products crafted for quality and elegance.
        Every item is chosen with attention to detail and customer satisfaction in mind.
        We strive to deliver a premium shopping experience with trusted service.
        Our commitment is to excellence, style, and reliability.
        Experience shopping redefined with WearOn.
      </p>
      <b className='text-gray-800'>Our Mission</b>
      <p>
        Our mission is to offer a curated selection of products that reflect quality and elegance.
        We focus on delivering excellence through carefully chosen items and reliable service.
        Every step of our process is designed to enhance the customer experience.
        WearOn stands for trust, value, and long-lasting relationships.
      </p>

    </div>

  </div>
  <div className='text-xl py-4'>
      <Title text1={'WHY'} text2={"CHOOSE US"}/>
  </div>
  <div className='flex flex-col md:flex-row text-sm mb-20'>
    <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
      <b>Quality Assurance:</b>
      <p className='text-gray-600'>At WearOn, we believe shopping should be simple, enjoyable, and accessible to everyone.
        We bring you a curated collection of quality products that combine style, comfort, and affordability.</p>
    </div>
    <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
      <b>Convenience:</b>
      <p className='text-gray-600'>Our goal is to provide a seamless online shopping experience with fast delivery and reliable service.
        Customer satisfaction is at the heart of everything we do.</p>
    </div>
    <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
      <b>Exceptional Customer Service:</b>
      <p className='text-gray-600'>Our goal is to provide a seamless online shopping experience with fast delivery and reliable service.
        Customer satisfaction is at the heart of everything we do.</p>
    </div>
  </div>
    <NewsletterBox />
</div>
  )
}

export default About
