"use client";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import * as XLSX from "xlsx-js-style";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  ButtonGroup,
  Card,
  CardContent,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import CustomModal from "./modalAdd";
import { useEffect, useState, useCallback } from "react";
import { read, utils, writeFileXLSX } from "xlsx";
import { axiosInstance } from "../helpers/axiosConfig";
import { CustomTable } from "@/app/components/materialTable";
import logo from "../../app/assets/image/2logonet.png";
import Image from "next/image";
import { format } from "date-fns";
import CustomCard from "./customCard";
import { getSession } from "@/app/helpers/session";

interface OperacionesTable {
  data: Array<{
    nombre: string;
    fechaOperacion: string;
    tipoModificacion: string;
    tipoCliente: string;
    cantOperaciones: string;
  }>;
  page: number;
  pageCount: number;
  itemsPerPage: number;
  totalResidencial: number;
  totalCorporativo: number;
  total: number;
  totalOpActCorreo: number;
  totalOpActEstatus: number;
  totalOpActClave: number;
}

export default function ReportOperaciones(props: any) {
  const [fechaInicioOperaciones, setFechaInicioOperaciones] = useState<Date>(
    new Date()
  );
  const [fechaFinOperaciones, setFechaFinperaciones] = useState<Date>(
    new Date()
  );
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [operaciones, setOperacionesReport] = useState<OperacionesTable>();
  const [searchParams, setSearchParams] = useState({
    loginUsuario: getSession().loginUsuario,
    codPagina: 1,
    tipoCliente: undefined,
    nombreUsuario: undefined,
    tipoModificacion: undefined,
  });

  const [tipoModificacion, setTipoModificacion] = useState<{
    value: string;
    options: Array<{ label: string; id: string }>;
    error: boolean;
    helperText: string;
  }>({
    value: "",
    options: [
      {
        id: "1",
        label: "Correo",
      },
      {
        id: "2",
        label: "Estatus",
      },
      {
        id: "3",
        label: "Clave",
      },
    ],
    error: false,
    helperText: "Seleccionar campo",
  });

  const [tipoCliente, setTipoCliente] = useState<{
    value: string;
    options: Array<{ label: String; id: string }>;
    error: boolean;
    helperText: string;
  }>({
    value: "1",
    options: [
      {
        id: "1",
        label: "Residencial",
      },
      {
        id: "2",
        label: "Corporativo",
      },
      {
        id: "3",
        label: "Residencial+Corporativo",
      },
    ],
    error: false,
    helperText: "Seleccionar campo",
  });

  const GetDominios = async () => {
    const results = await Promise.all([
      axiosInstance.get(`dominios/DNIO_TIPO_CLIENTE`),
      axiosInstance.get(`dominios/DNIO_TIPO_MODIFICACION`),
    ]);

    setTipoCliente((ps) => ({
      ...ps,
      options: results[0].data.map((item: any) => ({
        label: item.dnioSignificado,
        id: item.dnioValor,
      })),
    }));
    setTipoModificacion((ps) => ({
      ...ps,
      options: results[1].data.map((item: any) => ({
        label: item.dnioSignificado,
        id: item.dnioValor,
      })),
    }));
  };

  const handleClose = () => {
    setOpen(false);
  };
  const getOperacionesReport = async (params?: any) => {
    try {
      const result = await axiosInstance.get(`clientes/reporteOperaciones`, {
        params: {
          loginUsuario: searchParams.loginUsuario,
          codPagina: searchParams.codPagina,
          fIniOperacion: format(fechaInicioOperaciones, "yyyy-MM-dd"),
          fFinOperacion: format(fechaFinOperaciones, "yyyy-MM-dd"),
          tipoModificacion: tipoModificacion.value,
          tipoCliente: tipoCliente.value,
          nombreUsuario: search,
        },
      });

      setOperacionesReport(result.data);
      //setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const onFinish = (): void => {
    setSearchParams((prevState) => ({
      ...prevState,
      codPagina: searchParams.codPagina,
      tipoCliente: undefined,
    }));
  };

  useEffect(() => {
    GetDominios();

    setTipoModificacion((ps) => ({
      ...ps,
      value: tipoModificacion.value,
    }));
    setTipoCliente((ps) => ({
      ...ps,
      value: tipoCliente.value,
    }));
  }, []);

  useEffect(() => {
    getOperacionesReport();
  }, [searchParams]);

  const handleTipoModificacionSelect = (e: SelectChangeEvent<string>) => {
    setTipoModificacion((prevState) => ({
      ...prevState,
      value: e.target.value,
      error: false,
    }));
  };
  const handleTipoClienteSelect = (e: SelectChangeEvent<string>) => {
    setTipoCliente((prevState) => ({
      ...prevState,
      value: e.target.value,
      error: false,
    }));
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={2} md={2} sm={12}>
          <DatePicker
            label="Fecha Operacion inicio"
            value={fechaInicioOperaciones}
            onChange={(newValue) =>
              setFechaInicioOperaciones(newValue || new Date())
            }
            format="yyyy-MM-dd"
            views={["year", "month", "day"]}
          />
        </Grid>

        <Grid item xs={2} md={2} sm={12}>
          <DatePicker
            label="Fecha Operacion fin "
            value={fechaFinOperaciones}
            onChange={(newValue) =>
              setFechaFinperaciones(newValue || new Date())
            }
            format="yyyy-MM-dd"
            views={["year", "month", "day"]}
          />
        </Grid>

        <Grid item xs={2} md={2}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Tipo Modificacion
              </InputLabel>
              <Select
                labelId="ddd"
                id="demo-simple-select"
                value={tipoModificacion.value}
                label="Tipo Modificacion "
                name="tipoModificacion"
                onChange={handleTipoModificacionSelect}
              >
                <MenuItem>Ninguno</MenuItem>
                {tipoModificacion.options.map((estado) => (
                  <MenuItem value={estado.id}>
                    <em>{estado.label}</em>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>

        <Grid item xs={2} md={2}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Tipo cliente
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={tipoCliente.value}
                label="Tipo cliente"
                name="tipoCliente"
                onChange={handleTipoClienteSelect}
              >
                {tipoCliente.options.map((item) => (
                  <MenuItem value={item.id}>{item.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>

        <Grid item xs={3} md={3}>
          <TextField
            id="outlined-basic"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            label="Buscar Nombre"
            variant="outlined"
          />
        </Grid>

        <Grid textAlign="center" sx={{ mt: 3 }} item xs={12} md={12}>
          <Button
            variant="contained"
            onClick={() => {
              setSearchParams((ps) => ({
                ...ps,
              }));
              setOpen(true);
            }}
          >
            Generar Reporte
          </Button>
        </Grid>
      </Grid>

      <CustomModal
        open={open}
        handleClose={handleClose}
        title={"  Reporte de Operaciones"}
        action={{
          title: "Descargar Excel",
          onClick: async () => {
            const result = await axiosInstance.get(
              `clientes/reporteOperaciones/exportar`,
              {
                params: {
                  loginUsuario: searchParams.loginUsuario,
                  fIniOperacion: format(fechaInicioOperaciones, "yyyy-MM-dd"),
                  fFinOperacion: format(fechaFinOperaciones, "yyyy-MM-dd"),
                  tipoModificacion: tipoModificacion.value,
                  tipoCliente: tipoCliente.value,
                  nombreUsuario: search,
                },
              }
            );

            //const worksheet = XLSX.utils.json_to_sheet([ {}, {} , ...result.data.data]);

            const workbook = XLSX.utils.book_new();
            var style = {
              fill: { fgColor: { rgb: "dadee3)" } },
              alignment: { wrapText: true,  horizontal:"center" },
              border: {
                  top: { style: 'thin', color: { rgb: '9ca4af' } },
                  bottom: { style: 'thin', color: { rgb: '9ca4af' } },
                  left: { style: 'thin', color: { rgb: '9ca4af' } },
                  right: { style: 'thin', color: { rgb: '9ca4af'   
           } }
              }
          };
            const worksheet = XLSX.utils.aoa_to_sheet([
              [
                {
                  v: "",
                  t: "s",
                  s: {
                    fill: { fgColor: { rgb: "071c67)" } },
                    font: { bold: true, sz: 14 },
                    alignment: { wrapText: true },
                  },
                },
                {
                  v: "",
                  t: "s",
                  s: {
                    fill: { fgColor: { rgb: "071c67)" } },
                    font: { bold: true, sz: 14 },
                    alignment: { wrapText: true },
                  },
                },
                {
                  v: "Reporte de",
                  t: "s",
                  s: {
                    fill: { fgColor: { rgb: "071c67)" } },
                    font: { bold: true, sz: 14 },
                    alignment: { horizontal:"right"},
                  },
                },
                {
                  v: " Operaciones",
                  t: "s",
                  s: {
                    fill: { fgColor: { rgb: "071c67)" } },
                    font: { bold: true, sz: 14 },
                    alignment: { wrapText: true },
                  },
                },
                {
                  v: "",
                  t: "s",
                  s: {
                    fill: { fgColor: { rgb: "071c67)" } },
                    font: { bold: true, sz: 14 },
                    alignment: { wrapText: true },
                  },
                },
                {
                  v: "",
                  t: "s",
                  s: {
                    fill: { fgColor: { rgb: "071c67)" } },
                    font: { bold: true, sz: 14 },
                    alignment: { wrapText: true },
                  },
                },
              ],
              [
                {
                  v: "Total Operaciones",
                  t: "s",
                  s: {
                    fill: { fgColor: { rgb: "6783e4)" } },
                    font: { bold: true, sz: 12 },
                    alignment: { wrapText: true,  horizontal:"center" },
                  },
                },
                {
                  v: "Operaciones Residenciales",
                  t: "s",
                  s: {
                    fill: { fgColor: { rgb: "6783e4" } },
                    font: { bold: true, sz: 12 },
                    alignment: { wrapText: true,  horizontal:"center" },
                  },
                },
                {
                  v: "Operaciones Corporativas",
                  t: "s",
                  s: {
                    fill: { fgColor: { rgb: "6783e4" } },
                    font: { bold: true, sz: 12 },
                    alignment: { wrapText: true,  horizontal:"center" },
                  },
                },
                {
                  v: "Actualización de Correo",
                  t: "s",
                  s: {
                    fill: { fgColor: { rgb: "6783e4" } },
                    font: { bold: true, sz: 12 },
                    alignment: { wrapText: true,  horizontal:"center" },
                  },
                },
                {
                  v: "Actualización de Estatus",
                  t: "s",
                  s: {
                    fill: { fgColor: { rgb: "6783e4" } },
                    font: { bold: true, sz: 12 },
                    alignment: { wrapText: true,  horizontal:"center" },
                  },
                },
                {
                  v: "Actualización de Clave",
                  t: "s",
                  s: {
                    fill: { fgColor: { rgb: "6783e4" } },
                    font: { bold: true, sz: 12 },
                    alignment:{ wrapText: true,  horizontal:"center" },
                  },
                },
              ],

              [
                {
                  v: result.data?.total,
                  t: "s",
                  
              
                },
                {
                  v: result.data?.totalResidencial,
                  t: "s",
                 
                },
                {
                  v: result.data?.totalCorporativo,
                  t: "s",
                
                },

                {
                  v: result.data?.totalOpActCorreo,
                  t: "s",
                 
                },

                {
                  v: result.data?.totalOpActEstatus,
                  t: "s",
                  
                },

                {
                  v: result.data?.totalOpActClave,
                  t: "s",
                  
                },
              ],
            ]);
            worksheet["!ref"] = "A1:F1";
            worksheet["!cols"] = [
              { wch: 20 },
              { wch: 20 },
              { wch: 20 },
              { wch: 20 },
              { wch: 20 },
              { wch: 20 },
            ];
            
            worksheet.A3.s = style;
            worksheet.B3.s = style;
            worksheet.C3.s = style;
            worksheet.D3.s = style;
            worksheet.E3.s = style;
            worksheet.F3.s = style;
            XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

            //const ws = XLSX.utils.json_to_sheet([ {}, {} , ...result.data.data]);
            //XLSX.utils.book_append_sheet(workbook, ws)

            XLSX.utils.sheet_add_aoa(
              worksheet,
              [
                [],
                [],
                [
                  {
                    v: "Nombre",
                    t: "s",
                    s: {
                      fill: { fgColor: { rgb: "6783e4" } },
                      font: { bold: true, sz: 12 },
                      alignment:{ wrapText: true,  horizontal:"center" },
                    },
                  },
                  {
                    v: "Fecha Operación",
                    t: "s",
                    s: {
                      fill: { fgColor: { rgb: "6783e4" } },
                      font: { bold: true, sz: 12 },
                      alignment:{ wrapText: true,  horizontal:"center" },
                    },
                  },
                  {
                    v: "Tipo de modificación",
                    t: "s",
                    s: {
                      fill: { fgColor: { rgb: "6783e4" } },
                      font: { bold: true, sz: 12 },
                      alignment:{ wrapText: true,  horizontal:"center" },
                    },
                  },
                  {
                    v: "Tipo Cliente",
                    t: "s",
                    s: {
                      fill: { fgColor: { rgb: "6783e4" } },
                      font: { bold: true, sz: 12 },
                      alignment:{ wrapText: true,  horizontal:"center" },
                    },
                  },
                  {
                    v: "Cantidad de Operaciones",
                    t: "s",
                    s: {
                      fill: { fgColor: { rgb: "6783e4" } },
                      font: { bold: true, sz: 12 },
                      alignment:{ wrapText: true,  horizontal:"center" },
                    },
                  },
                ],

                [
                  ...result.data.data.map((value: any) => ({
                    v: value.nombre,
                    t: "s",
                    s: { alignment: { vertical: "left" } },
                  })),
                ],

                [
                  {
                    v: operaciones?.data[length]?.nombre,
                    t: "s",
                    s: {},
                  },
                ],
              ],
              { origin: "A3" }
            );

            XLSX.writeFile(workbook, "Reporte Operaciones .xlsx", {
              compression: true,
            });
          },
        }}
      >
        <div style={{ padding: "15px" }}>
          <Image
            src={logo}
            alt=""
            style={{
              width: "18%",
              height: "12%",
              maxWidth: "100%",
              marginLeft: "0",
              marginRight: "0",
              display: "block",
              marginBottom: "10px",
            }}
          />
          <Grid
            container
            justifyContent="center"
            style={{ textAlign: "center" }}
            spacing={1}
          >
            <Grid
              item
              xs={2}
              md={2}
              style={{ display: "flex", alignItems: "stretch" }}
            >
              <CustomCard
                title=" Total Operaciones"
                content={`${operaciones?.total || "0"}`}
                background={
                  "linear-gradient(to left, #7559ce, #6f68d7, #6a76de, #6783e4, #678fe9"
                }
                icons={undefined}
              />
            </Grid>
            <Grid
              item
              xs={2}
              md={2}
              style={{ display: "flex", alignItems: "stretch" }}
            >
              <CustomCard
                title=" Operaciones Residenciales"
                content={`${operaciones?.totalResidencial || "0"}`}
                background={
                  "linear-gradient(to left, #5d7616, #68841b, #74921f, #7fa024, #8bae29, #91b629, #96be2a, #9cc62a, #9dc924, #9ecd1e, #9ed015, #9fd408)"
                }
                icons={undefined}
              />
            </Grid>
            <Grid
              item
              xs={2}
              md={2}
              style={{ display: "flex", alignItems: "stretch" }}
            >
              <CustomCard
                title=" Operaciones Corporativas"
                content={`${operaciones?.totalCorporativo || "0"}`}
                background={
                  "radial-gradient(circle at -20.71% 50%, #de9c2c 0, #e5922a 8.33%, #ea852b 16.67%, #ee772d 25%, #f16731 33.33%, #f35436 41.67%, #f23c3c 50%, #f01843 58.33%, #ed004c 66.67%, #e90057 75%, #e30064 83.33%, #db0071 91.67%, #d10080 100%)"
                }
                icons={undefined}
              />
            </Grid>
            <Divider
              style={{ marginTop: "-36px", borderBottom: "5px solid #4e6ea5" }}
            />

            <Grid item xs={2} md={2}>
              <CustomCard
                title=" Actualizaciones Correo"
                content={`${operaciones?.totalOpActCorreo || "0"}`}
                background={
                  "linear-gradient(to right, #5e86a8, #5f89ab, #5f8cae, #608fb0, #6192b3, #5e8fb3, #5b8db3, #588ab3, #5281af, #4f77aa, #4e6da5, #4e639f)"
                }
                icons={undefined}
              />
            </Grid>
            <Grid item xs={2} md={2}>
              <CustomCard
                title="Actualizaciones Estatus"
                content={`${operaciones?.totalOpActEstatus || "0"}`}
                background={
                  "linear-gradient(to right, #5e86a8, #5f89ab, #5f8cae, #608fb0, #6192b3, #5e8fb3, #5b8db3, #588ab3, #5281af, #4f77aa, #4e6da5, #4e639f)"
                }
                icons={undefined}
              />
            </Grid>
            <Grid item xs={2} md={2}>
              <CustomCard
                title="Actualizaciones de Clave"
                content={`${operaciones?.totalOpActClave || "0"}`}
                background={
                  "linear-gradient(to right, #5e86a8, #5f89ab, #5f8cae, #608fb0, #6192b3, #5e8fb3, #5b8db3, #588ab3, #5281af, #4f77aa, #4e6da5, #4e639f)"
                }
                icons={undefined}
              />
            </Grid>
          </Grid>
        </div>
        <div style={{ padding: "20px" }}>
          <CustomTable
            columns={[
              { field: "nombre", title: "Nombre" },
              { field: "fechaOperacion", title: "Fecha Operacion" },
              { field: "tipoModificacion", title: "Tipo Modificacion" },
              { field: "tipoCliente", title: "Tipo Cliente" },
              { field: "cantOperaciones", title: "Cantidad de Operaciones" },
            ]}
            data={operaciones?.data || []}
            pagination={{
              count: (operaciones?.pageCount || 0) * 11,
              page: (operaciones?.page || 1) - 1,
              itemsPerPage: 10,
              onPageChange: (event, page) => {
                setSearchParams((prevState) => ({
                  ...prevState,
                  codPagina: page + 1,
                }));
              },
            }}
          />
        </div>
      </CustomModal>
    </>
  );
}
