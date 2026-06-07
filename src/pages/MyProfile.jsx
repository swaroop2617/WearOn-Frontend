import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'

const MyProfile = () => {

  const { 
    token, 
    navigate,
    userData,
    getUserProfile,
    updateUserProfile,
    addresses,
    getAddresses,
    addAddress,
    setDefaultAddress,
    deleteAddress
  } = useContext(ShopContext)

  const [isEdit, setIsEdit] = useState(false)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [showAddressForm, setShowAddressForm] = useState(false)

  const [newAddress, setNewAddress] = useState({
      firstName: '',
      lastName: '',
      street: '',
      city: '',
      state: '',
      zipcode: '',
      country: 'India',
      phone: ''
  })

  const emptyAddress = {
      firstName: "",
      lastName: "",
      street: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
      phone: ""
  }

  // redirect if not logged in
  useEffect(() => {
    if (!token) navigate('/login')
  }, [token])

  // fetch data
  useEffect(() => {
    if (token) {
      getUserProfile()
      getAddresses()
    }
  }, [token])

  useEffect(() => {
    if (userData) {
      setName(userData.name || "")
      setPhone(userData.phone || "")
    }
  }, [userData])

  return (
    <div className='min-h-screen px-4 sm:px-6 md:px-10 py-10'>

      <div className='max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6 sm:p-8'>

        {/* TOP */}
        <div className='flex justify-between items-center mb-8'>

          <div>
            <h2 className='text-3xl font-semibold'>
              {userData?.name || "User"}
            </h2>
            <p className='text-gray-500 text-sm'>
              {userData?.email || ""}
            </p>
          </div>

          <div className='flex items-center gap-4'>

            {/* IMAGE */}
            <div className='relative'>
              <img
                src={userData?.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdKXGjD36n-YUtbKaqtqu1IsCyqreqfSCgPGj77XJCZXbnudfgpa_f&usqp=CAE&s"}
                className='w-20 h-20 rounded-full '
                alt=""
              />
            </div>

            {/* EDIT BUTTON */}
            <button
              onClick={async () => {

                if (isEdit) {
                  await updateUserProfile({
                    name,
                    phone
                  })
                }

                setIsEdit(!isEdit)
              }}
              className='px-4 py-2 border rounded hover:bg-black hover:text-white transition'
            >
              {isEdit ? "Save" : "Edit"}
            </button>

          </div>
        </div>

        {/* USER INFO */}
        <div className='grid sm:grid-cols-2 gap-6 mb-10'>

          <div>
            <p className='text-sm text-gray-500'>Full Name</p>

            {isEdit ? (
              <input
                value={name}
                onChange={(e)=>setName(e.target.value)}
                className='border px-3 py-2 rounded w-full mt-1'
              />
            ) : (
              <p className='font-medium'>{userData?.name}</p>
            )}
          </div>

          <div>
            <p className='text-sm text-gray-500'>Email</p>
            <p className='font-medium'>{userData?.email}</p>
          </div>

          <div>
            <p className='text-sm text-gray-500'>Phone</p>

            {isEdit ? (
              <input
                value={phone}
                onChange={(e)=>setPhone(e.target.value)}
                className='border px-3 py-2 rounded w-full mt-1'
              />
            ) : (
              <p className='font-medium'>
                {userData?.phone || "Not added"}
              </p>
            )}
          </div>

        </div>

        {/* ADDRESS SECTION */}
        <div>

          <div className='flex justify-between items-center mb-4'>
            <h3 className='text-lg font-semibold'>My Addresses</h3>

            {showAddressForm && (
              <div className="border p-4 rounded-lg mb-4 grid gap-3">

                <div className="flex gap-3">
                  <input
                    placeholder="First Name"
                    className="border px-3 py-2 rounded w-full"
                    value={newAddress.firstName}
                    onChange={(e)=>setNewAddress({...newAddress, firstName:e.target.value})}
                  />
                  <input
                    placeholder="Last Name"
                    className="border px-3 py-2 rounded w-full"
                    value={newAddress.lastName}
                    onChange={(e)=>setNewAddress({...newAddress, lastName:e.target.value})}
                  />
                </div>

                <input
                  placeholder="Street"
                  className="border px-3 py-2 rounded w-full"
                  value={newAddress.street}
                  onChange={(e)=>setNewAddress({...newAddress, street:e.target.value})}
                />

                <div className="flex gap-3">
                  <input
                    placeholder="City"
                    className="border px-3 py-2 rounded w-full"
                    value={newAddress.city}
                    onChange={(e)=>setNewAddress({...newAddress, city:e.target.value})}
                  />
                  <input
                    placeholder="State"
                    className="border px-3 py-2 rounded w-full"
                    value={newAddress.state}
                    onChange={(e)=>setNewAddress({...newAddress, state:e.target.value})}
                  />
                </div>

                <div className="flex gap-3">
                  <input
                    placeholder="Zipcode"
                    className="border px-3 py-2 rounded w-full"
                    value={newAddress.zipcode}
                    onChange={(e)=>setNewAddress({...newAddress, zipcode:e.target.value})}
                  />
                  <input
                    placeholder="Country"
                    className="border px-3 py-2 rounded w-full"
                    value={newAddress.country}
                    onChange={(e)=>setNewAddress({...newAddress, country:e.target.value})}
                  />
                </div>

                <input
                  placeholder="Phone"
                  className="border px-3 py-2 rounded w-full"
                  value={newAddress.phone}
                  onChange={(e)=>setNewAddress({...newAddress, phone:e.target.value})}
                />

                {/* BUTTONS */}
                <div className="flex gap-3 mt-2">

                  <button
                    onClick={async ()=>{

                      const payload = {
                        firstName: newAddress.firstName,
                        lastName: newAddress.lastName,
                        street: newAddress.street,
                        city: newAddress.city,
                        state: newAddress.state,
                        zipcode: newAddress.zipcode,
                        country: newAddress.country,
                        phone: newAddress.phone
                      }

                      console.log("PAYLOAD:", payload)

                      await addAddress(payload)

                      await getAddresses()

                      setShowAddressForm(false)
                    }}
                    className="bg-black text-white px-4 py-2 rounded"
                  >
                    Save Address
                  </button>

                  <button
                    onClick={()=>setShowAddressForm(false)}
                    className="border px-4 py-2 rounded"
                  >
                    Cancel
                  </button>

                </div>

              </div>
            )}


            {isEdit && (
              <button
                onClick={()=>{setNewAddress(emptyAddress) 
                  setShowAddressForm(true)}}
                className='text-sm border px-3 py-1 rounded hover:bg-black hover:text-white'
              >
                + Add Address
              </button>
            )}
          </div>

          <div className='space-y-4'>

            {(!addresses || addresses.length === 0) && (
              <p className='text-gray-500 text-sm'>No addresses found</p>
            )}

            {addresses.map(addr => (

              <div
                key={addr._id}
                className={`p-4 border rounded-lg flex justify-between items-center 
                ${addr.isDefault ? 'border-black bg-gray-50' : ''}`}
              >

                <div>
                  <p className='font-medium'>
                        {addr.firstName || ''} {addr.lastName || ''}
                      </p>

                      <p className='text-sm text-gray-500'>
                        {addr.street || ''}, {addr.city || ''}, {addr.state || ''}, {addr.zipcode || ''}
                      </p>

                      <p className='text-sm text-gray-500'>
                        {addr.country || ''} • {addr.phone || ''}
                   </p>

                  {addr.isDefault && (
                    <span className='text-xs text-green-600'>
                      Default Address
                    </span>
                  )}
                </div>

                <div className='flex gap-3'>

                  {!addr.isDefault && (
                    <button
                      onClick={()=>setDefaultAddress(addr._id)}
                      className='border px-4 py-1.5 text-xs rounded hover:bg-black hover:text-white transition'
                    >
                      Make Default
                    </button>
                  )}

                  {isEdit && (
                    <button
                      onClick={()=>deleteAddress(addr._id)}
                      className='text-sm text-red-500 hover:underline'
                    >
                      Remove
                    </button>
                  )}

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>
    </div>
  )
}

export default MyProfile