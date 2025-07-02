import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        protocol:'https',
        hostname:'plus.unsplash.com'
      },
       {
        protocol:'https',
        hostname:'i.imgur.com'
      },
       {
        protocol:'https',
        hostname:'cdn.dummyjson.com'
       },
       {
        protocol:'https',
        hostname:'res.cloudinary.com'
       }
    ]
  }
};

export default nextConfig;
