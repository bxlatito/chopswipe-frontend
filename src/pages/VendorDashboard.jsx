import { useState, useEffect } from "react";
import { FaHome, FaCartPlus, FaUser, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import food_holder from "../assets/food_holder.jpg";
import Navbar from "../components/Navbar";
import Display from "../components/Display";
import api from "../api/axios";

function VendorDashboard() {
  const [myListings, setMyListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await api.get("/listings/");
        const user_id = parseInt(localStorage.getItem("user_id"));
        setMyListings(res.data.filter((l) => l.seller_id === user_id));
      } catch (err) {
        console.log("Failed to fetch listings", err);
      }
    };
    fetchListings();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;
    try {
      await api.delete(`/listings/${id}`);
      setMyListings((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      alert("Failed to delete listing");
    }
  };

  return (
    <>
      <Navbar />
      <Display text="My Dashboard" />

      <div className="w-full md:w-4/6 mx-auto mt-6 px-4 md:px-0 flex justify-end">
        <Link
          to="/dashboard/create"
          className="flex items-center gap-2 bg-black text-white px-5 py-2 rounded-xl font-bold hover:bg-gray-800 transition text-sm md:text-base"
        >
          <FaPlus /> Add New Listing
        </Link>
      </div>

      {myListings.length === 0 && (
        <p className="text-center text-gray-500 mt-10 px-4">
          You have no listings yet. Add one! 🍽️
        </p>
      )}

      {/* Mobile: 1 column, Laptop: 3 columns */}
      <div className="w-full md:w-4/6 mx-auto mt-6 px-4 md:px-0 grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {myListings.map((item) => (
          <div
            key={item.id}
            className="border-2 border-black rounded-2xl overflow-hidden w-full"
          >
            <div className="relative">
              <img
                src={item.image_urls[0] || food_holder}
                alt={item.title}
                className="w-full h-64 md:h-48 object-cover"
              />
              <span
                className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full ${
                  item.availability === "available"
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {item.availability === "available" ? "Available" : "Sold Out"}
              </span>
              <div
                className="absolute bottom-3 right-3 text-white font-bold text-lg md:text-base"
                style={{ textShadow: "1px 1px 3px black" }}
              >
                <p className="text-sm md:text-base">{item.title}</p>
                <p className="text-sm md:text-base">#{item.price}</p>
              </div>
            </div>

            <div className="p-4 flex justify-center items-center">
              <div className="flex gap-3 w-full justify-center">
                <Link
                  to={`/dashboard/edit/${item.id}`}
                  className="text-sm font-bold border-2 border-black px-4 py-2 rounded-xl hover:bg-black hover:text-white transition flex items-center gap-2"
                >
                  <FaEdit className="text-sm md:text-base" /> Edit
                </Link>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-sm font-bold border-2 border-red-500 text-red-500 px-4 py-2 rounded-xl hover:bg-red-500 hover:text-white transition flex items-center gap-2"
                >
                  <FaTrash className="text-sm md:text-base" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default VendorDashboard;