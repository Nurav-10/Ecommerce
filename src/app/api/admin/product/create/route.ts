import { products } from "@/db/schema";
import { db } from "@/index";
import { color } from "motion";
import { NextResponse } from "next/server";
export async function POST(request:Request)
{
    try{
   const body=await request.json()

   const {title,stock,brand,price,category,subcategory,images,thumbnail,description,user_id,colors}=body;

  const res=await db.insert(products).values({
   title,
   brand,
   stock:Number(stock),
   price:Number(price),
   images,
   thumbnail,
   description,
   category,
   subcategory,
   colors,
   userId:user_id,
  }).returning()
  return NextResponse.json({message:'Product created successfully',success:true,product:res})

   }
   catch(err:any){
      console.log(err.message)
      return NextResponse.json({
         message:err.message,
         success:false
      })
   }
}