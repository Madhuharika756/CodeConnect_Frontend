import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket_client";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import axios from "axios";

const Chat = () => {
    const { targetUserId } = useParams();

    const user = useSelector((store) => store.user);
    const connections = useSelector((store) => store.connections) || [];

    const userId = user?._id;

    const connectedUser = connections.find(
        (c) => c?._id === targetUserId
    );

    const [chatUser, setChatUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [socket, setSocket] = useState(null);

    //  Load chat user 

    useEffect(() => {
        if (connectedUser) {
            setChatUser(connectedUser);
            return;
        }

        const fetchChatUser = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/user/${targetUserId}`, {
                    withCredentials: true,
                });

                setChatUser(res.data);
            } catch (err) {
                console.error("Failed to load chat user");
            }
        };

        fetchChatUser();
    }, [connectedUser, targetUserId]);


    //   Load previous messages (DB)

    useEffect(() => {
        if (!targetUserId) return;

        const fetchMessages = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
                    withCredentials: true,
                });

                setMessages(res.data || []);
            } catch (err) {
                console.error("Failed to load messages");
            }
        };

        fetchMessages();
    }, [targetUserId]);


    //  Socket connection

    useEffect(() => {
        if (!userId || !targetUserId) return;

        const socketConn = createSocketConnection();
        setSocket(socketConn);

        socketConn.emit("joinChat", { userId, targetUserId });

        socketConn.on("receiveMessage", (data) => {
            setMessages((prev) => [...prev, data]);
        });

        return () => socketConn.disconnect();
    }, [userId, targetUserId]);


    //  Loading State

    if (!user || !chatUser) {
        return (
            <div className="text-white text-center pt-40">
                Loading chat...
            </div>
        );
    }


    //  Send Message

    const sendMessage = () => {
        if (!message.trim() || !socket) return;

        socket.emit("sendMessage", {
            userId,
            targetUserId,
            message,
        });

        setMessage("");
    };


    //  UI

    return (
        <div className="bg-[#1b2b3b] min-h-screen">
            <h1 className="text-3xl text-white text-center font-semibold pt-20">
                Chat
            </h1>

            {/* Header */}
            <div className="w-3/6 mx-auto bg-gray-300 rounded-t-md">
                <div className="p-3 flex items-center gap-2">
                    <img
                        src={chatUser.photoUrl}
                        alt="avatar"
                        className="w-10 h-10 rounded-full"
                    />
                    <h3 className="text-lg font-semibold text-blue-700">
                        {chatUser.firstName}
                    </h3>
                </div>

              
                <hr className="border-gray-400" />
            </div>

            {/* Messages */}
            <div className="w-3/6 mx-auto bg-gray-300 p-3 h-[450px] overflow-y-auto">
                {messages.map((msg, index) => {
                    const senderId =
                        msg.senderId?._id || msg.senderId;

                    const isMine = senderId === userId;

                    return (
                        <div
                            key={index}
                            className={`chat ${isMine ? "chat-end" : "chat-start"}`}
                        >
                            <div className="chat-bubble">
                                {msg.text || msg.message}
                            </div>
                        </div>
                    );
                })}
            </div>

            
            <div className="w-3/6 mx-auto bg-gray-300 p-2 flex gap-2 rounded-b-md">
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write a message..."
                    className="input input-info w-full"
                />
                <button
                    onClick={sendMessage}
                    className="btn btn-info text-white"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
