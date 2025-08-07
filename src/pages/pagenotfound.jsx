import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const PageNotFound = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-blue-400 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-300 mb-2">Page Not Found</h2>
      <p className="text-gray-400 mb-6">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link to="/" className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
        <FaArrowLeft className="mr-2" />
        Go back to Home
      </Link>
    </div>
  );
};

export default PageNotFound;
