import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AllMember() {
  const [allmember, setallmember] = useState([]);

  const navigate = useNavigate();

  // FIND ALL MEMBERS
  async function findapihiting() {
    try {
      const response = await axios.post(
        import.meta.env.VITE_backend_base_url + "/member/findapi"
      );

      console.log(response.data);

      if (response.data.success === true) {
        setallmember(response.data.data);
      }
    } catch (error) {
      console.log("Find member error:", error);
    }
  }

  // DELETE MEMBER
  async function deleteMember(id) {
    try {
      const response = await axios.post(
        import.meta.env.VITE_backend_base_url + "/member/memberdelete",
        {
          id: id,
        }
      );

      console.log(response.data);

      if (response.data.success === true) {
        findapihiting();
      }
    } catch (error) {
      console.log("Delete member error:", error);
    }
  }

  useEffect(() => {
    findapihiting();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800">
          All Members
        </h1>

        <button
          onClick={() => navigate("/member")}
          className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
        >
          + Create Member
        </button>
      </div>

      {/* MEMBERS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {allmember.map((member) => (
          <div
            key={member._id}
            className="bg-white rounded-xl shadow p-5"
          >

            {/* IMAGE */}
            {member.imageurl && (
              <img
                src={member.imageurl}
                alt={member.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
            )}

            <h2 className="text-xl font-bold text-slate-800">
              {member.name}
            </h2>

            <p className="mt-2">
              <b>Email:</b> {member.email}
            </p>

            <p>
              <b>Father Name:</b> {member.fatherName}
            </p>

            <p>
              <b>Class:</b> {member.className}
            </p>

            <p>
              <b>Phone:</b> {member.phone}
            </p>

            <p>
              <b>Address:</b> {member.address}
            </p>

            {/* BUTTONS */}
            <div className="flex gap-3 mt-5">

              <button
                onClick={() => navigate(`/memberupdate/${member._id}`)}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              >
                Update
              </button>

              <button
                onClick={() => deleteMember(member._id)}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

export default AllMember;