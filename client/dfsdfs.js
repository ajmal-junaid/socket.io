import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaSpinner } from "react-icons/fa";

export const Chat = ({ socket, userName, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
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
    }
  };

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      console.log(data);
    });
  }, []);

  return (
    <div className="bg-gray-100 px-6 py-4 flex items-center">
      <form className="w-full" onSubmit={sendMessage}>
        <div className="relative flex items-center">
          <motion.input
            type="text"
            placeholder="Type your message here"
            className="w-full bg-white rounded-lg border border-gray-300 py-2 px-4 leading-tight focus:outline-none focus:border-blue-500"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            whileFocus={{ boxShadow: "0 0 0 2px #2563eb40" }}
          />
          
            <button
              type="submit"
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
      </form>
    </div>
  );
};
