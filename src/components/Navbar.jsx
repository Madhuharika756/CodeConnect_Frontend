import { Link, useNavigate } from "react-router-dom";
import Dev_Logo from "../assets/Dev_Logo.png"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { removeUser } from "../utils/slices/userSlice";
import { BASE_URL } from "../utils/constant";

const Navbar = () => {
    const user = useSelector((store) => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogOut = async () => {
        try {
            await axios.post(BASE_URL+"/logout", {}, { withCredentials: true });
            dispatch(removeUser());
            return navigate("/");
        }
        catch (err) {
            console.log("Error");
        }
    }


    return (
        <>
            <div className="fixed navbar bg-gradient-to-r from-sky-400 to-cyan-200 shadow-sm px-5">
                <div className="flex-1">
                    <div className="flex flex-row items-center">
                        <img src={Dev_Logo} alt="CodeConnect Logo" className="w-20 h-auto rounded-full" />
                        <a className="text-3xl text-white font-semibold ml-1">CodeConnect</a>
                        {/* <a className="btn btn-ghost text-2xl">CodeConnect</a> */}
                    </div>
                </div>
                <div className="flex gap-2">
                    {!user && <Link to={"/login"}>
                        <button className="btn bg-gray text-md font-bold hover:bg-gray-700 text-gray-200 ">Login</button>
                    </Link>}
                    {user && <div className="dropdown dropdown-end ">
                        <div className="flex items-center">
                            {user.firstName && (<div className="flex items-center"><p className="text-gray-700 text-xl font-semibold mr-2">Welcome, {user.firstName}.</p>
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-16 rounded-full">
                                        <img
                                            alt="Your Photo"
                                            src={user.photoUrl} />
                                    </div>
                                </div></div>)}
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-white rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li className="text-black text-lg font-semibold">
                                <Link to={"/feed"} className="justify-between">
                                    Home
                                </Link>
                            </li>
                            <li className="text-black text-lg font-semibold">
                                <Link to={"/profile"} className="justify-between">
                                    Profile
                                </Link>
                            </li>
                            <li className="text-black text-lg font-semibold"><Link to={"/connections"}>Connections</Link></li>
                            <li className="text-black text-lg font-semibold"><Link to={"/requests"}>Requests Received</Link></li>
                            <li className="text-black text-lg font-semibold" onClick={handleLogOut}><Link>Logout</Link></li>
                        </ul>
                    </div>}
                </div>
            </div>
        </>
    )
}

export default Navbar;