import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/index";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
export async function POST(request:Request)
{
   const {username,email,password,address,gender,role}=await request.json()

   //check if user already existed.
   try{
      const existed=await db.select().from(users).where(eq(users.email,email))

      if(existed.length>0)
         return NextResponse.json({
      message:'User Existed Already',
   success:false})

   const hashedPassword=await bcrypt.hash(password,10)

   const newuser=await db.insert(users).values({
      username,
      email,
      gender,
      password:hashedPassword,
      address,
      role:role || "BUYER"
   }).returning()

   return NextResponse.json({
      message:'user created successfully',
      user:newuser[0],
      success:true
   })
   }
   catch(err:any){
      return NextResponse.json({
         message:err.message,
         success:false
      })
   }
}