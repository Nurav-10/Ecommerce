"use client";
import React, { useEffect, useState } from "react";
import { Open_Sans } from "next/font/google";
import { useTheme } from "next-themes";
import ImageSlider from "./ImageSlider";
import GetProducts from "@/helper/products";
import { Data } from "@/interfaces/DataInterface";
import Button from "@/customised-components/button";
import ProductOverview from "./ProductOverview";
import {motion} from 'motion/react'
import { delay } from "motion";

const openSans = Open_Sans({
  subsets: ["latin"],
});
const Hero = () => {
  const { theme } = useTheme();
  const [data, setData] = useState<Data[] | null>();
  useEffect(() => {
    (async () => {
      const response = await GetProducts();
      if (response.success) setData(response.data.products);
      else console.log(response);
    })();
  }, []);

  const ParentVarinats={
    hidden:{},
    visible:{
      transition:{
        staggerChildren:0.5,
      }
    }
  }
  const childVariants={
    hidden:{opacity:0,y:10},
    visible:{opacity:1,
      y:0,
      transition:{duration:0.5}
    }
  }
  const parentCardVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delay: 0.3
    }
  }
};

const cardVariants = {
  hidden: (custom: number) => ({
    opacity: 0,
    scale: 0.5,
    x: (custom) * 60, // Push based on distance from center
  }),
  visible:(custom:number)=>({
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 1,
      ease: "easeOut"
    }
  })
};
  return (
    <>
    <div className="flex md:flex-row flex-col xl:h-[50vh]">
      <div className={`w-[90vw] md:w-[50vw] `}>
        <motion.p className="flex flex-col px-6 py-5 gap-1" variants={ParentVarinats} initial='hidden' animate='visible'>

          <motion.span className={`main-heading h-fit ${openSans.className}`} variants={childVariants} >Designed for Shoppers,</motion.span>

          <motion.span className={`main-heading ${openSans.className}`} variants={childVariants} > Loved by All. </motion.span>

           <motion.span className={`main-heading ${openSans.className} `} variants={childVariants}>A Seamless Shopping Experience</motion.span>
        </motion.p>
        <div className="flex flex-row gap-3 px-6 mt-1 text-md">
          <Button className="bg-white border text-black font-semibold rounded-sm hover:hover:shadow-[1.5px_1.5px_1px_rgba(0,0,0,1)] transition-all ease-in duration-150 ">Checkout</Button>
          <Button className="bg-gradient-to-bl from-black/20 to-emerald-300 font-semibold rounded-sm  hover:shadow-[1.5px_1.5px_1px_rgba(0,0,0,1)] transition-all ease-in duration-150">Signup</Button>
        </div>
      </div>

      <div className="w-screen h-fit md:w-[50vw] flex flex-row justify-center py-5 px-6 overflow-x-auto">
        {/* Image slider */}
        <ImageSlider auto={false} timer={2500} />
    </div>
      </div>
    <div className="px-6 mt-4 w-fit">
      <h2 className="text-2xl font-semibold">Some New Arrivals</h2>
      <motion.div className="flex flex-row gap-10 mt-5 overflow-hidden"  variants={parentCardVariants}
  initial="hidden"
  animate="visible">
        {
          data?.slice(10,20).map((i,index,arr)=>{
            const mid=(arr.length-1)/2
            return(
              <motion.div key={i.id} variants={cardVariants} custom={index-mid}>
              <ProductOverview key={i.id} {...i}/>
              </motion.div>
            )
          })
}
      </motion.div >
    </div>
    </>
  );
};

export default Hero;
