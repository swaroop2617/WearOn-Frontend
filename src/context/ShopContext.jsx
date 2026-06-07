import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";

const ShopContext = createContext();


const ShopContextProvider = (props)=>{

    const [user, setUser] = useState(null)
    const currency='₹';
    const delivery_fee=10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search,setSearch]=useState('')
    const [showSearch,setShowSearch]=useState(false);
    const [cartItems,setCartItems]=useState({});
    const [buyNowItem, setBuyNowItem] = useState(null);
    const [products,setProducts]=useState([]);
    const [token,setToken]=useState('')
    const navigate=useNavigate();
    const [loading, setLoading] = useState(true);
    const [addresses, setAddresses] = useState([])
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    const addToCart=async(itemId,size)=>{

        if(!size){
            toast.error('Select Product Size')
            return;
        }


        let cartData=structuredClone(cartItems);

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size]+=1;
            }
            else{
                cartData[itemId][size]=1;
            }
        }
        else{
            cartData[itemId]={};
            cartData[itemId][size]=1;
        }
        setCartItems(cartData);
        
        if (token) {
            try {
                await axios.post(backendUrl+'/api/cart/add',{itemId,size},{headers:{token}})
                
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
            
        }
    }

    const getCartCount=()=>{
        let totalCount=0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try{
                    if(cartItems[items][item]>0){
                        totalCount+=cartItems[items][item];
                    }
                }
                catch{
                    console.log(error)
                    toast.error(error.message)
                }
            }
        }
        return totalCount;
    }

    const updateQuantity=async(itemId,size,quantity)=>{
        let cartData=structuredClone(cartItems);
        cartData[itemId][size]=quantity;

        setCartItems(cartData);
        if (token) {
            try {
                await axios.post(backendUrl+'/api/cart/update',{itemId,size,quantity},{headers:{token}})
            } catch (error) {
                
            }
        }
    }

    const getCartAmount=()=>{
        let totalAmount=0;
        for(const items in cartItems){
            let itemInfo=products.find((product)=>product._id===items);
            for(const item in cartItems[items]){
                try{
                    if(cartItems[items][item]>0){
                        totalAmount+=itemInfo.price*cartItems[items][item];
                    }
                }
                catch(err){

                }
            }
        }
        return totalAmount;
    }

    const getProductsData = async () => {
        try {
            setLoading(true); 

            console.log("BACKEND:", backendUrl);

            const response = await axios.get(backendUrl + '/api/product/list');

            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
                setLoading(false);   // 👈 ADD HERE
        }
    };

    const getUserCart=async(token)=>{
        try {
            const response=await axios.post(backendUrl+'/api/cart/get',{},{headers:{token}})
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        getProductsData();
    },[])

    useEffect(()=>{
        if (!token&& localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    })

    // ================= ADDRESS =================

    // GET ADDRESSES
    const getAddresses = async () => {
    try {
        const res = await axios.post(
        backendUrl + "/api/user/get-addresses",
        {},
        { headers: { token } }
        )

        if (res.data.success) {
        setAddresses(res.data.addresses)
        }

    } catch (error) {
        console.log(error)
    }
    }

    // ADD ADDRESS
    const addAddress = async (address) => {
        try {

            console.log("SENDING:", address)

            const res = await axios.post(
            backendUrl + "/api/user/add-address",
            { address },
            { headers: { token } }
            )

            console.log("RESPONSE:", res.data)
            console.log("SENDING:", address)
            if (res.data.success) {
            setAddresses(res.data.addresses)
            }

        } catch (error) {
            console.log(error)
        }
    }

    // SET DEFAULT
    const setDefaultAddress = async (addressId) => {
    try {
        const res = await axios.post(
        backendUrl + "/api/user/set-default-address",
        { addressId },
        { headers: { token } }
        )

        if (res.data.success) {
        setAddresses(res.data.addresses)
        }

    } catch (error) {
        console.log(error)
    }
    }

    // DELETE
    const deleteAddress = async (addressId) => {
    try {
        const res = await axios.post(
        backendUrl + "/api/user/delete-address",
        { addressId },
        { headers: { token } }
        )

        if (res.data.success) {
        setAddresses(res.data.addresses)
        }

    } catch (error) {
        console.log(error)
    }
    }

    const getUserProfile = async () => {
        try {

            const res = await axios.post(
            backendUrl + "/api/user/profile",
            {},
            { headers: { token } }
            );

            if (res.data.success) {
            setUserData(res.data.user);
            }

        } catch (error) {
            console.log(error);
        }
    };

    const updateUserProfile = async (data) => {
        try {

            const res = await axios.post(
            backendUrl + "/api/user/update-profile",
            data,
            { headers: { token } }
            );

            if (res.data.success) {
            setUserData(res.data.user);
            }

        } catch (error) {
            console.log(error);
        }
    };

    const value={
        products,loading,currency,delivery_fee,
        search,setSearch,showSearch,setShowSearch,
        cartItems,addToCart,setCartItems,getCartCount,updateQuantity,
        getCartAmount,navigate,backendUrl,
        setToken,token,buyNowItem,setBuyNowItem,
        addresses,
        getAddresses,
        addAddress,
        setDefaultAddress,
        deleteAddress,
        userData,
        getUserProfile,
        updateUserProfile,
        user,setUser
    }

    return(
        <ShopContext.Provider value={value}>
            <>
                <div className={loading ? "blur-sm pointer-events-none" : ""}>
                    {props.children}
                </div>

                {loading && <Loader />}
            </>
        </ShopContext.Provider>
    )
}
export { ShopContext };
export default ShopContextProvider;