import { NextResponse } from "next/server";
import { db } from "@/index";
import { products, users } from "@/db/schema";
import { title } from "process";
import { eq } from "drizzle-orm";

export async function GET(){

   try{
      const res=await db.select(
         {
            id:products.id,
            title:products.title,
            images:products.images,
            thumbnail:products.thumbnail,
            brand:products.brand,
            price:products.price,
            description:products.description,
            sellerId:products.userId,
            sellerName:users.username,
            sellerEmail:users.email
         }
      ).from(products).leftJoin(users,eq(products.userId,users.id))

         return NextResponse.json({
            message:'Products data fetched successfully',
            success:true,
            data:res
         })
      }
   catch(err:any)
   {
      return NextResponse.json({message:`Can't fetch the products list`,success:false})
   }

}