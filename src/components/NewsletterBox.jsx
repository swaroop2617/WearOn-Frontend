import React from 'react'

const NewsletterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
    }

  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>
            Subscribe now and get 20% off
        </p>

        <p className='text-gray-500 mt-3'>
            Be the first to know about new arrivals, exclusive deals, and style updates.
        </p>

        <form 
            onSubmit={onSubmitHandler}
            className='w-full sm:w-1/2 flex items-center mx-auto my-6 bg-white rounded-md overflow-hidden shadow-sm border'
        >
            <input 
                className='flex-1 px-4 py-3 outline-none bg-transparent text-gray-700 placeholder-gray-400'
                type="email" 
                placeholder='Enter your email' 
                required
            />

            <button 
                type='submit' 
                className='bg-black text-white text-sm px-6 py-3 hover:bg-gray-800 transition'
            >
                SUBSCRIBE
            </button>
        </form>
    </div>
  )
}

export default NewsletterBox