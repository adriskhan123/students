import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Projectcreate() {
  const [projectcreate, setprojectcreate] = useState([]);

  const navigate = useNavigate();

  async function getprojectfind() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_backend_base_url}/projects/projectsfind`
      );

      console.log(response.data);

      if (response.data.success === true) {
        setprojectcreate(response.data.data || []);
      } else {
        setprojectcreate([]);
      }
    } catch (error) {
      console.log("Project find error:", error);
      setprojectcreate([]);
    }
  }

  useEffect(() => {
    getprojectfind();
  }, []);

  async function deleteProject(Projectname) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_backend_base_url}/projects/projectdelete`,
        {
          Projectname: Projectname,
        }
      );

      console.log("Delete response:", response.data);

      if (response.data.success === true) {
        getprojectfind();
      }
    } catch (error) {
      console.log(
        "Delete project error:",
        error.response?.data || error.message
      );
    }
  }
   // useEffect(() => {
  //   async function checkapi() {
  //     try {
  //       const response = await axios.get(
  //         `${import.meta.env.VITE_backend_base_url}/user/adincheck`,
  //         {
  //           withCredentials: true,
  //         }
  //       );

  //       if (response.data.success === true) {
  //         console.log("the data come");{
           
  //         }
  //       } else {
  //         navigate("/");
  //       }
  //     } catch (error) {
  //       console.log("Auth check error:", error);
  //       navigate("/");
  //     }
  //   }

  //   checkapi();
  // }, [navigate]);

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">

      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Portfolio
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            All Projects
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your projects
          </p>
        </div>

        <button
          onClick={() => navigate("/projects")}
          className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-indigo-700"
        >
          + Create Project
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

        {projectcreate.map((item) => (
          <div
            key={item._id}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >

            <div className="h-48 overflow-hidden bg-slate-100">
              {item.imageurl ? (
                <img
                  src={item.imageurl}
                  alt={item.Projectname}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-slate-400">
                  No Image
                </div>
              )}
            </div>

            <div className="p-5">

              <h2 className="truncate text-xl font-bold text-slate-900">
                {item.Projectname}
              </h2>

              <p className="mt-2 text-sm font-medium text-indigo-600">
                Customer: {item.coustomername}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {item.notes}
              </p>

              <div className="mt-5 flex gap-2 border-t border-slate-100 pt-4">

                <button
                  onClick={() =>
                    navigate(
                      `/projectupdate/${encodeURIComponent(
                        item.Projectname
                      )}`
                    )
                  }
                  className="flex-1 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  Update
                </button>

                <button
                  onClick={() => deleteProject(item.Projectname)}
                  className="flex-1 rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                  Delete
                </button>

              </div>
            </div>
          </div>
        ))}

      </div>

      {projectcreate.length === 0 && (
        <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">

          <h2 className="text-lg font-semibold text-slate-800">
            No projects found
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Create your first project to see it here.
          </p>

          <button
            onClick={() => navigate("/projects")}
            className="mt-5 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            + Create Project
          </button>

        </div>
      )}

    </div>
  );
}

export default Projectcreate;