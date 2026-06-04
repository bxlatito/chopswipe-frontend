import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaCartPlus, FaUser } from "react-icons/fa";
import food_holder from "../assets/food_holder.jpg";
import Display from "../components/Display";
import Navbar from "../components/Navbar";
import api from "../api/axios";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await api.get("/swipes/cart");
        setCartItems(res.data);
      } catch (err) {
        console.log("Failed to fetch cart", err);
      }
    };
    fetchCart();
  }, []);

  const handleRemove = async (listing_id) => {
    try {
      await api.delete(`/swipes/cart/${listing_id}`);
      setCartItems((prev) =>
        prev.filter((item) => item.listing.id !== listing_id)
      );
    } catch (err) {
      alert("Failed to remove item");
    }
  };

  return (
    <>
      <Navbar />
      <Display text="My Cart" />

      {cartItems.length === 0 && (
        <p className="text-center text-gray-500 mt-10 px-4">
          You haven't saved anything yet. Go swipe some food! 🍽️
        </p>
      )}

      {/* Mobile: 1 column, Laptop: 3 columns */}
      <div className="w-full md:w-4/6 mx-auto mt-8 px-4 md:px-0 grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {cartItems.map((item) => (
          <div
            key={item.cart_item_id}
            className="border-2 border-black rounded-2xl overflow-hidden w-full"
          >
            <div className="relative">
              <img
                src={item.listing.image_urls[0] || food_holder}
                alt={item.listing.title}
                className="w-full h-64 md:h-48 object-cover"
              />
              <div
                className="absolute bottom-3 right-3 text-white font-bold text-lg md:text-base"
                style={{ textShadow: "1px 1px 3px black" }}
              >
                <p>{item.listing.title}</p>
                <p>#{item.listing.price}</p>
              </div>
            </div>

            <div className="p-4 flex justify-center items-center">
              <div className="flex gap-3 w-full justify-center">
                <Link
                  to={`/listings/${item.listing.id}`}
                  className="text-sm font-bold border-2 border-black px-4 py-2 rounded-xl hover:bg-black hover:text-white transition text-center"
                >
                  See More
                </Link>
                <button
                  onClick={() => handleRemove(item.listing.id)}
                  className="text-sm font-bold border-2 border-red-500 text-red-500 px-4 py-2 rounded-xl hover:bg-red-500 hover:text-white transition text-center"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Cart;