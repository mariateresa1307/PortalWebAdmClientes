
import  withPlugins from 'next-compose-plugins';
import  optimizedImages from 'next-optimized-images';


/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    output: "export",
   
    images: {
        unoptimized: true
      },
    typescript: {

        ignoreBuildErrors: true,
    }
};

export default nextConfig
