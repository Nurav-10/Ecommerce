'use client'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import Button from '@/customised-components/button'
import { Roboto } from 'next/font/google'
import { Raleway } from 'next/font/google'
import { ArrowRight, Moon,Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'


const roboto=Roboto({
   subsets:['latin'],
   weight:['300','400','500']
})

const raleway=Raleway({
   subsets:['latin'],
   weight:['300','400','500']
})

const navLinks=[
   {
      title:'Home',
      href:'/'
   },
   {
      title:'Products',
      href:'/products'
   },
   {
      title:'About',
      href:'/about'
   },
   {
      title:'Cart',
      href:'/cart'
   }
]
const Navbar = ({collapse,setCollapse}:{collapse:boolean,setCollapse:React.Dispatch<React.SetStateAction<boolean>>}) => {
   
   const path=usePathname()
   const {theme,setTheme}=useTheme()

  return (
     <div className='flex flex-row justify-between items-center px-7 py-2 shadow-blue-300/20 shadow-md pl-10 md:pl-28'>
      <div className={`${raleway.className} font-[500] text-xl`}>   
         <Link className='md:flex hidden' href={'/'}>FashionEra</Link>
         <h2 className='md:hidden flex'>Logo</h2>
         </div>
         {
            path.includes('admin')?<h2 className={`text-xl ${raleway.className}`}>Admin Panel</h2> :
            <div className='flex-row border rounded-xl light:border-black border-zinc-500 hidden md:flex'>
            {
               
               navLinks.map((i,index)=>{
                  return(
                     <Link key={index} className='transition-all duration-200 hover:bg-pink-100 hover:text-black px-5 rounded-xl ' href={i.href}>{i.title}</Link>
                  )
               })
            }
         </div>
}

      <div className='flex-row flex gap-2 items-center'>
         <div>{
           theme==='light'?<Moon size={20} onClick={()=>setTheme('dark')}/>
           :
           <Sun size={20} onClick={()=>setTheme('light')}/>
         }
         </div>
         <Button className='rounded-md text-white dark:bg-white dark:text-black bg-black hover:bg-red-400 border-1 cursor-pointer border-black hover:shadow-[1.5px_1.5px_1px_rgba(0,0,0,1)] transition-all duration-300' type='submit'>Logout</Button>
         <Image src='https://plus.unsplash.com/premium_photo-1693258698597-1b2b1bf943cc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D'
         width={100}
         height={100}
         alt='ProfileImage'
         className='w-8 h-8 rounded-full object-cover border'
         />
      </div>
    </div>
  )
}

export default Navbar