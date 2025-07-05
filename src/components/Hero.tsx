"use client";
import React, { useEffect, useState } from "react";
import { Open_Sans } from "next/font/google";
import { useTheme } from "next-themes";
import ImageSlider from "./ImageSlider";
import GetProducts from "@/helper/products";
import { Data } from "@/interfaces/DataInterface";
import Button from "@/customised-components/button";
import ProductOverview from "./ProductOverview";
import { motion } from "motion/react";
import { delay } from "motion";
import ItemCard from "./ItemCard";
import { useRouter } from "next/navigation";
import Link from "next/link";

const openSans = Open_Sans({
  subsets: ["latin"],
});
const Hero = () => {
  const { theme } = useTheme();
  const router=useRouter()
  const [data, setData] = useState<Data[] | null>();
  useEffect(() => {
    (async () => {
      const response = await fetch('/api/products/new-arrivals',{
        method:'GET'
      })

      const res=await response.json()
      if (res) setData(res.data)
      else console.log(res);
    })();
  }, []);

  const ParentVarinats = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.5,
      },
    },
  };
  const childVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  const parentCardVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delay: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: (custom: number) => ({
      opacity: 0,
      scale: 0.5,
      x: custom * 60, // Push based on distance from center
    }),
    visible: (custom: number) => ({
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    }),
  };
  const headText =
    "Designed for Shoppers, Loved by All. A Seamless Shopping Experience"
  return (
    <>
      <div className="flex md:flex-row flex-col mt-10 xl:h-[50vh] overflow-y-auto">
        <div className={`w-[90vw] md:w-[50vw] h-fit`}>
          <motion.p
            className="flex flex-row flex-wrap font-extrabold tracking-[0.1px] px-6 py-5 gap-1"
            variants={ParentVarinats}
            initial="hidden"
            animate="visible"
          >
            
                <motion.span
                  className={`bg-gradient-to-bl from-blue-300 to-cyan-300  bg-clip-text text-transparent text-4xl lg:text-5xl xl:leading-14 xl:text-6xl py-2 ${openSans.className}`}
                  variants={childVariants}
                >
                 {headText}
                </motion.span>
          
          </motion.p>
          <div className="flex flex-row gap-3 px-6 mt-1 text-md">
            <Link href='/products' onClick={()=>router.push('/products')} className="bg-white border text-black font-semibold rounded-sm px-3 py-1 hover:shadow-[1.5px_1.5px_1px_rgba(0,0,0,1)] transition-all ease-in duration-150 ">
              Checkout
            </Link>
            <Link href='/auth/register' className="bg-gradient-to-bl py-1 px-3 border from-black/20 to-emerald-300 font-semibold rounded-sm  hover:shadow-[1.5px_1.5px_1px_rgba(0,0,0,1)] transition-all ease-in duration-150">
              Signup
            </Link>
          </div>
        </div>

        <div className="w-screen min-h-65 md:w-[50vw] flex flex-row justify-center py-3 px-5 overflow-x-auto">
          {/* Image slider */}
          <ImageSlider auto={false} timer={2500} />
        </div>
      </div>
      <div className="px-6 mt-2">
        <h2 className="text-2xl font-semibold">Some New Arrivals</h2>
        <div className="scroll-smooth overflow-x-auto snap-x  snap-mandatory mt-5 hide-scrollbar">
        <motion.div
          className="flex gap-7 "
          variants={parentCardVariants}
          initial="hidden"
          animate="visible"
        >
          {data?.map((i, index, arr) => {
            const mid = (arr.length - 1) / 2;
            return (
              <motion.div variants={childVariants} key={index} className="snap-center">
              <ItemCard index={index} data={i}/>
              </motion.div>
            );
          })}
        </motion.div>
        </div>
      </div>
    </>
  );
};

export default Hero;
