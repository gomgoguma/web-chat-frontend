import React from 'react';
import { Route, Routes } from "react-router-dom";
import Login from "./pages/user/login/Login"
import Main from './pages/main/Main';
import { Provider } from 'jotai';

function App() {
  return (
    <Provider>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Provider>
  );
}

export default App;
