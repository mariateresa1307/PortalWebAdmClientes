'use client'

//import "./globals.css";
import Menu from "../../components/menu";
import "../../assets/css/global.css";


export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
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
       
      </body>
    </html>
  );
}
