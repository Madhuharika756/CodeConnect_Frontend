import axios from 'axios'
import React, {  useEffect } from 'react'
import BASE_URL from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/FeedSlice'
import UserCard from './UserCard'

const Feed = () => {

  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  console.log(feed);
  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
      dispatch(addFeed(res.data))
    }
    catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getFeed();
  }, [])
  return (
     feed &&(
    <div>
      <UserCard/>
    </div>)
  )
}

export default Feed
