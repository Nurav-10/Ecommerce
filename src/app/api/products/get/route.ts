import { NextResponse } from "next/server";
import { db } from "@/index";
import { products } from "@/db/schema";
export async function GET(request:Request)
{
   try{
      const response=await db.select().from(products)
      if(response) 
         return NextResponse.json({
      message:'data fetched successfully',success:true,data:response})
   }
   catch(err:any)
   {
      return NextResponse.json({
         message:err.message,
         success:false
      })
   }
}