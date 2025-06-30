'use client'
import React, { ChangeEvent, useRef } from 'react'
import { Card,CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import Image from 'next/image'
import { Upload } from 'lucide-react'

const categories=['Electronics','Clothing','Home','Books','Toys']

const ProductCreationPage = () => {
    const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef=useRef<HTMLInputElement>(null)

  const handleFileClick=()=>{
    fileInputRef.current?.click();
  }

  const handleFileChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const file=e.target.files?.[0]

    if(file){
      const url=URL.createObjectURL(file)
      setPreview(url)
    }


  }
  return (
    <div className='p-5 light:bg-zinc-100  h-screen w-full transition-all duration-200'>
      <h2 className='text-xl light:text-zinc-900 font-semibold'>Create Products</h2>
      <h2 className='text-zinc-600'>Add new products to your inventory</h2>
      <Card className='px-3 mt-5'>
         <div className='grid grid-cols-2 gap-x-5 gap-y-8'>
            <div className='flex flex-col gap-2'>
               <CardTitle>Product Title</CardTitle>
               <Input placeholder='Enter Title' className='hover:shadow-[2px_2px_3px_rgba(0,0,0,1)]' type='text' name='title'></Input>
            </div>
            <div className='flex flex-col gap-2'>
               <CardTitle>Price($)</CardTitle>
               <Input placeholder='0.00' name='price' type='number' className='hover:shadow-[2px_2px_3px_rgba(0,0,0,1)]' ></Input>
            </div>
             <div className='flex flex-col gap-2'>
               <CardTitle>Category</CardTitle>
               <select value={category} onChange={(e)=>setCategory(e.target.value)}
               required
               className='hover:shadow-[2px_2px_3px_rgba(0,0,0,1)] focus:ring-amber-100 px-2 py-1 border rounded-md' >
                <option className='text-black' value={''}>Select Category</option>
                {categories.map((cat)=>(
                  <option className='bg-slate-50 border text-black hover:bg-amber-100' key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
               </select>
            </div>
            <div className='flex flex-col gap-2'>
               <CardTitle>Product Image</CardTitle>
               {
                preview&& 
                <Image src={preview} width={100} height={100} alt='previewImage' className='w-fit h-fit rounded-sm'/>
               }
               <div className="flex flex-col items-center text-gray-500 border rounded-md cursor-pointer border-dashed p-5 hover:text-blue-500" 
               onClick={handleFileClick}>
                 <Upload size={30}/>
                  <p>Click to upload</p>
                  <p className="text-xs">PNG or JPG (Max. 2MB)</p>
                </div>
                <input type='file' accept='image/*' ref={fileInputRef} className='hidden' onChange={handleFileChange}/>
            </div>
         </div>
      </Card>
    </div>
  )
}

export default ProductCreationPage