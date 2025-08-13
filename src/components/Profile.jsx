import { useSelector } from "react-redux";
import EditProfile from "./EditProfile"

const Profile = () =>{
    const user = useSelector((store) => store.user);
    console.log(user);
    return(
        (user &&<div  className="bg-[#1b2b3b] h-[91vh] pl-[25%]">
            <EditProfile user={user}/>
        </div>)
    )
}

export default Profile