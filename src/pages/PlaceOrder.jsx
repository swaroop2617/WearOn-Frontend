import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CarTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

  const [method,setMethod]=useState('cod');
  const { 
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    delivery_fee,
    products,
    getCartAmount,
    buyNowItem,
    setBuyNowItem,
    currency,
    addresses,
    getAddresses,
    userData,
    getUserProfile

  } = useContext(ShopContext)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })
  const [selectedAddress, setSelectedAddress] = useState(null)
  const isAddressSelected = !!selectedAddress
  const orderAddress = selectedAddress || formData
  const [showNewForm, setShowNewForm] = useState(false)

  useEffect(() => {
    if (addresses.length > 0) {
      const defaultAddr = addresses.find(a => a.isDefault)
      if (defaultAddr) setSelectedAddress(defaultAddr)
    }
  }, [addresses])

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setFormData(data => ({ ...data, [name]: value }))
  }

  useEffect(() => {
    if (token) {
      getAddresses()
      getUserProfile()
    }
  }, [token])

  useEffect(() => {

    if (userData && addresses.length > 0) {

      const defaultAddress = addresses.find(a => a.isDefault)

      if (defaultAddress) {
        setFormData({
          firstName: userData.name?.split(" ")[0] || "",
          lastName: userData.name?.split(" ")[1] || "",
          email: userData.email || "",
          street: defaultAddress.street || "",
          city: "",
          state: "",
          zipcode: "",
          country: "India",
          phone: userData.phone || ""
        })
      }

    }

  }, [userData, addresses])

  useEffect(() => {
      if (selectedAddress) {
        setFormData({
          firstName: selectedAddress.firstName,
          lastName: selectedAddress.lastName,
          email: userData?.email,
          street: selectedAddress.street,
          city: selectedAddress.city,
          state: selectedAddress.state,
          zipcode: selectedAddress.zipcode,
          country: selectedAddress.country,
          phone: selectedAddress.phone
        })
      }
   }, [selectedAddress])
  
  const initPay=(order)=>{
    const options={
      key:import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount:order.amount,
      currency:order.currency,
      name:'Order Payment',
      description:'Order Payment',
      order_id:order.id,
      receipt:order.receipt,
      handler:async(response)=>{
        console.log(response)
        try {
          const {data}=await axios.post(backendUrl+'/api/orders/verifyRazorpay',response,{headers:{token}})
          if(data.success){
            navigate('/orders')
            setBuyNowItem(null)
            setCartItems({})
          }
          
        } catch (error) {
          console.log(error)
          toast.error(error)
        }
      }
    }
    const rzp=new window.Razorpay(options)
    rzp.open()
  }
  const onSubmitHandler = async (event) => {
    event.preventDefault()
    if (
      !orderAddress ||
      !orderAddress.firstName ||
      !orderAddress.street ||
      !orderAddress.city ||
      !orderAddress.phone
    ) {
      toast.error("Please select or add a valid address")
      return
    }
    try {

      let orderItems = [];

      if (buyNowItem) {
        orderItems.push(buyNowItem);
      } else {
        for (const items in cartItems) {
          for (const item in cartItems[items]) {
            if (cartItems[items][item] > 0) {
              const itemInfo = structuredClone(products.find(product => product._id === items));
              if (itemInfo) {
                itemInfo.size = item;
                itemInfo.quantity = cartItems[items][item];
                orderItems.push(itemInfo);
              }
            }
          }
        }
      }

      let orderData = {
        userId: userData?._id, 
        address: orderAddress,
        items: orderItems,
        amount: total
      }
      switch(method){
        //api calls for cod
        case 'cod':
          const response =await axios.post(backendUrl+'/api/orders/place',orderData,{headers:{token}})
         
          if (response.data.success === true) {
            if (!buyNowItem) {
                setCartItems({});  
            }
            navigate('/orders')
          } else {
            
            toast.error(response.data.message || "Order failed")
          }
        break;

        case 'stripe':

            const responseStripe = await axios.post(
              backendUrl + "/api/orders/stripe",
              {
                userId: userData?._id,  
                items: buyNowItem ? [buyNowItem] : orderItems, 
                amount: total,           
                address: orderAddress,   
                buyNow: !!buyNowItem
              },
              {
                headers: { token }
              }
            );

            if (responseStripe.data.success) {
              const { session_url } = responseStripe.data;
              window.location.replace(session_url);
            } else {
              toast.error(responseStripe.data.message);
            }

          break;

          case 'razorpay':
            if (!orderAddress || !orderAddress.street) {
            toast.error("Please select or add an address")
            return
}
            const responseRazorpay = await axios.post(backendUrl+'/api/orders/razorpay',orderData,{headers:{token}})
            if (responseRazorpay.data.success) {
              initPay(responseRazorpay.data.order)
            }

        default:
          break;
      }
    }
    catch (error) {
      console.log("ERROR:", error.response || error)
      toast.error(error.response?.data?.message || error.message)
    }
  }

  let subtotal = 0;

  if (buyNowItem) {
    subtotal = buyNowItem.price * buyNowItem.quantity;
  } else {
    subtotal = getCartAmount();
  }

  const total = subtotal + delivery_fee;



  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-5pt-5 sm:pt-14 min-h-[80vh]'>
      {/* Left side*/}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>


          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Select Address</h3>

            <div className="flex flex-wrap gap-3">
              {addresses.map(addr => (
                <div
                  key={addr._id}
                  onClick={() => {
                    setSelectedAddress(addr)
                    setShowNewForm(false)
                  }}
                  className={`border px-3 py-2 rounded cursor-pointer text-sm
                  ${selectedAddress?._id === addr._id ? "border-black bg-gray-100" : ""}
                  `}
                >
                  {addr.firstName} - {addr.city}
                </div>
              ))}

              <button
                type="button"
                onClick={() => {
                  setShowNewForm(true)
                  setSelectedAddress(null)
                }}
                className="border px-3 py-2 rounded text-sm hover:bg-black hover:text-white transition"
              >
                + Add New Address
              </button>
            </div>
          </div>

          {selectedAddress && !showNewForm && (
            <div className="bg-white p-4 rounded-lg shadow border mt-4 space-y-2">
              
              <p className="font-semibold text-lg">
                {selectedAddress.firstName} {selectedAddress.lastName}
              </p>

              <p className="text-gray-600">
                {selectedAddress.email}
              </p>

              <p className="text-gray-600">
                {selectedAddress.street}
              </p>

              <p className="text-gray-600">
                {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.zipcode}
              </p>

              <p className="text-gray-600">
                {selectedAddress.country}
              </p>

              <p className="text-gray-600">
                ☏ {selectedAddress.phone}
              </p>

            </div>
          )}
          {showNewForm && (
            <div className="mt-4 grid sm:grid-cols-2 gap-4">

              <input required placeholder="First Name" onChange={(e)=>setFormData({...formData, firstName:e.target.value})} className="border p-2 rounded" />
              <input required placeholder="Last Name" onChange={(e)=>setFormData({...formData, lastName:e.target.value})} className="border p-2 rounded" />

              <input required placeholder="Email"  className="border p-2 rounded col-span-2" />

              <input required placeholder="Street" onChange={(e)=>setFormData({...formData, street:e.target.value})} className="border p-2 rounded col-span-2" />

              <input required placeholder="City" onChange={(e)=>setFormData({...formData, city:e.target.value})} className="border p-2 rounded" />
              <input required placeholder="State" onChange={(e)=>setFormData({...formData, state:e.target.value})} className="border p-2 rounded" />

              <input required placeholder="Zipcode" onChange={(e)=>setFormData({...formData, zipcode:e.target.value})} className="border p-2 rounded" />
              <input required placeholder="Country" onChange={(e)=>setFormData({...formData, country:e.target.value})} className="border p-2 rounded" />

              <input required placeholder="Phone" onChange={(e)=>setFormData({...formData, phone:e.target.value})} className="border p-2 rounded col-span-2" />

            </div>
          )}

      </div>

      {/* Right side */}
      <div className='mt-8'>

        <div className='mt-8 min-w-80 border p-4 rounded'>
    
            <h2 className='text-lg font-semibold mb-4'>Cart Totals</h2>

            <div className='flex justify-between text-sm mb-2'>
                <p>Subtotal</p>
                <p>{currency}{subtotal}</p>
            </div>

            <div className='flex justify-between text-sm mb-2'>
                <p>Shipping Fee</p>
                <p>{currency}{delivery_fee}</p>
            </div>

            <hr className='my-2'/>

            <div className='flex justify-between font-medium'>
                <p>Total</p>
                <p>{currency}{total}</p>
            </div>

        </div>

        <div className='mt-12'>
            <Title text1={"PAYMENT"} text2={"METHOD"} />
            {/* Payment method selection */}
            <div className='flex gap-3 flex-col lg:flex-row'>
                <div onClick={()=>setMethod('stripe')} className='flex item-center gap-3 border p-2 px-3 cursor-pointer'>
                  <p className={`min-w-3.5 h-3.5 border rounded-full ${method ==="stripe"?'bg-green-400':''}`}></p>
                  <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
                </div>
                <div onClick={()=>setMethod('razorpay')} className='flex item-center gap-3 border p-2 px-3 cursor-pointer'>
                  <p className={`min-w-3.5 h-3.5 border rounded-full ${method ==="razorpay"?'bg-green-400':''}`}></p>
                  <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
                </div>
                <div onClick={()=>setMethod('cod')} className='flex item-center gap-3 border p-2 px-3 cursor-pointer'>
                  <p className={`min-w-3.5 h-3.5 border rounded-full ${method ==="cod"?'bg-green-400':''}`}></p>
                  <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
                </div>
            </div>

            <div className='w-full text-end mt-8'>
                <button type="submit" className='bg-black text-white px-16 py-3 text-sm' >PLACE ORDER</button>
            </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
