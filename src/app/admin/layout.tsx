// app/layout.tsx
"use client";

import { useState, useEffect } from "react";
import SideBar from "@/components/SideBar";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner"; // or wherever your Toaster is from


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapse, setCollapse] = useState(true);

  return (
        <div className="flex h-full w-full ">
          <SideBar collapse={collapse} setCollapse={setCollapse} />
          <div className="flex flex-col w-full h-full overflow-auto">
            <Navbar/>
            <div className="flex-1 pt-10">{children}</div>
            <Toaster />
          </div>
        </div>
  )
}
