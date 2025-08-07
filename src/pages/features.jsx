import React from "react";
import { FaMicrophone, FaRobot, FaGlobe, FaReply } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const Feature = () => {
  const features = [
    {
      icon: <FaMicrophone className="text-3xl text-blue-400" />,
      title: "Voice Recognition",
      description: "Talk to EVA naturally — she listens and responds in real time.",
    },
    {
      icon: <FaRobot className="text-3xl text-blue-400" />,
      title: "AI-Powered Intelligence",
      description:
        "Leverages powerful AI to understand your queries and give precise answers.",
    },
    {
      icon: <FaGlobe className="text-3xl text-blue-400" />,
      title: "Web Integration",
      description:
        "Can open websites, fetch information, and perform online tasks with voice commands.",
    },
    {
      icon: <FaReply className="text-3xl text-blue-400" />,
      title: "Instant Response",
      description: "EVA responds quickly and accurately — like a real assistant.",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white relative">
      <Link to="/">
        <FaArrowLeft className="absolute text-2xl top-10 left-24 text-blue-400 hover:text-blue-300 transition-colors" />
      </Link>

      <div className="max-w-4xl w-full text-center space-y-10">
        <h1 className="text-4xl font-bold text-blue-400">EVA Features</h1>
        <p className="text-gray-300 text-lg">
          Explore what makes EVA your next-gen intelligent voice assistant.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-blue-300">
                {feature.title}
              </h3>
              <p className="text-gray-400 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feature;
