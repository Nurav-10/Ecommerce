'use client'
import Navbar from '@/components/Navbar'
import SideBar from '@/components/SideBar'
import { Toaster } from '@/components/ui/sonner'
import React, { useState } from 'react'

export const Layout = ({children}:{children:React.ReactNode}) => {

  const [collapse,setCollapse]=useState(true)
  return (
      <div className="flex">
        <SideBar collapse={collapse} setCollapse={setCollapse}/>
        <div className="flex flex-col flex-1 overflow-y-auto">
          <Navbar collapse={collapse} setCollapse={setCollapse}/>
          <main className="">{children}</main>
          <Toaster/>
        </div>
      </div>
  )
}

export default Layout