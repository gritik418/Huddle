import Navbar from "@/components/Navbar/Navbar";
import React, { JSX } from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <div className="h-screen">
      <Navbar />

      <div className="flex h-[calc(100%-56px)]">{children}</div>
    </div>
  );
}
