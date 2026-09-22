import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Projectupdate() {
  const params = useParams();
  const navigate = useNavigate();

  const [oldProjectname, setOldProjectname] = useState("");

  const [Projects, setProjects] = useState({
    Projectname: "",
    coustomername: "",
    notes: "",
  });

  async function findoneapi() {
    try {
      const projectName = decodeURIComponent(params.Projectname);

      const response = await axios.post(
        `${import.meta.env.VITE_backend_base_url}/projects/projectsfindone`,
        {
          Projectname: projectName,
        }
      );

      console.log(response.data);

      if (response.data.success === true) {
        setProjects({
          Projectname: response.data.data.Projectname || "",
          coustomername: response.data.data.coustomername || "",
          notes: response.data.data.notes || "",
        });

        setOldProjectname(response.data.data.Projectname);
      }
    } catch (error) {
      console.log("Project error:", error);
    }
  }

  async function updateapi() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_backend_base_url}/projects/projectupdate`,
        {
          oldProjectname: oldProjectname,
          Projectname: Projects.Projectname,
          coustomername: Projects.coustomername,
          notes: Projects.notes,
        }
      );

      console.log(response.data);

      if (response.data.success === true) {
        navigate("/projectcreate");
      }
    } catch (error) {
      console.log(
        "Update error:",
        error.response?.data || error.message
      );
    }
  }

  useEffect(() => {
    if (params.Projectname) {
      findoneapi();
    }
  }, [params.Projectname]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Update Project
        </h1>

        <p className="text-gray-500 mb-6">
          Update your project details below
        </p>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Project Name"
            value={Projects.Projectname}
            onChange={(e) =>
              setProjects({
                ...Projects,
                Projectname: e.target.value,
              })
            }
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50"
          />

          <input
            type="text"
            placeholder="Customer Name"
            value={Projects.coustomername}
            onChange={(e) =>
              setProjects({
                ...Projects,
                coustomername: e.target.value,
              })
            }
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50"
          />

          <input
            type="text"
            placeholder="Notes"
            value={Projects.notes}
            onChange={(e) =>
              setProjects({
                ...Projects,
                notes: e.target.value,
              })
            }
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50"
          />

        </div>

        <button
          onClick={updateapi}
          className="w-full mt-6 py-3.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
        >
          Update Project
        </button>

      </div>

    </div>
  );
}

export default Projectupdate;