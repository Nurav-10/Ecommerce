import { products } from "@/db/schema";
import { db } from "@/index";
import { NextResponse } from "next/server";
export async function POST(request:Request)
{
    try{
   const body=await request.json()

   const {title,stock,brand,price,category,images,thumbnail,description,user_id}=body;

  const res=await db.insert(products).values({
   title,
   brand,
   stock:Number(stock),
   price:Number(price),
   images,
   thumbnail,
   description,
   category,
   userId:user_id
  }).returning()


  return NextResponse.json({message:'Product created successfully',success:true,product:res})

   }
   catch(err:any){
      return NextResponse.json({
         message:err.message,
         success:false
      })
   }
}