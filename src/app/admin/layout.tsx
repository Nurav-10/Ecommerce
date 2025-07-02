'use client'
import Navbar from '@/components/Navbar'
import SideBar from '@/components/SideBar'
import { Toaster } from '@/components/ui/sonner'
import React, { useState } from 'react'

export const Layout = ({children}:{children:React.ReactNode}) => {

  const [collapse,setCollapse]=useState(true)
  return (
    <div className="flex w-screen h-screen overflow-y-auto">
        <SideBar collapse={collapse} setCollapse={setCollapse}/>
        <div className="flex flex-col w-full">
          <Navbar collapse={collapse} setCollapse={setCollapse}/>
          <main className="flex-1 pt-10">{children}</main>
        <Toaster/>
        </div>
      </div>
  )
}

export default Layout