'use server'
import cloudinary from '@/lib/cloudinary'


const MultipleFiles = async(formdata:FormData) => {
   try{
   const files=formdata.getAll('files')
   const uploadPromises=files.map(async(file)=>{
      const arrayBuffer=await (file as Blob).arrayBuffer()
      const buffer=Buffer.from(arrayBuffer)

      return new Promise<any>((resolve,reject)=>{
         const stream=cloudinary.uploader.upload_stream({folder:'Ecommerce'},(err,result)=>{
            if(err) return reject(err)

               resolve(result?.secure_url)
         })
         stream.end(buffer)
      })
   })
   const images=await Promise.all(uploadPromises)
   return {success:true,images}
}
catch(err:any)
{
   return {success:false,message:err.message}
}
}

export default MultipleFiles