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

      {/* Desktop layout (hidden on mobile) */}
      <div className="hidden md:flex flex-row justify-center items-center flex-wrap">
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

      {/* Mobile layout (visible only on screens smaller than 768px) */}
      <div className="md:hidden flex flex-col items-center justify-center px-4 py-4">
        {current ? (
          <>
            <div className="w-full max-w-2xl mx-auto">
              <img
                src={current.image_urls[0] || food_holder}
                alt={current.title}
                className="w-full h-auto max-h-[70vh] object-cover border-4 border-black rounded-2xl"
              />
              <div className="mt-4 text-center">
                <p className="font-bold text-2xl">{current.title}</p>
                <p className="font-bold text-xl">#{current.price}</p>
                <Link
                  to={`/listings/${current.id}`}
                  className="text-blue-500 hover:underline inline-block mt-2"
                >
                  see more...
                </Link>
              </div>
            </div>

            <div className="flex flex-row justify-center gap-8 mt-8 w-full max-w-md">
              <SwipingButton direction="left" onClick={() => handleSwipe("left")} />
              <SwipingButton direction="right" onClick={() => handleSwipe("right")} />
            </div>
          </>
        ) : (
          <div className="w-full max-w-md mx-auto mt-8 text-center font-bold text-2xl border-4 border-black rounded-2xl p-10">
            <p>No more listings! 🍽️</p>
            <p className="text-gray-500 text-lg mt-2">Check back later</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Homepage;