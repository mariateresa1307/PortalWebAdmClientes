'use client'

//import "./globals.css";
import Menu from "../../components/menu";
import "../../assets/css/global.css";
import { usePathname } from 'next/navigation'
import { GradientCircularProgress } from "@/app/components/loader";
import { useEffect } from "react";
import { AvailablePagesMap } from "@/app/helpers/availablePages";
import { getAvailablePagesFromSession } from "@/app/helpers/session";
import { useRouter, notFound } from 'next/navigation'


export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname()

  useEffect(() => {

    const availablePagesFromSession = getAvailablePagesFromSession();
    let userHavePermissions = false;
    for(const availablePage of availablePagesFromSession) {

      
      Object.keys(AvailablePagesMap).forEach(key => {
        
        if(key === availablePage.nombrePagina && pathname.includes(AvailablePagesMap[key])) {
          userHavePermissions = true
        }
      })
      
    }
    

    if(!userHavePermissions) {
      return notFound();
    }



    

  }, [pathname])

 

  return (
    <html lang="en">
      <body  >
      
          <Menu>{children}</Menu>
          <div
            style={{
              top: "64px",
              width: "100%",
              minWidth: "360px",
              position: "absolute",
              zIndex: 1,
              backgroundColor: "#000a29",
              borderBottom: "5px solid #7fb300",
            }}
          />

          <GradientCircularProgress />
       
      </body>
    </html>
  );
}
