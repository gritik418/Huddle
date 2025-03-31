import PulseFeed from "../../../components/PulseFeed/PulseFeed";
import PulseInput from "../../../components/PulseInput/PulseInput";
import UserPulses from "../../../components/UserPulses/UserPulses";
import { Tabs } from "@chakra-ui/react";
import { FaUser, FaUsers } from "react-icons/fa";

const Pulse = () => {
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

          <Tabs.Root defaultValue="all" className="w-full">
            <Tabs.List className="gap-3 bg-white p-3 rounded-lg">
              <Tabs.Trigger value="all" className="text-xs px-2 py-0">
                <FaUsers className="text-sm" /> All Pulses
              </Tabs.Trigger>
              <Tabs.Trigger value="me" className="text-xs px-2 py-0">
                <FaUser className="text-xs" /> Your Pulses
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="all">
              <PulseFeed />
            </Tabs.Content>
            <Tabs.Content value="me">
              <UserPulses />
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </div>
    </div>
  );
};

export default Pulse;
