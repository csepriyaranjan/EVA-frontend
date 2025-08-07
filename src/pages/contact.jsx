import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white relative">
      <Link to="/">
        <FaArrowLeft className="absolute text-2xl top-10 left-24 text-blue-400 hover:text-blue-300 transition-colors" />
      </Link>
      <div className="max-w-2xl w-full space-y-8 text-center">
        <h1 className="text-4xl font-bold text-blue-400">Contact EVA Team</h1>
        <p className="text-gray-300 text-lg">
          Got questions or feedback? Reach out to the EVA AI team!
        </p>
        <form className="space-y-4 text-left">
          <div>
            <label className="block text-sm text-gray-400">Your Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400">Message</label>
            <textarea
              rows="5"
              placeholder="Write your message"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors py-2 rounded-lg text-white font-semibold"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
