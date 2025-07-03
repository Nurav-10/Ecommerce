'use server'
import { cookies } from "next/headers";
export async function Logout(){

   const cookie=await cookies()

  cookie.set({
   name:'token',
   value:'',
   path:'/',
   maxAge:0
  })

  return {
   message:'Logout successfully',
   success:true
  }
}