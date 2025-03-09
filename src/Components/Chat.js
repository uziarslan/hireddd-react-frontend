import React, { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";
import { Link } from "react-router-dom";
import dummyProfile from "../Assets/images/uploads/user-avatar.png";


const Chat = ({ userId, selectChat, userType }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    axiosInstance.get(`/chats/${userId}?userType=${userType}`)
      .then((response) => {
        setChats(response.data);
      })
      .catch((error) => {
      });
  }, [userId, userType]);
  
  return (
    <div className="messages-chats-navigation">
      {chats.map((chat) => (
        <Link
          key={chat._id}
          className="message-chat-member"
          onClick={() => selectChat(chat._id)}
        >
          <div className="message-avatar">
            <img
              src={
                userType === "talent"
                  ? chat.organization?.profile?.path || dummyProfile || "Unknown"
                  : chat.talent?.profile?.path || dummyProfile || "Unknown"
              }
              alt="User Avatar"
            />
            <img
              src={

                userType === "talent"
                  ? chat.organization?.profile?.path || dummyProfile
                  : chat.talent?.profile?.path || dummyProfile
              }
              alt="User Avatar"
            />
          </div>
          <div className="message-avatar-detail">
            <div className="message-avatar-title">
              {userType === "talent"
                ? chat.organization.firstName || "Unknown"
                : chat.talent.firstName || "Unknown"}
            </div>
            <div className="message-avatar-text">
              {userType === "talent"
                ? chat.organization.companyName || "Unknown"
                : chat.talent.location || "Unknown"}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Chat;