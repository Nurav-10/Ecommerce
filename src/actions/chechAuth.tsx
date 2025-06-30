"use server";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'
export async function CheckAuth() {
  const cookie = await cookies();

  const item = String(cookie.get("Rascal")?.value);
  if (!item)
    return {
      message: "Not Authenticated",
      success: false,
    };

    try{
      const decoded=jwt.verify(item,process.env.JSONWEBTOKEN!)
      return {message:'Authenticated',success:true}
    }
    catch(err){
         return {message:'Invalid or Expired Token',success:false}
    }


}
