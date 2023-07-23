import React from 'react';
import { Route, Routes } from "react-router-dom";
import Login from "./pages/user/login/Login"
import Main from './pages/main/Main';
import Chat from './pages/chat/Chat';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}

export default App;
