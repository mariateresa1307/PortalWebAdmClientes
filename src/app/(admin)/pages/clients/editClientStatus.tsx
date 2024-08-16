"use client";
import { useEffect, useState } from "react";
import CustomModal from "../../../components/modalAdd";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Swal from "sweetalert2";
import { axiosInstance } from "@/app/helpers/axiosConfig";
import { parseISO } from "date-fns";

export default (props: any) => {
  const [client, setClient] = useState({
    codAbonado: {
      value: { Number },
      error: false,
      helperText: "Ingrese el abonado",
    },
    documento: {
      value: { Number },
      error: false,
      helperText: "Ingrese el documento",
    },
    nombre: {
      value: "",
      error: false,
      helperText: "Ingrese el documento",
    },
    fechaActivacion: {
      value: "",
      error: false,
      helperText: "Ingrese el documento",
    },
    fechaRegistro: {
      value: "",
      error: false,
      helperText: "Ingrese el documento",
    },
    telefono: {
      value: { Number },
      error: false,
      helperText: "Ingrese el documento",
    },
    correo: {
      value: "",
      error: false,
      helperText: "Ingrese el documento",
    },
    tipoCliente: {
      value: "",
      error: false,
      helperText: "Ingrese el documento",
    },
    estatus: {
      value: "",
      error: false,
      helperText: "estatus",
    },
  });

  const [value, setValue] = useState<{
    value: Date;
  }>({
    value: new Date(),
  });

  const [estatus, setEstatusCliente] = useState<{
    value: string;
    options: Array<{ label: string; id: string }>;
    error: boolean;
    helperText: string;
  }>({
    value: "",
    options: [
      {
        id: "1",
        label: "Activo",
      },
      {
        id: "0",
        label: "Inactivo",
      },
    ],
    error: false,
    helperText: "Seleccionar campo",
  });

  const handleStatusClienteSelect = (e: SelectChangeEvent<string>) => {
    setEstatusCliente((prevState) => ({
      ...prevState,
      value: e.target.value,
      error: false,
    }));
  };

  const handleGuardar = async () => {
    const prevState = structuredClone(client);

    let StateHasError = false;
    Object.keys(prevState).forEach((key: string) => {
      if (prevState[key].validation) {
        if (!prevState[key].validation.test(prevState[key].value)) {
          prevState[key].error = true;
          StateHasError = true;
        }
      }
    });

    if (StateHasError) {
      setClient(prevState);
      return;
    }

    try {
      const session = JSON.parse(localStorage.getItem("ntu-session") || "{}");
      const payload = {
        loginUsuario: session.loginUsuario,
        valorNuevo: estatus.value,
      };
      const response = await axiosInstance.put(
        `clientes/cambiarestatus/${client.documento.value}`,
        payload
      );
      Swal.fire({
        title: "Estatus Guardado!",
        icon: "success",
      }).then(() => props.onFinish());
    } catch (error) {
      console.log(error);
      
    }
  };

  useEffect(() => {
    if (props.client?.documento) {
      setClient((ps) => ({
        ...ps,
        codAbonado: { ...ps.codAbonado, value: props.client.codAbonado },
        documento: { ...ps.documento, value: props.client.documento },
        nombre: { ...ps.nombre, value: props.client.nombre },
        correo: { ...ps.correo, value: props.client.correo },
        fechaActivacion: {
          ...ps.fechaActivacion,
          value: props.client.fechaActivacion,
        },
        fechaRegistro: {
          ...ps.fechaRegistro,
          value: props.client.fechaRegistro,
        },
        telefono: { ...ps.telefono, value: props.client.telefono },
        tipoCliente: { ...ps.tipoCliente, value: props.client.tipoCliente },
      }));

      setEstatusCliente((ps) => ({
        ...ps,
        value: props.client.estatus === "Inactivo" ? "0" : "1",
      }));
    }
  }, [props.client?.documento]);

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
        sx={{ ml: 7, mt: 3, flex: 1 }}
        style={{ fontSize: "18px", color: "#315e7f", fontWeight: "bold" }}
        component="div"
      >
        Identificacion
      </Typography>

      <Divider style={{ marginLeft: "43px", marginRight: "43px" }} />
      <Grid sx={{ mt: 0.5, pl: 15, pr: 15 }} style={{}} container spacing={4}>
        <Grid item xs={6}>
          <TextField
            disabled
            name={"codAbonado"}
            label="Abonado "
            fullWidth
            variant="filled"
            value={client.codAbonado.value}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            disabled
            name={"documento"}
            label="Documento"
            fullWidth
            variant="filled"
            value={client.documento.value}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            disabled
            name={"nombre"}
            label=" Nombre "
            fullWidth
            variant="filled"
            value={client.nombre.value}
          />
        </Grid>

        <Grid item xs={3} md={3} sm={12}>
          <DatePicker
            sx={{ width: "100%", background: "#e0e0e0" }}
            label="Fecha Activacion "
            disabled
            value={parseISO(client.fechaActivacion.value)}
          />
        </Grid>

        <Grid item xs={3} md={3} sm={12}>
          <DatePicker
            sx={{ width: "100%", background: "#e0e0e0" }}
            label="Fecha Registro"
            disabled
            value={parseISO(client.fechaRegistro.value)}
          />
        </Grid>
      </Grid>

      <Typography
        sx={{ ml: 7, flex: 1, mt: 3 }}
        style={{ fontSize: "18px", fontWeight: "bold" }}
        component="div"
      >
        Detalles
      </Typography>
      <Divider style={{ marginLeft: "43px", marginRight: "43px" }} />
      <Grid sx={{ mt: 0.5, pl: 15, pr: 15, mb: 10 }} container spacing={4}>
        <Grid item xs={6}>
          <TextField
            name={"telefono"}
            label="Telefono"
            fullWidth
            variant="filled"
            disabled
            value={client.telefono.value}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            name={"correo"}
            label="Correo Electronico"
            fullWidth
            variant="filled"
            disabled
            value={client.correo.value}
          />
        </Grid>

        <Grid item xs={6}>
          <FormControl disabled variant="filled" fullWidth>
            <InputLabel id="demo-simple-select-filled-label">
              Tipo de Cliente
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={client.tipoCliente.value}
            >
              <MenuItem
                value={client.tipoCliente.value}
                key={client.tipoCliente.value}
              >
                <em>{client.tipoCliente.value}</em>
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl variant="filled" fullWidth>
            <InputLabel id="demo-simple-select-filled-label">
              Estatus
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={estatus.value}
              onChange={handleStatusClienteSelect}
            >
              {estatus.options.map((estado) => (
                <MenuItem key={estado.id} value={estado.id}>
                  <em>{estado.label}</em>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </CustomModal>
  );
};
