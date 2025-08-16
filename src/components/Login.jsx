// import { use } from "react";
import axios from "axios";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { addUser } from "../utils/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin=async()=>{
        try{
            const res = await axios.post(BASE_URL+"/login",{
                email,password
            },{withCredentials:true});
            dispatch(addUser(res?.data?.user));
            return navigate("/feed");
        }
        catch(err){
            setError(err?.response?.data);
            console.log(err);
        }
    }

    return (
        <div className="bg-[#1b2b3b] h-[91vh] pt-40">
            <div className="card bg-gray-300 text-neutral-content w-96 mx-auto">
                <div className="card-body ">
                    <div className="flex justify-center items-center">
                        <h2 className="card-title text-2xl text-gray-700 font-bold ">Login</h2>
                    </div>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-gray-700">Email Id</legend>
                        <input type="text" className="input" placeholder="Type here" value={email} 
                        onChange={(e)=>setEmail(e.target.value)} />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-gray-700">Password</legend>
                        <input type="text" className="input" placeholder="Type here" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                    </fieldset>
                        <p className="text-red-500 text-lg">{error}</p>
                    <div className="card-actions justify-center mt-5">
                        <button className="btn bg-gray-700 border-0" onClick={handleLogin}>Login</button>
                    </div>
                        <h1 className="text-xl font-semibold text-black text-center">Don't have an account? <Link to={"/signUp"}><span className="text-blue-800 font-bold">Sign up</span> </Link> </h1>
                </div>
            </div>
        </div>
    )
}

export default Login