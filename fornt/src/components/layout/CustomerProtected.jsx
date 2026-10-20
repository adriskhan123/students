
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const API = import.meta.env.VITE_backend_base_url;

function CustomerProtected({ children }) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    async function checkCustomer() {
      try {
        const response = await axios.get(
          `${API}/user/customer-check`,
          {
            withCredentials: true,
          }
        );

        setAllowed(response.data.success === true);
      } catch (error) {
        console.log(
          "Customer authentication failed:",
          error.response?.data || error.message
        );

        setAllowed(false);
      } finally {
        setLoading(false);
      }
    }

    checkCustomer();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="rounded-xl bg-white px-6 py-4 text-sm font-semibold text-slate-700 shadow">
          Checking account...
        </div>
      </div>
    );
  }

  if (!allowed) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default CustomerProtected;

