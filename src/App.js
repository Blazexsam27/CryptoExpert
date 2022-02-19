import "./App.css";
import Home from "./components/HomeComponents/Home";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Analysis from "./components/Analysis";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/analysis" element={<Analysis />}></Route>
      </Routes>
    </>
  );
}

export default App;
