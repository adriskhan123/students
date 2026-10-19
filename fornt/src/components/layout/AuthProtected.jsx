
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_backend_base_url;

function AuthProtected({ children }) {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let active = true;

    const checkAuth = async () => {
      try {
        const response = await axios.get(
          `${API}/user/auth-check`,
          {
            withCredentials: true,
          }
        );

        if (active) {
          setStatus(
            response.data.success ? "ok" : "denied"
          );
        }
      } catch (error) {
        if (active) {
          setStatus("denied");
        }
      }
    };

    checkAuth();

    return () => {
      active = false;
    };
  }, []);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex items-center gap-3 rounded-2xl bg-white px-6 py-4 shadow-lg ring-1 ring-slate-200">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />

          <p className="text-sm font-semibold text-slate-600">
            Checking login...
          </p>
        </div>
      </div>
    );
  }

  if (status === "denied") {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default AuthProtected;

