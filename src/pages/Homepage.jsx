import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import food_holder from "../assets/food_holder.jpg";
import SwipingButton from "../components/SwipingButton";
import api from "../api/axios";

function Homepage() {
  const [listings, setListings] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await api.get("/listings/");
        setListings(res.data);
      } catch (err) {
        console.log("Failed to fetch listings", err);
      }
    };
    fetchListings();
  }, []);

  const current = listings[currentIndex];

  const handleSwipe = async (direction) => {
    if (!current) return;
    try {
      await api.post("/swipes/", {
        listing_id: current.id,
        direction: direction,
      });
    } catch (err) {
      console.log("Swipe failed", err);
    }
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <>
      <Navbar />

      <div className="flex flex-row justify-center items-center flex-wrap">
        <div className="ml-40">
          <SwipingButton direction="left" onClick={() => handleSwipe("left")} />
        </div>

        {current ? (
          <div className="w-2/6 mx-auto mt-8 relative">
            <img
              src={current.image_urls[0] || food_holder}
              alt={current.title}
              className="w-full h-100 object-cover border-4 border-black rounded-2xl"
            />
            <div
              className="font-bold absolute bottom-5 right-5 text-white text-3xl text-center"
              style={{ textShadow: "1px 1px 3px black" }}
            >
              <p>{current.title}</p>
              <p>#{current.price}</p>
              <Link
                to={`/listings/${current.id}`}
                className="text-blue-500 hover:underline"
              >
                see more...
              </Link>
            </div>
          </div>
        ) : (
          <div className="w-2/6 mx-auto mt-8 text-center font-bold text-2xl border-4 border-black rounded-2xl p-10">
            <p>No more listings! 🍽️</p>
            <p className="text-gray-500 text-lg mt-2">Check back later</p>
          </div>
        )}

        <div className="mr-40">
          <SwipingButton direction="right" onClick={() => handleSwipe("right")} />
        </div>
      </div>
    </>
  );
}

export default Homepage;