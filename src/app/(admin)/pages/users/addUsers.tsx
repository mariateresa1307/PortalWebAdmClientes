"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import CustomModal from "../../../components/modalAdd";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { axiosInstance } from "@/app/helpers/axiosConfig";
import Swal from "sweetalert2";
import { FormHelperText } from "@mui/material";

const OnlyText = new RegExp(/[a-zA-ZÀ-ÿ]{3,10}$/);
const Correo = new RegExp(/[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,4}/);

export default (props: any) => {
  const [state, setState] = useState({
    nombre: {
      value: "",
      error: false,
      helperText: "Ingrese el nombre",
      validation: OnlyText,
    },
    apellido: {
      value: "",
      error: false,
      helperText: "Ingrese el apellido",
      validation: OnlyText,
    },
    correo: {
      value: "",
      error: false,
      helperText: "Ingrese el correo",
      validation: Correo,
    },
    loginUsuario: {
      value: "",
      error: false,
      helperText: "Ingrese el nombre de usuario",
      validation: OnlyText,
    },
  });

  const [tipoUsuario, setTipoUsuario] = useState<{
    value: string;
    options: Array<{ label: String; id: string }>;
    error: boolean;
    helperText: string;
  }>({
    value: "",
    options: [],
    error: false,
    helperText: "Seleccionar campo",
  });

  const [departamentoUsuario, setDepartamentoUsuario] = useState<{
    value: string;
    options: Array<{ label: string; id: string }>;
    error: boolean;
    helperText: string;
  }>({
    value: "",
    options: [],
    error: false,
    helperText: "Seleccionar campo",
  });

  const [estatusUsuario, setEstatusUsuario] = useState<{
    value: string;
    options: Array<{ label: string; id: string }>;
    error: boolean;
    helperText: string;
  }>({
    value: "",
    options: [],
    error: false,
    helperText: "Seleccionar campo",
  });

  const [rolUsuario, setRolUsuario] = useState<{
    value: string;
    options: Array<{ label: string; id: string }>;
    error: boolean;
    helperText: string;
  }>({
    value: "",
    options: [],
    error: false,
    helperText: "Seleccionar campo",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const propertyName: string = e.target.name;
    setState((ps) => ({
      ...ps,
      [propertyName]: {
        ...ps[propertyName],
        value: e.target.value,
        error: false,
      },
    }));
  };

  const handleTipoUsuarioSelect = (e: SelectChangeEvent<string>) => {
    setTipoUsuario((prevState) => ({
      ...prevState,
      value: e.target.value,
      error: false,
    }));
  };

  const handleDepartamentoUsuarioSelect = (e: SelectChangeEvent<string>) => {
    setDepartamentoUsuario((prevState) => ({
      ...prevState,
      value: e.target.value,
      error: false,
    }));
  };

  const handleStatusUsuarioSelect = (e: SelectChangeEvent<string>) => {
    setEstatusUsuario((prevState) => ({
      ...prevState,
      value: e.target.value,
      error: false,
    }));
  };

  const handleRolUsuarioSelect = (e: SelectChangeEvent<string>) => {
    setRolUsuario((prevState) => ({
      ...prevState,
      value: e.target.value,
      error: false,
    }));
  };

  const handleGuardar = async () => {
    const prevState = structuredClone(state);

    let StateHasError = false;
    Object.keys(prevState).forEach((key: string) => {
      /*  if (!prevState[key].validation.test(prevState[key].value)) {
          prevState[key].error = true;
          StateHasError = true;
        }*/
    });

    if (!tipoUsuario.value) {
      setTipoUsuario((ps) => ({ ...ps, error: true }));
    }
    if (!departamentoUsuario.value) {
      setDepartamentoUsuario((ps) => ({ ...ps, error: true }));
    }
    if (!estatusUsuario.value) {
      setEstatusUsuario((ps) => ({ ...ps, error: true }));
    }
    if (!rolUsuario.value) {
      setRolUsuario((ps) => ({ ...ps, error: true }));
    }

    if (StateHasError) {
      setState(prevState);
      return;
    }

    try {
      const payload = {
        nombre: state.nombre.value,
        apellido: state.apellido.value,
        codTipo: tipoUsuario.value,
        correo: state.correo.value,
        codDepartamento: departamentoUsuario.value,
        codRol: rolUsuario.value,
        codEstatus: estatusUsuario.value,
        loginUsuario: state.loginUsuario.value,
      };

      const response = await axiosInstance.post(`usuarios/`, payload);
      Swal.fire({
        title: "Usuario Guardado!",
        icon: "success",
      }).then(() => props.onFinish());
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const GetRoles = async () => {
    const results = await axiosInstance.get(`roles/`);

    setRolUsuario((ps) => ({
      ...ps,
      options: results.data.map((item: any) => ({
        label: item.nombreRol,
        id: item.codRol,
      })),
    }));
  };

  const GetDominios = async () => {
    const results = await Promise.all([
      axiosInstance.get(`dominios/DNIO_TIPO_USUARIO`),
      axiosInstance.get(`dominios/DNIO_DPTO_USUARIO`),
      axiosInstance.get(`dominios/DNIO_ESTATUS_USUARIO`),
    ]);

    setTipoUsuario((ps) => ({
      ...ps,
      options: results[0].data.map((item: any) => ({
        label: item.dnioSignificado,
        id: item.dnioValor,
      })),
    }));
    setDepartamentoUsuario((ps) => ({
      ...ps,
      options: results[1].data.map((item: any) => ({
        label: item.dnioSignificado,
        id: item.dnioValor,
      })),
    }));
    setEstatusUsuario((ps) => ({
      ...ps,
      options: results[2].data.map((item: any) => ({
        label: item.dnioSignificado,
        id: item.dnioValor,
      })),
    }));
  };

  useEffect(() => {
    GetRoles();
    GetDominios();
  }, []);

  return (
    <CustomModal
      header={"Gestión de Usuarios"}
      {...props}
      action={{
        title: 'Guardar',
        onClick: handleGuardar
      }}
    >
      <Typography
        sx={{ ml: 10, mt: 3, flex: 1 }}
        style={{ fontSize: "18px", color: "#315e7f", fontWeight: "bold" }}
        component="div"
      >
        Identificacion
      </Typography>

      <Divider style={{ marginLeft: "43px", marginRight: "43px" }} />

      <Grid
        style={{ marginTop: "-131px", padding: "10%" }}
        container
        spacing={4}
      >
        <Grid item xs={6}>
          <TextField
            label=" Nombres "
            name={"nombre"}
            value={state.nombre.value}
            onChange={handleChange}
            fullWidth
            variant="filled"
            required
            error={state.nombre.error}
            helperText={state.nombre.error ? state.nombre.helperText : null}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            label=" Apellidos"
            name={"apellido"}
            value={state.apellido.value}
            onChange={handleChange}
            fullWidth
            variant="filled"
            required
            error={state.apellido.error}
            helperText={state.apellido.error ? state.apellido.helperText : null}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Corrreo Electronico"
            name={"correo"}
            value={state.correo.value}
            onChange={handleChange}
            fullWidth
            variant="filled"
            required
            error={state.correo.error}
            helperText={state.correo.error ? state.correo.helperText : null}
          />
        </Grid>
      </Grid>

      <Typography
        sx={{ ml: 10, flex: 1 }}
        style={{
          marginTop: "-90px",
          fontSize: "18px",
          color: "#315e7f",
          fontWeight: "bold",
        }}
      >
        {" "}
        Funciones
      </Typography>

      <Divider style={{ marginLeft: "43px", marginRight: "43px" }} />
      <Grid
        style={{ marginTop: "-117px", padding: "10%" }}
        container
        spacing={4}
      >
        <Grid item xs={6}>
          <FormControl
            variant="filled"
            fullWidth
            required
            error={departamentoUsuario.error}
          >
            <InputLabel id="demo-simple-select-filled-label">
              Departamento
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={departamentoUsuario.value}
              name="departamento"
              onChange={handleDepartamentoUsuarioSelect}
            >
              {departamentoUsuario.options.map((item) => (
                <MenuItem value={item.id}>{item.label}</MenuItem>
              ))}
            </Select>
            {departamentoUsuario.error && (
              <FormHelperText>{departamentoUsuario.helperText}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item md={6}>
          <FormControl
            variant="filled"
            fullWidth
            required
            error={rolUsuario.error}
          >
            <InputLabel id="demo-simple-select-filled-label">Rol</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={rolUsuario.value}
              name="rol"
              onChange={handleRolUsuarioSelect}
            >
              {rolUsuario.options.map((item) => (
                <MenuItem value={item.id}>{item.label}</MenuItem>
              ))}
            </Select>
            {rolUsuario.error && (
              <FormHelperText>{rolUsuario.helperText}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item md={6}>
          <FormControl
            variant="filled"
            fullWidth
            required
            error={estatusUsuario.error}
          >
            <InputLabel id="demo-simple-select-filled-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={estatusUsuario.value}
              name="status"
              onChange={handleStatusUsuarioSelect}
            >
              {estatusUsuario.options.map((item) => (
                <MenuItem value={item.id}>{item.label}</MenuItem>
              ))}
            </Select>
            {estatusUsuario.error && (
              <FormHelperText>{estatusUsuario.helperText}</FormHelperText>
            )}
          </FormControl>
        </Grid>
      </Grid>
      <Typography
        sx={{ ml: 10, flex: 1 }}
        style={{
          marginTop: "-90px",
          fontSize: "18px",
          color: "#315e7f",
          fontWeight: "bold",
        }}
        component="div"
      >
        Credenciales
      </Typography>
      <Divider style={{ marginLeft: "43px", marginRight: "43px" }} />

      <Grid
        style={{ marginTop: "-118px", padding: "10%" }}
        container
        spacing={4}
      >
        <Grid item xs={6}>
          <FormControl
            variant="filled"
            fullWidth
            required
            error={tipoUsuario.error}
          >
            <InputLabel id="demo-simple-select-filled-label">
              Tipo Usuario
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={tipoUsuario.value}
              name="tipoUsuario"
              onChange={handleTipoUsuarioSelect}
            >
              {tipoUsuario.options.map((item) => (
                <MenuItem value={item.id}>{item.label}</MenuItem>
              ))}
            </Select>
            {tipoUsuario.error && (
              <FormHelperText>{tipoUsuario.helperText}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <TextField
            name={"loginUsuario"}
            label="Nombre Usuario"
            value={state.loginUsuario.value}
            onChange={handleChange}
            fullWidth
            variant="filled"
            required
            error={state.loginUsuario.error}
            helperText={
              state.loginUsuario.error ? state.loginUsuario.helperText : null
            }
          />
        </Grid>
      </Grid>
    </CustomModal>
  );
};
