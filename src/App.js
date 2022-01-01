import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import CryptoList from "./components/CryptoList";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={[<Home />, <CryptoList />]}></Route>
      </Routes>
    </>
  );
}

export default App;
