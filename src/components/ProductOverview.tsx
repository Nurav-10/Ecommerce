'use client'
import Button from '@/customised-components/button'
import { Data } from '@/interfaces/DataInterface'
import { Heart } from 'lucide-react'
import Image from 'next/image'
import { Quicksand } from 'next/font/google'
import React from 'react'


const quick=Quicksand({
  subsets:['latin'],
  weight:['300','400','500']
})
const ProductOverview = (prodctInfo:Data) => {
  return (
   <div className="md:min-w-[13vw] sm:min-w-[20vw] min-w-[30vw] rounded-lg flex flex-col bg-zinc-200  text-black shadow-lg transition-shadow">
  <Image src={prodctInfo.images[0]} width={100} height={100} className="w-full h-38 object-cover rounded-md" alt="Image"/>
  <div className={`text-sm mt-2 px-3 mb-2 flex flex-col items-center ${quick.className}`}>
    <h2 className="text-black text-sm font-medium">{prodctInfo.title.slice(0,20)}</h2>
    <h2 className="text-lg">${prodctInfo.price}</h2>
    <div className='flex gap-2 items-center'>
    <Button className="bg-emerald-400 text-center hover:bg-blue-600 rounded-md mt-1 w-30 text-white font-semibold text-sm">Add To Cart</Button>
    <Heart size={20} className='hover:fill-red-500'/>
    </div>
  </div>
</div>
  )
}

export default ProductOverview