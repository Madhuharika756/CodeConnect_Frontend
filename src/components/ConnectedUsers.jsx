import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/slices/connectionSlice";
import { BASE_URL } from "../utils/constant";
import { Link } from "react-router-dom";

const ConnectedUsers = () => {
    const connections = useSelector((store) => store.connections);
    const dispatch = useDispatch();
    const fetchconnections = async () => {
        try {
            const res = await axios.get(BASE_URL+"/user/connections", { withCredentials: true });
            dispatch(addConnections(res.data.data));
            console.log(res?.data?.data);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchconnections();
    }, []);

    if(!connections) return;
    if(connections.length ===0) return <h1>No connections found</h1>

    return (
        <div className="bg-[#1b2b3b] h-[91vh]">
            <h1 className="text-3xl text-center font-bold pt-5">Your Connections!</h1>
            {
                connections.map((connection) => {
                    const {_id, firstName, lastName, age, gender, about, photoUrl,skills } = connection;
                    return (
                        <div key={_id} className="bg-sky-100 flex justify text-gray-700 items-center 
                                                    p-3 rounded-2xl mt-5 w-5/12 mx-auto">
                            <div className="mr-4 w-1/6">
                                <img src={photoUrl} alt="Your Photo" className="w-26 h-26 rounded-full" />
                            </div>
                            <div className="w-3/6">
                                <h1 className="text-xl font-semibold">{firstName + " " +lastName}</h1>
                                <h2 className="text-md">Age: {age + " , " +gender + " ; " +about}</h2>
                                <h2 className="text-md">Skills : {skills.join(" , ")}</h2>
                            </div>
                            <div className="text-end w-2/6 mr-4">
                                <Link to={"/chat/"+_id}><button className="btn btn-info text-white">Chat</button></Link>
                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default ConnectedUsers;