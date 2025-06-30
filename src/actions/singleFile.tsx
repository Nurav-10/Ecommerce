'use server'
import cloudinary from '@/lib/cloudinary'
const SingleFile = async(formdata:FormData) => {

   const file=formdata.get('file')

   if(!(file instanceof File))  return {message:'No File Provided'}

      const arrayBuffer=await file.arrayBuffer()
      const buffer=Buffer.from(arrayBuffer)

      return new Promise<any>((resolve,reject)=>{
         cloudinary.uploader.upload_stream({folder:'Ecommerce'},(err,result)=>{
            if(err) return reject(err)

               resolve(result?.secure_url)
         }).end(buffer)
      })
   }

export default SingleFile