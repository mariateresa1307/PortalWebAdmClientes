import * as React from "react";
import styles from "../app/assets/css/page.module.css";
import Login from "./(login)/pages/login/page";
import Grid from "@mui/material/Grid";
import  "./assets/css/page.login.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Adm login',
  description: 'Admin website',
};

export default function Home() {
  return (
    <main className={styles.main}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={8}>
          <div className={styles.center}></div>
        </Grid>
        <Grid
          item
          xs={8}
          style={{
            
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            position: "relative",
          
          }}
        >
          <Login />
        </Grid>

        <div className={styles.center}></div>
      </Grid>
    </main>
  );
}
