import { useState, useEffect } from "react";
import { FaHome, FaCartPlus, FaUser } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Display from "../components/Display";
import api from "../api/axios";

function EditListing() {
  const { id } = useParams();
  const navigate = useNavigate();
  const inputStyle = "border-2 border-black mt-5 w-full p-2 rounded-xl";

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    is_negotiable: true,
    hashtags: "",
    image_urls: [],
    availability: "available",
  });

  const [preview, setPreview] = useState(null);

  // Load existing listing data into the form
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await api.get(`/listings/${id}`);
        const l = res.data;
        setFormData({
          title: l.title,
          description: l.description,
          price: l.price,
          is_negotiable: l.is_negotiable,
          hashtags: l.hashtags.join(", "), // array → comma string for the input
          image_urls: l.image_urls,
          availability: l.availability,
        });
        if (l.image_urls[0]) setPreview(l.image_urls[0]);
      } catch (err) {
        console.log("Failed to fetch listing", err);
      }
    };
    fetchListing();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setFormData((prev) => ({ ...prev, image_urls: [reader.result] }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        hashtags: formData.hashtags
          ? formData.hashtags.split(",").map((h) => h.trim())
          : [],
      };
      await api.put(`/listings/${id}`, payload);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to update listing");
    }
  };

  return (
    <>
      <Navbar />
      <Display text="Edit Listing" />

      <div className="w-3/6 mx-auto mt-6 border-2 border-black rounded-2xl p-6 mb-10">
        <form onSubmit={handleSubmit}>

          <input
            className={inputStyle}
            type="text"
            name="title"
            placeholder="Food Title"
            value={formData.title}
            onChange={handleChange}
          />

          <textarea
            className={`${inputStyle} h-32 resize-none`}
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />

          <input
            className={inputStyle}
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
          />

          <input
            className={inputStyle}
            type="text"
            name="hashtags"
            placeholder="Hashtags (comma separated)"
            value={formData.hashtags}
            onChange={handleChange}
          />

          <div className="mt-5">
            <label className="font-bold block mb-2">Food Image</label>
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-xl border-2 border-black mb-3"
              />
            )}
            <label className="w-full border-2 border-dashed border-black rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition">
              <span className="font-bold text-gray-600">
                {preview ? "Change Image" : "Click to Change Image"}
              </span>
              <span className="text-sm text-gray-400 mt-1">JPG, PNG supported</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          <div className="flex items-center gap-3 mt-5">
            <input
              type="checkbox"
              name="is_negotiable"
              id="is_negotiable"
              checked={formData.is_negotiable}
              onChange={handleChange}
              className="w-5 h-5 cursor-pointer"
            />
            <label htmlFor="is_negotiable" className="font-bold cursor-pointer">
              Price is Negotiable
            </label>
          </div>

          <select
            className={inputStyle}
            name="availability"
            value={formData.availability}
            onChange={handleChange}
          >
            <option value="available">Available</option>
            <option value="sold_out">Sold Out</option>
          </select>

          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              className="flex-1 bg-black text-white py-2 rounded-xl font-bold hover:bg-gray-800 transition"
            >
              Save Changes
            </button>
            <Link
              to="/dashboard"
              className="flex-1 border-2 border-black text-center py-2 rounded-xl font-bold hover:bg-black hover:text-white transition"
            >
              Cancel
            </Link>
          </div>

        </form>
      </div>
    </>
  );
}

export default EditListing;