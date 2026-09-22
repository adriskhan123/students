import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ShieldUser,
  FolderKanban,
  NotebookPen,
  Users,
} from "lucide-react";

function Sidebar() {
  const location = useLocation();

  if (location.pathname === "/" || location.pathname === "/register") {
    return null;
  }

  const menuItems = [
    {
      name: "Admin",
      path: "/admin",
      icon: ShieldUser,
    },
    {
      name: "Projects",
      path: "/projects",
      icon: FolderKanban,
    },
    {
      name: "Notes",
      path: "/notes",
      icon: NotebookPen,
    },
    {
      name: "Members",
      path: "/member",
      icon: Users,
    },
  ];

  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200 shadow-sm p-5">

      {/* Profile */}
      <div className="flex flex-col items-center mb-8">
        <img
          src="https://i.pravatar.cc/150?img=12"
          alt="Admin"
          className="w-20 h-20 rounded-full object-cover shadow-md border-2 border-gray-100"
        />

        <h2 className="mt-3 text-lg font-semibold text-gray-800">
          Admin
        </h2>

        <p className="text-sm text-gray-500">
          Administrator
        </p>
      </div>

      {/* Menu */}
      <div className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-200 ${
                active
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
              }`}
            >
              <Icon size={21} strokeWidth={2} />

              <span className="font-medium">
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>

    </div>
  );
}

export default Sidebar;