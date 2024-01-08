import Navbar from "@/components/common/layouts/Navbar";
import React from "react";

export default function Layout({ children }) {
  return (
    <div className={`min-h-screen bg-white`}>
      <Navbar />
      <div className="container mx-auto p-6 text-black">{children}</div>
    </div>
  );
}
