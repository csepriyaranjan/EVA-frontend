import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Privacy = () => {
  return (
    <div className="min-h-screen px-6 py-12 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white relative">
      <Link to="/">
        <FaArrowLeft className="absolute text-2xl top-10 left-24 text-blue-400 hover:text-blue-300 transition-colors" />
      </Link>
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-blue-400 mb-4">Privacy Policy</h1>
        <p className="text-gray-300">
          EVA respects your privacy. This page outlines how we collect, use, and protect your data.
        </p>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">1. Data Collection</h2>
          <p className="text-gray-400">
            EVA may collect limited voice or text input data solely for processing your requests. No personal identifying information is stored unless explicitly provided by the user.
          </p>

          <h2 className="text-2xl font-semibold text-white">2. Use of Data</h2>
          <p className="text-gray-400">
            We use your input only to enhance your interaction experience. EVA does not sell or share your data with third parties.
          </p>

          <h2 className="text-2xl font-semibold text-white">3. Security</h2>
          <p className="text-gray-400">
            We take reasonable measures to protect data transmissions and prevent unauthorized access.
          </p>

          <h2 className="text-2xl font-semibold text-white">4. Your Consent</h2>
          <p className="text-gray-400">
            By using EVA, you consent to this privacy policy. If you have any concerns, please contact us.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
