
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const API = import.meta.env.VITE_backend_base_url;

function UserProtected({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let active = true;

    const checkUser = async () => {
      try {
        const response = await axios.get(
          `${API}/user/usecheck`,
          {
            withCredentials: true,
          }
        );

        if (active) {
          setUser(
            response.data.success
              ? response.data.data
              : null
          );
        }
      } catch (error) {
        if (active) {
          setUser(null);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    checkUser();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex items-center gap-3 rounded-2xl bg-white px-6 py-4 shadow-lg ring-1 ring-slate-200">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />

          <p className="text-sm font-semibold text-slate-600">
            Checking user access...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default UserProtected;

