import './App.css';
import Home from "./component/Home";
import Music from "./component/Music";
import NavBar from "./component/NavBar";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [isDark, setIsDark] = useState(false);
  return (
    <Router>
      <div className={isDark ? "dark" : "light"}>
        <NavBar isDark={isDark} setIsDark={setIsDark} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Moosic" element={<Music />} />
        </Routes>


      </div>
    </Router>
  );
}

export default App;
