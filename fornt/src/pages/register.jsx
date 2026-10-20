import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserPlus,
  Loader2,
  BriefcaseBusiness,
  UserRound,
} from "lucide-react";

const API = import.meta.env.VITE_backend_base_url;

function Register() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    fatherName: "",
    email: "",
    phone: "",
    age: "",
    address: "",
    city: "",
    password: "",
    role: "customer",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const selectedRole = data.role.toLowerCase();

      const response = await axios.post(
        `${API}/user/userdata`,
        {
          ...data,
          role: selectedRole,
        },
        {
          withCredentials: true,
        }
      );

      if (!response.data.success) {
        setError(response.data.msg || "Registration failed.");
        return;
      }

      const role = String(
        response.data.role ||
        response.data.data?.role ||
        selectedRole
      ).trim().toLowerCase();

      console.log("Registered role:", role);

      if (role === "customer") {
        navigate("/find-workers", { replace: true });
        return;
      }

      if (role === "worker") {
        navigate("/add-skilled", { replace: true });
        return;
      }

      if (role === "admin") {
        navigate("/all-skilled", { replace: true });
        return;
      }

      setError("Invalid account role.");

    } catch (err) {
      console.log(
        "Register error:",
        err.response?.data || err.message
      );

      setError(
        err.code === "ERR_NETWORK"
          ? "Backend server is not running."
          : err.response?.data?.msg ||
            err.response?.data?.error ||
            "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const input =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10";

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">

        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">
            <UserPlus size={26} />
          </div>

          <h1 className="text-3xl font-black text-slate-900">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Join SkillConnect today.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Register As
            </label>

            <div className="grid grid-cols-2 gap-3">

              <button
                type="button"
                onClick={() =>
                  setData({
                    ...data,
                    role: "worker",
                  })
                }
                className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 font-bold transition ${
                  data.role === "worker"
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-blue-50"
                }`}
              >
                <BriefcaseBusiness size={18} />
                Worker
              </button>

              <button
                type="button"
                onClick={() =>
                  setData({
                    ...data,
                    role: "customer",
                  })
                }
                className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 font-bold transition ${
                  data.role === "customer"
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-blue-50"
                }`}
              >
                <UserRound size={18} />
                Customer
              </button>

            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className={input}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Father Name
              </label>

              <input
                type="text"
                name="fatherName"
                value={data.fatherName}
                onChange={handleChange}
                placeholder="Father name"
                className={input}
              />
            </div>

          </div>

          <div className="grid gap-4 sm:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="example@email.com"
                className={input}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Phone
              </label>

              <input
                type="tel"
                name="phone"
                value={data.phone}
                onChange={handleChange}
                placeholder="03XXXXXXXXX"
                className={input}
              />
            </div>

          </div>

          <div className="grid gap-4 sm:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Age
              </label>

              <input
                type="number"
                name="age"
                value={data.age}
                onChange={handleChange}
                placeholder="Age"
                className={input}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                City
              </label>

              <input
                type="text"
                name="city"
                value={data.city}
                onChange={handleChange}
                placeholder="Bannu"
                className={input}
              />
            </div>

          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Address
            </label>

            <input
              type="text"
              name="address"
              value={data.address}
              onChange={handleChange}
              placeholder="Enter your address"
              className={input}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Create password"
              className={input}
              required
            />
          </div>

          <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-800">
            You are creating a{" "}
            <span className="font-bold">
              {data.role === "worker" ? "Worker" : "Customer"}
            </span>{" "}
            account.
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-bold text-white transition hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 size={19} className="animate-spin" />
                Creating Account...
              </>
            ) : (
              <>
                <UserPlus size={19} />
                Create Account
              </>
            )}
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;