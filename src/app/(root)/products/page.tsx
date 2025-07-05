"use client";
import ItemCard from "@/components/ItemCard";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { motion } from "motion/react";
import { stagger } from "motion";
import { duration } from "drizzle-orm/gel-core";

const ProductPage = () => {
  const categories = ["electronics", "clothing", "furniture", "toys", "book"];
  const [data, setData] = useState<any[] | null>([]);
  const [category, setCategory] = useState("");
  useEffect(() => {
    (async () => {
      let response;
      if (category)
        response = await fetch(`/api/products/category/${category}`);
      else response = await fetch("/api/products/get", { method: "GET" });

      const res = await response.json();

      if (res) {
        if (res.data.length > 0) {
          setData(res.data);
        } else {
          setData([]);
          toast.error(res.message);
          return;
        }
      }
    })();
  }, [category]);

  const parentVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        duration:0.2
      },
    },
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      scaleX:0.2
    },
    visible: {
      opacity: 1,
      scaleX:1,
      transition: { duration:.2 },
    },
  };
  return (
    <div className="w-screen min-h-screen">
      <Navbar />
      <div className="mt-12.5 flex">
        <div className="sidebar sticky w-fit px-5 min-h-screen border-r-1  hidden md:flex flex-col items-center py-3">
          <h2 className="text-lg w-fit bg-emerald-300 px-5 rounded-md">
            Filters
          </h2>
          <motion.div
            variants={parentVariants}
            initial="hidden"
            animate="visible"
            className="mt-4 flex flex-col gap-2"
          >
            {categories.map((i, ind) => {
              return (
                <motion.span
                  variants={childVariants}
                  key={ind}
                  className={`list-none  text-lg cursor-pointer hover:text-blue-500 text-center  capitalize px-7 py-1 rounded-2xl ${
                    category === i && "bg-blue-400/60"
                  }`}
                  onClick={() => setCategory(i)}
                >
                  {i}
                </motion.span>
              );
            })}
          </motion.div>
        </div>
        {!data?.length ? (
          <h2 className="bg-yellow-400/90 px-3 py-1 rounded-md mx-3 mt-3 h-fit">
            Products Not Available
          </h2>
        ) : (
          <div className="main-page  grid-cols-2 md:w-[85vw] w-full grid lg:grid-cols-3 place-items-center xl:grid-cols-4  space-y-5 px-8 gap-x-8 py-10">
            {data?.map((i, ind) => {
              return <ItemCard data={i} index={ind} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
