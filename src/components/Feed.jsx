import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/slices/feedSlice";
import UserCard from "./UserCard";

const Feed = ()=>{

    const feed = useSelector((store)=>store.feed);
    // console.log(feed);
    const dispatch = useDispatch();
   

    const getFeed = async()=>{
        // if(feed) return;
        try{
            const res = await axios.get("http://localhost:1399/user/feed",{withCredentials:true});
            // console.log(res.data);
            dispatch(addFeed(res?.data));
        }catch(err){
            console.log(err);
        }
    }
      useEffect(()=>{
        getFeed();
    },[]);
    if(feed.length==0) return( <h1>Loading...</h1> )
    return(
        (feed &&
        <div className="bg-[#1b2b3b] h-[91vh] pt-5">
            <UserCard user={feed[0]}/>
        </div>
        )
    )
}

export default Feed;