
import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white p-5">

      <h1 className="text-2xl font-bold mb-8">
        My Management
      </h1>

      <div className="flex flex-col gap-3">

        <Link
          to="/category"
          className="rounded-lg px-4 py-3 hover:bg-gray-700"
        >
          Category
        </Link>

      </div>

    </div>
  );
}

export default Sidebar;

