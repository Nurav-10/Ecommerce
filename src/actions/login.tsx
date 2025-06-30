"use server";
import { users } from "@/db/schema";
import { db } from "..";
import { ilike } from "drizzle-orm";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers";
import { useUserStore } from "@/store/userStore";


export async function login(email: string, password: string) {
  //server action for logging in.

  const cookieStore=await cookies()
  if (!email || !password)
    return {
      message: "Please provide email and password",
    };

  try {
    const response = await db
      .select()
      .from(users)
      .where(ilike(users.email, email));

    const isCheck = await bcrypt.compare(password, response[0].password);

    const data=response[0]

    if (isCheck) {
       
       useUserStore.getState().setUser({
         id:data.id,
         username:data.username,
         email:data.email,
         role:String(data.role)
       })
       const token=jwt.sign({
         username:response[0].username,
         role:response[0].role,
         profilePicture:response[0].profilePicture
       },process.env.JSONWEBTOKEN!,{expiresIn:'7d'})

       cookieStore.set({
         name:'Rascal',
         value:token,
         httpOnly:true,
         path:'/'
       })

       //user store updating.

      return {
        message: "Login Successful",
        success: true,
      };

      //creating token and storing it as cookies.

    }
  } catch (err: any) {
    return {
      message: err.message,
      success: false,
    };
  }
}
