
import React from "react";
import { Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/login";
import Projects from "./pages/projects";
import Projectcreate from "./pages/projectcreate";
import Projectupdate from "./pages/projectupdate";
import Sidebar from "./components/sidebar";
import Member from "./pages/member";
import AllMember from "./pages/allmember";

function App() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        <Routes>

          {/* Login */}
          <Route path="/" element={<Login />} />

          {/* Register */}
          <Route path="/register" element={<Register />} />

          {/* Create Project Form */}
          <Route path="/projects" element={<Projects />} />

          {/* All Projects */}
          <Route path="/projectcreate" element={<Projectcreate />} />

          {/* Old spelling - also works */}
          <Route path="/productcreate" element={<Projectcreate />} />

          {/* Project Update */}
          <Route path="/projectupdate" element={<Projectupdate />} />

          {/* Project Update With ID */}
          <Route
            path="/projectupdate/:id"
            element={<Projectupdate />}
          />
<Route path="/member" element={<Member/>}/>

<Route path="/allmember" element={<AllMember/>}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
