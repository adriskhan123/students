
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  UserRound,
  MapPin,
  Phone,
  Briefcase,
  Image as ImageIcon,
  FileText,
  CheckCircle,
} from "lucide-react";

const API = import.meta.env.VITE_backend_base_url;

function Updateskiller() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [skill, setSkill] = useState({
    name: "",
    skill: "",
    city: "",
    area: "",
    experience: "",
    phone: "",
    description: "",
    image: "",
    available: true,
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let active = true;

    async function findOne() {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `${API}/skill/skillfindone/${id}`
        );

        if (!active) return;

        if (response.data.success && response.data.data) {
          const data = response.data.data;

          setSkill({
            name: data.name || "",
            skill: data.skill || "",
            city: data.city || "",
            area: data.area || "",
            experience: data.experience || "",
            phone: data.phone || "",
            description: data.description || "",
            image: data.image || "",
            available: data.available ?? true,
          });
        } else {
          setError("Worker profile was not found.");
        }
      } catch (err) {
        if (!active) return;

        console.error(
          "Load worker error:",
          err.response?.data || err.message
        );

        setError(
          err.response?.data?.msg ||
            "Unable to load this worker profile."
        );
      } finally {
        if (active) setLoading(false);
      }
    }

    if (id) {
      findOne();
    } else {
      setError("Worker ID is missing.");
      setLoading(false);
    }

    return () => {
      active = false;
    };
  }, [id]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setSkill((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function updateSkill(e) {
    e.preventDefault();
    setError("");

    if (!id) {
      setError("Worker ID is missing.");
      return;
    }

    try {
      setUpdating(true);

      const response = await axios.put(
        `${API}/skill/skillupdate/${id}`,
        skill
      );

      if (response.data.success === true) {
        setSuccess(true);

        setTimeout(() => {
          navigate("/all-skilled");
        }, 900);
      } else {
        setError(response.data.msg || "Update failed.");
      }
    } catch (err) {
      console.error(
        "Update worker error:",
        err.response?.data || err.message
      );

      setError(
        err.response?.data?.msg ||
          err.response?.data?.error ||
          (err.code === "ERR_NETWORK"
            ? "Cannot connect to the backend. Check that your server is running."
            : "Failed to update worker. Please try again.")
      );
    } finally {
      setUpdating(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

  const labelClass =
    "mb-2 block text-sm font-semibold text-slate-700";

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
          <p className="mt-4 font-medium text-slate-600">
            Loading worker profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <button
          type="button"
          onClick={() => navigate("/all-skilled")}
          className="mb-6 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-600 transition hover:border-blue-200 hover:text-blue-600"
        >
          <ArrowLeft size={18} />
          Back to All Skilled People
        </button>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-600 px-6 py-8 sm:px-10">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-white">
                <UserRound size={30} />
              </div>

              <div>
                <h1 className="text-2xl font-black text-white sm:text-3xl">
                  Update Skilled Person
                </h1>
                <p className="mt-2 text-sm text-blue-100">
                  Update the worker details and save your changes.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={updateSkill} className="space-y-7 p-6 sm:p-10">
            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
              >
                {error}
              </div>
            )}

            {success && (
              <div
                role="status"
                className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700"
              >
                <CheckCircle size={20} />
                Worker updated successfully! Returning to the worker list...
              </div>
            )}

            <section>
              <h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-slate-800">
                <UserRound size={20} className="text-blue-600" />
                Personal Information
              </h2>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={skill.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="skill" className={labelClass}>
                    Skill / Profession
                  </label>
                  <input
                    id="skill"
                    name="skill"
                    value={skill.skill}
                    onChange={handleChange}
                    placeholder="e.g. Electrician"
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className={labelClass}>
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={skill.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      className={`${inputClass} pl-10`}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="experience" className={labelClass}>
                    Experience
                  </label>
                  <div className="relative">
                    <Briefcase
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      id="experience"
                      name="experience"
                      value={skill.experience}
                      onChange={handleChange}
                      placeholder="e.g. 5 years"
                      className={`${inputClass} pl-10`}
                      required
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="border-t border-slate-100 pt-7">
              <h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-slate-800">
                <MapPin size={20} className="text-blue-600" />
                Location Information
              </h2>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="city" className={labelClass}>
                    City
                  </label>
                  <input
                    id="city"
                    name="city"
                    value={skill.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="area" className={labelClass}>
                    Area / Address
                  </label>
                  <input
                    id="area"
                    name="area"
                    value={skill.area}
                    onChange={handleChange}
                    placeholder="Enter area"
                    className={inputClass}
                    required
                  />
                </div>
              </div>
            </section>

            <section className="border-t border-slate-100 pt-7">
              <h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-slate-800">
                <FileText size={20} className="text-blue-600" />
                Additional Details
              </h2>

              <div className="space-y-5">
                <div>
                  <label htmlFor="description" className={labelClass}>
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={skill.description}
                    onChange={handleChange}
                    placeholder="Describe the worker's skills and services..."
                    rows={5}
                    className={`${inputClass} resize-y`}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="image" className={labelClass}>
                    Image URL (optional)
                  </label>
                  <div className="relative">
                    <ImageIcon
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      id="image"
                      type="url"
                      name="image"
                      value={skill.image}
                      onChange={handleChange}
                      placeholder="https://example.com/image.jpg"
                      className={`${inputClass} pl-10`}
                    />
                  </div>

                  {skill.image && (
                    <img
                      src={skill.image}
                      alt="Worker preview"
                      className="mt-4 h-40 w-40 rounded-xl border border-slate-200 object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                      onLoad={(e) => {
                        e.currentTarget.style.display = "block";
                      }}
                    />
                  )}
                </div>

                <label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-blue-50">
                  <div>
                    <p className="font-semibold text-slate-800">
                      Available for Work
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Set whether this worker is available.
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    name="available"
                    checked={Boolean(skill.available)}
                    onChange={handleChange}
                    className="h-5 w-5 accent-blue-600"
                  />
                </label>
              </div>
            </section>

            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => navigate("/all-skilled")}
                disabled={updating}
                className="rounded-xl border border-slate-200 px-6 py-3 font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={updating || success}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save size={18} />
                {updating ? "Saving Changes..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Updateskiller;

