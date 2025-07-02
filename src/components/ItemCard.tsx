import Image from "next/image";
import React from "react";

const ItemCard = ({
  index,
  data,
}: {
  index: React.Key | null | undefined;
  data: any;
}) => {
  return <div key={index} className="w-50 h-80 p-2 flex text-black flex-col bg-zinc-50 items-center rounded-md">
   <Image src={data?.thumbnail} width={100} height={100} 
   className="w-full h-full rounded-md object-cover" alt="thumbnail"/>
   <h2 className="text-xs text-">{data?.title}</h2>
  </div>;
};

export default ItemCard;
