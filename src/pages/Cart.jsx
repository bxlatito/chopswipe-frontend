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
      // Remove from local state so UI updates instantly without refetching
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
        <p className="text-center text-gray-500 mt-10">
          You haven't saved anything yet. Go swipe some food! 🍽️
        </p>
      )}

      <div className="w-4/6 mx-auto mt-8 grid grid-cols-3 gap-6">
        {cartItems.map((item) => (
          <div
            key={item.cart_item_id}
            className="border-2 border-black rounded-2xl overflow-hidden"
          >
            <div className="relative">
              <img
                src={item.listing.image_urls[0] || food_holder}
                alt={item.listing.title}
                className="w-full h-48 object-cover"
              />
              <div
                className="absolute bottom-3 right-3 text-white font-bold text-lg"
                style={{ textShadow: "1px 1px 3px black" }}
              >
                <p>{item.listing.title}</p>
                <p>#{item.listing.price}</p>
              </div>
            </div>

            <div className="p-3 flex justify-center items-center">
              <div className="flex gap-2">
                <Link
                  to={`/listings/${item.listing.id}`}
                  className="text-sm font-bold border-2 border-black px-3 py-1 rounded-xl hover:bg-black hover:text-white transition"
                >
                  See More
                </Link>
                <button
                  onClick={() => handleRemove(item.listing.id)}
                  className="text-sm font-bold border-2 border-red-500 text-red-500 px-3 py-1 rounded-xl hover:bg-red-500 hover:text-white transition"
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