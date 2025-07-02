"use client";
import React, { FormEvent, useState } from "react";
import { Raleway } from "next/font/google";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "motion/react";
import Link from "next/link";
import { login } from "@/actions/login";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { SyncUserFromToken } from "@/actions/setUserState";

const rale = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});
const page = () => {
   const router=useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response=await login(email,password)
    if(response?.success)
    {
      toast.success(response.message)
      SyncUserFromToken()
      router.push('/')

      //set state of the user.
      return
    }
    else{
      toast.error(response?.message)
    }
  };
  return (
    <div className={`flex w-screen h-screen bg-zinc-950 ${rale.className} text-white`}>
      <div className="login md:w-[50vw] w-full flex-col h-full flex justify-center items-center">
        <CardHeader className="w-full text-center text-xl">
          Welcome Back
        </CardHeader>

        <form onSubmit={handleLogin}>
          <Card className="flex flex-col gap-4 px-7 py-5 w-[60vw] sm:w-[40vw] md:w-[35vw] xl:w-[20vw] items-center bg-gradient-to-bl via-green-200/10 from-black-800/10 to-blue-400/10 border-zinc-600">
            <div className="flex gap-3 mb-2 justify-center items-center">
              <Link
                href="/auth/login"
                className="bg-gradient-to-br from-black/5 to-cyan-300/80  px-2  rounded-sm font-medium w-fit py-1"
              >
                Login
              </Link>
              <div className="w-1 h-4 bg-white rounded-full"></div>

              <Link
                href="/auth/register"
                className="px-2 rounded-sm font-medium w-fit py-1"
              >
                Register
              </Link>
            </div>


            <div className="flex flex-col gap-1 w-full">
              <CardTitle className="text-sm">Email</CardTitle>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your Email"
                className="text-sm"
              />
            </div>

            <div className="flex flex-col w-full gap-1 text-sm">
              <CardTitle>Password</CardTitle>
              <Input
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="text-sm"
              />
            </div>

            <button
              type="submit"
              className="px-3 py-1 w-fit bg-blue-400 rounded-md hover:bg-blue-500"
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
