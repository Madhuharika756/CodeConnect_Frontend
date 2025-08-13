import axios from "axios";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addUser } from "../utils/slices/userSlice";

const SignUp = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLasName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [about, setAbout] = useState("");
    const [photourl, setPhotourl] = useState("");
    const [error,setError] = useState("");
    // const [skills,setSkills] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showToast, setShowTast] = useState(false);

    const handleSignUp = async () => {
        try {
            const res = await axios.post("http://localhost:1399/signUp", { firstName, lastName, email, password, age, gender }, { withCredentials: true });
            dispatch(addUser(res.data));
            setShowTast(true);
            setTimeout(() => {
                navigate("/login");
            }, 3000);
        } catch (err) {
            setError(err?.response?.data)
            console.log(err);
        }
    }

    return (
        <div className="bg-[#1b2b3b] h-[91vh] pt-17">
            <div className="card bg-gray-300 text-neutral-content w-120 mx-auto">
                <div className="card-body ">
                    <div className="flex justify-center items-center">
                        <h2 className="card-title text-2xl text-gray-700 font-bold ">Sign Up</h2>
                    </div>
                    <div className="flex flex-row">
                        <fieldset className="fieldset mr-16">
                            <legend className="fieldset-legend text-gray-700">FirstName</legend>
                            <input type="text" className="input" placeholder="Type here" value={firstName}
                                onChange={(e) => setFirstName(e.target.value)} />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-gray-700">LastName</legend>
                            <input type="text" className="input" placeholder="Type here" value={lastName}
                                onChange={(e) => setLasName(e.target.value)} />
                        </fieldset>
                    </div>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-gray-700">Email Id</legend>
                        <input type="text" className="input w-full" placeholder="Type here" value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-gray-700">Password</legend>
                        <input type="text" className="input w-full" placeholder="Type here" value={password}
                            onChange={(e) => { setPassword(e.target.value) }} />
                    </fieldset>
                    <div className="flex flex-row">
                        <fieldset className="fieldset mr-16">
                            <legend className="fieldset-legend text-gray-700">Age</legend>
                            <input type="text" className="input" placeholder="Type here" value={age}
                                onChange={(e) => { setAge(e.target.value) }} />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-gray-700">Gender</legend>
                            <input type="text" className="input" placeholder="Type here" value={gender}
                                onChange={(e) => { setGender(e.target.value) }} />
                        </fieldset>
                    </div>
                    <p className="text-red-500 text-lg">{error}</p>
                    <div className="card-actions justify-center mt-5">
                        <button className="btn bg-gray-700 border-0" onClick={handleSignUp}>Sign Up</button>
                    </div>
                    <h1 className="text-xl font-semibold text-black text-center">Alredy have an account? <Link to={"/login"}><span className="text-blue-800 font-bold">Login</span> </Link> </h1>
                </div>
                {showToast && (
                        <div className="toast toast-top toast-center mt-15">
                            <div className="alert alert-success">
                                <span className="text-white font-semibold">Account created successfully! Please Login in to continue.</span>
                            </div>
                        </div>)}
            </div>
        </div>

    )
}

export default SignUp