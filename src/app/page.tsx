"use client";
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const page = () => {
  return (
    <>
      <div className="overflow-x-hidden light:bg-yellow-50 w-screen min-h-screen ">
        <Navbar />
        <Hero />
      </div>
    </>
  );
};

export default page;
