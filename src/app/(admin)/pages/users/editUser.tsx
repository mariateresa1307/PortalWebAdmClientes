'use client'
import * as React from 'react';
import CustomModal from "../../../components/modalAdd"
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import CachedIcon from '@mui/icons-material/Cached';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2'

export default  (props:any) => {
  const [age, setAge] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  const handleChange1 = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleResetPassword =() =>{
    Swal.fire({
      title: "Estas seguro?",
      text: "Deseas restablecer la contraseña",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Completado",
          text: "Contraseña Restablecida",
          icon: "success"
        });
      }
    });
  }
  
    return (
    
        <CustomModal header={"Gestión de Usuarios"} {...props}>
            
         
         <Typography sx={{ ml: 7, mt:4, flex: 1 }} style={{ fontSize: "18px", color: "#315e7f",fontWeight:"bold"}}  component="div">
          Identificacion
        </Typography>
       
          <Divider style={{ marginLeft: "43px", marginRight: "43px" }} />
        <Grid style={{ marginTop: "-100px", padding: "10%" }} container spacing={4}>


          <Grid item xs={6}>
            <TextField
              name="primernombreUsuario"
              label="Primer Nombre "
              fullWidth
              variant="filled"

            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="primernombreUsuario"
              label="Segundo  Nombres "
              fullWidth
              variant="filled"

            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="primerApellido"
              label="Primer Apellido"
              fullWidth
              variant="filled"

            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="segundoApellido"
              label="Segundo Apellido"
              fullWidth
              variant="filled"

            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="Email"
              label="Corrreo Electronico"
              fullWidth
              variant="filled"

            />
          </Grid>
        </Grid>

      

        <Typography sx={{ ml: 7, flex: 1 }} style={{  marginTop:"-70px",fontSize: "18px", color: "#315e7f",fontWeight:"bold"}}  component="div">
       
          Funciones
     
        </Typography>

        <Divider style={{ marginLeft: "43px", marginRight: "43px" }} />
        
        <Grid style={{ marginTop: "-100px", padding: "10%" }} container spacing={4}>

          <Grid item xs={6}>
            <FormControl variant="filled" fullWidth>
              <InputLabel id="demo-simple-select-filled-label">Departamento</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={age}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item md={6}>
            <FormControl variant="filled" fullWidth>
              <InputLabel id="demo-simple-select-filled-label">Rol</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={age}
                onChange={handleChange1}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item md={6}>
            <FormControl variant="filled" fullWidth>
              <InputLabel id="demo-simple-select-filled-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={age}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Activo</MenuItem>
                <MenuItem value={20}>Inactivo</MenuItem>

              </Select>
            </FormControl>
          </Grid>

          </Grid>
          <Typography sx={{ ml: 7, flex: 1 }} style={{  marginTop:"-70px",fontSize: "18px", color: "#315e7f",fontWeight:"bold"}}  component="div">
          Credenciales          
        </Typography>
          <Divider style={{ marginLeft: "43px", marginRight: "43px" }} />

          <Grid style={{ marginTop: "-100px", padding: "10%" }} container spacing={4}>

          <Grid item xs={6}>
            <FormControl variant="filled" fullWidth>
              <InputLabel id="demo-simple-select-filled-label">Tipo Usuario</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={age}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Admin</MenuItem>
                <MenuItem value={20}>Cliente</MenuItem>

              </Select>
            </FormControl>
          </Grid>


          <Grid item xs={6}>
            <TextField
              name="nombreUsuario"
              label="Nombre Usuario"
              fullWidth
              variant="filled"

            />
          </Grid>
          <Grid item xs={6}>
          <FormControl fullWidth variant="filled">
            <InputLabel htmlFor="filled-adornment-password">
              Anterior Contraseña
            </InputLabel>
            <FilledInput
              id="filled-adornment-password"
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
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth variant="filled">
            <InputLabel htmlFor="filled-adornment-password">
              Nueva Contraseña
            </InputLabel>
            <FilledInput
              id="filled-adornment-password"
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
            />
          </FormControl>
        </Grid>

       


        </Grid>

      </CustomModal>
                  )
    }