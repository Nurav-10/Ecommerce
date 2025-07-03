"use client";
import { useUserStore } from "@/store/userStore";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

interface TokenPayload {
  id: string;
  username: string;
  email: string;
  role: string;
  profilePicture: string;
}

export const SyncUserFromToken = () => {
  const cookie = Cookies.get("token");

  if (cookie) {
    const decoded = jwtDecode<TokenPayload>(cookie);
    if (typeof decoded === "object" && decoded !== null) {
      useUserStore.getState().setUser({
        id: decoded!.id,
        email: decoded!.email,
        username: decoded!.username,
        role: decoded!.role,
        profilePicture: decoded!.profilePicture || "",
      });
    }
  }
  return null;
};
