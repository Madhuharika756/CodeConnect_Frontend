import { Outlet } from "react-router-dom";
import Navbar from "./Navbar"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/slices/userSlice";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
const Body = () => {
    const dispatch = useDispatch();
    const userData = useSelector((store)=>store.user)

    const fetchUser = async()=>{
        if(userData) return;
        try{
            const res = await axios.get(BASE_URL +"/profile",{withCredentials:true});
            dispatch(addUser(res.data));
        }
        catch(err){
            console.log("Error");
        }
    }
    useEffect(()=>{
        fetchUser();
    },[]);
    
    return (
        <>
           <div className="image">
                <Navbar />
                <Outlet />
            </div>  
        </>
    )
}
export default Body;
