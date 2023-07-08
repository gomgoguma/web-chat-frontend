import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/a" element={<div>a</div>} />
      <Route path="/b" element={<div>b</div>} />
    </Routes>
  );
}

export default App;
