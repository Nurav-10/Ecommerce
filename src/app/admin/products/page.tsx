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
      const res=await fetch('/api/product/get',
        {method:'GET'}
      )
      const response=await res.json()
      if(response){
        setData(response.data)
      console.log(data)
      }
    })()
  },[])
  return (
    <div className='pl-20 md:pl-30 mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center xl:grid-cols-5 space-x-2 justify-center space-y-2'>
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