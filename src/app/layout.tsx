import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SyncUserFromToken } from "@/actions/setUserState";
import SmoothScroll from "@/components/SmoothScroll";


export const metadata: Metadata = {
  title: "Ecommerce",
  description: "Ecommerce Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`w-screen h-screen overflow-x-hidden antialiased`}
        >
        <SyncUserFromToken/>
        <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableColorScheme
        enableSystem
        disableTransitionOnChange
        >
          <SmoothScroll>
          {children}
          </SmoothScroll>
          </ThemeProvider>
      </body>
    </html>
  );
}
