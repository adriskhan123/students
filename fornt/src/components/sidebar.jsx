
import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  UserCheck,
  Users,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Plus,
  LogOut,
  Menu,
  X,
  Loader2,
  Home,
} from "lucide-react";

const API = import.meta.env.VITE_backend_base_url;

const hiddenPaths = [
  "/",
  "/about",
  "/find-work",
  "/find-workers",
  "/post-job",
  "/mainChat",
  "/login",
  "/register",
];

const menuItems = [
  {
    name: "Available Now",
    description: "Workers ready to take jobs",
    path: "/present-skilled",
    icon: UserCheck,
  },
  {
    name: "All Professionals",
    description: "Browse every skilled person",
    path: "/all-skilled",
    icon: Users,
  },
];

function SidebarContent({ onNavigate }) {
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (loggingOut) return;

    try {
      setLoggingOut(true);

      const response = await axios.post(
        `${API}/user/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        onNavigate?.();
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.error("Logout failed:", error);

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      onNavigate?.();
      navigate("/login", { replace: true });
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="flex h-full flex-col bg-slate-950 text-slate-300">
      <div className="px-5 pb-5 pt-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-indigo-900/40 ring-1 ring-white/10">
            <Sparkles size={20} strokeWidth={2.3} />
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-base font-extrabold tracking-tight text-white">
              SkillConnect
            </h2>
            <p className="truncate text-xs font-medium text-slate-400">
              Skills, Work, Local
            </p>
          </div>
        </div>
      </div>

      <div className="mx-5 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="flex-1 overflow-y-auto px-3 py-5">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Navigation
        </p>

        <nav className="space-y-1">
          <NavLink
            to="/"
            onClick={onNavigate}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-xl px-3 py-2.5 transition duration-200 ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-900/40"
                      : "bg-white/5 text-slate-400 group-hover:bg-white/10 group-hover:text-blue-300"
                  }`}
                >
                  <Home size={18} strokeWidth={2.2} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold">Home</span>
                  <span className="mt-0.5 block text-xs text-slate-500">
                    Return to homepage
                  </span>
                </span>

                <ChevronRight
                  size={15}
                  className="shrink-0 text-slate-500 transition group-hover:translate-x-1 group-hover:text-blue-400"
                />
              </>
            )}
          </NavLink>

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition duration-200 ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="absolute -left-3 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-blue-500" />
                    )}

                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition ${
                        isActive
                          ? "bg-blue-600 text-white shadow-md shadow-blue-900/40"
                          : "bg-white/5 text-slate-400 group-hover:bg-white/10 group-hover:text-blue-300"
                      }`}
                    >
                      <Icon size={18} strokeWidth={2.2} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold">
                        {item.name}
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-slate-500">
                        {item.description}
                      </span>
                    </span>

                    <ChevronRight
                      size={15}
                      className={`shrink-0 transition ${
                        isActive
                          ? "text-blue-400"
                          : "-translate-x-1 text-slate-600 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        <NavLink
          to="/add-skilled"
          onClick={onNavigate}
          className="group mt-6 flex items-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-3 text-white shadow-lg shadow-indigo-950/50 transition hover:from-blue-500 hover:to-indigo-500"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/15">
            <Plus size={20} strokeWidth={2.5} />
          </span>

          <span className="min-w-0 flex-1">
            <span className="block text-sm font-bold">
              Add Skilled Person
            </span>
            <span className="block truncate text-xs text-blue-100">
              Register a new professional
            </span>
          </span>

          <ChevronRight
            size={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </NavLink>

        <div className="mt-6 flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-3.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
            <ShieldCheck size={16} />
          </span>

          <p className="text-xs leading-5 text-slate-400">
            Contact workers directly. No middleman, no extra fees.
          </p>
        </div>
      </div>

      <div className="border-t border-white/5 p-4">
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="group flex w-full items-center gap-3 rounded-xl border border-white/10 px-3 py-2.5 text-left transition hover:border-red-500/30 hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-slate-400 transition group-hover:bg-red-500/15 group-hover:text-red-400">
            {loggingOut ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <LogOut size={16} />
            )}
          </span>

          <span className="flex-1 text-sm font-semibold text-slate-300 group-hover:text-red-300">
            {loggingOut ? "Logging Out..." : "Log Out"}
          </span>
        </button>

        <p className="mt-3 text-center text-xs text-slate-600">
          © 2026 SkillConnect
        </p>
      </div>
    </div>
  );
}

function Sidebar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (hiddenPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <>
      <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-slate-800 lg:block">
        <SidebarContent />
      </aside>

      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-slate-800 bg-slate-950/95 px-4 backdrop-blur lg:hidden">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
            <Sparkles size={16} />
          </span>

          <span className="text-sm font-extrabold text-white">
            SkillConnect
          </span>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="rounded-lg p-2 text-slate-300 transition hover:bg-white/10"
        >
          <Menu size={22} />
        </button>
      </header>

      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          className={`absolute left-0 top-0 h-full w-72 max-w-[85%] shadow-2xl transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="absolute right-3 top-4 z-10 rounded-lg p-1.5 text-slate-400 transition hover:bg-white/10 hover:text-white"
          >
            <X size={20} />
          </button>

          <SidebarContent onNavigate={() => setOpen(false)} />
        </div>
      </div>
    </>
  );
}

export default Sidebar;

