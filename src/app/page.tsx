'use client'
import React, { useEffect } from 'react'
import roboto from '../app/layout'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import { CheckAuth } from '@/actions/chechAuth'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/store/userStore'
const page = () => {
  const router=useRouter()
  useEffect(()=>{
    (async()=>{
      const response=await CheckAuth()
      if(!response.success){
        toast.error(response.message)
        router.push('/auth/login')
      }
    })()
  },[])

  const {user}=useUserStore()
  console.log(user)
  return (
    <>
    <div className='overflow-x-hidden light:bg-yellow-50 w-screen h-full'>
      <Navbar/>
    <Hero/>
    </div>

    </>
  )
}

export default page