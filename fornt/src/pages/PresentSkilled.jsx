import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Eye,
  Pencil,
  Trash2,
  MapPin,
  Clock,
  Phone,
  Wrench,
  Users,
  RefreshCw,
  Loader2,
  X,
} from "lucide-react";

const API = import.meta.env.VITE_backend_base_url;

function PresentSkilled() {
  const navigate = useNavigate();

  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [deleteItem, setDeleteItem] = useState(null);
  const [deleting, setDeleting] = useState(false);

  async function loadMySkills() {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(`${API}/skill/myskills`, {
        withCredentials: true,
      });

      setSkills(response.data.data || []);
    } catch (err) {
      console.error("Load my skills error:", err);

      if (err.response?.status === 401) {
        navigate("/login");
        return;
      }

      setError("Unable to load your profiles. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMySkills();
  }, []);

  async function deleteSkill() {
    if (!deleteItem) return;

    try {
      setDeleting(true);

      await axios.delete(`${API}/skill/skilldelete/${deleteItem._id}`, {
        withCredentials: true,
      });

      setSkills((old) => old.filter((s) => s._id !== deleteItem._id));
      setDeleteItem(null);
    } catch (err) {
      console.error("Delete error:", err);
      setError("Delete failed. Please try again.");
      setDeleteItem(null);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">
              My Skilled Profiles
            </h1>
            <p className="mt-1 text-slate-500">
              Only the profiles you added are shown here.
            </p>
          </div>

          <button
            onClick={() => navigate("/add-skilled")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Add Skilled Person
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-sm text-red-700">
            <span>{error}</span>
            <button
              onClick={loadMySkills}
              className="inline-flex items-center gap-1.5 font-semibold hover:text-red-900"
            >
              <RefreshCw size={15} />
              Retry
            </button>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="grid gap-6 py-10 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse overflow-hidden rounded-3xl border border-slate-200 bg-white"
              >
                <div className="h-48 bg-slate-200" />
                <div className="space-y-3 p-5">
                  <div className="h-5 w-2/3 rounded bg-slate-200" />
                  <div className="h-4 w-1/2 rounded bg-slate-200" />
                  <div className="h-10 rounded bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && skills.length === 0 && (
          <div className="mt-16 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <Users size={42} className="mx-auto text-slate-300" />
            <h2 className="mt-4 text-xl font-bold text-slate-800">
              You have not added anyone yet
            </h2>
            <p className="mt-2 text-slate-500">
              Add a skilled person and they will appear here.
            </p>
            <button
              onClick={() => navigate("/add-skilled")}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
              <Plus size={18} />
              Add Skilled Person
            </button>
          </div>
        )}

        {/* Cards */}
        {!loading && skills.length > 0 && (
          <div className="grid gap-6 py-10 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((item) => (
              <div
                key={item._id}
                className="flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-48 bg-slate-200">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-slate-400">
                      <Users size={48} />
                    </div>
                  )}

                  <span
                    className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-bold text-white ${
                      item.available ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {item.available ? "Available" : "Unavailable"}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h2 className="truncate text-lg font-bold text-slate-900">
                    {item.name}
                  </h2>

                  <span className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    <Wrench size={13} />
                    {item.skill}
                  </span>

                  <div className="mt-4 space-y-2 text-sm text-slate-600">
                    <p className="flex items-center gap-2">
                      <MapPin size={15} className="text-blue-500" />
                      {[item.area, item.city].filter(Boolean).join(", ")}
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock size={15} className="text-blue-500" />
                      {item.experience}
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone size={15} className="text-blue-500" />
                      {item.phone}
                    </p>
                  </div>

                  <div className="mt-auto pt-5">
                    <button
                      onClick={() => navigate(`/viewdetail/${item._id}`)}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 font-semibold text-white hover:bg-blue-700"
                    >
                      <Eye size={17} />
                      View Detail
                    </button>

                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <button
                        onClick={() => navigate(`/updateskiller/${item._id}`)}
                        className="flex items-center justify-center gap-2 rounded-xl border border-blue-100 bg-blue-50 py-2.5 font-semibold text-blue-700 hover:bg-blue-100"
                      >
                        <Pencil size={16} />
                        Update
                      </button>

                      <button
                        onClick={() => setDeleteItem(item)}
                        className="flex items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 py-2.5 font-semibold text-red-600 hover:bg-red-100"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete modal */}
      {deleteItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600">
              <Trash2 size={26} />
            </div>

            <h2 className="mt-5 text-center text-2xl font-extrabold text-slate-800">
              Delete profile?
            </h2>

            <p className="mt-3 text-center text-slate-500">
              Permanently delete{" "}
              <span className="font-bold text-slate-700">
                {deleteItem.name}
              </span>
              ?
            </p>

            <div className="mt-7 grid grid-cols-2 gap-3">
              <button
                onClick={() => setDeleteItem(null)}
                disabled={deleting}
                className="flex items-center justify-center gap-2 rounded-xl bg-slate-100 py-3 font-bold text-slate-700 hover:bg-slate-200 disabled:opacity-50"
              >
                <X size={17} />
                Cancel
              </button>

              <button
                onClick={deleteSkill}
                disabled={deleting}
                className="flex items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-bold text-white hover:bg-red-700 disabled:opacity-50"
              >
                {deleting ? (
                  <Loader2 size={17} className="animate-spin" />
                ) : (
                  <Trash2 size={17} />
                )}
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PresentSkilled;