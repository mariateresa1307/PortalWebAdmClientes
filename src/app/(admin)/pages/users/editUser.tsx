"use client";
import { ChangeEvent, useEffect, useState } from "react";
import CustomModal from "../../../components/modalAdd";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Swal from "sweetalert2";
import { axiosInstance } from "@/app/helpers/axiosConfig";
import { FormHelperText } from "@mui/material";

export default (props: any) => {
  const OnlyText = new RegExp(/[a-zA-ZÀ-ÿ]{3,10}$/);
  const Correo = new RegExp(/[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,4}/);
  const [user, setUser] = useState({
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
  const handleTipoUsuarioSelect = (e: SelectChangeEvent<string>) => {
    setTipoUsuario((prevState) => ({
      ...prevState,
      value: e.target.value,
      error: false,
    }));
  };

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

  const handleStatusUsuarioSelect = (e: SelectChangeEvent<string>) => {
    setEstatusUsuario((prevState) => ({
      ...prevState,
      value: e.target.value,
      error: false,
    }));
  };

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

  const handleRolUsuarioSelect = (e: SelectChangeEvent<string>) => {
    setRolUsuario((prevState) => ({
      ...prevState,
      value: e.target.value,
      error: false,
    }));
  };

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
  const handleDepartamentoUsuarioSelect = (e: SelectChangeEvent<string>) => {
    setDepartamentoUsuario((prevState) => ({
      ...prevState,
      value: e.target.value,
      error: false,
    }));
  };

  const handleGuardar = async () => {
    const prevState = structuredClone(user);

    let StateHasError = false;
    Object.keys(prevState).forEach((key: string) => {
      if (!prevState[key].validation.test(prevState[key].value)) {
        prevState[key].error = true;
        StateHasError = true;
      }
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
      setUser(prevState);
      return;
    }

    try {
      const payload = {
        nombre: user.nombre.value,
        apellido: user.apellido.value,
        codTipo: tipoUsuario.value,
        correo: user.correo.value,
        codDepartamento: departamentoUsuario.value,
        codRol: rolUsuario.value,
        codEstatus: estatusUsuario.value,
        loginUsuario: user.loginUsuario.value,
      };

      const response = await axiosInstance.put(
        `usuarios/${user.loginUsuario.value}`,
        payload
      );
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const propertyName: string = e.target.name;
    const propertyLastName = e.target.name;
   
    setUser((ps) => ({
      ...ps,
      [propertyName]: {
        ...ps[propertyName as keyof typeof ps & string ],
        value: e.target.value,
        error: false,
      },
      [propertyLastName]: {
        ...ps[propertyLastName as keyof typeof ps & string ],
        value: e.target.value,
        error: false,
      },
      
    }));
  };

  useEffect(() => {
    if (props.user) {
      GetDominios();
      GetRoles();
      setUser((ps) => ({
        ...ps,
        nombre: { ...ps.nombre, value: props.user.nombre },
        apellido: { ...ps.apellido, value: props.user.apellido },
        correo: { ...ps.correo, value: props.user.correo },
        loginUsuario: { ...ps.loginUsuario, value: props.user.loginUsuario },
      }));

      setTipoUsuario((ps) => ({
        ...ps,
        value: props.user.codTipo,
      }));
      setEstatusUsuario((ps) => ({
        ...ps,
        value: props.user.codEstatus,
      }));
      setDepartamentoUsuario((ps) => ({
        ...ps,
        value: props.user.codDepartamento,
      }));
      setRolUsuario((ps) => ({
        ...ps,
        value: props.user.codRol,
      }));
    }
  }, [props.user]);

  return (
    <CustomModal
      header={"Gestión de Usuarios"}
      {...props}
      action={{
        title: "Guardar",
        onClick: handleGuardar,
      }}
    >
      <Typography
        sx={{ ml: 7, mt: 4, flex: 1 }}
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
            name={"nombre"}
            label="Nombres "
            fullWidth
            variant="filled"
            onChange={(event) => {
              if (!/^([A-Za-z\s])+$/.test(event.target.value)) {
                return;
              }

              handleChange(event);
            }}
            value={user.nombre.value}
           
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            name={"apellido"}
            label="Apellido"
            fullWidth
            variant="filled"
            value={user.apellido.value}
            onChange={(event) => {
              if (!/^([A-Za-z\s])+$/.test(event.target.value)) {
                return;
              }

              handleChange(event);
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            name={"correo"}
            label="Corrreo Electronico"
            fullWidth
            variant="filled"
            value={user.correo.value}
            onChange={handleChange}
          />
        </Grid>
      </Grid>

      <Typography
        sx={{ ml: 7, flex: 1 }}
        style={{
          marginTop: "-93px",
          fontSize: "18px",
          color: "#315e7f",
          fontWeight: "bold",
        }}
        component="div"
      >
        Funciones
      </Typography>

      <Divider style={{ marginLeft: "43px", marginRight: "43px" }} />

      <Grid
        style={{ marginTop: "-131px", padding: "10%" }}
        container
        spacing={4}
      >
        <Grid item xs={6}>
          <FormControl variant="filled" fullWidth>
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
                <MenuItem key={item.id} value={item.id}>{item.label}</MenuItem>
              ))}
            </Select>
            {departamentoUsuario.error && (
              <FormHelperText>{departamentoUsuario.helperText}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item md={6}>
          <FormControl variant="filled" fullWidth>
            <InputLabel id="demo-simple-select-filled-label">Rol</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={rolUsuario.value}
              name="rol"
              onChange={handleRolUsuarioSelect}
            >
              {rolUsuario.options.map((item) => (
                <MenuItem key={item.id} value={item.id}>{item.label}</MenuItem>
              ))}
            </Select>
            {rolUsuario.error && (
              <FormHelperText>{rolUsuario.helperText}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item md={6}>
          <FormControl variant="filled" fullWidth>
            <InputLabel id="demo-simple-select-filled-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={estatusUsuario.value}
              name="status"
              onChange={handleStatusUsuarioSelect}
            >
              {estatusUsuario.options.map((item) => (
                <MenuItem key={item.id} value={item.id}>{item.label}</MenuItem>
              ))}
            </Select>
            {estatusUsuario.error && (
              <FormHelperText>{estatusUsuario.helperText}</FormHelperText>
            )}
          </FormControl>
        </Grid>
      </Grid>
      <Typography
        sx={{ ml: 7, flex: 1 }}
        style={{
          marginTop: "-93px",
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
        style={{ marginTop: "-131px", padding: "10%" }}
        container
        spacing={4}
      >
        <Grid item xs={6}>
          <FormControl variant="filled" fullWidth>
            <InputLabel id="demo-simple-select-filled-label">
              Tipo Usuario
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              onChange={handleTipoUsuarioSelect}
              value={tipoUsuario.value}
              name="tipoUsuario"
            >
              {tipoUsuario.options.map((item) => (
                <MenuItem key={item.id} value={item.id}>{item.label}</MenuItem>
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
            fullWidth
            disabled
            variant="filled"
            value={user.loginUsuario.value}
          />
        </Grid>
      </Grid>
    </CustomModal>
  );
};
