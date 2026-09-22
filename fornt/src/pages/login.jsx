
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_backend_base_url}/user/signupdata`,
        loginData,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        navigate("/projectcreate");
      }
    } catch (error) {
      console.log("Login error:", error.response?.data || error.message);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center text-slate-900 mb-2">
          Login
        </h1>

        <p className="text-center text-slate-500 mb-8">
          Login to your account
        </p>

        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="block mb-2 font-semibold text-slate-700">
              Role
            </label>

            <select
              name="role"
              value={loginData.role}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold text-slate-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-slate-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
              className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Login
          </button>

        </form>

        <div className="mt-6 text-center">
          <span className="text-slate-500">
            Don't have an account?{" "}
          </span>

          <button
            onClick={() => navigate("/register")}
            className="font-semibold text-blue-600 hover:underline"
          >
            Register
          </button>
        </div>

      </div>
    </div>
  );
}

export default Login;

