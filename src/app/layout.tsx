"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeUIProvider } from "theme-ui";
import {
  ThemeProvider,
  createTheme as materialCreateTheme,
  THEME_ID,
} from "@mui/material/styles";

const inter = Inter({ subsets: ["latin"] });

const materialTheme = materialCreateTheme({
  palette: {
    primary: { main : "#344a8f"},
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider theme={{ [THEME_ID]: materialTheme }}>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ThemeProvider>
  );
}
