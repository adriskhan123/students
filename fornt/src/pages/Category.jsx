
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Category() {
  let navigate = useNavigate();

  const [Catg, setCatg] = useState({
    name: "",
    Slug: "",
    ParentCategory: "",
    CategoryDescription: "",
    CategoryImageURL: "",
    sportoder: "",
  });

  function handleChange(e) {
    setCatg({
      ...Catg,
      [e.target.name]: e.target.value,
    });
  }

  async function createcategory() {
    try {
      let response = await axios.post(
        `${import.meta.env.VITE_backend_base_url}/categery/categerycreate`,
        Catg
      );

      console.log(response.data);

      if (response.data.success) {
        navigate("/allcategory");
      }
    } catch (error) {
      console.log("CREATE CATEGORY ERROR:", error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Create Category
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block font-semibold mb-2">
              Category Name
            </label>
            <input
              className="border border-gray-300 p-3 rounded-xl w-full outline-none focus:border-blue-500"
              type="text"
              name="name"
              placeholder="Category Name"
              value={Catg.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Slug</label>
            <input
              className="border border-gray-300 p-3 rounded-xl w-full outline-none focus:border-blue-500"
              type="text"
              name="Slug"
              placeholder="Slug"
              value={Catg.Slug}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Parent Category
            </label>
            <input
              className="border border-gray-300 p-3 rounded-xl w-full outline-none focus:border-blue-500"
              type="text"
              name="ParentCategory"
              placeholder="Parent Category"
              value={Catg.ParentCategory}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">Sort Order</label>
            <input
              className="border border-gray-300 p-3 rounded-xl w-full outline-none focus:border-blue-500"
              type="number"
              name="sportoder"
              placeholder="Sort Order"
              value={Catg.sportoder}
              onChange={handleChange}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-semibold mb-2">
              Category Description
            </label>
            <textarea
              className="border border-gray-300 p-3 rounded-xl w-full outline-none focus:border-blue-500"
              name="CategoryDescription"
              placeholder="Category Description"
              rows="4"
              value={Catg.CategoryDescription}
              onChange={handleChange}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-semibold mb-2">
              Category Image URL
            </label>
            <input
              className="border border-gray-300 p-3 rounded-xl w-full outline-none focus:border-blue-500"
              type="text"
              name="CategoryImageURL"
              placeholder="Category Image URL"
              value={Catg.CategoryImageURL}
              onChange={handleChange}
            />
          </div>

          <div className="md:col-span-2">
            <button
              onClick={createcategory}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-xl transition"
            >
              Create Category
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;

