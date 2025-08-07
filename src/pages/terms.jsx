import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Terms = () => {
  return (
    <div className="min-h-screen px-6 py-12 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white relative">
      <Link to="/">
        <FaArrowLeft className="absolute text-2xl top-10 left-24 text-blue-400 hover:text-blue-300 transition-colors" />
      </Link>
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-blue-400 mb-4">Terms & Conditions</h1>
        <p className="text-gray-300">
          Please read these terms and conditions carefully before using EVA AI Assistant.
        </p>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">1. Use of Service</h2>
          <p className="text-gray-400">
            EVA AI is provided as-is for personal or educational use. By using EVA, you agree not to misuse or exploit the assistant for harmful or illegal purposes.
          </p>

          <h2 className="text-2xl font-semibold text-white">2. Intellectual Property</h2>
          <p className="text-gray-400">
            All branding, content, and code related to EVA belong to their respective creators. You may not copy or redistribute the content without permission.
          </p>

          <h2 className="text-2xl font-semibold text-white">3. Limitations</h2>
          <p className="text-gray-400">
            We do not guarantee 100% accuracy of responses. EVA is an AI assistant and should not be relied on for critical decisions.
          </p>

          <h2 className="text-2xl font-semibold text-white">4. Changes</h2>
          <p className="text-gray-400">
            We reserve the right to update these terms at any time. Continued use of the assistant means you accept any future changes.
          </p>

          <h2 className="text-2xl font-semibold text-white">5. Contact</h2>
          <p className="text-gray-400">
            For questions regarding these terms, please reach out via the Contact page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
