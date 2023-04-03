import React, { useState } from "react";
import { FaSignInAlt, FaUserFriends } from "react-icons/fa";
import { motion } from "framer-motion";
import io from "socket.io-client";
import { Chat } from "./Chat";
const socket = io.connect("http://localhost:4000");

function Home() {
  const [userId, setUserId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [login, setLogin] = useState(false);

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleRoomIdChange = (event) => {
    setRoomId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userId != "" && roomId != "") {
      socket.emit("join_room", roomId);
      setLogin(true);
    }
  };

  return (
    <div className="flex flex-col max-h-screen">
      {/* Header */}
      <header className="bg-gray-800 py-4">
        <nav className="flex justify-between items-center container mx-auto">
          <a href="/" className="text-2xl font-bold text-white">
            My Chat App
          </a>
          <button className="text-gray-300 hover:text-white focus:outline-none focus:text-white">
            Menu
          </button>
        </nav>
      </header>
      {/* Body */}
      {login ? (
        <Chat socket={socket} userName={userId} room={roomId} />
      ) : (
        <main className="flex-grow container mx-auto flex items-center justify-center h-screen">
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col w-full max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-6">
              <FaUserFriends className="inline-block mr-2" />
              Join a Chat Room
            </h1>
            <label htmlFor="userId" className="text-lg font-medium mb-2">
              User ID:
            </label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={userId}
              onChange={handleUserIdChange}
              placeholder="Enter your user ID"
              className="rounded-lg border border-gray-400 p-2 mb-4 focus:outline-none focus:ring focus:border-blue-300"
            />
            <label htmlFor="roomId" className="text-lg font-medium mb-2">
              Room ID:
            </label>
            <input
              type="text"
              id="roomId"
              name="roomId"
              value={roomId}
              onChange={handleRoomIdChange}
              placeholder="Enter the room ID"
              className="rounded-lg border border-gray-400 p-2 mb-4 focus:outline-none focus:ring focus:border-blue-300"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
            >
              <FaSignInAlt className="inline-block mr-2" />
              Join Chat Room
            </button>
          </motion.form>
        </main>
      )}
      {/* Footer */}

      <footer className="bg-gray-800 py-4 text-center text-gray-400 text-sm">
        &copy; 2023 My Chat App. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;
