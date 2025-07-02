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

    if (isCheck) {
       
      
       const token=jwt.sign({
         username:response[0].username,
         role:response[0].role,
         id:response[0].id,
         email:response[0].email,
         profilePicture:response[0].profilePicture || ' '
       },process.env.JSONWEBTOKEN!,{expiresIn:'7d'})


       cookieStore.set({
         name:'token',
         value:token,
         httpOnly:false,
         path:'/'
       })

       //user store updating.

      return {
        message: "Login Successful",
        success: true,
        user:{
          username:response[0].username,
        }
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
