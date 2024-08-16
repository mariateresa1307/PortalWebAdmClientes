"use client";
import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Fab, Toolbar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { axiosInstance } from "../helpers/axiosConfig";
import { useEffect, useState } from "react";

export default function CustomizedDialogs(props: any) {
  const [search, setSearch] = useState("");

  const [tipoCliente, setTipoCliente] = useState<{
    value: string;
    options: Array<{ label: String; id: string }>;
    error: boolean;
    helperText: string;
  }>({
    value: "3",
    options: [],
    error: false,
    helperText: "Seleccionar campo",
  });

  const GetDominios = async () => {
    const results = await Promise.all([
      axiosInstance.get(`dominios/DNIO_TIPO_CLIENTE`),
    ]);

    setTipoCliente((ps) => ({
      ...ps,
      options: results[0].data.map((item: any) => ({
        label: item.dnioSignificado,
        id: item.dnioValor,
      })),
    }));
  };

  const handleSearch = async () => {
    props.setSearchParams((previusState: any) => ({
      ...previusState, 
      codPagina: 1,
      tipoCliente: tipoCliente.value,
      documento: search,
    }))
    
  };

  useEffect(() => {
    GetDominios();
  }, []);

  const handleTipoClienteelect = (e: SelectChangeEvent<string>) => {
    setTipoCliente((prevState) => ({
      ...prevState,
      value: e.target.value,
      error: false,
    }));
  };

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
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-start"
          spacing={1}
        >
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Tipo Cliente
              </InputLabel>
              <Select
                style={{ background: "white" }}
                labelId="demo-simple-select-label"
                value={tipoCliente.value}
                name="tipoCliente"
                onChange={handleTipoClienteelect}
              >
               
                {tipoCliente.options.map((item) => (
                  <MenuItem value={item.id} key={item.id}>{item.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <TextField
              style={{ background: "white" }}
              id="outlined-basic"
              label="Buscar Documento"
              variant="outlined"
              value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
          </Grid>
          <Grid item md={1}>
            <Fab
              style={{ background: " #344a8f", color: "white" }}
              onClick={handleSearch}
            >
              <SearchIcon />
            </Fab>
          </Grid>
        </Grid>
      </Toolbar>
    </div>
  );
}
