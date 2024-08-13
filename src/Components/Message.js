import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../services/axiosInstance";
import io from "socket.io-client";

const DOMAIN = process.env.REACT_APP_DOMAIN;
const socket = io(DOMAIN);

const Message = ({ chatId, user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [sender, setSender] = useState("");
  const [name, setName] = useState("");
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (chatId) {
      axiosInstance
        .get(`/messages/${chatId}`)
        .then((response) => {
          setMessages(response.data);
          if (user.role === "talent") {
            setSender(response.data[0].chatId.organization.profile.path);
            setName(response.data[0].chatId.organization.firstName);
          } else if (user.role === "organization") {
            setSender(response.data[0].chatId.talent.profile.path);
            setName(response.data[0].chatId.talent.firstName);
          }
          socket.emit("joinChat", chatId);
        })
        .catch((error) => {
          console.error("There was an error fetching the messages!", error);
        });
    }

    socket.on("receiveMessage", (message) => {
      if (message.chatId === chatId) {
        setMessages((prevMessages) => [...prevMessages, message]);
        scrollToBottom();
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [chatId, user.role]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() !== "") {
      const message = {
        chatId,
        content: newMessage.trim(),
        timestamp: new Date(),
      };
      axiosInstance
        .post("/message", message)
        .then((response) => {
          socket.emit("sendMessage", response.data);
          setNewMessage("");
          scrollToBottom();
        })
        .catch((error) => {
          console.error("There was an error sending the message!", error);
        });
    }
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!sender) return null;

  return (
    <div className="message-chat-content current">
      <div className="message-chat-content-head">
        <div className="message-chat-profile">
          <div className="message-chat-image">
            <img src={sender} alt="Avatar" />
          </div>
          <div className="message-chat-info">{name}</div>
        </div>
      </div>
      <div className="message-chat-body">
        {messages.map(
          (message, index) =>
            message.text && (
              <div
                key={index}
                className={`message ${
                  message.sender === user._id ? "sent" : "received"
                }`}
              >
                <div className="message-time">
                  {new Date(message.createdAt).toLocaleTimeString()}
                </div>
                {message.text}
              </div>
            )
        )}
        <div ref={messageEndRef} style={{ marginBottom: "15px" }} />
      </div>
      <div className="message-chat-type">
        <form onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <input type="submit" value="" />
        </form>
      </div>
    </div>
  );
};

export default Message;
