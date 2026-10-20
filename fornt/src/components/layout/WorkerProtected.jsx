
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const API = import.meta.env.VITE_backend_base_url;

function WorkerProtected({ children }) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const checkWorker = async () => {
      try {
        const response = await axios.get(
          `${API}/user/worker-check`,
          {
            withCredentials: true,
          }
        );

        setAllowed(response.data.success === true);
      } catch (error) {
        console.error(
          "Worker authentication failed:",
          error.response?.data || error.message
        );

        setAllowed(false);
      } finally {
        setLoading(false);
      }
    };

    checkWorker();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="rounded-xl bg-white px-6 py-4 font-semibold text-slate-700 shadow">
          Checking worker account...
        </div>
      </div>
    );
  }

  if (!allowed) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default WorkerProtected;

