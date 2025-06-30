export default async function GetProducts(){
   try{
      const response=await fetch('https://dummyjson.com/products')

      const res=await response.json();

      if(res)
         return {success:true,data:res}
      else
      return {success:false,message:'Data Not fetched'}
   }
   catch(error)
   {
      return {success:false,message:error.message}
   }
}