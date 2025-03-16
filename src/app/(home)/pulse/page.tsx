"use client";
import PulseFeed from "@/components/PulseFeed/PulseFeed";
import PulseInput from "@/components/PulseInput/PulseInput";
import { useState } from "react";

const pulsesData = [
  {
    userAvatar: "https://randomuser.me/api/portraits/men/1.jpg",
    userName: "John Doe",
    userHandle: "john_doe",
    text: "Just had the best coffee of my life!",
    timestamp: "2 minutes ago",
  },
  {
    userAvatar: "https://randomuser.me/api/portraits/women/1.jpg",
    userName: "Jane Smith",
    userHandle: "jane_smith",
    text: "Love the weather today, feeling productive!",
    timestamp: "30 minutes ago",
  },
];

const Pulse = () => {
  const [pulses, setPulses] = useState(pulsesData);

  return (
    <div className="flex flex-col w-full gap-5 min-h-[calc(100vh-56px-16px-24px)]">
      <div className="h-[100%] rounded-lg">
        <div className="mx-auto">
          <div className="bg-gradient-to-r from-blue-400 to-purple-500 text-white text-center p-3 rounded-md mb-4">
            <span className="text-sm font-medium">
              <span className="font-bold"> Pulse:</span> Share your thoughts in
              text! Keep it short, spontaneous, and text-based—no photos, just
              words.
            </span>
          </div>

          <PulseInput />

          <PulseFeed pulses={pulses} />
        </div>
      </div>
    </div>
  );
};

export default Pulse;
