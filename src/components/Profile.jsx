import { useSelector } from "react-redux";
import EditProfile from "./EditProfile"

const Profile = () =>{
    const user = useSelector((store) => store.user);
    console.log(user);
    return(
        (user &&<div  className="bg-[#1b2b3b] min-h-screen pl-[25%]">
            <EditProfile user={user}/>
        </div>)
    )
}

export default Profile