import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function member() {
let navagate= useNavigate()
const[member ,allmember]=useState({
      name: "",
  email: "",
  fatherName: "",
  className: "",
  phone: "",
  address: "",
  imageurl: "",
})

    async function apicreatemember() {
        let response = await axios.post(  import.meta.env.VITE_backend_base_url +"/member/membercreate",member)
console.log(response)
if(response.data.success===true){
    navagate=("/allmember")
}

    }
return (
  <div className="min-h-screen bg-slate-100 p-6">
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-6">

      <h1 className="text-2xl font-bold text-slate-800 mb-6">
        Create Member
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <input
          type="text"
          placeholder="Name"
          value={member.name}
          onChange={(e) =>
            allmember({ ...member, name: e.target.value })
          }
          className="border rounded-lg p-3"
        />

        <input
          type="email"
          placeholder="Email"
          value={member.email}
          onChange={(e) =>
            allmember({ ...member, email: e.target.value })
          }
          className="border rounded-lg p-3"
        />

        <input
          type="text"
          placeholder="Father Name"
          value={member.fatherName}
          onChange={(e) =>
            allmember({ ...member, fatherName: e.target.value })
          }
          className="border rounded-lg p-3"
        />

        <input
          type="text"
          placeholder="Class Name"
          value={member.className}
          onChange={(e) =>
            allmember({ ...member, className: e.target.value })
          }
          className="border rounded-lg p-3"
        />

        <input
          type="text"
          placeholder="Phone"
          value={member.phone}
          onChange={(e) =>
            allmember({ ...member, phone: e.target.value })
          }
          className="border rounded-lg p-3"
        />

        <input
          type="text"
          placeholder="Address"
          value={member.address}
          onChange={(e) =>
            allmember({ ...member, address: e.target.value })
          }
          className="border rounded-lg p-3"
        />

        <input
          type="text"
          placeholder="Image URL"
          value={member.imageurl}
          onChange={(e) =>
            allmember({ ...member, imageurl: e.target.value })
          }
          className="border rounded-lg p-3 md:col-span-2"
        />

      </div>

      <button
        onClick={apicreatemember}
        className="w-full mt-6 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
      >
        Create Member
      </button>

    </div>
  </div>
)
}

export default member