import React from "react";
import { Link } from "react-router-dom";
import { Zap, MapPin, ArrowUpRight } from "lucide-react";

const cities = [
  { city: "Bannu", areas: "Township, Saddar" },
  { city: "Peshawar", areas: "Hayatabad, Town" },
  { city: "Islamabad", areas: "F-8, G-11" },
  { city: "Lahore", areas: "Gulberg, DHA" },
  { city: "Karachi", areas: "Clifton, PECHS" },
];

const skills = [
  { label: "Electrician Services", skill: "Electrician" },
  { label: "Plumbing & Pipe Fixing", skill: "Plumber" },
  { label: "AC Maintenance & Repair", skill: "AC Technician" },
  { label: "Carpentry & Furniture", skill: "Carpenter" },
];

const navigation = [
  { label: "Home", to: "/" },
  { label: "Find Work Requests", to: "/find-workers" },
  { label: "Post a Job", to: "/post-job" },
  { label: "All 14 Categories", to: "/find-workers" },
];

function FooterHeading({ children }) {
  return (
    <h3 className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-wider text-white">
      <span className="h-4 w-1 rounded-full bg-gradient-to-b from-emerald-400 to-teal-500" />
      {children}
    </h3>
  );
}

const linkClass =
  "group inline-flex items-center gap-2 text-[15px] text-slate-400 transition-colors duration-200 hover:text-emerald-400 focus-visible:outline-none focus-visible:text-emerald-400";

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-900 text-white">
      {/* top accent line */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent"
      />

      {/* soft glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* BRAND */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-900/40 ring-1 ring-white/10">
                <Zap size={24} className="text-white" />
              </span>
              <span className="text-2xl font-extrabold tracking-tight">
                SkillConnect
              </span>
            </Link>

            <p className="mt-6 max-w-xs text-[15px] leading-7 text-slate-400">
              Direct local work marketplace connecting skilled tradespeople
              with customers across cities and local areas.
            </p>
          </div>

          {/* POPULAR CITIES */}
          <nav aria-label="Popular cities">
            <FooterHeading>Popular Cities</FooterHeading>

            <ul className="mt-6 space-y-3">
              {cities.map(({ city, areas }) => (
                <li key={city}>
                  <Link
                    to={`/find-workers?city=${encodeURIComponent(city)}`}
                    className={linkClass}
                  >
                    <MapPin
                      size={14}
                      className="shrink-0 text-slate-600 transition-colors group-hover:text-emerald-400"
                    />
                    <span>
                      {city}{" "}
                      <span className="text-slate-500 transition-colors group-hover:text-emerald-400/70">
                        ({areas})
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* TOP SKILLS */}
          <nav aria-label="Top skills">
            <FooterHeading>Top Skills</FooterHeading>

            <ul className="mt-6 space-y-3">
              {skills.map(({ label, skill }) => (
                <li key={label}>
                  <Link
                    to={`/find-workers?skill=${encodeURIComponent(skill)}`}
                    className={linkClass}
                  >
                    <span className="h-1 w-1 shrink-0 rounded-full bg-slate-600 transition-all duration-200 group-hover:w-3 group-hover:bg-emerald-400" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* QUICK NAVIGATION */}
          <nav aria-label="Quick navigation">
            <FooterHeading>Quick Navigation</FooterHeading>

            <ul className="mt-6 space-y-3">
              {navigation.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className={linkClass}>
                    <span className="h-1 w-1 shrink-0 rounded-full bg-slate-600 transition-all duration-200 group-hover:w-3 group-hover:bg-emerald-400" />
                    {label}
                    <ArrowUpRight
                      size={14}
                      className="-translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* BOTTOM */}
        <div className="mt-14 border-t border-white/10 pt-8">
          <p className="text-center text-sm text-slate-500">
            © {new Date().getFullYear()} SkillConnect. Pure Local Skills &amp;
            Work Marketplace.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;