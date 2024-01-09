/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: "/api/:path*",
        //   destination: "http://localhost:8000/:path*",
          destination: "https://todo-mern-6z9x.vercel.app/:path*",
        },
      ];
    },
  };
  
  module.exports = nextConfig;