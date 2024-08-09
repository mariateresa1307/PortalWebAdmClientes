"use client";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import { format } from "date-fns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {  Divider } from "@mui/material";
import CustomModal from "../components/modalAdd";
import { useEffect, useState, useCallback } from "react";
import { axiosInstance } from "../helpers/axiosConfig";
import { CustomTable } from "@/app/components/materialTable";
import logo from "../../app/assets/image/2logonet.png";
import Image from "next/image";
import CustomCard from "./customCard";
import * as XLSX from "xlsx-js-style";
import { getSession } from "@/app/helpers/session";
interface ClientTable {
  data: Array<{
    id: number;
    abonado: number;
    name: string;
    correoElectronico: string;
    tipoCliente: string;
    documento: string;
    fechaRegistro: string;
    fechaActivacion: string;
    status: string;
    telefono: number;
    totalUsers: number;
  }>;
  page: number;
  pageCount: number;
  itemsPerPage: number;
  activeUsers: number;
  inactiveUsers: number;
  totalUsers: number;
  totalActDate: number;
  totalRegDate: number;
}

export default function ReportClients(props: any) {
  const [fechaInicioRegistro, setFechaInicioRegistro] = useState<Date>(
    new Date()
  );
  const [fechaFinRegistro, setFechaFinRegistro] = useState<Date>(new Date());
  const [fechaInicioActivacion, setFechaInicioActivacion] = useState<Date>(
    new Date()
  );
  const [fechaFinActivacion, setFechaFinActivacion] = useState<Date>(
    new Date()
  );
  const [open, setOpen] = useState(false);

  const [searchParams, setSearchParams] = useState({
    loginUsuario: getSession().loginUsuario,
    codPagina: 1,
    tipoCliente: undefined,
    documento: undefined,
  });

  const [client, setClient] = useState<ClientTable>();

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

  const handleClose = () => {
    setOpen(false);
  };

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

  const onFinish = (): void => {
    setSearchParams((prevState) => ({
      ...prevState,
      codPagina: searchParams.codPagina,
      tipoCliente: undefined,
    }));
  };

  const getClientReport = async () => {
    try {
      const result = await axiosInstance.get(`clientes/reporteClientes`, {
        params: {
          loginUsuario: searchParams.loginUsuario,
          codPagina: searchParams.codPagina,
          fIniRegistro: format(fechaInicioRegistro, "yyyy-MM-dd"),
          fFinRegistro: format(fechaFinRegistro, "yyyy-MM-dd"),
          fIniActivacion: format(fechaInicioActivacion, "yyyy-MM-dd"),
          fFinActivacion: format(fechaFinActivacion, "yyyy-MM-dd"),
          tipoCliente: tipoCliente.value,
          codEstatus: estatus.value,
        },
      });

      setClient(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetDominios();
  }, []);

  useEffect(() => {
    getClientReport();
  }, [searchParams]);

  const handleTipoClienteelect = (e: SelectChangeEvent<string>) => {
    setTipoCliente((prevState) => ({
      ...prevState,
      value: e.target.value,
      error: false,
    }));
  };

  const handleStatusClienteSelect = (e: SelectChangeEvent<string>) => {
    setEstatusCliente((prevState) => ({
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
            sx={{ width: "100%" }}
            label="Fecha Registro inicio"
            value={fechaInicioRegistro}
            onChange={(newValue) =>
              setFechaInicioRegistro(newValue || new Date())
            }
            format="yyyy-MM-dd"
            views={["year", "month", "day"]}
          />
        </Grid>
        <Grid item xs={2} md={2} sm={12}>
          <DatePicker
            sx={{ width: "100%" }}
            label="Fecha Registro fin "
            format="yyyy-MM-dd"
            views={["year", "month", "day"]}
            value={fechaFinRegistro}
            onChange={(newValue) => setFechaFinRegistro(newValue || new Date())}
          />
        </Grid>

        <Grid item xs={2} md={2} sm={12}>
          <DatePicker
            sx={{ width: "100%" }}
            label="Fecha Activacion inicio"
            format="yyyy-MM-dd"
            views={["year", "month", "day"]}
            value={fechaInicioActivacion}
            onChange={(newValue) =>
              setFechaInicioActivacion(newValue || new Date())
            }
          />
        </Grid>
        <Grid item xs={2} md={2} sm={12}>
          <DatePicker
            sx={{ width: "100%" }}
            label="Fecha Activacion fin "
            value={fechaFinActivacion}
            format="yyyy-MM-dd"
            views={["year", "month", "day"]}
            onChange={(newValue) =>
              setFechaFinActivacion(newValue || new Date())
            }
          />
        </Grid>

        <Grid item xs={2} md={2} sm={12}>
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
                onChange={handleTipoClienteelect}
              >
                <MenuItem>Ninguno</MenuItem>
                {tipoCliente.options.map((item) => (
                  <MenuItem value={item.id}>{item.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>

        <Grid item xs={2} md={2} sm={12}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Estatus</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={estatus.value}
                label="estatus cliente"
                onChange={handleStatusClienteSelect}
              >
                <MenuItem>Ninguno</MenuItem>
                {estatus.options.map((estado) => (
                  <MenuItem value={estado.id}>
                    <em>{estado.label}</em>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
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
        title={"Reporte de Clientes"}
        action={{
          title: "Descargar excel",
          onClick: async () => {
            const result = await axiosInstance.get(
              `clientes/reporteClientes/exportar`,
              {
                params: {
                  loginUsuario: searchParams.loginUsuario,
                  fIniRegistro: format(fechaInicioRegistro, "yyyy-MM-dd"),
                  fFinRegistro: format(fechaFinRegistro, "yyyy-MM-dd"),
                  fIniActivacion: format(fechaInicioActivacion, "yyyy-MM-dd"),
                  fFinActivacion: format(fechaFinActivacion, "yyyy-MM-dd"),
                  tipoCliente: tipoCliente.value,
                  codEstatus: estatus.value,
                },
              }
            );

            const workbook = XLSX.utils.book_new();
            var style = {
              fill: { fgColor: { rgb: "dadee3)" } },
              alignment: { wrapText: true, horizontal: "center" },
              border: {
                top: { style: "thin", color: { rgb: "9ca4af" } },
                bottom: { style: "thin", color: { rgb: "9ca4af" } },
                left: { style: "thin", color: { rgb: "9ca4af" } },
                right: { style: "thin", color: { rgb: "9ca4af" } },
              },
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
                    font: { bold: true, sz: 15 },
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
                    font: { bold: true, sz: 15 },
                    alignment: { horizontal: "right" },
                  },
                },
                {
                  v: " Clientes",
                  t: "s",
                  s: {
                    fill: { fgColor: { rgb: "071c67)" } },
                    font: { bold: true, sz: 15 },
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
                  v: "Total Clientes",
                  t: "s",
                  s: {
                    fill: { fgColor: { rgb: "6783e4)" } },
                    font: { bold: true, sz: 12 },
                    alignment: { wrapText: true, horizontal: "center" },
                  },
                },
                {
                  v: "Clientes Activos",
                  t: "s",
                  s: {
                    fill: { fgColor: { rgb: "6783e4" } },
                    font: { bold: true, sz: 12 },
                    alignment: { wrapText: true, horizontal: "center" },
                  },
                },
                {
                  v: "Clientes Inactivos",
                  t: "s",
                  s: {
                    fill: { fgColor: { rgb: "6783e4" } },
                    font: { bold: true, sz: 12 },
                    alignment: { wrapText: true, horizontal: "center" },
                  },
                },
                {
                  v: "Total con fecha registro",
                  t: "s",
                  s: {
                    fill: { fgColor: { rgb: "6783e4" } },
                    font: { bold: true, sz: 12 },
                    alignment: { wrapText: true, horizontal: "center" },
                  },
                },
                {
                  v: "Total con fecha de Activación",
                  t: "s",
                  s: {
                    fill: { fgColor: { rgb: "6783e4" } },
                    font: { bold: true, sz: 12 },
                    alignment: { wrapText: true, horizontal: "center" },
                  },
                },
              ],
              [
                {
                  v: result.data?.totalUsers,
                  t: "s",
                },
                {
                  v: result.data?.activeUsers,
                  t: "s",
                },
                {
                  v: result.data?.inactiveUsers,
                  t: "s",
                },

                {
                  v: result.data?.totalRegDate,
                  t: "s",
                },

                {
                  v: result.data?.totalActDate,
                  t: "s",
                },
              ],
            ]);
            worksheet["!ref"] = "A1:I1";
            worksheet["!cols"] = [
              { wch: 20 },
              { wch: 40 },
              { wch: 30 },
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

            XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

            XLSX.utils.sheet_add_aoa(
              worksheet,
              [
                [],
                [],
                [
                  {
                    v: "Abonados",
                    t: "s",
                    s: {
                      fill: { fgColor: { rgb: "6783e4" } },
                      font: { bold: true, sz: 12 },
                      alignment: { wrapText: true, horizontal: "center" },
                    },
                  },
                  {
                    v: "Nombres",
                    t: "s",
                    s: {
                      fill: { fgColor: { rgb: "6783e4" } },
                      font: { bold: true, sz: 12 },
                      alignment: { wrapText: true, horizontal: "center" },
                    },
                  },
                  {
                    v: "Correo Electrónico",
                    t: "s",
                    s: {
                      fill: { fgColor: { rgb: "6783e4" } },
                      font: { bold: true, sz: 12 },
                      alignment: { wrapText: true, horizontal: "center" },
                    },
                  },
                  {
                    v: "Tipo Cliente	",
                    t: "s",
                    s: {
                      fill: { fgColor: { rgb: "6783e4" } },
                      font: { bold: true, sz: 12 },
                      alignment: { wrapText: true, horizontal: "center" },
                    },
                  },
                  {
                    v: "Documento",
                    t: "s",
                    s: {
                      fill: { fgColor: { rgb: "6783e4" } },
                      font: { bold: true, sz: 12 },
                      alignment: { wrapText: true, horizontal: "center" },
                    },
                  },
                  {
                    v: "Fecha Registro	",
                    t: "s",
                    s: {
                      fill: { fgColor: { rgb: "6783e4" } },
                      font: { bold: true, sz: 12 },
                      alignment: { wrapText: true, horizontal: "center" },
                    },
                  },
                  {
                    v: "Fecha Activación",
                    t: "s",
                    s: {
                      fill: { fgColor: { rgb: "6783e4" } },
                      font: { bold: true, sz: 12 },
                      alignment: { wrapText: true, horizontal: "center" },
                    },
                  },
                  {
                    v: "Estatus",
                    t: "s",
                    s: {
                      fill: { fgColor: { rgb: "6783e4" } },
                      font: { bold: true, sz: 12 },
                      alignment: { wrapText: true, horizontal: "center" },
                    },
                  },
                  {
                    v: "Teléfono",
                    t: "s",
                    s: {
                      fill: { fgColor: { rgb: "6783e4" } },
                      font: { bold: true, sz: 12 },
                      alignment: { wrapText: true, horizontal: "center" },
                    },
                  },
                ],
                // ----------------------------------

                ...result.data.data.map((row: { [x: string]: any }) =>
                  Object.keys(row).map((column) => ({
                    v: row[column],
                    t: "s",
                    s: {
                      fill: { fgColor: { rgb: "f7f6f6)" } },
                      alignment: { wrapText: true, horizontal: "center" },
                      border: {
                        top: { style: "thin", color: { rgb: "9ca4af" } },
                        bottom: { style: "thin", color: { rgb: "9ca4af" } },
                        left: { style: "thin", color: { rgb: "9ca4af" } },
                        right: { style: "thin", color: { rgb: "9ca4af" } },
                      },
                    },
                  }))
                ),
                // ----------------------------------
              ],
              { origin: "A3" }
            );

            XLSX.writeFile(workbook, "Reporte Clientes .xlsx", {
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
                title=" Total Clientes"
                content={`${client?.totalUsers || "0"}`}
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
                title=" Activos"
                content={`${client?.activeUsers || "0"}`}
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
                title=" Inactivos"
                content={`${client?.inactiveUsers || "0"}`}
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
                title=" Total con fecha de Registro"
                content={`${client?.totalRegDate || "0"}`}
                background={
                  "linear-gradient(to right, #5e86a8, #5f89ab, #5f8cae, #608fb0, #6192b3, #5e8fb3, #5b8db3, #588ab3, #5281af, #4f77aa, #4e6da5, #4e639f)"
                }
                icons={undefined}
              />
            </Grid>
            <Grid item xs={2} md={2}>
              <CustomCard
                title="Total con fecha de Activacion"
                content={`${client?.totalActDate || "0"}`}
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
              { field: "codAbonado", title: "Abonado" },
              { field: "nombre", title: "Nombres" },
              { field: "correo", title: "Correo Electronico" },
              { field: "tipoCliente", title: "Tipo Cliente" },
              { field: "documento", title: "Documento" },
              { field: "fechaRegistro", title: "Fecha Registro" },
              { field: "fechaActivacion", title: "Fecha Activacion" },
              { field: "estatus", title: "Estatus" },
              { field: "telefono", title: "Telefono" },
            ]}
            data={client?.data || []}
            pagination={{
              count: client?.totalUsers || 0,
              page: (client?.page || 1) - 1,
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
