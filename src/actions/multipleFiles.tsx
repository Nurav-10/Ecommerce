'use server'
import cloudinary from '@/lib/cloudinary'


const MultipleFiles = async(formdata:FormData) => {
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
   return Promise.all(uploadPromises)
}
export default MultipleFiles