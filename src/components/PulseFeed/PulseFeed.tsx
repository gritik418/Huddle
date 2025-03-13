const PulseFeed = ({ pulses }: any) => {
  return (
    <div className="space-y-4">
      {pulses.map((pulse: any, index: number) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center space-x-3">
            <img
              src={pulse.userAvatar}
              alt={pulse.userName}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">{pulse.userName}</p>
              <p className="text-gray-500 text-sm">
                {pulse.userName}@{pulse.userHandle}
              </p>
            </div>
          </div>
          <p className="mt-2">{pulse.text}</p>
          <p className="text-gray-500 text-sm mt-2">{pulse.timestamp}</p>
        </div>
      ))}
    </div>
  );
};

export default PulseFeed;
