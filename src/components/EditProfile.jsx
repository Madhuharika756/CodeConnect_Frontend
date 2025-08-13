import axios from "axios";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { addUser } from "../utils/slices/userSlice";

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [about, setAbout] = useState(user.about);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const [showToast, setShowTast] = useState(false);
    const handleEditProfile = async () => {
        setError("");
        try {
            const res = await axios.post("http://localhost:1399/updateProfile", { firstName, lastName, age, gender, photoUrl, about }, { withCredentials: true });
            console.log(res);
            dispatch(addUser(res?.data?.data));
            setShowTast(true);
            setTimeout(()=>{
                setShowTast(false);
            },2000);
        } catch (err) {
            setError(err?.response?.data);
            console.log(err);
        }
    }

    return (
        <div className="flex items-center">
            <div className="bg-[#1b2b3b] h-[91vh] pt-22">
                <div className="card bg-gray-300 text-neutral-content w-120">
                    <div className="card-body ">
                        <div className="flex justify-center items-center">
                            <h2 className="card-title text-2xl text-gray-700 font-bold pt-0 ">Edit Profile</h2>
                        </div>
                        <div className="flex flex-row">
                            <fieldset className="fieldset mr-16">
                                <legend className="fieldset-legend text-gray-700">FirstName</legend>
                                <input type="text" className="input" placeholder="Type here" value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)} />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend text-gray-700">LastName</legend>
                                <input type="text" className="input" placeholder="Type here" value={lastName} onChange={(e) => { setLastName(e.target.value) }} />
                            </fieldset>
                        </div>
                        <div className="flex flex-row">
                            <fieldset className="fieldset mr-16">
                                <legend className="fieldset-legend text-gray-700">Age</legend>
                                <input type="text" className="input" placeholder="Type here" value={age} onChange={(e) => { setAge(e.target.value) }} />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend text-gray-700">Gender</legend>
                                <input type="text" className="input" placeholder="Type here" value={gender} onChange={(e) => { setGender(e.target.value) }} />
                            </fieldset>
                        </div>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-gray-700">About</legend>
                            <input type="text" className="input w-full" placeholder="Type here" value={about} onChange={(e) => { setAbout(e.target.value) }} />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-gray-700 mt-2">PhotoUrl</legend>
                            <input type="text" className="input w-full" placeholder="Type here" value={photoUrl} onChange={(e) => { setPhotoUrl(e.target.value) }} />
                        </fieldset>
                        <p className="text-red-500 text-lg font-semibold">{error}</p>
                        <div className="card-actions justify-center mt-2">
                            <button className="btn bg-gray-700 border-0" onClick={handleEditProfile}>Save Profile</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card bg-[#1b2b3b] w-96 shadow-sm">
                <figure className="px-10 pt-10">
                    <img
                        src={photoUrl}
                        alt="Your Photo"
                        className="rounded-xl" />
                </figure>
                <div className="card-body flex items-center">
                    <h2 className="card-title">{firstName + " " + lastName}</h2>
                    <p>Description : {about}</p>
                    <p>Gender : {gender}</p><p> Age:{age}</p>
                </div>
            </div>
            {showToast&& (<div className="toast toast-center">
                <div className="alert alert-success">
                    <span>☑️ Profile Saved successfully.</span>
                </div>
            </div>)}
        </div>
    )
}

export default EditProfile
