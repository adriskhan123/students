
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Menu,
  X,
  User,
  Info,
  BriefcaseBusiness,
  Users,
  PlusCircle,
} from "lucide-react";

function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about", icon: Info },
    { name: "Find Work", path: "/find-work", icon: BriefcaseBusiness },
    { name: "Find Workers", path: "/find-workers", icon: Users },
    { name: "Post a Job", path: "/post-job", icon: PlusCircle },
  ];

  const closeMenu = () => setOpen(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      {/* Main Navbar */}
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="group flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-extrabold text-white shadow-lg shadow-blue-500/20 transition duration-300 group-hover:scale-105">
            SC
          </div>

          <div className="hidden sm:block">
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
              Skill<span className="text-blue-600">Connect</span>
            </h1>

            <p className="text-[11px] font-medium tracking-wide text-slate-500">
              SKILLS • WORK • LOCAL
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `group flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                  }`
                }
              >
                {Icon && <Icon size={17} />}
                {link.name}
              </NavLink>
            );
          })}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
          >
            <User size={17} />
            Sign In
          </Link>

          <Link
            to="/register"
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-blue-600 md:hidden"
        >
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden border-t border-slate-200 bg-white transition-all duration-300 md:hidden ${
          open ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">

          {/* Links */}
          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;

              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                    }`
                  }
                >
                  {Icon && <Icon size={18} />}
                  {link.name}
                </NavLink>
              );
            })}
          </div>

          {/* Divider */}
          <div className="my-4 border-t border-slate-200" />

          {/* Auth */}
          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/login"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
            >
              <User size={17} />
              Sign In
            </Link>

            <Link
              to="/register"
              onClick={closeMenu}
              className="flex items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
