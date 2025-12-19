import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket_client";
import { useSelector } from "react-redux";


const Chat = () => {
    const { targetUserId } = useParams();
    const user = useSelector((store) => store.user) || {};
    const connections = useSelector((store) => store.connections) || [];
    // const connectedUser = connections.find((connected) => connected?._id === targetUserId);
    const userId = user?._id;
    const { photoUrl, firstName } = user;
    console.log(targetUserId);
    useEffect(() => {
        const socket = createSocketConnection();
        socket.emit("joinChat", { userId, targetUserId });
        return () => {
            socket.disconnect();
        }
    }, [])
    return (

        <div className="bg-[#1b2b3b] min-h-screen">
            <h1 className="text-3xl text-white text-center font-semibold pt-20 mb-2">Chat</h1>
            <div className="w-3/6 m-auto pl-1  bg-gray-300 border-2 rounded-t-lg">
                <h3 className="text-xl text-blue-800 font-bold py-2">{firstName }</h3>
            </div>
            <div className="w-3/6 m-auto bg-gray-300 p-3 ">
                <div className="chat chat-start">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS chat bubble component"
                                src={photoUrl}
                            />
                        </div>
                    </div>
                    <div className="chat-header text-blue-700 font-semibold !text-lg" >
                        {firstName}
                        {/* <time className="text-xs text-blue-700 font-semibold">12:45</time> */}
                    </div>
                    <div className="chat-bubble">You were the Chosen One!</div>
                </div>
                <div className="chat chat-end">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS chat bubble component"
                                src={photoUrl}
                            />
                        </div>
                    </div>
                    <div className="chat-header text-blue-700 font-semibold !text-lg mr-0.5">{firstName}
                        {/* <time className="text-xs text-blue-700 font-semibold">12:46</time> */}
                    </div>
                    <div className="chat-bubble">I hate you!</div>
                </div>
            </div>
            <div className="w-3/6 mx-auto py-1 px-3 bg-gray-300 border-t-2 rounded-b-lg flex items-center gap-2">
                <input
                    type="text" placeholder="Write a message..." className="input input-info w-full"
                />
                <button className="btn btn-info text-white">Send</button>
            </div>

        </div>
    )
}

export default Chat;
