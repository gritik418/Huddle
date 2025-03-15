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
          <PulseInput />

          <PulseFeed pulses={pulses} />
        </div>
      </div>
    </div>
  );
};

export default Pulse;
