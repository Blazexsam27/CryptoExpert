import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import CryptoList from "./components/CryptoList";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Analysis from "./components/Analysis";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={[<Home />, <CryptoList />]}></Route>
        <Route path="/analysis" element={<Analysis />}></Route>
      </Routes>
    </>
  );
}

export default App;
