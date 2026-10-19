
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_backend_base_url;

const initialForm = {
  name: "",
  skill: "",
  city: "",
  area: "",
  experience: "",
  phone: "",
  description: "",
  image: null,
  available: true,
};

function AddSkilled() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState("");

  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target;

    if (type === "file") {
      const file = files?.[0];

      if (!file) return;

      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        setError("Please upload a JPG, PNG, or WEBP image.");
        event.target.value = "";
        return;
      }

      setError("");
      setForm((previous) => ({ ...previous, image: file }));
      setPreview(URL.createObjectURL(file));
      return;
    }

    setForm((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (form.experience === "" || Number(form.experience) < 0) {
      setError("Please enter experience in years.");
      return;
    }

    if (!Number.isFinite(Number(form.experience))) {
      setError("Experience must be a valid number.");
      return;
    }

    if (!API) {
      setError("Backend URL is missing from your environment configuration.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const formData = new FormData();

      formData.append("name", form.name.trim());
      formData.append("skill", form.skill.trim());
      formData.append("city", form.city.trim());
      formData.append("area", form.area.trim());
      formData.append("experience", String(Number(form.experience)));
      formData.append("phone", form.phone.trim());
      formData.append("description", form.description.trim());
      formData.append("available", String(form.available));

      if (form.image) {
        formData.append("image", form.image);
      }

      const response = await axios.post(
        `${API}/skill/askillcreate`,
        formData
      );

      if (response.data.success) {
        navigate("/all-skilled");
      } else {
        setError(response.data.message || "Profile creation failed.");
      }
    } catch (err) {
      console.error(
        "Create profile failed:",
        err.response?.data || err.message
      );

      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to create profile. Check the backend terminal."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <button
          type="button"
          onClick={() => navigate("/all-skilled")}
          className="mb-6 font-bold text-blue-600 hover:text-blue-800"
        >
          ← Back to All Skilled People
        </button>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
          <div className="bg-gradient-to-r from-blue-700 to-indigo-700 px-6 py-8 text-white sm:px-8">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-100">
              SkillConnect
            </p>
            <h1 className="mt-2 text-3xl font-black">
              Add Skilled Person
            </h1>
            <p className="mt-2 text-blue-100">
              Enter the worker's information below.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8">
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field
                label="Full Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <Field
                label="Skill"
                name="skill"
                value={form.skill}
                onChange={handleChange}
                required
              />

              <Field
                label="City"
                name="city"
                value={form.city}
                onChange={handleChange}
                required
              />

              <Field
                label="Area"
                name="area"
                value={form.area}
                onChange={handleChange}
              />

              <Field
                label="Experience (years)"
                name="experience"
                type="number"
                min="0"
                step="any"
                value={form.experience}
                onChange={handleChange}
                required
              />

              <Field
                label="Phone Number"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                required
              />

              <div className="sm:col-span-2">
                <label
                  htmlFor="image"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Upload Worker Image
                </label>

                <input
                  id="image"
                  type="file"
                  name="image"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleChange}
                  className="block w-full rounded-xl border border-slate-300 bg-white text-sm text-slate-700 file:mr-4 file:border-0 file:bg-blue-600 file:px-4 file:py-3 file:font-semibold file:text-white hover:file:bg-blue-700"
                />

                {preview && (
                  <div className="mt-4">
                    <img
                      src={preview}
                      alt="Worker preview"
                      className="h-40 w-40 rounded-2xl border border-slate-200 object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe the worker's services and experience..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
            </div>

            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <input
                type="checkbox"
                name="available"
                checked={form.available}
                onChange={handleChange}
                className="h-5 w-5 accent-blue-600"
              />

              <span>
                <span className="block font-bold text-slate-800">
                  Available for Work
                </span>
                <span className="text-sm text-slate-500">
                  Mark this worker as available.
                </span>
              </span>
            </label>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 rounded-xl bg-blue-600 px-5 py-3.5 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "Creating Profile..." : "Create Profile"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/all-skilled")}
                className="rounded-xl border border-slate-200 px-5 py-3.5 font-bold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  min,
  step,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-bold text-slate-700"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        min={min}
        step={step}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
      />
    </div>
  );
}

export default AddSkilled;

