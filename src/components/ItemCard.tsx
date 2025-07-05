import { Heart } from "lucide-react";
import Image from "next/image";
import {motion} from 'motion/react'
import React, { useState } from "react";
import { Poppins } from "next/font/google";
import Preview from "./Preview";

const pop=Poppins({
  subsets:['latin'],weight:['200','300','400']
})
const ItemCard = ({
  index,
  data,
}: {
  index: React.Key | null | undefined;
  data: any;
}) => {

  const [preview,setPreview]=useState(false)

  return <motion.div layout key={index} className={`${pop.className} w-45 sm:w-58 h-105 flex text-zinc-800 flex-col bg-gradient-to-br from-blue-50 to-pink-50  items-center overflow-hidden  rounded-md transition-all duration-300 ease-in hover:shadow-[2px_2px_3px_rgba(0,0,0,0.7)]  border`}>
    <div>
   <Image src={data?.thumbnail} width={100} height={100} 
   className="w-70 sm:h-65 h-60 object-cover border-b-1 border-b-black" alt="thumbnail"/>
   </div>
   <div className="flex flex-col w-full justify-between h-full pb-5 pt-3 px-3">
   <div className=" w-full flex flex-col ">
   <h2 className="text-left w-full font-medium text-black">{data.brand}</h2>
   <h2 className="text-xs text-left">{data?.title}</h2>
   <div className="flex justify-between items-center w-full">
    <h2 className="font-semibold">₹{data.price}</h2>
    <Heart className='hover:fill-red-500' size={15}/>
   </div>
   </div>
   <div className="flex flex-row w-full mt-2 justify-between text-sm md:text-md">
    <button className="rounded-md px-1 sm:px-2 bg-blue-600/85 text-white font-semibold hover:shadow-[1px_1px_3px_rgba(0,0,0,1)] transition-all duration-300" onClick={()=>setPreview((prev)=>!prev)}>Preview</button>
    <button className="px-1 md:px-2 hover:shadow-[1px_1px_3px_rgba(0,0,0,1)] transition-all duration-300 bg-zinc-100 rounded-md border">Checkout</button>
   </div>
   </div>

   {
    preview && <Preview  data={data} setPreview={setPreview}/>
   }
  </motion.div>;
};

export default ItemCard;
