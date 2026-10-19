import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API = import.meta.env.VITE_backend_base_url;

/* ---------- small inline icons (no extra dependency) ---------- */
const Icon = ({ d, className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d={d} />
  </svg>
);

const icons = {
  pin: "M12 21s-7-6.2-7-11a7 7 0 1114 0c0 4.8-7 11-7 11zM12 12a2 2 0 100-4 2 2 0 000 4z",
  map: "M9 20l-6-2V5l6 2 6-2 6 2v13l-6-2-6 2zM9 7v13M15 5v13",
  clock: "M12 7v5l3 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  phone:
    "M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z",
  chat: "M21 12a8 8 0 01-11.5 7.2L4 20l1-4.6A8 8 0 1121 12z",
  back: "M15 19l-7-7 7-7",
  tool: "M14.7 6.3a4 4 0 00-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 005.4-5.4l-2.4 2.4-2.6-.6-.6-2.6 2.6-2.2z",
  check: "M5 13l4 4L19 7",
  user: "M20 21a8 8 0 10-16 0M12 13a4 4 0 100-8 4 4 0 000 8z",
};

/* ---------- reusable pieces ---------- */
function DetailRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 py-4">
      <span className="w-11 h-11 shrink-0 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
        <Icon d={icon} />
      </span>
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wider text-slate-400">
          {label}
        </p>
        <p className="font-semibold text-slate-800 break-words">
          {value || "—"}
        </p>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-5 py-4">
      <p className="text-xs uppercase tracking-wider text-slate-400">{label}</p>
      <p className="mt-1 text-lg font-bold text-slate-800 truncate">
        {value || "—"}
      </p>
    </div>
  );
}

function ViewDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [worker, setWorker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadWorker() {
      try {
        setError("");
        const response = await axios.get(API + "/skill/skillfindone/" + id);
        const data = response.data.data;
        setWorker(Array.isArray(data) ? data[0] : data);
      } catch (err) {
        console.log("Error:", err);
        setError("Could not load this profile. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    loadWorker();
  }, [id]);

  function whatsapp(phone = "") {
    let number = phone.replace(/\D/g, "");
    if (number.startsWith("0")) number = "92" + number.substring(1);
    window.open(`https://wa.me/${number}`, "_blank");
  }

  /* ---------- loading ---------- */
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 animate-pulse">
        <div className="h-64 bg-slate-300" />
        <div className="max-w-7xl mx-auto px-6 -mt-24 grid lg:grid-cols-3 gap-8">
          <div className="h-96 bg-white rounded-3xl border border-slate-200" />
          <div className="lg:col-span-2 space-y-6">
            <div className="h-24 bg-white rounded-3xl border border-slate-200" />
            <div className="h-64 bg-white rounded-3xl border border-slate-200" />
          </div>
        </div>
      </div>
    );
  }

  /* ---------- error / not found ---------- */
  if (error || !worker) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6">
        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-10 text-center max-w-md w-full">
          <div className="mx-auto w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-5">
            <Icon d={icons.user} className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">
            {error || "Worker not found"}
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  /* ---------- profile ---------- */
  return (

    <div className="min-h-screen bg-slate-100">
      {/* ---------- Cover ---------- */}
      <div className="relative h-64 md:h-72 bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 rounded-full bg-white/10" />

        <div className="relative max-w-7xl mx-auto px-6 pt-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur text-white rounded-xl px-4 py-2 text-sm font-semibold transition"
          >
            <Icon d={icons.back} className="w-4 h-4" />
            Back to all workers
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-28 pb-16 grid lg:grid-cols-3 gap-8 items-start">
        {/* ---------- Left: profile card ---------- */}
        <aside className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 text-center lg:sticky lg:top-6">
          <div className="relative mx-auto w-44 h-44">
            <img
              src={worker.image}
              alt={worker.name}
              className="w-44 h-44 rounded-full object-cover border-4 border-white shadow-lg ring-4 ring-blue-100"
            />
            <span
              className={`absolute bottom-3 right-3 w-6 h-6 rounded-full border-4 border-white ${
                worker.available ? "bg-green-500" : "bg-red-500"
              }`}
              title={worker.available ? "Available" : "Unavailable"}
            />
          </div>

          <h1 className="mt-6 text-2xl font-extrabold text-slate-900">
            {worker.name}
          </h1>

          <span className="inline-flex items-center gap-1.5 mt-2 bg-blue-50 text-blue-700 text-sm font-bold px-4 py-1.5 rounded-full">
            <Icon d={icons.tool} className="w-4 h-4" />
            {worker.skill}
          </span>

          <div className="mt-4">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                worker.available
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  worker.available ? "bg-green-500" : "bg-red-500"
                }`}
              />
              {worker.available ? "Available for work" : "Currently unavailable"}
            </span>
          </div>

          <p className="mt-5 flex items-center justify-center gap-2 text-slate-500 text-sm">
            <Icon d={icons.pin} className="w-4 h-4 text-blue-600" />
            {[worker.area, worker.city].filter(Boolean).join(", ") || "—"}
          </p>

          <div className="mt-8 space-y-3">
            <button
              onClick={() => whatsapp(worker.phone)}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-green-500/25 transition"
            >
              <Icon d={icons.chat} />
              Contact on WhatsApp
            </button>

            <a
              href={`tel:${worker.phone}`}
              className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3.5 rounded-xl font-semibold transition"
            >
              <Icon d={icons.phone} />
              Call now
            </a>
          </div>
        </aside>

        {/* ---------- Right: details ---------- */}
        <main className="lg:col-span-2 space-y-8">
          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Stat label="Skill" value={worker.skill} />
            <Stat label="Experience" value={worker.experience} />
            <Stat label="City" value={worker.city} />
            <Stat
              label="Status"
              value={worker.available ? "Available" : "Unavailable"}
            />
          </div>

          {/* About */}
          <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
            <h2 className="text-xl font-bold text-slate-900">
              About {worker.name}
            </h2>
            <div className="mt-1 h-1 w-12 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500" />
            <p className="mt-5 text-slate-600 leading-relaxed whitespace-pre-line">
              {worker.description || "No description added yet."}
            </p>
          </section>

          {/* Professional info */}
          <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
            <h2 className="text-xl font-bold text-slate-900">
              Professional information
            </h2>
            <div className="mt-1 h-1 w-12 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500" />

            <div className="mt-4 grid md:grid-cols-2 gap-x-10 divide-y md:divide-y-0 divide-slate-100">
              <DetailRow icon={icons.tool} label="Skill" value={worker.skill} />
              <DetailRow
                icon={icons.clock}
                label="Experience"
                value={worker.experience}
              />
              <DetailRow icon={icons.pin} label="City" value={worker.city} />
              <DetailRow icon={icons.map} label="Area" value={worker.area} />
              <DetailRow icon={icons.phone} label="Phone" value={worker.phone} />
              <DetailRow
                icon={icons.check}
                label="Availability"
                value={worker.available ? "Available" : "Unavailable"}
              />
            </div>
          </section>

          {/* Contact call-to-action */}
          <section className="rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-lg">
            <div>
              <h3 className="text-xl font-bold">Need this work done?</h3>
              <p className="text-blue-100 mt-1">
                Message {worker.name} directly on WhatsApp and discuss your job.
              </p>
            </div>
            <button
              onClick={() => whatsapp(worker.phone)}
              className="shrink-0 flex items-center justify-center gap-2 bg-white text-green-600 hover:bg-green-50 px-6 py-3.5 rounded-xl font-bold shadow transition"
            >
              <Icon d={icons.chat} />
              Chat on WhatsApp
            </button>
          </section>
        </main>
      </div>
    </div>
  );
}

export default ViewDetail;