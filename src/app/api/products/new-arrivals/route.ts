import { products } from "@/db/schema";
import { db } from "@/index";
import { asc, desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request:Request)
{
   try{
      const response=await db.select().from(products).orderBy(desc(products.createdAt)).limit(12)

      return NextResponse.json({
         success:true,
         data:response
      })
      
   }
   catch(err:any)
   {
      return NextResponse.json({message:err.message,success:false})
   }
}