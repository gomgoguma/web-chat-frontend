import React from 'react';
import { Route, Routes } from "react-router-dom";
import Login from "./pages/user/login/Login"
import Main from './pages/main/Main';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
