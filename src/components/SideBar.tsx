"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Montserrat } from "next/font/google";
import { ArrowRight, Box, ListOrdered, Plus } from "lucide-react";


const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const sideBarList = [
  {
    id: 1,
    title: "Product",
    href: "/admin/products",
    logo:<Box size={13}/>
  },
  {
    id: 2,
    title: "Order",
    href: "/admin/orders",
    logo:<ListOrdered size={13}/>
  },
  {
    id: 3,
    title: "Create Product",
    href: "/admin/products/create",
    logo:<Plus size={13}/>
  },
];

const SideBar = ({collapse,setCollapse}:{collapse:boolean,setCollapse:React.Dispatch<React.SetStateAction<boolean>>}) => {
   const [active, setActive] = useState(0);
  return (
    <div
        className={`sidebar fixed top-0 left-0 z-99 flex flex-col items-center px-4 w-fit md:px-6 py-5 transition-all duration-200 text-black min-h-screen border-r bg-gradient-to-b from-zinc-100 to-blue-200/80 border-gray-200 shadow-[0px_0px_15px_rgba(0,0,0,0.2)] gap-8 ${montserrat.className}`}
      >
         <button className={`${!collapse && 'rotate-180'} px-2 rounded-md border p-2`} onClick={()=>setCollapse((pre)=>!pre)}><ArrowRight size={16} color='blue'/></button>
        {sideBarList.map((item, index) => {
          return (
            <Link
              key={item.id}
              className={`w-full transition-all ease-in duration-300 bg-white flex items-center gap-1 justify-center px-2 py-2 border rounded-md ${active===item.id && ' shadow-[2px_2px_0px_rgba(0,0,0,1)] font-medium bg-zinc-200'} `}
              href={item.href} onClick={()=>setActive(item.id)}
            >
             {
              !collapse&& item.title
             }
              {item.logo}
            </Link>
          );
        })}
        <h2 className={` text-zinc-950 text-4xl font-light w-0 absolute bottom-3 transition-all duration-200 ease-in  ${collapse?'-rotate-90':'rotate-0 left-6'}`}>SideBar</h2>
      </div>
  )
}

export default SideBar