// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from "react";
import voiceGif from "./assets/voice.gif";
import { Link } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;
import {
  FaTwitter,
  FaGithub,
  FaLinkedin,
  FaMicrophone,
  FaSun,
  FaMoon,
  FaBars,
} from "react-icons/fa";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [history, setHistory] = useState([]); // 🟦 FIX: Moved history state up for better organization.

  const recognitionRef = React.useRef(null);
  const transcriptBuffer = React.useRef("");
  const silenceTimeout = React.useRef(null);
  const synth = window.speechSynthesis;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported.");
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = false; // Set to false to get final results
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.onresult = (event) => {
      clearTimeout(silenceTimeout.current);

      const resultIndex = event.resultIndex;
      const transcript = event.results[resultIndex][0].transcript.trim();

      if (transcript) {
        // 🟦 FIX: Use '=' instead of '+=' to prevent concatenating old commands.
        // This sets the buffer to the latest full transcript from the current session.
        transcriptBuffer.current = transcript;
      }

      // After a pause, send the complete command from the buffer.
      silenceTimeout.current = setTimeout(() => {
        if (transcriptBuffer.current.trim()) {
          sendMessage(transcriptBuffer.current.trim());
          transcriptBuffer.current = ""; // Clear buffer after sending
        }
      }, 1500);
    };

    recognitionRef.current.onend = () => {
      // Only restart recognition if we are intentionally listening
      if (isListening) {
        recognitionRef.current.start();
      }
    };
  }, [isListening]); // Dependency array is correct

  // Toggle Mic
  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      // Clear any pending commands when manually stopping
      transcriptBuffer.current = "";
      clearTimeout(silenceTimeout.current);
    } else {
      // Clear history buffer before starting a new session
      transcriptBuffer.current = "";
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // 🟦 FIX: Renamed from handleVoiceCommand to a generic 'sendMessage'.
  // This is now the single function to handle both voice and text submissions.
  const sendMessage = async (text) => {
    if (!text) return;

    console.log("Sending to backend:", text);

    // Add user's message to history
    setHistory((prev) => [...prev, { sender: "user", text }]);
    // Set input text for display (useful for voice commands)
    setInputText(text);

    try {
      const res = await fetch({apiUrl}, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      const responseText = data.response || "Sorry, I did not understand.";

      // Add AI's message to history
      setHistory((prev) => [...prev, { sender: "ai", text: responseText }]);

      speak(responseText); // Speak out AI response
    } catch (err) {
      console.error("Backend error:", err);
      const errorMsg = "There was a connection error.";
      speak(errorMsg);

      // Add error message to history
      setHistory((prev) => [...prev, { sender: "ai", text: errorMsg }]);
    } finally {
      // Clear the input field after processing, regardless of success or failure
      setInputText("");
    }
  };

  const speak = (text) => {
    // Stop any currently speaking utterance before starting a new one
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    synth.speak(utterance);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // 🟦 FIX: This function now correctly handles the text input submission.
  // It calls the unified 'sendMessage' function.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim() === "") return;
    sendMessage(inputText);
  };

  // 🟦 FIX: The faulty 'useEffect' and 'trigger' state have been removed completely.
  // The logic is now handled directly within handleSubmit and sendMessage.

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
      style={{ minHeight: "1024px" }}
    >
      {/* Header */}
      <header
        className={`w-full px-6 py-4 shadow-sm border-b transition-colors duration-300 ${
          isDarkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold tracking-tight">EVA</h1>
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Home
            </Link>
            <Link
              to="/features"
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Features
            </Link>
            <Link
              to="/about"
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Contact
            </Link>
          </nav>
          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Dark/Light Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors cursor-pointer !rounded-button whitespace-nowrap ${
                isDarkMode
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className={`md:hidden p-2 rounded-full transition-colors cursor-pointer !rounded-button whitespace-nowrap ${
                isDarkMode
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <FaBars className="text-lg" />
            </button>
          </div>
        </div>
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div
            className={`md:hidden mt-4 pb-4 border-t transition-colors duration-300 ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <nav className="flex flex-col space-y-3 mt-4">
              <Link
                to="/"
                className="hover:text-blue-600 transition-colors cursor-pointer"
              >
                Home
              </Link>
              <Link
                to="/features"
                className="hover:text-blue-600 transition-colors cursor-pointer"
              >
                Features
              </Link>
              <Link
                to="/about"
                className="hover:text-blue-600 transition-colors cursor-pointer"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="hover:text-blue-600 transition-colors cursor-pointer"
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </header>
      {/* Main Content */}
      <main className="flex-1 px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Meet EVA, Your AI Voice Assistant
            </h2>
            <p
              className={`text-xl mb-8 max-w-2xl mx-auto leading-relaxed ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Experience the future of AI interaction with natural voice
              commands and intelligent responses
            </p>
          </div>

          {/* Avatar & Mic Animation */}
          <div className="flex justify-center mb-12">
            <div className="relative">
              <div
                className={`w-80 h-80 md:w-96 md:h-96 relative ${
                  isDarkMode ? "text-gray-300" : "text-gray-800"
                }`}
              >
                <div className="w-80 h-80 md:w-96 md:h-96 relative rounded-full overflow-hidden">
                  {/* 🎬 Background GIF (Always visible) */}
                  <img
                    src={voiceGif}
                    alt="Voice Circle"
                    className="w-full h-full object-cover"
                  />
                  {isListening && (
                    <div className="absolute inset-0 rounded-full">
                      {/* 🎬 Animated Ping Effect */}
                      <div
                        className={`absolute inset-8 rounded-full animate-ping transition-colors duration-300 ${
                          isDarkMode ? "bg-blue-400/30" : "bg-blue-300/30"
                        }`}
                      ></div>
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={toggleListening}
                      className={`w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl transition-colors duration-300 focus:outline-none ${
                        isListening ? "bg-red-600" : "bg-gray-500"
                      }`}
                    >
                      <FaMicrophone className="text-3xl" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Input Field and Submit */}
          <div className="max-w-2xl mx-auto">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <div className="flex-1">
                <input
                  type="text"
                  value={inputText}
                  onChange={handleInputChange}
                  placeholder="Type your message or use voice command..."
                  className={`w-full px-6 py-4 rounded-lg border-2 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                      : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                />
              </div>
              <button
                type="submit"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300 cursor-pointer !rounded-button whitespace-nowrap"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* History */}

      <div
        className={`w-full flex justify-center mt-6 transition-colors duration-300 ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        <div
          className={`w-full max-w-xl rounded-xl p-4 shadow-lg border ${
            isDarkMode
              ? "bg-gray-800 border-gray-700 text-white"
              : "bg-white border-gray-200 text-gray-900"
          }`}
        >
          <h2
            className={`text-sm font-semibold mb-3 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Chat History
          </h2>

          <div className="flex flex-col gap-2 max-h-96 overflow-y-auto pr-1">
            {history.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm break-words ${
                  msg.sender === "user"
                    ? "self-end bg-blue-600 text-white rounded-br-none"
                    : isDarkMode
                    ? "self-start bg-gray-700 text-white rounded-bl-none"
                    : "self-start bg-gray-200 text-black rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="pt-3 text-right">
            <button
              onClick={() => setHistory([])}
              className={`text-xs hover:opacity-80 transition ${
                isDarkMode ? "text-red-400" : "text-red-600"
              }`}
            >
              Clear History
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        className={`w-full px-6 py-8 border-t mt-16 transition-colors duration-300 ${
          isDarkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-gray-50 border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div
              className={`text-sm transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              © 2025 EVA AI Assistant. All rights reserved.
            </div>
            {/* Footer Links */}
            <div className="flex items-center space-x-6">
              <Link
                to="/about"
                className={`text-sm hover:text-blue-600 transition-colors cursor-pointer ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                About
              </Link>
              <Link
                to="/privacy"
                className={`text-sm hover:text-blue-600 transition-colors cursor-pointer ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Privacy
              </Link>
              <Link
                to="/terms"
                className={`text-sm hover:text-blue-600 transition-colors cursor-pointer ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Terms
              </Link>
            </div>
            {/* Social Icons */}
            <div className="flex items-center space-x-4">
              <a
                href="https://twitter.com/csepriyaranjan"
                className={`p-2 rounded-full transition-colors cursor-pointer ${
                  isDarkMode
                    ? "text-gray-400 hover:text-white hover:bg-gray-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                }`}
              >
                <FaTwitter className="text-lg" />
              </a>
              <a
                href="https://github.com/csepriyaranjan"
                className={`p-2 rounded-full transition-colors cursor-pointer ${
                  isDarkMode
                    ? "text-gray-400 hover:text-white hover:bg-gray-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                }`}
              >
                <FaGithub className="text-lg" />
              </a>
              <a
                href="https://linkedin.com/in/csepriyaranjan"
                className={`p-2 rounded-full transition-colors cursor-pointer ${
                  isDarkMode
                    ? "text-gray-400 hover:text-white hover:bg-gray-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                }`}
              >
                <FaLinkedin className="text-lg" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default App;
