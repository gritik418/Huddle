"use client";
import { useState } from "react";

const PulseInput = () => {
  const [pulseText, setPulseText] = useState("");

  const handlePulseChange = (e: any) => {
    setPulseText(e.target.value);
  };

  const handlePulseSubmit = () => {
    if (pulseText.trim()) {
      // Logic to send pulse to backend
      console.log("Pulse Sent: ", pulseText);
      setPulseText(""); // Reset input after submit
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <textarea
        className="w-full p-2 border border-gray-300 rounded-lg resize-none"
        placeholder="What's on your mind?"
        value={pulseText}
        onChange={handlePulseChange}
        rows={4}
      ></textarea>
      <button
        onClick={handlePulseSubmit}
        className="mt-3 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600"
      >
        Pulse
      </button>
    </div>
  );
};

export default PulseInput;
