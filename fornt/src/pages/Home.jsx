import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Search,
  BriefcaseBusiness,
  ArrowRight,
  CheckCircle2,
  Zap,
  Droplets,
  Hammer,
  Paintbrush,
  HardHat,
  Flame,
  Snowflake,
  Smartphone,
  Monitor,
  Car,
  Scissors,
  Sparkles,
  Settings,
  Menu,
} from "lucide-react";
import axios from "axios";

function Home() {
// const [workers, setWorkers] = useState([]);





// async function apifind() {
//   try {
//     let response = await axios.get(
//       `${import.meta.env.VITE_backend_base_url}/home/findhome`
//     );

//     setWorkers(response.data);
//   } catch (error) {
//     console.log(error);
//   }
// }
// useEffect(()=>{apifind();},[])



  const workTypes = [
    { name: "Electrician", icon: Zap },
    { name: "Plumber", icon: Droplets },
    { name: "Carpenter", icon: Hammer },
    { name: "Painter", icon: Paintbrush },
    { name: "Mason", icon: HardHat },
    { name: "Welder", icon: Flame },
    { name: "AC Technician", icon: Snowflake },
    { name: "Mobile Repair", icon: Smartphone },
    { name: "Computer Technician", icon: Monitor },
    { name: "Driver", icon: Car },
    { name: "Tailor", icon: Scissors },
    { name: "Cleaner", icon: Sparkles },
    { name: "Mechanic", icon: Settings },
    { name: "Other Skills", icon: Menu },
  ];

  const highlights = [
    { label: "Local Workers", icon: MapPin, color: "text-blue-600" },
    { label: "Easy Search", icon: Search, color: "text-blue-600" },
    { label: "Direct Contact", icon: CheckCircle2, color: "text-green-600" },
  ];

  return (
    <>
      {/* HERO */}
      <div className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-white">
        {/* Background decoration */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-blue-100/50 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-indigo-100/50 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-50/70 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <main className="relative z-10 flex min-h-[calc(100vh-80px)] items-center px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-6xl">
            {/* Badge */}
            <div className="mb-6 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-white/80 px-4 py-2 text-sm font-semibold text-green-700 shadow-sm backdrop-blur-sm">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-500 motion-reduce:animate-none" />
                Direct WhatsApp Contact
              </div>
            </div>

            {/* Heading */}
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl">
                Need Skilled Work?
                <span className="mt-2 block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text pb-2 text-transparent">
                  Find <The></The> Right Person.
                </span>
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                Connect with skilled workers in your city and area. Post your
                work or find the right professional near you.
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <Link
                to="/find-workers"
                className="group flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-blue-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 motion-reduce:transform-none"
              >
                <Search size={19} aria-hidden="true" />
                Find a Worker
                <ArrowRight
                  size={18}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none"
                />
              </Link>

              <Link
                to="/post-job"
                className="group flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-7 py-3.5 text-base font-bold text-slate-700 shadow-md backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-green-200 hover:bg-green-50 hover:text-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 motion-reduce:transform-none"
              >
                <BriefcaseBusiness
                  size={19}
                  aria-hidden="true"
                  className="transition-transform group-hover:scale-110 motion-reduce:transform-none"
                />
                Post Your Work
              </Link>
            </div>

            {/* Highlights */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {highlights.map(({ label, icon: Icon, color }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm backdrop-blur-sm"
                >
                  <Icon size={16} aria-hidden="true" className={color} />
                  {label}
                </div>
              ))}
            </div>

            {/* Popular professions */}
            <div className="mt-8 text-center">
              <p className="text-sm font-medium text-slate-500">
                Find professionals for
              </p>

              <div className="mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1 text-sm font-semibold text-slate-600">
                <span>Electricians</span>
                <span aria-hidden="true" className="text-slate-300">•</span>
                <span>Plumbers</span>
                <span aria-hidden="true" className="text-slate-300">•</span>
                <span>Carpenters</span>
                <span aria-hidden="true" className="text-slate-300">•</span>
                <span>Drivers</span>
                <span aria-hidden="true" className="text-slate-300">•</span>
                <span>And More</span>
              </div>
            </div>

            {/* Tagline */}
            <div className="mt-8 flex items-center justify-center gap-2 text-xs font-medium text-slate-500">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              Connect locally. Work directly. Grow together.
            </div>
          </div>
        </main>
      </div>

      {/* CATEGORIES */}
     <section
  aria-labelledby="categories-heading"
  className="relative border-t border-slate-200 bg-slate-50 px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
>
  <div className="mx-auto max-w-7xl">
    {/* Section header */}
    <div className="mx-auto mb-14 max-w-3xl text-center">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-1.5 text-sm font-semibold text-blue-600 shadow-sm">
        <Search size={14} aria-hidden="true" />
        Find skilled professionals
      </div>

      <h2
        id="categories-heading"
        className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
      >
        What work do you need?
      </h2>

      <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
        Pick a service and browse verified-by-reviews professionals
        available in your area.
      </p>
    </div>

    {/* Category grid */}
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
      {workTypes.map((work) => {
        const Icon = work.icon;

        return (
          <Link
            key={work.name}
            to={`/find-workers?skill=${encodeURIComponent(work.name)}`}
            className="group relative flex min-h-[176px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white px-4 py-6 text-center shadow-sm ring-1 ring-transparent transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 motion-reduce:transform-none"
          >
            {/* Hover accent bar */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-emerald-500 to-teal-500 transition-transform duration-300 group-hover:scale-x-100 motion-reduce:transition-none"
            />

            {/* Icon */}
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition-all duration-300 group-hover:bg-emerald-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-emerald-200">
              <Icon size={30} strokeWidth={1.75} aria-hidden="true" />
            </div>

            {/* Name */}
            <h3 className="mt-4 text-[15px] font-bold leading-tight text-slate-900 transition-colors duration-300 group-hover:text-emerald-700">
              {work.name}
            </h3>

            {/* Hover hint */}
            <span className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-emerald-600 opacity-0 transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
              Browse workers
              <ArrowRight
                size={12}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </span>
          </Link>
        );
      })}
    </div>

   
  </div>
</section>

{/* {workers.map((item) => (
  <div key={item._id}>
    <h2>{item.title}</h2>
    <p>{item.area}</p>
    <p>Rs. {item.budget}</p>
  </div>
))} */}


    </>
  );
}

export default Home;