import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login";
import ChatRoom from "./chat/chatroom";

const App = () => {
  return (
    <BrowserRouter>
    <div style={{height : '100vh', padding  :'-20px', margin : '0', boxSizing :'border-box'}}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/chatroom" element = {<ChatRoom />}/>
        </Routes>
    </div>
    </BrowserRouter>
  );
};

export default App;
