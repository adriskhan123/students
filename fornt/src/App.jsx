
import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Sidebar from "./components/sidebar.jsx";
import AdminProtected from "./components/layout/AdminProtected.jsx";

import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/login";
import About from "./pages/about";
import MainChat from "./pages/manichat";
import PostJob from "./pages/postjob";
import FindWorker from "./pages/findworker";
import FindWork from "./pages/findwork";
import PresentSkilled from "./pages/PresentSkilled";
import Allskiller from "./pages/allskiller";
import AddSkilled from "./pages/addskilled";
import Updateskiller from "./pages/updateskiller";
import ViewDetail from "./pages/ViewDetail.jsx";
import Loginpeple from "./pages/loginpeple.jsx";

const HIDE_SIDEBAR_PATHS = [
  "/",
  "/about",
  "/login",
  "/register",
  "/post-job",
  "/find-workers",
  "/find-work",
  "/mainChat",
  "/loginpeple",
];

function App() {
  const location = useLocation();

  const hideSidebar =
    HIDE_SIDEBAR_PATHS.includes(location.pathname) ||
    location.pathname.startsWith("/viewdetail/");

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        {!hideSidebar && <Sidebar />}

        <main className="min-w-0 flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/find-workers" element={<FindWorker />} />
            <Route path="/find-work" element={<FindWork />} />
            <Route path="/mainChat" element={<MainChat />} />
            <Route path="/loginpeple" element={<Loginpeple />} />

            <Route
              path="/post-job"
              element={
                <AdminProtected>
                  <PostJob />
                </AdminProtected>
              }
            />

            <Route
              path="/present-skilled"
              element={<PresentSkilled />}
            />
            <Route path="/all-skilled" element={<Allskiller />} />
            <Route path="/add-skilled" element={<AddSkilled />} />

            <Route
              path="/updateskiller/:id"
              element={<Updateskiller />}
            />

            <Route
              path="/viewdetail/:id"
              element={<ViewDetail />}
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;

