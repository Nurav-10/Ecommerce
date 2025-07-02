import { X } from "lucide-react";
import Image from "next/image";
import React from "react";

const ProfilePreview = ({
   email,username,role,setProfilePreview
}:{
   email:String | undefined,
   username:String |undefined,
   role:String|undefined,
   setProfilePreview:React.Dispatch<React.SetStateAction<boolean>>
}) => {
  return (
    <div className="fixed top-[50vh] left-[50vw] -translate-x-[70px] -translate-y-[60px] bg-gradient-to-bl from-zinc-950 to-cyan-300 rounded-md p-12 border border-zinc-500 flex flex-col items-center text-white justify-center">

      <button className="absolute right-2 top-2 rounded-sm border bg-white text-red-400 hover:text-red-500"><X size={15} onClick={()=>setProfilePreview(false)}/></button>
      <Image src='/836.jpg' width={100} height={100} className="w-20 h-20 object-cover rounded-full" alt="profile"/>
      <h2>{email}</h2>
      <h2>{username}</h2>
      <h2>{role}</h2>
    </div>
  );
};

export default ProfilePreview;
