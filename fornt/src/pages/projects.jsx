
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Projects() {
  const navigate = useNavigate();

  const [Projects, setProjects] = useState({
    Projectname: "",
    coustomername: "",
    notes: "",
    imageurl: null,
  });

  async function getprojectscreate() {
    try {
      const formData = new FormData();

      formData.append("Projectname", Projects.Projectname);
      formData.append("coustomername", Projects.coustomername);
      formData.append("notes", Projects.notes);

      if (Projects.imageurl) {
        formData.append("image", Projects.imageurl);
      }

      const response = await axios.post(
        import.meta.env.VITE_backend_base_url + "/projects/createproject",
        formData
      );

      console.log(response.data);

      if (response.data.success === true) {
        navigate("/Projectcreate");
      }
    } catch (error) {
      console.log("Project create error:", error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Create Project
        </h1>

        <p className="text-gray-500 mb-6">
          Add your project details below
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
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:bg-white focus:border-blue-500"
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
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:bg-white focus:border-blue-500"
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
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:bg-white focus:border-blue-500"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setProjects({
                ...Projects,
                imageurl: e.target.files[0],
              })
            }
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:bg-white focus:border-blue-500"
          />

        </div>

        <button
          onClick={getprojectscreate}
          className="w-full mt-6 py-3.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          Create Project
        </button>

        <button
          onClick={() => navigate("/Projectcreate")}
          className="w-full mt-3 py-3 rounded-xl bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300"
        >
          View Projects
        </button>

      </div>
    </div>
  );
}

export default Projects;

