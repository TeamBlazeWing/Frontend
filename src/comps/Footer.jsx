import React from 'react';
import {
  FaTwitter,
  FaPinterest,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between space-y-10 md:space-y-0">
        
        {/* Brand Info */}
        <div className="md:w-1/3">
          <h2 className="text-xl font-bold mb-3">SimplyTix</h2>
          <p className="mb-4">
            Connecting communities through meaningful events and volunteer opportunities. 
            Join us in making a difference in your local area.
          </p>
          <div className="flex space-x-4 text-xl">
            <FaTwitter />
            <FaPinterest />
            <FaInstagram />
            <FaLinkedin />
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:w-1/3">
          <h2 className="text-xl font-bold mb-3">Quick Links</h2>
          <ul className="space-y-2">
            <li>About Us</li>
            <li>Events</li>
            <li>Volunteer</li>
            <li>Contact</li>
            <li>Support</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="md:w-1/3">
          <h2 className="text-xl font-bold mb-3">Contact Info</h2>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt /> 123 Event Street, City, State 12345
            </li>
            <li className="flex items-center gap-2">
              <FaPhone /> (555) 123-4567
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope /> info@SimplyTix.com
            </li>
          </ul>
        </div>
      </div>

      <hr className="my-8 border-gray-700" />

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between text-sm text-gray-400">
        <p>© 2024 SimplyTix. All rights reserved.</p>
        <div className="flex space-x-4">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
