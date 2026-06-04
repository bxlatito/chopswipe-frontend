import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import food_holder from "../assets/food_holder.jpg";
import Display from "../components/Display";
import api from "../api/axios";

function ListingDetail() {
  const { id } = useParams(); // grabs the :id from the URL
  const [listing, setListing] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await api.get(`/listings/${id}`);
        setListing(res.data);
      } catch (err) {
        console.log("Failed to fetch listing", err);
      }
    };
    fetchListing();
  }, [id]);

  if (!listing) {
    return <p className="text-center mt-10 font-bold">Loading...</p>;
  }

  return (
    <>
      <Display text="Listing Detail" />

      <div className="w-3/6 mx-auto mt-8 border-2 border-black rounded-2xl overflow-hidden mb-10">
        <img
          src={listing.image_urls[0] || food_holder}
          alt={listing.title}
          className="w-full h-80 object-cover"
        />

        <div className="p-5 flex flex-col gap-3">

          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">{listing.title}</h1>
            <span className="text-2xl font-bold text-green-600">#{listing.price}</span>
          </div>

          {listing.is_negotiable && (
            <div className="flex gap-2">
              <span className="border-2 border-green-600 text-green-600 rounded-full px-3 py-1 text-sm font-bold">
                Negotiable
              </span>
            </div>
          )}

          <p className="text-gray-600 text-sm leading-relaxed">
            {listing.description}
          </p>

          {/* Vendor Info */}
          <div className="border-t-2 border-black pt-4 mt-2 flex flex-col gap-2">
            <h2 className="font-bold text-lg">Vendor Info</h2>
            <p><span className="font-bold">Name:</span> {listing.vendor.full_name}</p>
            <p>
              <span className="font-bold">Phone:</span>{" "}
              {listing.vendor.phone_number || "Not provided"}
            </p>
            <p>
              <span className="font-bold">Location:</span>{" "}
              {listing.vendor.location || "Not provided"}
            </p>
          </div>

          <Link
            to="/"
            className="mt-4 border-2 border-black text-center py-2 rounded-xl font-bold hover:bg-black hover:text-white transition"
          >
            ← Back to Feed
          </Link>

        </div>
      </div>
    </>
  );
}

export default ListingDetail;