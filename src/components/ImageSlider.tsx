"use client";
import Image from "next/image";

import React, { useEffect, useState } from "react";
import image1 from "../../public/image1.jpg";
import image2 from "../../public/image2.jpg";
import image3 from "../../public/image3.jpg";
import {motion} from 'motion/react'

const sliderData = [
  {
    id: 1,
    image: image1,
  },
  {
    id: 2,
    image: image2,
  },
  {
    id: 3,
    image: image3,
  },
];

const ImageSlider = ({auto,timer}:{auto:boolean,timer:number}) => {
  const [currentIndex, setIndex] = useState(0);

  useEffect(()=>{
    if(auto){
    const interval=setInterval(()=>{
      setIndex((prev)=>(prev+1)%sliderData.length)
    },timer)

    return ()=>clearInterval(interval)
  }
  })
  return (
    <>
      <div className="flex flex-col w-full h-75 xl:h-80 gap-2 justify-center items-center overflow-x-hidden scroll snap py-5 ">
        <motion.div
        key={currentIndex} className="overflow-x-auto scrollbar-hide w-full h-full"
         initial={{opacity:0,x:100}}
        animate={{opacity:1,x:0}}
        exit={{opacity:0,x:-100}}
        transition={{duration:1.5,ease:'easeInOut'}}
       >
          <Image
            src={sliderData[currentIndex].image}
            alt="SliderImage"
            width={1000}
            height={1000}
            className="w-full h-full object-cover rounded-md"
            />
            </motion.div>

      <div className="flex gap-1">
        {Array(3)
          .fill(0)
          .map((_, index) => {
            return <div key={index} className={`swiper w-3 h-3 rounded-full ${currentIndex===index?'bg-zinc-600 w-4':'bg-zinc-300'}`}
            onClick={()=>setIndex(index)}>
            </div>;
          })}
          </div>
          </div>
    </>
  );
};

export default ImageSlider;
