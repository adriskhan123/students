import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [data, setData] = useState({
    name: "",
    fatherName: "",
    email: "",
    phone: "",
    age: "",
    address: "",
    city: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  async function handleRegister(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        import.meta.env.VITE_backend_base_url + "/user/userdata",
        data,
        {
          withCredentials: true,
        }
      );

      console.log(response.data);

      if (response.data.success === true) {
        navigate("/Projectcreate");
      }
    } catch (error) {
      console.log("Register error:", error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center mb-6">
          Register
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={data.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />

            <input
              type="text"
              name="fatherName"
              placeholder="Father Name"
              value={data.fatherName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={data.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={data.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={data.age}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={data.city}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <select
            name="role"
            value={data.role}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={data.address}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded font-semibold hover:bg-blue-700"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 underline font-medium"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;