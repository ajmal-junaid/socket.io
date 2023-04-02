import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaSpinner } from "react-icons/fa";
import ChatBubble from "./ChatBubble";
import ScrollToBottom from "react-scroll-to-bottom";
export const Chat = ({ socket, userName, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const sendMessage = async () => {
    if (currentMessage) {
      const messageData = {
        room: room,
        author: userName,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      console.log(data);
      setMessageList((list) => [...list, data]);
    });
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-gray-200 p-4 flex-1 overflow-y-scroll">
        {/* Chat messages display goes here */}
        <ScrollToBottom className="chat-height">
          {messageList.map((messageContent, index) => {
            return (
              <ChatBubble
                key={index}
                message={messageContent.message}
                time={messageContent.time}
                isUser={messageContent.author === userName}
                author={messageContent.author}
              />
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="bg-gray-100 px-6 py-4 flex items-center">
        <div className="w-full" onSubmit={sendMessage}>
          <div className="relative flex items-center">
            <motion.input
              type="text"
              placeholder="Type your message here"
              className="w-full bg-white rounded-lg border border-gray-300 py-2 px-4 leading-tight focus:outline-none focus:border-blue-500"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={(e) => {
                e.key === "Enter" && sendMessage();
              }}
              whileFocus={{ boxShadow: "0 0 0 2px #2563eb40" }}
            />

            <button
              onClick={sendMessage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
              disabled={!currentMessage}
            >
              <motion.div
                className="bg-blue-500 rounded-full p-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaPaperPlane className="text-white" />
              </motion.div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
