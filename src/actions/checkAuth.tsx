'use server'


import {jwtVerify} from 'jose'
import { cookies } from 'next/headers'

export async function CheckAuth() {
  const cookieStore =await cookies()
  const token = String(cookieStore.get('token')?.value)

  if (!token) {
    return false
  }
  const secret=new TextEncoder().encode(process.env.JSONWEBTOKEN!)

  try {
    const isValid =await jwtVerify(token,secret)
    return isValid  // This contains decoded token info
  } catch (err:any) {
   console.log('this is error',err.message)
    return false
  }
}
