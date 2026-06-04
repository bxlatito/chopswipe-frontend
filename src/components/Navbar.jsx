import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaCartPlus, FaUser, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";

function Navbar({ links = [] }) {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user_id");
    navigate("/login");
  };

  // Vendor and student get different nav links automatically
  const defaultLinks = role === "vendor"
    ? [
        { icon: FaTachometerAlt, path: "/dashboard" },
        { icon: FaUser, path: "/profile" },
      ]
    : [
        { icon: FaHome, path: "/" },
        { icon: FaCartPlus, path: "/cart" },
        { icon: FaUser, path: "/profile" },
      ];

  // Use passed links if provided, otherwise use role-based defaults
  const navLinks = links.length > 0 ? links : defaultLinks;

  return (
    <div className='border-2 border-black flex justify-center items-center gap-10 w-2/6 mt-7 mx-auto p-3 rounded-2xl bg-white text-black font-bold flex-wrap min-w-fit'>
      {navLinks.map((link, index) => {
        const Icon = link.icon;
        return (
          <Link key={index} to={link.path}>
            <div className='p-2 text-center border-2 border-black rounded-full hover:bg-red-400 transition-colors duration-300'>
              <Icon size={30} />
            </div>
          </Link>
        );
      })}

      <button onClick={handleLogout}>
        <div className='p-2 text-center border-2 border-red-500 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-colors duration-300'>
          <FaSignOutAlt size={30} />
        </div>
      </button>
    </div>
  );
}

export default Navbar;