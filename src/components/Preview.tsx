import { Data } from '@/interfaces/DataInterface'
import { X } from 'lucide-react'
import Image from 'next/image'
import React, { SetStateAction, useState } from 'react'
import {motion} from 'motion/react'
const Preview = ({data,setPreview}:{data:any,setPreview:React.Dispatch<React.SetStateAction<boolean>>}) => {
   const [index,setIndex]=useState(0)
  return (
    <motion.div layout className='fixed top-[50%] left-[50%] px-5 text-white py-5 bg-zinc-950/90 flex flex-col gap-1  w-[70vw] sm:w-fit items-center border-white border rounded-md -translate-x-1/2 -translate-y-1/2'>
      <div className='flex gap-3 w-fit h-70'>
      <Image src={data.images[index]} width={100} height={100} alt='preview'
      className='object-cover w-full h-70 rounded-sm'/>
      <div className='flex flex-col justify-between'>
         {
            data?.images.map((i:string,ind:number)=>{
               return (
                  <div key={ind} className={`${index===ind && 'border border-blue-500 rounded-sm '} w-15`}>
                     <img  src={i} className='object-cover rounded-sm w-fit h-fit' onClick={()=>setIndex(ind)}/>
                     </div>
               )
            })
         }
      </div>
      </div>
      <div className='flex flex-col'>
      <h2>{data?.brand}</h2>
      <h2 className='text-sm text-zinc-300'>{data.title}</h2>
      <h2 className='text-lg'>₹{data.price}</h2>
      <button onClick={()=>setPreview(false)} className='absolute top-1.5 right-1.5 rounded-md hover:text-red-400 border p-1'><X size={10}/></button>
      </div>
    </motion.div>
  )
}

export default Preview