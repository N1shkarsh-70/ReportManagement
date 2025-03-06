import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { FiSettings, FiBell, FiUser, FiLogOut } from "react-icons/fi";

function Header() {
  const dispatch = useDispatch();
  const logo= "/logo2.png"

  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white flex justify-between items-center px-6 py-3 shadow-md">
      {/* Logo */}
      <img src={logo} alt="Logo"  className="h-20 w-auto " /> {/* Logo Image */}
      {/* <h2 className="text-2xl font-bold tracking-wide">{logo}</h2> */}

      {/* Menu */}
      <nav className="flex items-center space-x-6">
        <button className="flex items-center gap-2 hover:text-yellow-400 transition duration-300">
          <FiSettings size={20} />
          <span className="hidden md:inline">Settings</span>
        </button>

        <button className="flex items-center gap-2 hover:text-yellow-400 transition duration-300">
          <FiBell size={20} />
          <span className="hidden md:inline">Notifications</span>
        </button>

        <button className="flex items-center gap-2 hover:text-yellow-400 transition duration-300">
          <FiUser size={20} />
          <span className="hidden md:inline">Account</span>
        </button>

        {/* Logout Button */}
        <button
          onClick={() => dispatch(logout())}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg shadow-lg transition-all duration-300"
        >
          <FiLogOut size={20} />
          <span className="hidden md:inline">Logout</span>
        </button>
      </nav>
    </header>
  );
}

export default Header;
