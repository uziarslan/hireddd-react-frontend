import React, { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";
import { Link } from "react-router-dom";

const Chat = ({ userId, selectChat, userType }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`/chats/${userId}?userType=${userType}`)
      .then((response) => {
        setChats(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the chats!", error);
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
                  ? chat.organization.profile.path
                  : chat.talent.profile.path
              }
              alt="User Avatar"
            />
            <img
              src={
                userType === "talent"
                  ? chat.organization.profile.path
                  : chat.talent.profile.path
              }
              alt="User Avatar"
            />
          </div>
          <div className="message-avatar-detail">
            <div className="message-avatar-title">
              {userType === "talent"
                ? chat.organization.firstName
                : chat.talent.firstName}
            </div>
            <div className="message-avatar-text">
              {userType === "talent"
                ? chat.organization.companyName
                : chat.talent.location}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Chat;
