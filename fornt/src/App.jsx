import React from "react";
import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/sidebar";

import Category from "./pages/Category";
import Allcategory from "./pages/allcategory";
import Categoryupdate from "./pages/categoryupdate";


function App() {
  return (
    <div className="flex min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Routes>

          
<Route path="/allcategory" element={<Allcategory />} />
       
             <Route path="/category" element={<Category />} />
      
<Route
  path="/categoryupdate/:categeryId"
  element={<Categoryupdate />}
/>
    
        </Routes>

      </div>

    </div>
  );
}

export default App;