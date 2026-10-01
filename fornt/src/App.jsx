import React from "react";
import { Routes, Route } from "react-router-dom";

import Register from "./pages/register";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/login";
import About from "./pages/about";

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;