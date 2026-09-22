import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AllCategory() {
  const navigate = useNavigate();

  const [catgery, setcatery] = useState([]);

  async function findcategeryapihit() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_backend_base_url}/categery/categeryfind`
      );

      console.log(response.data);

      if (response.data.success === true) {
        setcatery(response.data.data);
      }
    } catch (error) {
      console.log(
        "FIND CATEGORY ERROR:",
        error.response?.data || error.message
      );
    }
  }

  useEffect(() => {
    findcategeryapihit();
  }, []);

  async function deleteCategory(id) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_backend_base_url}/categery/categerydelete`,
        { id }
      );

      console.log(response.data);

      if (response.data.success === true) {
        findcategeryapihit();
      }
    } catch (error) {
      console.log(
        "DELETE CATEGORY ERROR:",
        error.response?.data || error.message
      );
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          All Categories
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {catgery.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-lg p-6"
            >

              {item.CategoryImageURL && (
                <img
                  src={item.CategoryImageURL}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-xl mb-5"
                />
              )}

              <h2 className="text-2xl font-bold text-gray-800">
                {item.name}
              </h2>

              <p className="text-gray-500 mt-2">
                Slug: {item.Slug}
              </p>

              <p className="text-gray-500 mt-2">
                Parent Category: {item.ParentCategory}
              </p>

              <p className="text-gray-600 mt-3">
                {item.CategoryDescription}
              </p>

              <p className="text-gray-500 mt-3">
                Sort Order: {item.sportoder}
              </p>

              <div className="flex gap-3 mt-6">

                <button
                  onClick={() => {
                    navigate(`/categoryupdate/${item._id}`);
                  }}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg"
                >
                  Update
                </button>

                <button
                  onClick={() => deleteCategory(item._id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default AllCategory;

