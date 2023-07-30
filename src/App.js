import React from 'react';
import { Route, Routes } from "react-router-dom";
import Login from "./pages/user/login/Login"
import Main from './pages/main/Main';
import Chat from './pages/chat/Chat';
import { Provider } from 'jotai';

function App() {
  return (
    <Provider>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Provider>
  );
}

export default App;
