"use client";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import SearchSeccion from "../../../components/searchClients";
import CustomModalEditEstatus from "./editClientStatus";
import Swal from "sweetalert2";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import Tooltip from "@mui/material/Tooltip";
import { CustomTable } from "@/app/components/materialTable";
import { axiosInstance } from "@/app/helpers/axiosConfig";
import { findAccion, getSession } from "@/app/helpers/session";
import TaskIcon from "@mui/icons-material/Task";

const DEFAULT_TIPO_CLIENT = 3 
export default function viewClients(props: any) {
  const [estatus, setEstatus] = useState({
    active: false,
    client: {},
  });

  const [permissions, setPermissions] = useState({
    resetPassword: false,
    resetEmail: false,
    changeStatus: false,
    validateDate: false,
  });

  const onFinish = (): void => {
    setEstatus({ active: false, client: {} });
    props.setSearchParams((prevState: any) => ({
      ...prevState,
      codPagina: 1,
      tipoCliente: DEFAULT_TIPO_CLIENT,
      documento: undefined,
    }));
  };

  const handleResetEmail = (documento: string) => {
    Swal.fire({
      title: "Estas seguro?",
      text: "Deseas restablecer correo electrónico",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok!",
    }).then(async (result) => {
      try {
        const session = JSON.parse(localStorage.getItem("ntu-session") || "{}");
        const payload = { loginUsuario: session.loginUsuario };

        if (result.isConfirmed) {
          const result = await axiosInstance.put(
            `clientes/resetearcorreo/${documento}`,
            payload
          );
          Swal.fire({
            title: "Completado",
            text: "Correo electrónico Restablecido",
            icon: "success",
          }).then (() =>{

            props.setSearchParams((prevState: any) => ({
              ...prevState,
              codPagina: 1,
              tipoCliente: DEFAULT_TIPO_CLIENT,
              documento: undefined,
            }));
          })
        }
      } catch {
        console.error("Error");
      }
    });
  };

  const handleClickOpenStatus = (client: string) => {
    setEstatus({ active: true, client });
  };

  const handleValidateData = async (documento: string) => {
    try {
      await axiosInstance.get(`clientes/validardatos/${documento}`);

      Swal.fire({
        title: "Completado!",
        text: "Datos validados correctamente",
        icon: "success",
      }).then (()=> {

        props.setSearchParams((prevState: any) => ({
          ...prevState,
          codPagina: 1,
          tipoCliente: DEFAULT_TIPO_CLIENT,
          documento: undefined,
        }));
      }) 
    } catch {
      console.error("Error");
    }
  };

  const handleResetPassword = (documento: string) => {
    Swal.fire({
      title: "Estas seguro?",
      text: "Deseas restablecer la contraseña",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok!",
    }).then(async (result) => {
      try {
        const session = JSON.parse(localStorage.getItem("ntu-session") || "{}");
        console.log(session, "session");

        const payload = {
          loginUsuario: session.loginUsuario,
        };

        if (result.isConfirmed) {
          const result = await axiosInstance.put(
            `clientes/resetearclave/${documento}`,
            payload
          );
          

          Swal.fire({
            title: "Completado",
            text: "Contraseña Restablecida",
            icon: "success",
          }).then (() =>{

            props.setSearchParams((prevState: any) => ({
              ...prevState,
              codPagina: 1,
              tipoCliente: DEFAULT_TIPO_CLIENT,
              documento: undefined,
            }));
          })
        }
      } catch {
        console.error("eeror");
      }
    });
  };

  const handleClose = () => {
    setEstatus({
      active: false,
      client: {},
    });
  };

  const checkPermissions = async () => {
    const result = await axiosInstance.get(
      `acciones/usuario/${getSession().loginUsuario}/pagina/${2}`
    );

    const data: Array<{ codAccion: string; nombreAccion: string }> =
      result.data;

    setPermissions({
      resetPassword: findAccion("Resetear Clave", data),
      resetEmail: findAccion("Modificar Correo", data),
      changeStatus: findAccion("Modificar Estatus", data),
      validateDate: findAccion("Validar Datos", data),
    });
  };

  useEffect(() => {
    checkPermissions();
  }, []);



  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <SearchSeccion
          setSearchParams={props.setSearchParams}
          searchParams={props.searchParams}
        />

        <CustomTable
          columns={[
            { field: "codAbonado", title: "Abonado" },
            { field: "nombre", title: "Nombres" },
            { field: "correo", title: "Correo electrónico" },
            { field: "tipoCliente", title: "Tipo Cliente" },
            { field: "documento", title: "Documento" },
            { field: "fechaRegistro", title: "Fecha Registro" },
            { field: "fechaActivacion", title: "Fecha Activacion" },
            { field: "estatus", title: "Estatus" },
            { field: "telefono", title: "Telefono" },
            {
              field: null,
              render: (row: any) => (
                <>
                  <ButtonGroup
                    variant="contained"
                    aria-label="Basic button group"
                  >
                    {permissions.resetEmail && (
                      <Tooltip title="Restablecer Correo" placement="top-end">
                        <Button onClick={() => handleResetEmail(row.documento)}>
                          <EmailIcon />
                        </Button>
                      </Tooltip>
                    )}

                    {permissions.changeStatus && (
                      <Tooltip title="Editar Estatus" placement="top-end">
                        <Button onClick={() => handleClickOpenStatus(row)}>
                          <ToggleOnIcon />
                        </Button>
                      </Tooltip>
                    )}

                    {permissions.resetPassword && (
                      <Tooltip
                        title="Restablecer contraseña"
                        placement="top-end"
                      >
                        <Button
                          onClick={() => handleResetPassword(row.documento)}
                        >
                          <LockIcon />
                        </Button>
                      </Tooltip>
                    )}

                    {permissions.validateDate && (
                      <Tooltip title="Validar Datos" placement="top-end">
                        <Button
                          onClick={() => handleValidateData(row.documento)}
                        >
                          <TaskIcon />
                        </Button>
                      </Tooltip>
                    )}
                  </ButtonGroup>
                </>
              ),
              title: "accion",
            },
          ]}
          data={
            props.client?.data
              ? props.client.data.map((v: any, index: number) => ({
                  id: v.codAbonado + index,
                  ...v,
                }))
              : []
          }
          pagination={{
            count: props.client?.totalUsers || 0,
            page: (props.client?.page || 1) - 1,
            itemsPerPage: 10,
            onPageChange: (event, page) => {
              props.setSearchParams((prevState: any) => ({
                ...prevState,
                codPagina: page + 1,
              }));
            },
          }}
        />
      </Paper>

      <CustomModalEditEstatus
        open={estatus.active}
        handleClose={handleClose}
        onFinish={onFinish}
        title={"  Editar Clientes"}
        client={estatus.client}
      />
    </Box>
  );
}
