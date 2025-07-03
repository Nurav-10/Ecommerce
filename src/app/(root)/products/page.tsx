"use client";
import ItemCard from "@/components/ItemCard";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const ProductPage = () => {
  const [data, setData] = useState<any[] | null>([]);
  useEffect(() => {
    (async () => {
      const response = await fetch("/api/products/get", { method: "GET" });

      const res = await response.json();

      if (res.success) setData(res.data);
      else {
        toast.error(res.message);
      }
    })()
  }, []);
  return (
    <div className="w-screen min-h-screen">
      <Navbar />
      <div className="mt-12.5 flex">
        <div className="sidebar sticky w-[18vw] xl:w-[15vw] min-h-screen border-r-1  hidden md:flex flex-col items-center py-3">
          <h2 className="text-lg w-fit bg-emerald-300 px-5 rounded-md">
            Filters
          </h2>
        </div>
        <div className="main-page  grid-cols-2 md:w-[85vw] w-full grid lg:grid-cols-3 place-items-center xl:grid-cols-4  space-y-4 px-8 gap-x-10 py-3">
          {
            data?.map((i,ind)=>{
              return(
                <ItemCard data={i} index={ind}/>
              )
            })
          }
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
