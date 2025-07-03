'use client'
import ItemCard from '@/components/ItemCard'
import React, { useEffect, useState } from 'react'


interface Data{
  id:string,
  title:string,
  price:number,
  stock:number,
  images:[string],
  thumbnail:string,
  sellerId:string,
  sellerName:string,
  sellerEmail:string,
  category:string,
  description:string
}

const page = () => {
  const [data,setData]=useState<Data[]|any>([])
  useEffect(()=>{
    //fetch product.
    (async()=>{
      const res=await fetch('/api/admin/product/get',
        {method:'GET'}
      )
      const response=await res.json()
      if(response){
        setData(response.data)
      }
    })()
  },[])
  return (
    <div className='pl-18 md:pl-26 mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center xl:grid-cols-5 space-x-3 justify-center space-y-1 w-full h-full overflow-y-auto pr-3'>
      {
       data?.map((item: unknown,index: React.Key | null | undefined)=>{
        return(
          <div key={index}>
          <ItemCard index={index} data={item}/>
          </div>
        )
       }) 
      }
    </div>
  )
}

export default page