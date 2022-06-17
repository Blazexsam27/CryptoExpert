import "./App.css";
import Home from "./components/HomeComponents/Home";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/widgets/Navbar";
import Analysis from "./components/AnalysisComponents/Analysis";

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
