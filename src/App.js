import React from 'react';
import { Route, Routes } from "react-router-dom";
import Login from "./pages/user/login/Login"

function App() {
  return (
    <Routes>
      <Route path="/" element={<div> home </div>} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
