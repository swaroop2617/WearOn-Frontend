import React from 'react'

const Delivery = () => {
  return (
    <div className='px-6 md:px-16 lg:px-24 py-16 text-gray-700'>

      <h1 className='text-3xl font-semibold mb-6'>Delivery Information</h1>

      <p className='mb-4'>
        At WearOn, we strive to deliver your orders quickly and safely.
      </p>

      <h2 className='text-xl font-medium mt-6 mb-2'>Shipping Time</h2>
      <p className='mb-4'>
        Orders are processed within 1–2 business days. Delivery typically takes
        3–7 business days depending on your location.
      </p>

      <h2 className='text-xl font-medium mt-6 mb-2'>Shipping Charges</h2>
      <p className='mb-4'>
        We offer free delivery on most orders. Any applicable shipping charges
        will be displayed at checkout.
      </p>

      <h2 className='text-xl font-medium mt-6 mb-2'>Order Tracking</h2>
      <p className='mb-4'>
        Once your order is shipped, you will receive a tracking link via email or SMS.
      </p>

      <h2 className='text-xl font-medium mt-6 mb-2'>Delays</h2>
      <p>
        Delivery may be delayed due to unforeseen circumstances such as weather,
        holidays, or courier issues. We appreciate your patience.
      </p>

    </div>
  )
}

export default Delivery