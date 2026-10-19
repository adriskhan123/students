import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

const API = import.meta.env.VITE_backend_base_url;
const FALLBACK_IMG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'><rect width='100%' height='100%' fill='#e2e8f0'/><circle cx='200' cy='125' r='45' fill='#cbd5e1'/><rect x='110' y='185' width='180' height='70' rx='35' fill='#cbd5e1'/></svg>`
  );

/* ---------- inline icons (no extra dependency) ---------- */
const Icon = ({ d, className = "w-4 h-4" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
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
  search: "M21 21l-4.3-4.3M17 10a7 7 0 11-14 0 7 7 0 0114 0z",
  chat: "M21 12a8 8 0 01-11.5 7.2L4 20l1-4.6A8 8 0 1121 12z",
  tool: "M14.7 6.3a4 4 0 00-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 005.4-5.4l-2.5 2.5-2.5-.5-.5-2.5 2.5-2.5z",
  close: "M6 6l12 12M18 6L6 18",
  refresh: "M4 4v6h6M20 20v-6h-6M20 9A8 8 0 006.3 6.3L4 10M4 15a8 8 0 0013.7 2.7L20 14",
  eye: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7zM12 15a3 3 0 100-6 3 3 0 000 6z",
};

/* ---------- skeleton ---------- */
function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl ring-1 ring-slate-200 overflow-hidden animate-pulse">
      <div className="h-52 bg-slate-200" />
      <div className="p-5 space-y-3">
        <div className="h-4 w-2/3 bg-slate-200 rounded" />
        <div className="h-3 w-1/2 bg-slate-200 rounded" />
        <div className="h-3 w-full bg-slate-200 rounded" />
        <div className="h-10 w-full bg-slate-200 rounded-xl mt-4" />
      </div>
    </div>
  );
}

function Detail({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 min-w-0">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
        <Icon d={icon} />
      </span>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </p>
        <p className="truncate text-sm font-semibold text-slate-700">
          {value || "—"}
        </p>
      </div>
    </div>
  );
}

function SearchField({ id, icon, label, value, onChange, placeholder }) {
  return (
    <div className="flex-1 min-w-0">
      <label
        htmlFor={id}
        className="mb-1.5 ml-1 block text-[11px] font-bold uppercase tracking-wider text-slate-400"
      >
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          <Icon d={icon} className="w-5 h-5" />
        </span>
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-10 text-slate-800 placeholder-slate-400 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label={`Clear ${label}`}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 transition hover:bg-slate-200 hover:text-slate-600"
          >
            <Icon d={icons.close} className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

function FindWorker() {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [skillQ, setSkillQ] = useState("");
  const [cityQ, setCityQ] = useState("");
  const [areaQ, setAreaQ] = useState("");
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  async function loadWorkers() {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(API + "/skill/skillfind");
      setWorkers(response.data.data || []);
    } catch (err) {
      console.log("Error:", err);
      setError("Could not load skilled workers. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadWorkers();
  }, []);

  const matches = (value, q) =>
    !q.trim() || (value || "").toLowerCase().includes(q.trim().toLowerCase());

  const filtered = useMemo(
    () =>
      workers
        .filter(
          (w) =>
            matches(w.skill, skillQ) &&
            matches(w.city, cityQ) &&
            matches(w.area, areaQ) &&
            (!onlyAvailable || w.available)
        )
        // available workers first
        .sort((a, b) => Number(!!b.available) - Number(!!a.available)),
    [workers, skillQ, cityQ, areaQ, onlyAvailable]
  );

  // most common skills in the data, used as quick filter chips
  const popularSkills = useMemo(() => {
    const counts = {};
    workers.forEach((w) => {
      const s = (w.skill || "").trim();
      if (s) counts[s] = (counts[s] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name]) => name);
  }, [workers]);

  const availableCount = workers.filter((w) => w.available).length;
  const hasFilters = skillQ || cityQ || areaQ || onlyAvailable;

  function clearAll() {
    setSkillQ("");
    setCityQ("");
    setAreaQ("");
    setOnlyAvailable(false);
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">
        {/* ---------- Hero ---------- */}
        <section className="relative overflow-hidden bg-slate-900 text-white">
          <div className="pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full bg-indigo-600/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-6 pb-28 pt-16">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-200 ring-1 ring-white/15">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              {availableCount} available now
            </span>
            <h1 className="mt-5 max-w-3xl text-4xl font-extrabold tracking-tight md:text-6xl">
              Find the right{" "}
              <span className="bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                skilled worker
              </span>{" "}
              near you
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-slate-300">
              Search by skill, city and area, then view the worker's full
              profile and contact them directly.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-6">
          {/* ---------- Search card ---------- */}
          <section
            aria-label="Search workers"
            className="-mt-16 rounded-2xl bg-white p-5 shadow-xl shadow-slate-900/10 ring-1 ring-slate-200 md:p-6"
          >
            <div className="flex flex-col gap-4 md:flex-row">
              <SearchField
                id="skill"
                icon={icons.tool}
                label="Skill"
                value={skillQ}
                onChange={setSkillQ}
                placeholder="Electrician, plumber..."
              />
              <SearchField
                id="city"
                icon={icons.pin}
                label="City"
                value={cityQ}
                onChange={setCityQ}
                placeholder="Islamabad, Lahore..."
              />
              <SearchField
                id="area"
                icon={icons.map}
                label="Area"
                value={areaQ}
                onChange={setAreaQ}
                placeholder="G-11, F-10..."
              />
            </div>

            {popularSkills.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Popular:
                </span>
                {popularSkills.map((s) => {
                  const active = skillQ.trim().toLowerCase() === s.toLowerCase();
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSkillQ(active ? "" : s)}
                      className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
                        active
                          ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
                          : "bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            )}

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
              <button
                type="button"
                role="switch"
                aria-checked={onlyAvailable}
                onClick={() => setOnlyAvailable((v) => !v)}
                className="flex items-center gap-3 text-sm font-semibold text-slate-600"
              >
                <span
                  className={`relative h-6 w-11 rounded-full transition ${
                    onlyAvailable ? "bg-indigo-600" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
                      onlyAvailable ? "left-[22px]" : "left-0.5"
                    }`}
                  />
                </span>
                Available workers only
              </button>

              <div className="flex items-center gap-5">
                {!loading && !error && (
                  <p className="text-sm text-slate-500">
                    <span className="font-bold text-slate-800">
                      {filtered.length}
                    </span>{" "}
                    {filtered.length === 1 ? "worker" : "workers"} found
                  </p>
                )}
                {hasFilters && (
                  <button
                    type="button"
                    onClick={clearAll}
                    className="flex items-center gap-1.5 text-sm font-semibold text-rose-600 transition hover:text-rose-700"
                  >
                    <Icon d={icons.close} />
                    Clear all
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* ---------- Error ---------- */}
          {error && (
            <div
              role="alert"
              className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-rose-200 bg-rose-50 px-5 py-3 text-sm text-rose-700"
            >
              <span>{error}</span>
              <button
                type="button"
                onClick={loadWorkers}
                className="flex items-center gap-1.5 font-semibold hover:text-rose-900"
              >
                <Icon d={icons.refresh} />
                Retry
              </button>
            </div>
          )}

          {/* ---------- Results grid ---------- */}
          <section className="grid grid-cols-1 gap-7 py-12 md:grid-cols-2 lg:grid-cols-3">
            {loading &&
              Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}

            {!loading &&
              filtered.map((item) => (
                <article
                  key={item._id}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/10 hover:ring-indigo-200"
                >
                  {/* Photo */}
                  <div className="relative h-52 overflow-hidden bg-slate-100">
                    <img
                      src={item.image || FALLBACK_IMG}
                      alt={item.name}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = FALLBACK_IMG;
                      }}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent" />

                    <span
                      className={`absolute right-4 top-4 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white backdrop-blur ${
                        item.available ? "bg-emerald-500/90" : "bg-slate-500/90"
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full bg-white ${
                          item.available ? "animate-pulse" : ""
                        }`}
                      />
                      {item.available ? "Available" : "Unavailable"}
                    </span>

                    <div className="absolute bottom-4 left-5 right-5">
                      <h2 className="truncate text-xl font-bold text-white">
                        {item.name}
                      </h2>
                      <span className="mt-1 inline-block rounded-full bg-white/95 px-3 py-0.5 text-xs font-bold text-indigo-700">
                        {item.skill}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-5">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                      <Detail icon={icons.pin} label="City" value={item.city} />
                      <Detail icon={icons.map} label="Area" value={item.area} />
                      <Detail
                        icon={icons.clock}
                        label="Experience"
                        value={item.experience}
                      />
                      <Detail
                        icon={icons.phone}
                        label="Phone"
                        value={item.phone}
                      />
                    </div>

                    {item.description && (
                      <p className="mt-5 line-clamp-3 text-sm leading-relaxed text-slate-600">
                        {item.description}
                      </p>
                    )}

                    <div className="mt-auto pt-6">
                      <button
                        type="button"
                        onClick={() => navigate("/viewdetail/" + item._id)}
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-semibold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/30"
                      >
                        <Icon d={icons.eye} className="w-5 h-5" />
                        ViewDetail
                      </button>
                    </div>
                  </div>
                </article>
              ))}
          </section>

          {/* ---------- Empty state ---------- */}
          {!loading && !error && filtered.length === 0 && (
            <div className="pb-24 pt-4 text-center">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-slate-200 text-slate-400">
                <Icon d={icons.search} className="w-9 h-9" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">
                No workers found
              </h3>
              <p className="mt-1 text-slate-500">
                Try a different skill, city or area.
              </p>
              {hasFilters && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="mt-6 rounded-xl bg-indigo-600 px-6 py-2.5 font-semibold text-white shadow-md shadow-indigo-600/25 transition hover:bg-indigo-700"
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default FindWorker;