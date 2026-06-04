import { useState, useEffect } from "react";
import { FaHome, FaCartPlus, FaUser } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Display from "../components/Display";
import api from "../api/axios";

function Profile() {
  const inputStyle = "border-2 border-black mt-5 w-full p-2 rounded-xl";

  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    location: "",
  });

  // Load current user data into the form on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/users/me");
        setFormData({
          full_name: res.data.full_name || "",
          phone_number: res.data.phone_number || "",
          location: res.data.location || "",
        });
      } catch (err) {
        console.log("Failed to fetch profile", err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put("/users/me", formData);
      alert("Profile updated!");
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to update profile");
    }
  };

  return (
    <>
      <Navbar />

      <Display text="My Profile" />

      <div className="w-3/6 mx-auto mt-6 border-2 border-black rounded-2xl p-6 mb-10">

        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full border-4 border-black bg-gray-200 flex items-center justify-center">
            <FaUser className="text-4xl text-gray-500" />
          </div>
          <p className="font-bold text-xl mt-3">{formData.full_name}</p>
        </div>

        <form onSubmit={handleSubmit}>

          <label className="font-bold block mt-4">Full Name</label>
          <input
            className={inputStyle}
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
          />

          <label className="font-bold block mt-5">Phone Number</label>
          <input
            className={inputStyle}
            type="text"
            name="phone_number"
            placeholder="e.g. 08012345678"
            value={formData.phone_number}
            onChange={handleChange}
          />

          <label className="font-bold block mt-5">Location</label>
          <input
            className={inputStyle}
            type="text"
            name="location"
            placeholder="e.g. Block C Canteen, UNILAG"
            value={formData.location}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-xl font-bold hover:bg-gray-800 transition mt-6"
          >
            Save Changes
          </button>

        </form>
      </div>
    </>
  );
}

export default Profile;