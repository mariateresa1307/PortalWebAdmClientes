"use client";
import {
  ThemeProvider,
  createTheme as materialCreateTheme,
  THEME_ID,
} from "@mui/material/styles";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { enUS } from 'date-fns/locale';


const materialTheme = materialCreateTheme({
  palette: {
    primary: { main : "#344a8f"},
  },
});

export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider theme={{ [THEME_ID]: materialTheme }}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ enUS }>

      <html lang="en" >
        <body>
          {children}
          
          </body>
      </html>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
