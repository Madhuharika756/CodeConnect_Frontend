import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import BASE_URL from "../utils/constants"

const Login = () => {
  const [email, setEmail] = useState("madhuharika@gmail.com");
  const [password, setPassword] = useState("Madhu@123");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function handleOnClick() {
    
    try {
      const res = await axios.post(BASE_URL+"/login",
        { email, password }, { withCredentials: true }
      );
      // console.log(res.data);
      dispatch(addUser(res.data));
      return navigate("/");
    }

    catch (err) {
      setError(err?.response?.data);
      console.log(err)
    }
  }
  return (
    <div className='flex justify-center mt-30'>
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center text-3xl mb-2">Login</h2>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email :</legend>
              <input value={email} type="text" className="input" placeholder="Enter Email Id" onChange={(e) => setEmail(e.target.value)} />
            </fieldset>
          </div>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password :</legend>
              <input value={password} type="text" className="input" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
            </fieldset>
          </div>
            <p className='text-center text-xl text-red-500'>{error}</p>
          <div className="card-actions justify-center mt-5">
            <button className="btn btn-primary" onClick={handleOnClick}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
