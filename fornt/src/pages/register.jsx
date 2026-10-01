
import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Lock,
  MapPin,
  Eye,
  EyeOff,
  UserPlus,
  Users,
} from "lucide-react";
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    email: "",
    phone: "",
    age: "",
    address: "",
    city: "",
    password: "",
    role: "user",
  });

  const [showPassword, setShowPassword] = useState(false);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= REGISTER =================
  const handleRegister = async (e) => {
    e.preventDefault();

    console.log("Register Data:", formData);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_backend_base_url}/user/userdata`,
        formData
      );

      console.log(response);

      if (response.data.success === true) {
        alert("Registration successful!");

        setFormData({
          name: "",
          fatherName: "",
          email: "",
          phone: "",
          age: "",
          address: "",
          city: "",
          password: "",
          role: "user",
        });
      } else {
        alert(response.data.msg || "Registration failed");
      }
    } catch (error) {
      console.log("Register Error:", error);

      alert(
        error.response?.data?.msg || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl">

        {/* ================= HEADING ================= */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">
            <UserPlus size={28} />
          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Create your SkillConnect account
          </p>
        </div>

        {/* ================= CARD ================= */}
        <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-xl border border-slate-200">

          <form onSubmit={handleRegister} className="space-y-5">

            {/* ================= NAME + FATHER NAME ================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              {/* NAME */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Full Name
                </label>

                <div className="relative">
                  <User
                    size={20}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* FATHER NAME */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Father Name
                </label>

                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  placeholder="Enter father name"
                  required
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 px-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* ================= EMAIL + PHONE ================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              {/* EMAIL */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={20}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              {/* PHONE */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Phone Number
                </label>

                <div className="relative">
                  <Phone
                    size={20}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="03XX XXXXXXX"
                    required
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>
            </div>

            {/* ================= AGE + CITY ================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              {/* AGE */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Age
                </label>

                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Enter your age"
                  min="1"
                  required
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 px-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* CITY */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  City
                </label>

                <div className="relative">
                  <MapPin
                    size={20}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full appearance-none rounded-xl border border-slate-300 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  >
                    <option value="">Select city</option>
                    <option value="Bannu">Bannu</option>
                    <option value="Peshawar">Peshawar</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Karachi">Karachi</option>
                  </select>
                </div>
              </div>
            </div>

            {/* ================= ADDRESS ================= */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Address
              </label>

              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                required
                className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 px-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {/* ================= ROLE ================= */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Account Role
              </label>

              <div className="relative">
                <Users
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="w-full appearance-none rounded-xl border border-slate-300 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            {/* ================= PASSWORD ================= */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={20}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pl-10 pr-12 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* ================= BUTTON ================= */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 hover:shadow-xl active:scale-[0.98]"
            >
              <UserPlus size={19} />
              Create Account
            </button>

          </form>

          {/* ================= LOGIN ================= */}
          <div className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}

            <a
              href="/"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Login
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Register;
