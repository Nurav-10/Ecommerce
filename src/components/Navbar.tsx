"use client";
import Link from "next/link";
import React, { use, useState } from "react";
import Image from "next/image";
import { Roboto } from "next/font/google";
import { Raleway } from "next/font/google";
import { ArrowRight, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { Logout } from "@/actions/logout";
import { toast } from "sonner";
import { useUserStore } from "@/store/userStore";
import { AnimatePresence, motion } from "motion/react";
import ProfilePreview from "./profilePreview";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const navLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Products",
    href: "/products",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Cart",
    href: "/cart",
  },
];
const Navbar = ({
  collapse,
  setCollapse,
}: {
  collapse: boolean;
  setCollapse: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { user } = useUserStore();
  const router = useRouter();
  const path = usePathname();
  const [profileDialog, setProfileDialog] = useState(false);
  const [profilePreview, setProfilePreview] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleLogout = async () => {
    const response = await Logout();
    if (response?.success) {
      toast.success(response.message);
      router.push("/auth/login");
    }
  };

  const handleProfile = () => {
    setProfileDialog((prev) => !prev);
  };
  return (
    <div className={`flex flex-row w-full fixed justify-between bg-gradient-to-tr from-black/5
     to-cyan-200/15 backdrop-blur-[3px] items-center px-7 py-2 shadow-blue-300/20 shadow-md ${path.includes('/admin') && 'pl-20 md:pl-24'}`}>
      <div className={`${raleway.className} font-[500] text-xl`}>
        <Link className="md:flex hidden" href={"/"}>
          FashionEra
        </Link>
        <h2 className="md:hidden flex">Logo</h2>
      </div>
      {path.includes("admin") ? (
        <h2 className={`text-xl ${raleway.className}`}>Admin Panel</h2>
      ) : (
        <div className="flex-row border rounded-xl light:border-black border-zinc-500 hidden md:flex">
          {navLinks.map((i, index) => {
            return (
              <Link
                key={index}
                className="transition-all duration-200 hover:bg-pink-100 hover:text-black px-5 rounded-xl "
                href={i.href}
              >
                {i.title}
              </Link>
            );
          })}
        </div>
      )}

      <div className="flex-row flex gap-2 items-center">
        <div>
          {theme === "light" ? (
            <Moon size={20} onClick={() => setTheme("dark")} />
          ) : (
            <Sun size={20} onClick={() => setTheme("light")} />
          )}
        </div>
        <button
          className="rounded-md text-white dark:bg-white px-2 py-1 dark:text-black bg-black hover:bg-red-400 border-1 cursor-pointer border-black hover:shadow-[1.5px_1.5px_1px_rgba(0,0,0,1)] transition-all duration-300"
          type="submit"
          onClick={()=>{
            user?.email ? handleLogout() :router.push('/auth/login')
          }}
        >
          {user?.email ? 'Logout':'Login'}
        </button>
        <div onClick={()=>{user?.email &&handleProfile()}}>
          <Image
            src={"/836.jpg"}
            width={100}
            height={100}
            alt="ProfileImage"
            className="w-8 h-8 rounded-full object-cover border"
          />
          {profileDialog && (
            <AnimatePresence>
              <motion.div
                className="text-white bg-zinc-900/80 fixed top-14 rounded-md px-5 py-1 right-10 flex flex-col items-center border border-zinc-400 bg-gradient-to-bl from-black/20 to-pink-200/40"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.5, ease: "backInOut" }}
              >
                <h2 className="mb-2">Profile</h2>
                <Image
                  src="/836.jpg"
                  alt="profile"
                  width={100}
                  height={100}
                  className="w-12 h-12 rounded-full border border-white object-cover"
                />
                <h2 className="text-sm">{user?.username}</h2>
                <h2 className="text-sm">{user?.email}</h2>
                <button
                  onClick={() => setProfilePreview((pre)=>!pre)}
                  className="px-2 text-sm mt-2 bg-emerald-500 py-1 hover:bg-emerald-700 rounded-md"
                >
                  Update Profile
                </button>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
      {
        profilePreview && 
        <ProfilePreview 
        setProfilePreview={setProfilePreview}
        email={user?.email}
        username={user?.username}
        role={user?.role}
        />
      }
    </div>
  );
};

export default Navbar;
