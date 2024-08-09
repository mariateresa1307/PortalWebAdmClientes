"use client";
import { ChangeEvent, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import logo from "../../../../../public/images/2logonet.png";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import { axiosInstance } from "@/app/helpers/axiosConfig";
import { AxiosRequestConfig } from "axios";
import { useRouter } from 'next/navigation'
import Swal from "sweetalert2";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState({ user: "", password: "" });
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const router = useRouter()
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleLogin = async () => {
    try {
      const payload = {
        loginUsuario: state.user,
        claveUsuario: state.password
      }
      const config: AxiosRequestConfig = {
        headers: payload
      }
      const response = await axiosInstance.get('auth/login', config);
      const session = response.data[0];
      localStorage.setItem('ntu-session', JSON.stringify(session));
      router.push('pages/home');

    } catch (error) {
    
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Usuario o clave invalido!",
        
      });
    }

  };


  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => {
    setState(ps => ({ ...ps, [e.target.name]: e.target.value }))
  }

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <>
          <CardContent>
            <Image
              src={logo}
              alt=""
              style={{
                width: "60%",
                height: "0%",
                maxWidth: "100%",
                marginLeft: "auto",
                marginRight: "auto",
                display: "block",
              }}
            />


            <Typography
              component="h6"
              align="center"
              variant="h6"
              style={{ marginTop: "-20px" }}
            >
              Iniciar sesión
            </Typography>

            <br />
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={1}
            >
              <Grid item xs={8} md={8} lg={8}>
                <TextField label="Usuario" value={state.user} name={'user'} onChange={handleUserInput} fullWidth />
              </Grid>

              <Grid item xs={8} md={8} lg={8}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    name={'password'}
                    value={state.password}
                    onChange={handleUserInput}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
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
                >
                  Ingresar
                </Button>
              </Grid>
            </Grid>

          </CardContent>
        </>
      </Card>
    </Box>
  );
}
