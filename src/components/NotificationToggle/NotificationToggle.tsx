"use client";

import { JSX } from "react";

type ToggleProps = {
  label: string;
  description: string;
  value: boolean;
  onChange: (val: boolean) => void;
  color?: string;
};

const NotificationToggle = ({
  label,
  description,
  value,
  onChange,
  color = "#00aaf0",
}: ToggleProps): JSX.Element => {
  return (
    <div className="flex justify-between items-center border rounded-lg p-4 shadow-sm hover:shadow-md transition-all">
      <div>
        <h3 className="text-sm font-semibold">{label}</h3>
        <p className="text-xs text-gray-500">{description}</p>
      </div>

      <div
        className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-colors duration-300 ${
          value ? "bg-opacity-60" : "bg-opacity-30"
        }`}
        style={{ backgroundColor: value ? color : "#ccc" }}
        onClick={() => onChange(!value)}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
            value ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </div>
    </div>
  );
};
export default NotificationToggle;
