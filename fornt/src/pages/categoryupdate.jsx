
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Categoryupdate() {
  const navigate = useNavigate();
  const params = useParams();

  const [Catg, setCatg] = useState({
    name: "",
    Slug: "",
    ParentCategory: "",
    CategoryDescription: "",
    CategoryImageURL: "",
    sportoder: "",
  });

  // Find one category
  async function findapihiting() {
    try {
      const response = await axios.post(
        "http://localhost:3000/categery/findonecategery",
        {
          id: params.categeryId,
        }
      );

      console.log(response.data);

      if (response.data.success === true) {
        const categerydata = response.data.categery;

        setCatg({
          name: categerydata.name || "",
          Slug: categerydata.Slug || "",
          ParentCategory: categerydata.ParentCategory || "",
          CategoryDescription: categerydata.CategoryDescription || "",
          CategoryImageURL: categerydata.CategoryImageURL || "",
          sportoder: categerydata.sportoder || "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    findapihiting();
  }, []);

  // Update category
  async function updateapihiting(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/categery/catedeleteapi",
        {
          id: params.categeryId,
          ...Catg,
        }
      );

      console.log(response.data);

      if (response.data.success === true) {
        navigate("/allcategory");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">

      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">

        <h1 className="text-2xl font-bold mb-6">
          Update Category
        </h1>

        <form onSubmit={updateapihiting} className="space-y-4">

          <input
            type="text"
            placeholder="Category Name"
            value={Catg.name}
            onChange={(e) =>
              setCatg({ ...Catg, name: e.target.value })
            }
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            placeholder="Slug"
            value={Catg.Slug}
            onChange={(e) =>
              setCatg({ ...Catg, Slug: e.target.value })
            }
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            placeholder="Parent Category"
            value={Catg.ParentCategory}
            onChange={(e) =>
              setCatg({ ...Catg, ParentCategory: e.target.value })
            }
            className="w-full border p-3 rounded"
          />

          <textarea
            placeholder="Category Description"
            value={Catg.CategoryDescription}
            onChange={(e) =>
              setCatg({
                ...Catg,
                CategoryDescription: e.target.value,
              })
            }
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            placeholder="Category Image URL"
            value={Catg.CategoryImageURL}
            onChange={(e) =>
              setCatg({
                ...Catg,
                CategoryImageURL: e.target.value,
              })
            }
            className="w-full border p-3 rounded"
          />

          <input
            type="number"
            placeholder="Sport Order"
            value={Catg.sportoder}
            onChange={(e) =>
              setCatg({
                ...Catg,
                sportoder: e.target.value,
              })
            }
            className="w-full border p-3 rounded"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
          >
            Update Category
          </button>

        </form>
      </div>
    </div>
  );
}

export default Categoryupdate;

