import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
        <Link to="/">
        <FaArrowLeft className="absolute text-2xl top-10 left-24 text-blue-400 hover:text-blue-300 transition-colors" />
        </Link>
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-4xl font-bold text-blue-400">EVA AI Assistant</h1>
        <p className="text-lg text-gray-300">
          EVA is your intelligent voice-powered assistant designed to make your
          web experience seamless. Speak naturally — EVA listens, understands,
          and responds with precision.
        </p>
        <p className="text-base text-gray-400">
          Built with <span className="text-blue-300 font-medium">React</span>,
          <span className="text-blue-300 font-medium"> Tailwind CSS</span>, and
          <span className="text-blue-300 font-medium"> Python (FastAPI)</span>,
          EVA handles voice input, speech recognition, and backend AI
          integration.
        </p>
        <p className="text-sm text-gray-500">
          Activate the mic, ask anything, and let EVA assist you — from fetching
          facts to opening websites and more.
        </p>
      </div>
    </div>
  );
};

export default About;
