"use client";
import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import logo from "../../../assets/image/2logonet.png";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import OutlinedInput from "@mui/material/OutlinedInput";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


export default function OutlinedCard() {
  const handleLogin = () => {
    console.log("GOGOG");
  };

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent>
          
            <Image
              src={logo}
              alt=""
              style={{
                width: "60%",
                height:"0%",
                maxWidth: "100%",
                marginLeft: "auto",
                marginRight: "auto",
                display: "block",
              }}
            />


            <form noValidate>
              <Typography
                component="h6"
                align="center"
                variant="h6"
                style={{ marginTop: "-20px" , }}
              >
                Iniciar sesión
              </Typography>

              <br />
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={8} md={8} lg={8}>
                  <TextField label="Usuario" fullWidth />
                </Grid>

                <Grid item xs={8} md={8} lg={8}>
                  <FormControl
                    fullWidth
                    sx={{ mt: 1, mb: 1 }}
                    variant="outlined"
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            edge="end"
                          >
                            <Visibility />
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
                </Grid>
                
                <Grid item xs={8} sx={{ mt: 2, mb: 6 }}>
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                    href="../../pages/home"
                  >
                    Ingresar
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </React.Fragment>
      </Card>
    </Box>
  );
}
