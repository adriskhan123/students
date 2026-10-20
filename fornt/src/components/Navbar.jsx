import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/find-workers", label: "Find Workers" },
  { to: "/add-skilled", label: "Post Job" },
];

function Navbar() {


  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => setMenuOpen(false);

  const linkClass = ({ isActive }) =>
    `relative rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-indigo-600/10 text-indigo-400 font-semibold shadow-sm border border-indigo-500/20"
        : "text-slate-300 hover:bg-white/[0.06] hover:text-white"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-all ${
      isActive
        ? "bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-600/20"
        : "text-slate-300 hover:bg-white/[0.06] hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full px-4 pt-4">
      <nav className="mx-auto max-w-7xl rounded-2xl border border-white/10 bg-slate-950/80 backdrop-blur-xl px-5 py-3.5 shadow-2xl shadow-indigo-950/20 transition-all">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="group flex items-center gap-2.5 text-xl font-bold tracking-tight text-white transition-opacity hover:opacity-90"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 shadow-md shadow-indigo-500/30 transition-transform group-hover:scale-105">
              <span className="text-white font-black text-base">S</span>
            </div>
            <span>
              Skill<span className="text-indigo-400">Connect</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-1.5 md:flex">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={linkClass}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={() => navigate("/login")}
              className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-300 transition-all hover:bg-white/[0.06] hover:text-white active:scale-95"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="relative group overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all hover:shadow-indigo-600/40 hover:brightness-110 active:scale-95"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white transition-all hover:bg-white/10 active:scale-95 md:hidden"
          >
            <svg
              className="h-5 w-5 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`grid transition-all duration-300 ease-in-out md:hidden ${
            menuOpen
              ? "grid-rows-[1fr] opacity-100 mt-4 pt-4 border-t border-white/10"
              : "grid-rows-[0fr] opacity-0 overflow-hidden"
          }`}
        >
          <div className="overflow-hidden flex flex-col gap-1.5">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={closeMenu}
                className={mobileLinkClass}
              >
                {link.label}
              </NavLink>
            ))}

            <div className="mt-3 grid grid-cols-2 gap-2.5 pt-3 border-t border-white/10">
              <button
                onClick={() => {
                  navigate("/login");
                  closeMenu();
                }}
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-center text-sm font-semibold text-white transition-all hover:bg-white/10 active:scale-95"
              >
                Login
              </button>

              <button
                onClick={() => {
                  navigate("/register");
                  closeMenu();
                }}
                className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all hover:brightness-110 active:scale-95"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;