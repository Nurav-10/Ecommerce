"use client";
import React, { useState } from "react";
import { Raleway } from "next/font/google";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const rale = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});
const page = () => {
  const router=useRouter()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  const handleInput = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!username || !email || !role || !password) {
      toast.error("Please provide all fields");
      return;
    }

    const response=await fetch('/api/user/create',{
      method:'POST',
      headers:{'Content-Type':'appliaction/json'},
      body:JSON.stringify({username,email,password,role})
    })
    const res=await response.json()

    if(res.success)
    {
      toast.success(res.message)
      console.log(res.user)
      router.push('/auth/login')
      return
    }

    else toast.error(res.message)

   }
   

  return (
    <div className={`flex w-screen h-screen ${rale.className}`}>
      <div className="login md:w-[50vw] w-full flex-col h-full flex justify-center items-center">
        <CardHeader className="w-full text-center text-xl">
          Welcome Back
        </CardHeader>
        <form onSubmit={handleInput}>
          <Card className="flex flex-col gap-4 px-7 py-5 w-[60vw] sm:w-[50vw] md:w-[40vw] xl:w-[25vw] items-center  bg-gradient-to-tr via-green-200/10 from-black-800/10 to-blue-400/10 border-zinc-600">
            <div className="flex gap-3 mb-2 justify-center items-center">
              <Link
                href="/auth/login"
                className="px-2  rounded-sm font-medium w-fit py-1"
              >
                Login
              </Link>
              <div className="w-1 h-4 bg-white rounded-full"></div>
              <Link
                href="/auth/register"
                className="bg-gradient-to-br from-black/5 to-cyan-300/80 px-2 rounded-sm font-medium w-fit py-1"
              >
                Register
              </Link>
            </div>

            <div className="flex flex-col gap-1 w-full">
              <CardTitle className="text-sm">Username</CardTitle>
              <Input
                type="text"
                placeholder="user"
                className="text-sm"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1 w-full">
              <CardTitle className="text-sm">Email</CardTitle>
              <Input
                value={email}
                type="email"
                placeholder="user@gmail.com"
                className="text-sm"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col w-full gap-1 text-sm">
              <CardTitle>Password</CardTitle>
              <Input
                value={password}
                type="password"
                placeholder="Enter your password"
                className="text-sm"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1 w-full">
              <CardTitle className="text-sm">Role</CardTitle>
              <select
                onChange={(e) => setRole(e.target.value)}
                value={role}
                id="role"
                className="border rounded-md  py-1 px-2"
              >
                <option className="text-black">Select Role</option>
                <option className="text-black" key="BUYER" value="BUYER">
                  BUYER
                </option>
                <option className="text-black" key="SELLER" value="SELLER">
                  SELLER
                </option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-sm"
            >
              SignIn
            </button>
          </Card>
        </form>
      </div>
      <div className="imagePoster md:w-[50vw] w-0 h-full"></div>
      <div className="w-full h-10 bg-amber-100 font-light text-black overflow-x-hidden text-3xl  absolute bottom-10 flex items-center">
        <motion.div
          className="flex whitespace-nowrap items-center"
          //    animate={{ x:['100%','-100%']}}
          //    transition={{
          //     repeat: Infinity,
          //     repeatType: "loop",
          //     duration:10,
          //     ease:'linear'
          //   }}
        >
          <p className="">
            Discover. Shop. Repeat — Style Meets Convenience — Where Trends
            Begin —
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default page;
