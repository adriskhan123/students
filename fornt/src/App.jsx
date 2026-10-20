import React from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";

import Home from "./pages/home";
import About from "./pages/about";
import Login from "./pages/login";
import Register from "./pages/register";
import FindWorker from "./pages/findworker";
import FindWork from "./pages/findwork";
import PostJob from "./pages/postjob";
import CustomerProtected from "./components/layout/CustomerProtected";
import WorkerProtected from "./components/layout/WorkerProtected";
import AddSkilled from "./pages/addskilled";
import PresentSkilled from "./pages/presentskilled";
import Allskiller from "./pages/allskiller";
import Updateskiller from "./pages/updateskiller";
import ViewDetail from "./pages/ViewDetail";
import MainChat from "./pages/manichat";
import Sidebar from "./components/sidebar";
import Navbar from "./components/Navbar";

// Top navbar only (no sidebar)
function PublicLayout() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <Outlet />
    </div>
  );
}

// Sidebar only (no top navbar)
function SidebarLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <main className="min-w-0 flex-1">
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* "/" shows ONLY the Home page (Home.jsx already has its own Navbar) */}
      <Route path="/" element={<Home />} />

      {/* Public pages: Navbar only */}
      <Route element={<PublicLayout />}>
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* All other pages: Sidebar only */}
      <Route element={<SidebarLayout />}>
        <Route
          path="/find-workers"
          element={
            <CustomerProtected>
              <FindWorker />
            </CustomerProtected>
          }
        />
        <Route
          path="/find-work"
          element={
            <WorkerProtected>
              <FindWork />
            </WorkerProtected>
          }
        />
        <Route
          path="/post-job"
          element={
            <CustomerProtected>
              <PostJob />
            </CustomerProtected>
          }
        />
        <Route
          path="/add-skilled"
          element={
            <WorkerProtected>
              <AddSkilled />
            </WorkerProtected>
          }
        />
        <Route
          path="/present-skilled"
          element={
            <WorkerProtected>
              <PresentSkilled />
            </WorkerProtected>
          }
        />
        <Route
          path="/updateskiller/:id"
          element={
            <WorkerProtected>
              <Updateskiller />
            </WorkerProtected>
          }
        />
        <Route path="/viewdetail/:id" element={<ViewDetail />} />
        <Route path="/all-skilled" element={<Allskiller />} />
        <Route path="/mainChat" element={<MainChat />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;