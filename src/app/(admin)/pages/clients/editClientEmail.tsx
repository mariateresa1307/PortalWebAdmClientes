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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { axiosInstance } from "@/app/helpers/axiosConfig";
import Swal from "sweetalert2";
import { parseISO } from "date-fns";

const Correo = new RegExp(/[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,4}/);

export default (props: any) => {
  const [client, setClient] = useState({
    codAbonado: {
      value: 0,
    },
    documento: {
      value: 0,
    },
    nombre: {
      value: "",
    },
    fechaActivacion: {
      value: "",
    },
    fechaRegistro: {
      value: "",
    },
    telefono: {
      value: 0,
    },
    correo: {
      value: "",
      error: false,
      helperText: "Ingrese el correo",
      validation: Correo,
    },
    tipoCliente: {
      value: "",
    },
    estatus: {
      value: "",
    },
  });
  const [value, setValue] = useState<{
    value: Date;
  }>({
    value: new Date(),
  });

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
        valorNuevo: client.correo.value,
      };
      const response = await axiosInstance.put(
        `clientes/cambiarcorreo/${client.documento.value}`,
        payload
      );
      Swal.fire({
        title: "Email Guardado!",
        icon: "success",
      }).then(() => props.onFinish());
    } catch (error) {
      console.error("Error saving email:", error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const propertyName: string = e.target.name;
    setClient((ps) => ({
      ...ps,
      [propertyName]: {
        ...ps[propertyName  as keyof typeof ps & string],
        value: e.target.value,
        error: false,
      },
    }));
  };

  useEffect(() => {
    if (props.client) {
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
        estatus: { ...ps.estatus, value: props.client.estatus },
      }));
    }
  }, [props.client]);

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
            name={"nombreUsuario"}
            label=" Nombres "
            fullWidth
            variant="filled"
            value={client.nombre.value}
          />
        </Grid>

        <Grid item xs={2} md={2} sm={12}>
          <DatePicker
            sx={{ width: "100%", background: "#e0e0e0" }}
            disabled
            label="Fecha Activacion"
            value={parseISO(client.fechaActivacion.value || "")}
          />
        </Grid>

        <Grid item xs={2} md={2} sm={12}>
          <DatePicker
            sx={{ width: "100%", background: "#e0e0e0" }}
            disabled
            label="Fecha Registro"
            value={parseISO(client.fechaRegistro.value || "")}
            //onChange={(newValue) => setValue(newValue)}
          />
        </Grid>
      </Grid>

      <Typography
        sx={{ ml: 7, flex: 1, mt: 3 }}
        style={{ fontSize: "18px", color: "#315e7f", fontWeight: "bold" }}
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
            required
            value={client.correo.value}
            onChange={handleChange}
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
              <MenuItem value={client.tipoCliente.value}>
                <em>{client.tipoCliente.value}</em>
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl disabled variant="filled" fullWidth>
            <InputLabel id="demo-simple-select-filled-label">
              Estatus
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={client.estatus.value}
            >
              <MenuItem value={client.estatus.value}>
                <em>{client.estatus.value}</em>
              </MenuItem>
              <MenuItem value={10}>Activo</MenuItem>
              <MenuItem value={20}>Inactivo</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </CustomModal>
  );
};
