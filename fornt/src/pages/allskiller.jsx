
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_backend_base_url;

const Icon = ({ d, className = "h-5 w-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d={d} />
  </svg>
);

const icons = {
  user: "M20 21a8 8 0 00-16 0M12 13a4 4 0 100-8 4 4 0 000 8z",
  search: "M21 21l-4.3-4.3M17 10a7 7 0 11-14 0 7 7 0 0114 0z",
  pin: "M12 21s-7-6.2-7-11a7 7 0 1114 0c0 4.8-7 11-7 11zM12 12a2 2 0 100-4 2 2 0 000 4z",
  map: "M9 20l-6-2V5l6 2 6-2 6 2v13l-6-2-6 2zM9 7v13M15 5v13",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z",
  clock: "M12 7v5l3 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  edit: "M4 20h4L19 9a2.8 2.8 0 00-4-4L4 16v4z",
  trash: "M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 002 2h6a2 2 0 002-2l1-12M9 7V4h6v3",
  eye: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7zM12 15a3 3 0 100-6 3 3 0 000 6z",
  close: "M6 6l12 12M18 6L6 18",
  plus: "M12 5v14M5 12h14",
  refresh: "M20 11a8.1 8.1 0 00-15.5-2M4 5v4h4M4 13a8.1 8.1 0 0015.5 2M20 19v-4h-4",
  filter: "M4 6h16M7 12h10M10 18h4",
};

function Info({ icon, label, value }) {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        <Icon d={icon} className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {label}
        </p>
        <p className="truncate text-sm font-semibold text-slate-700">
          {value || "Not provided"}
        </p>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-3xl border border-slate-200 bg-white">
      <div className="h-56 bg-slate-200" />
      <div className="space-y-4 p-5">
        <div className="h-5 w-2/3 rounded bg-slate-200" />
        <div className="h-4 w-1/2 rounded bg-slate-200" />
        <div className="h-16 rounded-xl bg-slate-200" />
        <div className="h-12 rounded-xl bg-slate-200" />
      </div>
    </div>
  );
}

function AllSkiller() {
  const navigate = useNavigate();

  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [availability, setAvailability] = useState("all");
  const [deleteItem, setDeleteItem] = useState(null);
  const [deleting, setDeleting] = useState(false);

  async function getSkills() {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(`${API}/skill/skillfind`);

      if (response.data?.success === false) {
        throw new Error(response.data.msg || "Unable to load workers.");
      }

      const data = response.data?.data;

      if (!Array.isArray(data)) {
        throw new Error("The backend did not return a valid worker list.");
      }

      setSkills(data);
    } catch (err) {
      console.error("Find skills error:", err.response?.data || err.message);
      setError(
        err.response?.data?.msg ||
          err.message ||
          "Unable to load skilled people. Check your backend server."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getSkills();
  }, []);

  async function deleteSkill() {
    if (!deleteItem || deleting) return;

    try {
      setDeleting(true);
      setError("");

      const response = await axios.delete(
        `${API}/skill/skilldelete/${deleteItem._id}`
      );

      if (response.data?.success === false) {
        throw new Error(response.data.msg || "Delete failed.");
      }

      setSkills((previous) =>
        previous.filter((item) => item._id !== deleteItem._id)
      );

      setDeleteItem(null);
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
      setError(
        err.response?.data?.msg ||
          err.message ||
          "Delete failed. Please try again."
      );
    } finally {
      setDeleting(false);
    }
  }

  const filteredSkills = useMemo(() => {
    const query = search.trim().toLowerCase();

    return skills.filter((item) => {
      const matchesSearch =
        !query ||
        [item.name, item.skill, item.city, item.area, item.phone]
          .filter(Boolean)
          .some((value) => String(value).toLowerCase().includes(query));

      const matchesAvailability =
        availability === "all" ||
        (availability === "available" && item.available === true) ||
        (availability === "unavailable" && item.available !== true);

      return matchesSearch && matchesAvailability;
    });
  }, [skills, search, availability]);

  const availableWorkers = skills.filter(
    (item) => item.available === true
  ).length;

  const unavailableWorkers = skills.length - availableWorkers;

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-500 text-white">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white/10" />
        <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-white/10" />

        <div className="relative mx-auto max-w-7xl px-5 py-12 md:px-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                  <Icon d={icons.user} className="h-7 w-7" />
                </div>
                <span className="font-bold text-blue-100">
                  SKILLCONNECT
                </span>
              </div>

              <h1 className="text-4xl font-black tracking-tight md:text-5xl">
                All Skilled People
              </h1>

              <p className="mt-4 max-w-2xl text-base text-blue-100 md:text-lg">
                Find workers, view their profiles, update information, and
                manage worker records.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/add-skilled")}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-blue-700 shadow-xl transition hover:bg-blue-50"
            >
              <Icon d={icons.plus} />
              Add Skilled Person
            </button>
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            {[
              { label: "Total Workers", value: skills.length },
              { label: "Available", value: availableWorkers },
              { label: "Unavailable", value: unavailableWorkers },
            ].map((stat) => (
              <div
                key={stat.label}
                className="min-w-[130px] rounded-2xl border border-white/10 bg-white/15 px-5 py-4"
              >
                <p className="text-2xl font-black">{stat.value}</p>
                <p className="text-xs uppercase tracking-wider text-blue-100">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="relative z-10 -mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <Icon d={icons.search} />
              </div>

              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, skill, city, area or phone..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-slate-700 outline-none transition focus:bg-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1 rounded-xl bg-slate-100 p-1">
              <span className="hidden px-2 text-slate-400 sm:block">
                <Icon d={icons.filter} className="h-4 w-4" />
              </span>

              {[
                { value: "all", label: "All" },
                { value: "available", label: "Available" },
                { value: "unavailable", label: "Unavailable" },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setAvailability(option.value)}
                  className={`rounded-lg px-4 py-2.5 text-sm font-bold transition ${
                    availability === option.value
                      ? "bg-white text-blue-600 shadow"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {error && (
          <div
            role="alert"
            className="mt-6 flex flex-col justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-red-700 sm:flex-row sm:items-center"
          >
            <p className="text-sm font-medium">{error}</p>

            <button
              type="button"
              onClick={getSkills}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700"
            >
              <Icon d={icons.refresh} className="h-4 w-4" />
              Retry
            </button>
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-1 gap-7 py-10 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        )}

        {!loading && filteredSkills.length > 0 && (
          <div className="grid grid-cols-1 gap-7 py-10 md:grid-cols-2 lg:grid-cols-3">
            {filteredSkills.map((item) => (
              <article
                key={item._id}
                className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="relative h-56 overflow-hidden bg-slate-200">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name || "Skilled worker"}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-400">
                      <Icon d={icons.user} className="h-20 w-20" />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  <div
                    className={`absolute right-4 top-4 flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold text-white shadow-lg ${
                      item.available ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    <span className="h-2 w-2 rounded-full bg-white" />
                    {item.available ? "Available" : "Unavailable"}
                  </div>

                  <div className="absolute bottom-4 left-5 right-5">
                    <h2 className="truncate text-xl font-black text-white">
                      {item.name || "Unnamed Worker"}
                    </h2>

                    <span className="mt-2 inline-flex rounded-full bg-white px-3 py-1 text-xs font-bold text-blue-700">
                      {item.skill || "Skilled Worker"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Info icon={icons.pin} label="City" value={item.city} />
                    <Info icon={icons.map} label="Area" value={item.area} />

                    <Info
                      icon={icons.clock}
                      label="Experience"
                      value={
                        item.experience
                          ? `${item.experience} years`
                          : "Not provided"
                      }
                    />

                    <Info
                      icon={icons.phone}
                      label="Phone"
                      value={item.phone}
                    />
                  </div>

                  {item.description && (
                    <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-slate-500">
                      {item.description}
                    </p>
                  )}

                  <div className="mt-auto pt-5">
                    <button
                      type="button"
                      onClick={() => navigate(`/viewdetail/${item._id}`)}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 py-3 font-bold text-white shadow-md shadow-blue-500/20 transition hover:from-indigo-700 hover:to-blue-700"
                    >
                      <Icon d={icons.eye} />
                      View Detail
                    </button>

                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/updateskiller/${item._id}`)
                        }
                        className="flex items-center justify-center gap-2 rounded-xl border border-blue-100 bg-blue-50 py-3 font-bold text-blue-700 transition hover:bg-blue-100"
                      >
                        <Icon d={icons.edit} />
                        Update
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeleteItem(item)}
                        className="flex items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 py-3 font-bold text-red-600 transition hover:bg-red-100"
                      >
                        <Icon d={icons.trash} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {!loading && filteredSkills.length === 0 && (
          <div className="py-24 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-200 text-slate-400">
              <Icon d={icons.search} className="h-9 w-9" />
            </div>

            <h2 className="mt-5 text-xl font-black text-slate-700">
              No skilled people found
            </h2>

            <p className="mt-2 text-slate-500">
              Try another search or availability filter.
            </p>

            {(search || availability !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setAvailability("all");
                }}
                className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 font-bold text-white hover:bg-blue-700"
              >
                Clear Filters
              </button>
            )}

            {!error && skills.length === 0 && (
              <button
                type="button"
                onClick={() => navigate("/add-skilled")}
                className="ml-2 mt-5 rounded-xl border border-blue-200 px-5 py-2.5 font-bold text-blue-700 hover:bg-blue-50"
              >
                Add First Worker
              </button>
            )}
          </div>
        )}
      </main>

      {deleteItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget && !deleting) {
              setDeleteItem(null);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-title"
            className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-600">
              <Icon d={icons.trash} className="h-8 w-8" />
            </div>

            <h2
              id="delete-title"
              className="mt-5 text-center text-2xl font-black text-slate-800"
            >
              Delete Worker?
            </h2>

            <p className="mt-3 text-center leading-relaxed text-slate-500">
              Are you sure you want to permanently delete{" "}
              <span className="font-bold text-slate-700">
                {deleteItem.name || "this worker"}
              </span>
              ?
            </p>

            <div className="mt-7 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDeleteItem(null)}
                disabled={deleting}
                className="flex items-center justify-center gap-2 rounded-xl bg-slate-100 py-3 font-bold text-slate-700 transition hover:bg-slate-200 disabled:opacity-50"
              >
                <Icon d={icons.close} />
                Cancel
              </button>

              <button
                type="button"
                onClick={deleteSkill}
                disabled={deleting}
                className="flex items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Icon d={icons.trash} />
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllSkiller;

