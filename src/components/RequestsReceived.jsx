import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/slices/requestsSlice";
import { useEffect } from "react";

const RequestReceived = () => {

    const requests = useSelector((store) => store.requests);
    console.log(requests);
    const dispatch = useDispatch();

    const reviewRequests = async(status,_id)=>{
        await axios.post("http://localhost:1399/request/review/"+status+"/"+_id,{},{withCredentials:true});
        dispatch(removeRequest(_id));
    }

    const fetchRequests = async () => {
        try {
            const res = await axios.get("http://localhost:1399/user/requests/received", { withCredentials: true });
            dispatch(addRequests(res.data.data))

        } catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
        fetchRequests();
    }, []);

    if (!requests) return;
    if (requests.length === 0) return <h1>No Requests Found!</h1>

    return (
        <div className="bg-[#1b2b3b] h-[91vh]">
            <h1 className="text-3xl text-center font-bold pt-5">Connection Requests!</h1>
            {
                requests.map((request) => {
                    const { _id, firstName, lastName, age, gender, about, photoUrl, skills } = request.fromUserId;
                    ;
                    return (
                        <div key={_id} className="bg-gray-300 flex justify text-gray-700 items-center 
                                                    p-3 rounded-2xl mt-5 w-5/12 mx-auto">
                            <div className="mr-4 w-1/6">
                                <img src={photoUrl} alt="Your Photo" className="w-26 h-26 rounded-full" />
                            </div>
                            <div className="mr-4 w-3/6">
                                <h1 className="text-xl font-semibold">{firstName + " " + lastName}</h1>
                                <h2 className="text-md">Age: {age + " , " + gender + " ; " + about}</h2>
                                {/* <p className="text-md">{connections[0].about}</p> */}
                                <h2 className="text-md">Skills : {skills.join(" , ")}</h2>
                            </div>
                            <div className="text-end w-2/6">
                                <button className="btn btn-success mr-1" onClick={()=>reviewRequests("accepted",request._id)}>Accept</button>
                                <button className="btn btn-error" onClick={()=>reviewRequests("rejected",request._id)}>Reject</button>
                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default RequestReceived;