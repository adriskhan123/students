import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
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
  MessageCircle,
  Clock,
  Users,
  UserCheck,
  PlusCircle,
  Bot,
  BadgeCheck,
  Eye,
  Handshake,
  ClipboardList,
  Compass,
  Layers,
  Gauge,
  Wrench,
  ChevronDown,
} from "lucide-react";

import Navbar from "../components/Navbar";

const API = import.meta.env.VITE_backend_base_url;

const ROUTES = {
  findWorkers: "/find-workers",
  postJob: "/post-job",
  about: "/about",
  aiChat: "/mainChat",
  allSkilled: "/all-skilled",
};

const services = [
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
];

const cities = [
  { name: "Bannu", note: "Khyber Pakhtunkhwa" },
  { name: "Peshawar", note: "Khyber Pakhtunkhwa" },
  { name: "Islamabad", note: "Federal Capital" },
  { name: "Lahore", note: "Punjab" },
  { name: "Karachi", note: "Sindh" },
];

const steps = [
  {
    number: "01",
    title: "Choose a Service",
    text: "Select the type of skilled person you need.",
    icon: ClipboardList,
  },
  {
    number: "02",
    title: "Find Locally",
    text: "Search skilled people by skill, city and area.",
    icon: Compass,
  },
  {
    number: "03",
    title: "View Profile",
    text: "Check experience, availability and contact details.",
    icon: Eye,
  },
  {
    number: "04",
    title: "Connect Directly",
    text: "Contact the skilled person and discuss your work.",
    icon: Handshake,
  },
];

const benefits = [
  {
    title: "Local Skilled People",
    text: "Find skilled people who live and work near you.",
    icon: Users,
  },
  {
    title: "Easy Discovery",
    text: "Browse different skills in one simple platform.",
    icon: Search,
  },
  {
    title: "Direct Contact",
    text: "Contact skilled people directly through WhatsApp.",
    icon: MessageCircle,
  },
  {
    title: "Many Skills",
    text: "Electricians, plumbers, mechanics and many more.",
    icon: Layers,
  },
  {
    title: "Location Based",
    text: "Search workers according to city and area.",
    icon: MapPin,
  },
  {
    title: "Simple & Fast",
    text: "Find the right skilled person without wasting time.",
    icon: Gauge,
  },
];

const stats = [
  { value: "13+", label: "Skill categories" },
  { value: "5", label: "Cities covered" },
  { value: "100%", label: "Direct contact" },
];

function initials(name = "") {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase())
      .join("") || "?"
  );
}

function SectionTitle({ badge, title, text }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <span className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-600">
        {badge}
      </span>

      <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
        {text}
      </p>
    </div>
  );
}

function WorkerCard({ worker, index }) {
  const [imageError, setImageError] = useState(false);

  const hasImage = worker.image && !imageError;

  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        y: 35,
        scale: 0.96,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: -20,
        scale: 0.95,
      }}
      transition={{
        duration: 0.45,
        delay: index * 0.06,
        ease: "easeOut",
      }}
      whileHover={{
        y: -8,
      }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-100"
    >
      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-violet-900">
        {hasImage ? (
          <img
            src={worker.image}
            alt={worker.name || "Skilled person"}
            onError={() => setImageError(true)}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/10 text-3xl font-bold text-white ring-1 ring-white/20 backdrop-blur">
              {initials(worker.name)}
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        <span
          className={`absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur ${
            worker.available
              ? "bg-emerald-500/90"
              : "bg-slate-700/90"
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          {worker.available ? "Available" : "Unavailable"}
        </span>

        <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
          <BadgeCheck size={14} />
          Verified Profile
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2">
          <h3 className="truncate text-lg font-bold text-slate-900">
            {worker.name || "Skilled Person"}
          </h3>

          <BadgeCheck
            size={18}
            className="shrink-0 text-indigo-500"
          />
        </div>

        <div className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700">
          <Wrench size={13} />
          {worker.skill || "Skill not added"}
        </div>

        <div className="mt-5 space-y-3 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <MapPin
              size={16}
              className="shrink-0 text-indigo-500"
            />

            <span className="truncate">
              {[worker.area, worker.city]
                .filter(Boolean)
                .join(", ") || "Location not added"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Clock
              size={16}
              className="shrink-0 text-indigo-500"
            />

            <span>
              {worker.experience || "Experience not added"}
            </span>
          </div>
        </div>

        <Link
          to={`/viewdetail/${worker._id}`}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition duration-300 hover:-translate-y-0.5 hover:from-indigo-500 hover:to-violet-500 hover:shadow-lg"
        >
          <Eye size={16} />
          View Detail
          <ArrowRight size={16} />
        </Link>
      </div>
    </motion.div>
  );
}

function Home() {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllWorkers, setShowAllWorkers] = useState(false);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await axios.get(
          `${API}/skill/skillfind`
        );

        const data = Array.isArray(response.data?.data)
          ? response.data.data
          : [];

        const sorted = [...data].sort(
          (a, b) =>
            Number(!!b.available) - Number(!!a.available)
        );

        setWorkers(sorted);
      } catch (error) {
        console.error("Featured workers error:", error);
        setWorkers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkers();
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />

      {/* HERO */}

      <section className="relative -mt-20 overflow-hidden bg-slate-950 pt-20">
        <div className="absolute -left-32 top-0 h-[28rem] w-[28rem] rounded-full bg-indigo-600/30 blur-3xl" />

        <div className="absolute -right-32 top-32 h-[28rem] w-[28rem] rounded-full bg-violet-600/30 blur-3xl" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-32 pt-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:pb-40 lg:pt-24">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 backdrop-blur">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              Local Skilled-Worker Platform
            </div>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Connecting Skills With{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Opportunities
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg lg:mx-0">
              Find skilled people near you or showcase your skills
              and connect with people who need your services.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:justify-start">
              <Link
                to={ROUTES.findWorkers}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-7 py-4 font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:-translate-y-0.5 hover:from-indigo-400 hover:to-violet-500"
              >
                <Search size={19} />
                Find a Worker
                <ArrowRight size={18} />
              </Link>

              <Link
                to={ROUTES.postJob}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-4 font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                <BriefcaseBusiness size={19} />
                Post Your Work
              </Link>
            </div>

            <div className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-white/10 pt-8 lg:max-w-lg">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center lg:text-left"
                >
                  <p className="text-2xl font-extrabold text-white sm:text-3xl">
                    {stat.value}
                  </p>

                  <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* HERO VISUAL */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto h-[420px] w-full max-w-lg"
          >
            <div className="absolute inset-6 rounded-[3rem] bg-gradient-to-br from-indigo-500/20 via-violet-500/10 to-transparent ring-1 ring-white/10" />

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-1/2 top-10 w-72 -translate-x-1/2 rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/30">
                  <Zap size={26} />
                </div>

                <div>
                  <p className="font-bold text-white">
                    Skilled Electrician
                  </p>

                  <p className="mt-1 flex items-center gap-1 text-xs text-slate-300">
                    <MapPin size={12} />
                    Near your area
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between rounded-xl bg-white/10 p-3 text-xs font-semibold text-slate-200">
                <span className="flex items-center gap-2">
                  <Clock size={14} className="text-indigo-300" />
                  Experienced
                </span>

                <span className="flex items-center gap-2 text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Available
                </span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-24 left-0 w-60 rounded-2xl border border-white/10 bg-slate-900/80 p-5 shadow-xl backdrop-blur-xl"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500/20 text-sky-300">
                  <Search size={20} />
                </div>

                <div>
                  <p className="font-semibold text-white">
                    Customer needs
                  </p>

                  <p className="text-xs text-slate-400">
                    A plumber nearby
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-5 right-0 w-60 rounded-2xl border border-white/10 bg-slate-900/80 p-5 shadow-xl backdrop-blur-xl"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300">
                  <MessageCircle size={20} />
                </div>

                <div>
                  <p className="font-semibold text-white">
                    Connected directly
                  </p>

                  <p className="text-xs text-slate-400">
                    Contact on WhatsApp
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* QUICK ACTIONS */}

      <section className="relative z-10 -mt-14 px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-3xl border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-900/10">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
            {[
              {
                to: ROUTES.findWorkers,
                icon: Search,
                title: "Find Worker",
                sub: "Search by skill",
              },
              {
                to: ROUTES.postJob,
                icon: PlusCircle,
                title: "Post Your Work",
                sub: "Show your skill",
              },
              {
                to: ROUTES.allSkilled,
                icon: Users,
                title: "Skilled People",
                sub: "Browse profiles",
              },
              {
                to: ROUTES.findWorkers,
                icon: UserCheck,
                title: "Available Workers",
                sub: "Ready to work",
              },
              {
                to: ROUTES.aiChat,
                icon: Bot,
                title: "AI Assistant",
                sub: "Ask about SkillConnect",
              },
            ].map(({ to, icon: Icon, title, sub }) => (
              <Link
                key={title}
                to={to}
                className="group rounded-2xl p-5 text-center transition hover:bg-slate-50"
              >
                <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-gradient-to-br group-hover:from-indigo-500 group-hover:to-violet-600 group-hover:text-white">
                  <Icon size={21} />
                </span>

                <p className="mt-3 text-sm font-semibold text-slate-900">
                  {title}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {sub}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}

      <section className="px-5 py-24 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Simple Process"
          title="How SkillConnect Works"
          text="Find the right skilled person in four simple steps."
        />

        <div className="mx-auto mt-14 grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(
            ({ number, title, text, icon: Icon }, index) => (
              <motion.div
                key={number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1.5 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100"
              >
                <span className="absolute right-5 top-3 text-6xl font-extrabold text-slate-100">
                  {number}
                </span>

                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-200">
                  <Icon size={25} />
                </div>

                <h3 className="mt-6 text-lg font-bold">
                  {title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {text}
                </p>
              </motion.div>
            )
          )}
        </div>
      </section>

      {/* FEATURED WORKERS */}

      <section className="bg-slate-50 px-5 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            badge="Featured"
            title="Featured Skilled People"
            text="View skilled people, check their profiles and contact them directly."
          />

          <div className="mt-14">
            {loading ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="animate-pulse overflow-hidden rounded-3xl bg-white shadow-sm"
                  >
                    <div className="h-52 bg-slate-200" />

                    <div className="space-y-3 p-5">
                      <div className="h-5 rounded bg-slate-200" />
                      <div className="h-4 w-1/2 rounded bg-slate-200" />
                      <div className="h-10 rounded bg-slate-200" />
                    </div>
                  </div>
                ))}
              </div>
            ) : workers.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                <Users
                  size={40}
                  className="mx-auto text-slate-300"
                />

                <h3 className="mt-4 text-xl font-bold">
                  No skilled people yet
                </h3>

                <p className="mt-2 text-slate-500">
                  Add a skilled person to display their profile here.
                </p>

                <Link
                  to={ROUTES.allSkilled}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3 font-semibold text-white"
                >
                  View Skilled People
                  <ArrowRight size={17} />
                </Link>
              </div>
            ) : (
              <>
                <motion.div
                  layout
                  className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
                >
                  {workers.slice(0, 4).map((worker, index) => (
                    <WorkerCard
                      key={worker._id}
                      worker={worker}
                      index={index}
                    />
                  ))}

                  <AnimatePresence mode="popLayout">
                    {showAllWorkers &&
                      workers.slice(4).map((worker, index) => (
                        <WorkerCard
                          key={worker._id}
                          worker={worker}
                          index={index + 4}
                        />
                      ))}
                  </AnimatePresence>
                </motion.div>

                {/* SHOW MORE BUTTON */}

                {workers.length > 4 && (
                  <div className="mt-12 flex justify-center">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() =>
                        setShowAllWorkers(
                          (previous) => !previous
                        )
                      }
                      className="group inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-7 py-4 font-semibold text-slate-800 shadow-sm transition hover:border-indigo-300 hover:text-indigo-600 hover:shadow-xl"
                    >
                      <span>
                        {showAllWorkers
                          ? "Show Less"
                          : `Show ${workers.length - 4} More`}
                      </span>

                      <motion.span
                        animate={{
                          rotate: showAllWorkers ? 180 : 0,
                        }}
                        transition={{ duration: 0.25 }}
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white"
                      >
                        <ChevronDown size={19} />
                      </motion.span>
                    </motion.button>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="mt-10 text-center">
            <Link
              to={ROUTES.allSkilled}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-800 shadow-sm transition hover:border-indigo-300 hover:text-indigo-600"
            >
              View All Skilled People
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}

      <section className="px-5 py-24 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Services"
          title="Popular Skills & Services"
          text="Choose a skill and find skilled people who can help you."
        />

        <div className="mx-auto mt-14 grid max-w-7xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {services.map(({ name, icon: Icon }, index) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: index * 0.03,
              }}
            >
              <Link
                to={`${ROUTES.findWorkers}?skill=${encodeURIComponent(
                  name
                )}`}
                className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-gradient-to-br group-hover:from-indigo-500 group-hover:to-violet-600 group-hover:text-white">
                  <Icon size={23} />
                </span>

                <span className="flex-1 text-sm font-semibold text-slate-800">
                  {name}
                </span>

                <ArrowRight
                  size={16}
                  className="text-slate-300 transition group-hover:text-indigo-600"
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* LOCATION */}

      <section className="bg-slate-50 px-5 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-600">
              Local Discovery
            </span>

            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Find Skilled People Near You
            </h2>

            <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              Search by city and area to find skilled people
              closer to your work.
            </p>

            <Link
              to={ROUTES.findWorkers}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:from-indigo-500 hover:to-violet-500"
            >
              Search by Location
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {cities.map((city, index) => (
              <motion.div
                key={city.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                }}
              >
                <Link
                  to={`${ROUTES.findWorkers}?city=${encodeURIComponent(
                    city.name
                  )}`}
                  className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-gradient-to-br group-hover:from-indigo-500 group-hover:to-violet-600 group-hover:text-white">
                    <MapPin size={22} />
                  </span>

                  <div className="flex-1">
                    <p className="font-bold text-slate-900">
                      {city.name}
                    </p>

                    <p className="text-xs text-slate-500">
                      {city.note}
                    </p>
                  </div>

                  <ArrowRight
                    size={17}
                    className="text-slate-300 transition group-hover:text-indigo-600"
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}

      <section className="px-5 py-24 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Benefits"
          title="Why Choose SkillConnect?"
          text="Everything you need to discover and connect with local skilled people."
        />

        <div className="mx-auto mt-14 grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(({ title, text, icon: Icon }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: index * 0.06,
              }}
              className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Icon size={24} />
              </div>

              <h3 className="mt-5 text-lg font-bold">
                {title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TWO SIDES */}

      <section className="bg-slate-50 px-5 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <Search size={27} />
            </div>

            <h3 className="mt-6 text-2xl font-extrabold sm:text-3xl">
              Need Skilled Help?
            </h3>

            <p className="mt-4 leading-7 text-slate-600">
              Discover skilled people, view their profiles and
              contact them directly about your work.
            </p>

            <ul className="mt-6 space-y-3 text-sm font-medium text-slate-700">
              {[
                "Search by skill and location",
                "View experience and availability",
                "Contact directly",
              ].map((text) => (
                <li key={text} className="flex gap-2">
                  <CheckCircle2
                    size={18}
                    className="text-indigo-600"
                  />
                  {text}
                </li>
              ))}
            </ul>

            <Link
              to={ROUTES.findWorkers}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              Find a Worker
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-violet-900 p-8 shadow-xl sm:p-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white ring-1 ring-white/15">
              <BriefcaseBusiness size={27} />
            </div>

            <h3 className="mt-6 text-2xl font-extrabold text-white sm:text-3xl">
              Are You a Skilled Person?
            </h3>

            <p className="mt-4 leading-7 text-slate-300">
              Showcase your skills and allow people in your city
              to discover and contact you.
            </p>

            <ul className="mt-6 space-y-3 text-sm font-medium text-slate-200">
              {[
                "Add your skill and experience",
                "Get discovered locally",
                "Receive direct requests",
              ].map((text) => (
                <li key={text} className="flex gap-2">
                  <CheckCircle2
                    size={18}
                    className="text-violet-300"
                  />
                  {text}
                </li>
              ))}
            </ul>

            <Link
              to={ROUTES.postJob}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-indigo-700 transition hover:bg-slate-100"
            >
              Post Your Work
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}

      <section className="px-5 py-20 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 px-6 py-16 text-center shadow-2xl shadow-indigo-300/40 sm:px-10">
          <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />

          <div className="absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />

          <h2 className="relative mx-auto max-w-3xl text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Ready to Find the Right Skill?
          </h2>

          <p className="relative mx-auto mt-5 max-w-2xl text-base leading-7 text-indigo-100 sm:text-lg">
            Find skilled people near you or showcase your own
            skills with SkillConnect.
          </p>

          <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to={ROUTES.findWorkers}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 font-semibold text-indigo-700 transition hover:bg-slate-100"
            >
              <Search size={18} />
              Find a Worker
            </Link>

            <Link
              to={ROUTES.postJob}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 font-semibold text-white transition hover:bg-white/20"
            >
              <PlusCircle size={18} />
              Post Your Work
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="bg-slate-950 text-slate-300">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white">
                <Handshake size={21} />
              </span>

              <span className="text-xl font-bold text-white">
                Skill
                <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                  Connect
                </span>
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
              A local platform connecting people who need work
              done with skilled people who can provide the service.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white">
              Quick Links
            </h4>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              {[
                { to: "/", label: "Home" },
                { to: ROUTES.about, label: "About" },
                {
                  to: ROUTES.findWorkers,
                  label: "Find Workers",
                },
                {
                  to: ROUTES.postJob,
                  label: "Post Job",
                },
                {
                  to: ROUTES.aiChat,
                  label: "AI Chat",
                },
              ].map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-slate-400 transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white">
              Cities
            </h4>

            <div className="mt-4 flex flex-wrap gap-2">
              {cities.map((city) => (
                <span
                  key={city.name}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
                >
                  {city.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-5 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} SkillConnect. All
          rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Home;