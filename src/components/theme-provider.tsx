"use client"
import * as react from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function ThemeProvider({
   children,
   ...props
}:React.ComponentProps<typeof NextThemesProvider>){
   return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}