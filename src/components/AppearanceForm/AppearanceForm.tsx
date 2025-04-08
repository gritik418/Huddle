"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function AppearanceForm() {
  const [selectedTheme, setSelectedTheme] = useState<"light" | "dark">("light");

  const handleThemeChange = (theme: "light" | "dark") => {
    setSelectedTheme(theme);
  };

  const handleSubmit = () => {
    console.log("Selected Theme:", selectedTheme);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Theme</h4>
        <p className="text-sm text-muted-foreground">
          Select the theme for the dashboard.
        </p>
      </div>

      <div className="grid max-w-md grid-cols-1 sm:grid-cols-2 gap-8 pt-2">
        <div
          onClick={() => handleThemeChange("light")}
          className="cursor-pointer max-w-[260px]"
        >
          <div
            className={cn(
              "items-center rounded-md border-2 p-1",
              selectedTheme === "light" ? "border-primary" : "border-muted"
            )}
          >
            <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
              <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
              </div>
              <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
              </div>
              <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
              </div>
            </div>
          </div>
          <span className="block w-full p-2 text-center font-normal">
            Light
          </span>
        </div>

        <div
          onClick={() => handleThemeChange("dark")}
          className="cursor-pointer max-w-[260px]"
        >
          <div
            className={cn(
              "items-center rounded-md border-2 p-1 bg-popover",
              selectedTheme === "dark" ? "border-primary" : "border-muted"
            )}
          >
            <div className="space-y-2 rounded-sm bg-slate-950 p-2">
              <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
              </div>
              <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                <div className="h-4 w-4 rounded-full bg-slate-400" />
                <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
              </div>
              <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                <div className="h-4 w-4 rounded-full bg-slate-400" />
                <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
              </div>
            </div>
          </div>
          <span className="block w-full p-2 text-center font-normal">Dark</span>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 rounded-lg bg-[var(--secondary)] px-4 py-2 text-white font-semibold hover:opacity-90"
      >
        Update Preferences
      </button>
    </div>
  );
}
