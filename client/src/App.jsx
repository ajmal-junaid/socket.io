import { useState } from "react";
import "./App.css";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3003");
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>Welcome back</h1>
    </div>
  );
}

export default App;
