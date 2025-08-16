import axios from "axios";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/slices/feedSlice";
import { BASE_URL } from "../utils/constant";

const UserCard = ({user}) => {
    // console.log(user);
    const dispatch= useDispatch();
    const {_id,firstName,lastName,age,photoUrl,about,skills,gender } = user;
    const handleSendRequest = async(status,userId)=>{
        try{

            const res = await axios.post(BASE_URL+"/request/send/"+status+"/"+userId,{},{withCredentials:true});
            dispatch(removeFeed(userId));
        }catch(err){
            console.log(err);
        }
    }
    return (
        <div className="card bg-[#1b2b3b] w-96 shadow-sm mx-auto">
            <figure className="px-10 pt-10">
                <img
                    src={photoUrl}
                    alt="Your Photo"
                    className="rounded-xl" />
            </figure>
            <div className="card-body flex items-center">
                <h2 className="card-title">{firstName+" "+lastName}</h2>
                <p>Description : {about}</p>
                <p>Gender : {gender}, Age:{age}</p>
                <p>Skills : {skills?.join(" , ")}</p>
                <div className="card-actions">
                    <button className="btn btn-secondary" onClick={()=>handleSendRequest("Ignored",_id)}>Ignore</button>
                    <button className="btn btn-success" onClick={()=>handleSendRequest("interested",_id)}>Connect</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard;