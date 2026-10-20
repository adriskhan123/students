import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, Loader2 } from "lucide-react";

const API = import.meta.env.VITE_backend_base_url;

function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const response = await axios.post(
        `${API}/user/signupdata`,
        {
          email: loginData.email.trim().toLowerCase(),
          password: loginData.password,
        },
        {
          withCredentials: true,
        }
      );

      if (!response.data.success) {
        setError(response.data.msg || "Login failed.");
        return;
      }

      const role = String(
        response.data.role ||
        response.data.data?.role ||
        ""
      ).trim().toLowerCase();

      console.log("Logged in role:", role);

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
        "Login error:",
        err.response?.data || err.message
      );

      setError(
        err.code === "ERR_NETWORK"
          ? "Backend server is not running."
          : err.response?.data?.msg ||
            err.response?.data?.error ||
            "Login failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const input =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10";

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-xl sm:p-8">

        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">
            <LogIn size={26} />
          </div>

          <h1 className="text-3xl font-black text-slate-900">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Login to continue to SkillConnect.
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={input}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={input}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-bold text-white transition hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 size={19} className="animate-spin" />
                Logging In...
              </>
            ) : (
              <>
                <LogIn size={19} />
                Login
              </>
            )}
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-bold text-blue-600 hover:underline"
          >
            Create Account
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;