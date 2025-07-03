import React from 'react';
import { FaUser, FaCommentDots } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="bg-black text-white px-6 py-4 shadow-md">
      <div className="flex items-center justify-between px-4 py-4 md:px-6">
        
        {/* Left: Logo */}
        <div className="flex items-center space-x-3 mr-10">
            <img src="/simplytix.svg" alt="SimplyTix Logo" className="w-12 h-12 rounded-full bg-gray-800" />
            <h1 className="text-white text-xl sm:text-2xl font-bold">
              SimplyTix
            </h1>
        </div>

        {/* Center: Navigation Links */}
        <ul className="hidden md:flex space-x-6 text-md font-semibold">
          <li className="hover:text-gray-300 cursor-pointer">Home</li>
          <li className="hover:text-gray-300 cursor-pointer">Events</li>
          <li className="hover:text-gray-300 cursor-pointer">BuyTicket</li>
          <li className="hover:text-gray-300 cursor-pointer">About</li>
          <li className="hover:text-gray-300 cursor-pointer">Contact</li>
        </ul>

        {/* Right: Icons */}
        <div className="flex items-center space-x-4 text-xl">
          <FaUser className="cursor-pointer hover:text-gray-300" />
          <FaCommentDots className="cursor-pointer hover:text-gray-300" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
