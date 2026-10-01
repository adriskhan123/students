import React, { useState } from "react";
import axios from "axios";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("Login Data:", formData);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_backend_base_url}/user/signupdata`,
        formData,
        {
          withCredentials: true,
        }
      );

      console.log("Login Response:", response.data);

      if (response.data.success === true) {
        setFormData({
          email: "",
          password: "",
        });

        console.log("Login successful");
      }
    } catch (error) {
      console.error(
        "Login Error:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">
            <LogIn size={28} />
          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Login to your SkillConnect account
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-xl border border-slate-200">

          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
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

            {/* Password */}
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
                  placeholder="Enter your password"
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

            {/* Remember / Forgot */}
            <div className="flex items-center justify-between text-sm">

              <label className="flex items-center gap-2 text-slate-600">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                Remember me
              </label>

              <button
                type="button"
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                Forgot password?
              </button>

            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 
              rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 hover:shadow-xl active:scale-[0.98]"
            >
              <LogIn size={19} />
              Login
            </button>

          </form>

          {/* Register */}
          <div className="mt-6 text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Create Account
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;
