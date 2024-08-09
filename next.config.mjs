
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    //output: process.env.NEXT_NODE_ENV === "dev" ? "standalone" : "export" ,
    typescript: {

        ignoreBuildErrors: true,
    }
};

export default nextConfig
