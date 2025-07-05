"use client";
import Link from "next/link";
import React, { use, useState, useEffect } from "react";
import Image from "next/image";
import { Roboto } from "next/font/google";
import { Raleway } from "next/font/google";
import { ArrowRight, Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { Logout } from "@/actions/logout";
import { toast } from "sonner";
import { useUserStore } from "@/store/userStore";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useTransform,
} from "motion/react";
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
    title: "Wishlist",
    href: "/wishlist",
  },
  {
    title: "Cart",
    href: "/cart",
  },
];
const Navbar = () => {
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      if (v > 0.001) setHasScrolled(true);
    });
  }, [scrollYProgress]);

  const width = useTransform(scrollYProgress, [0, 1], ["100vw", "70vw"]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], ["1px", "50px"]);
  const margintop = useTransform(scrollYProgress, [0, 1], ["0px", "12px"]);
  const [hasScrolled, setHasScrolled] = useState(false);

  // const bgColor=useTransform(scrollYProgress,[0,0.5,1],['#FFFBDE','#91C8E4','#749BC2'])

  const { user } = useUserStore();
  const router = useRouter();
  const path = usePathname();
  const [profileDialog, setProfileDialog] = useState(false);
  const [profilePreview, setProfilePreview] = useState(false);
  const { theme, setTheme } = useTheme();
  const [burgerOpen, setBurgerOpen] = useState(false);

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
    <motion.div
      style={{
        width: hasScrolled ? width : "100vw",
        borderRadius:hasScrolled? borderRadius:'0px',
        marginTop:hasScrolled?margintop:'0px',
      }}
      className={`flex flex-row fixed justify-between bg-gradient-to-tr top-0  left-1/2 -translate-x-1/2 from-blue-500/10 z-99
     to-cyan-300/10 backdrop-blur-[3px] items-center px-7 py-2 border border-zinc-800`}>
      <div className={`${raleway.className} font-[500] text-xl`}>
        <Link className="md:flex hidden" href={"/"}>
          FashionEra
        </Link>
        <Link href="/" className="md:hidden flex">
          Logo
        </Link>
      </div>
      <div className={`flex-row light:border-black gap-3 hidden xl:flex font-semibold`}>
        {navLinks.map((i, index) => {
          return (
            <Link
              key={index}
              className="transition-all duration-200 ease-in-out  hover:bg-blue-200/75 px-5 rounded-md py-1 hover:shadow-[1.5px_1.5px_3px_rgba(0,0,0,1)]"
              href={i.href}
            >
              {i.title}
            </Link>
          );
        })}
      </div>

      <div className="flex-row flex gap-2 items-center">
      {user?.email && !path.includes('/admin') &&<Link href='/admin/products' className="adminPanelAccess border hover:w-fit transition-all duration-400 ease-in rounded-full text-center px-2  bg-gradient-to-bl from-black/40 text-white to-orange-400/90 hover:bg-orange-400/40 cursor-pointer absolute top-14 right-5">Admin</Link>}
        <div>
          {theme === "light" ? (
            <Moon size={20} onClick={() => setTheme("dark")} />
          ) : (
            <Sun size={20} onClick={() => setTheme("light")} />
          )}
        </div>
        <button
          className={`rounded-md text-white dark:bg-white px-2 py-1 dark:text-black bg-black ${
            user?.email ? "hover:bg-red-400" : "hover:bg-emerald-300"
          } border-1 cursor-pointer border-black hover:shadow-[1.5px_1.5px_1px_rgba(0,0,0,1)] transition-all duration-300`}
          type="submit"
          onClick={() => {
            user?.email ? handleLogout() : router.push("/auth/login");
          }}
        >
          {user?.email ? "Logout" : "Login"}
        </button>
        <div
          onClick={() => {
            user?.email && handleProfile();
          }}
        >
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
                  onClick={() => setProfilePreview((pre) => !pre)}
                  className="px-2 text-sm mt-2 bg-emerald-500 py-1 hover:bg-emerald-700 rounded-md"
                >
                  Update Profile
                </button>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
        <div className="relative">
          <Menu
            onClick={() => setBurgerOpen((p) => !p)}
            className="xl:hidden flex"
          />
          <motion.div
            className={`flex-col absolute bg-zinc-800/80 rounded-sm text-center top-9 right-1 text-white  ${
              burgerOpen && "flex"
            }`}
          >
            {burgerOpen &&
              navLinks.map((i, ind) => {
                return (
                  <Link
                    href={i.href}
                    key={ind}
                    className="hover:text-blue-500 hover:bg-zinc-700 px-5 py-1"
                  >
                    {i.title}
                  </Link>
                );
              })}
          </motion.div>
        </div>
      </div>
      {profilePreview && (
        <ProfilePreview
          setProfilePreview={setProfilePreview}
          email={user?.email}
          username={user?.username}
          role={user?.role}
        />
      )}
    </motion.div>
  );
};

export default Navbar;
