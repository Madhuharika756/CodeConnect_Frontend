
import { Outlet, useNavigate } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { useDispatch } from "react-redux"
import axios from "axios"
import BASE_URL from "../utils/constants"
import { addUser } from "../utils/userSlice"
import { useEffect } from "react"

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchUser = async()=>{
    try{
      const res = await axios.get(BASE_URL+"/profile",{withCredentials:true});
      dispatch(addUser(res.data));
    }
    catch(err){
      if(err.status===401){
        navigate("/login");
      }
    }
  }
  useEffect(()=>{
    fetchUser();
  },[]);
  return (
    <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body
