"use client";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { axiosInstance } from "@/app/helpers/axiosConfig";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import React from "react";

const OnlyText = new RegExp(/[a-zA-ZÀ-ÿ]{3,10}$/);

export default function RestorePassword(props: any) {
  const [state, setState] = useState({ claveAnterior: "", claveNueva: "" });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleChangePassword = async () => {
    try {
      const payload = {
        claveAnterior: state.claveAnterior,
        claveNueva: state.claveNueva,
      };
      const session = JSON.parse(localStorage.getItem("ntu-session") || "{}");
      await axiosInstance.put(
        `usuarios/cambiarclave/${session.loginUsuario}`,
        payload
      );

      Swal.fire({
        title: "Su contraseña fue cambiada!",
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/");
        }
      });
    } catch (error) {
     console.log(error);
     
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState((ps) => ({ ...ps, [e.target.name]: e.target.value }));
  };

  return (
    <Box sx={{ pl: 10, pr: 10, minWidth: 275 }}>
      <Card variant="outlined" sx={{ mt: 10 }}>
        <CardContent>
          <div style={{ textAlign: "center" }}>
            <AccountCircleIcon
              style={{ color: "#9f9f9f", width: "180px", height: "129px" }}
            />
          </div>

          <Typography
            component="h6"
            align="center"
            variant="h6"
            style={{ marginTop: "-20px" }}
          >
            Cambiar contraseña
          </Typography>

          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
            sx={{ pl: 20, pr: 20 }}
          >
            <Grid item xs={12} md={12} lg={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Anterior contraseña
                </InputLabel>
                <OutlinedInput
                  name={"claveAnterior"}
                  value={state.claveAnterior}
                  onChange={handleChange}
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
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

            <Grid item xs={12} md={12} lg={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Nueva contraseña</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  name={"claveNueva"}
                  value={state.claveNueva}
                  onChange={handleChange}
                  fullWidth
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

            <Grid item xs={12} sx={{ mt: 2, mb: 6 }}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => handleChangePassword()}
              >
                Guardar
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
