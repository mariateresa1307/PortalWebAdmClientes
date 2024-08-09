"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { axiosInstance } from "@/app/helpers/axiosConfig";
import { Fab, FormHelperText, Toolbar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function CustomizedDialogs(props: any) {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const [search, setSearch] = useState("");

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

  useEffect(() => {
    GetDominios();
  }, []);



  const handleSearch = async () => {

  
    await props.getUserList({
      codPagina: 1,
      codDepartamento:  departamentoUsuario.value,
      codEstatus: estatusUsuario.value ,
      codTipo:  tipoUsuario.value,
      nombreUsuario: search
    })
  }



  return (
    <div
      style={{
        background: "#344a8f70",
        zIndex: 15,
        position: "relative",
        marginLeft: "20px",
        marginRight: "20px",
        borderBottomLeftRadius: "5px",
        borderTopLeftRadius: "5px",
        borderBottomRightRadius: "5px",
        borderTopRightRadius: "5px",
        backdropFilter: "blur(20px)",
        paddingTop: "10px",
        paddingBottom: "10px",
      }}
    >
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }}
      >
        <Grid container spacing={1}>
          <Grid item md={11}></Grid>
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Departamento
                </InputLabel>
                <Select
                  style={{ background: "white" }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                  value={departamentoUsuario.value}
                  name="departamento"
                  onChange={handleDepartamentoUsuarioSelect}
                >
                  <MenuItem >Ninguno</MenuItem>
                  {departamentoUsuario.options.map((item) => (
                    <MenuItem value={item.id}>{item.label}</MenuItem>
                  ))}
                </Select>
                {departamentoUsuario.error && (
                  <FormHelperText>
                    {departamentoUsuario.helperText}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Estatus</InputLabel>
                <Select
                  style={{ background: "white" }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={estatusUsuario.value}
                  name="status"
                  onChange={handleStatusUsuarioSelect}
                >
                   <MenuItem >Ninguno</MenuItem>
                  {estatusUsuario.options.map((item) => (
                    <MenuItem value={item.id}>{item.label}</MenuItem>
                  ))}
                </Select>
                {estatusUsuario.error && (
                  <FormHelperText>{estatusUsuario.helperText}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Tipo de usuario
                </InputLabel>
                <Select
                  style={{ background: "white" }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={tipoUsuario.value}
                  name="tipoUsuario"
                  onChange={handleTipoUsuarioSelect}
                >
                   <MenuItem >Ninguno</MenuItem>
                  {tipoUsuario.options.map((item) => (
                    <MenuItem value={item.id}>{item.label}</MenuItem>
                  ))}
                </Select>
                {tipoUsuario.error && (
                  <FormHelperText>{tipoUsuario.helperText}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={3}>
              <TextField
                style={{ background: "white" }}
                id="outlined-basic"
                label="Buscar Nombre"
                variant="outlined"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={1}>
          <Fab style={{ background: " #344a8f", color: "white" }}  onClick={handleSearch} >
            <SearchIcon />
          </Fab>
        </Grid>
      </Toolbar>
    </div>
  );
}
