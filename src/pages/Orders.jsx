import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const Orders = () => {

  const navigate = useNavigate()
  const getStatusStep = (status) => {
    if (status === "Order Placed") return 1;
    if (status === "Shipped") return 2;
    if (status === "Delivered") return 3;
    return 1;
  };
  const {backendUrl,token ,currency}=useContext(ShopContext);
  const [orderData,setOrderData]=useState([])
  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        backendUrl + '/api/orders/userorders',
        {},
        { headers: { token } }
      );

      console.log(response.data);

      if (response.data.success) {
        let allOrderItems=[]
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status']=order.status
            item['payment']=order.payment
            item['paymentMethod']=order.paymentMethod
            item['date']=order.date
            allOrderItems.push(item)
          })
        })
        setOrderData(allOrderItems.reverse())
      }
      
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    loadOrderData()
  },[token])

  

  return (
  <div className='border-t pt-16 max-w-5xl mx-auto px-4 sm:px-6'>
    <div className='text-2xl mb-6'>
      <Title text1={"MY"} text2={"ORDERS"} />
    </div>

    {orderData.length === 0 && (
      <p className="text-gray-400">No orders yet</p>
    )}

    <div className='flex flex-col gap-5'>

      {orderData.map((item, index) => (

        <div key={index} className='flex items-center gap-3 border border-[#E5E0DA] bg-zinc-50 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.05)] rounded-xl shadow-md p-4 hover:shadow-lg transition'>

          {/* IMAGE */}
          <img
            onClick={() => {
              console.log(item)
              navigate(`/product/${item._id}`)
            }}
            className='w-16 sm:w-20 cursor-pointer hover:scale-102 transition'
            src={item.image?.[0]}
            alt=""
          />

          {/* DETAILS */}
          <div className='flex-1 text-sm text-gray-700'>

            <p className='font-medium text-base'>{item.name}</p>

            <div className='flex flex-wrap gap-3 mt-1 text-gray-600'>
              <p>{currency}{item.price}</p>
              <p>Qty: {item.quantity}</p>
              <p>Size: {item.size}</p>
            </div>

            <p className='mt-1 text-gray-500'>
              {new Date(item.date).toDateString()}
            </p>

            <p className='text-gray-500'>
              Payment: {item.paymentMethod}
            </p>

          </div>

          {/* STATUS + ACTION */}
          <div className='flex flex-col justify-between items-start sm:items-end gap-3'>

            <div className="flex items-center gap-2 w-full sm:w-auto">

              {[1,2,3].map((step)=>(
                <div key={step} className="flex items-center">

                  {/* DOT */}
                  <div className={`w-3 h-3 rounded-full ${
                    getStatusStep(item.status) >= step 
                    ? "bg-green-500" 
                    : "bg-gray-400"
                  }`} />

                  {/* LINE */}
                  {step !== 3 && (
                    <div className={`w-5 h-[2px] ${
                      getStatusStep(item.status) > step
                      ? "bg-green-500"
                      : "bg-gray-400"
                    }`} />
                  )}

                </div>
              ))}

            </div>

            <p className="text-xs text-gray-500 mt-1">
              {item.status}
            </p>

            <button
              onClick={loadOrderData}
              className='border px-4 py-1.5 text-xs rounded hover:bg-black hover:text-white transition'
            >
              Track Order
            </button>

          </div>

        </div>

      ))}

    </div>
  </div>
)
}

export default Orders
