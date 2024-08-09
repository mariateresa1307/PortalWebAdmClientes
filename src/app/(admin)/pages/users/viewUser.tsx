"use client";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchSeccion from "../../../components/search";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CustomModalEdit from "../users/editUser";
import Swal from "sweetalert2";
import LockIcon from "@mui/icons-material/Lock";
import { axiosInstance } from "@/app/helpers/axiosConfig";
import { CustomTable } from "@/app/components/materialTable";
import { Button, ButtonGroup, Tooltip } from "@mui/material";
interface Data {
  id: number;
  name: string;
  correo: string;
  departament: string;
  rol: string;
  tipoUsuario: string;
  status: React.ReactNode;
  protein: React.ReactNode;
}

function createData(
  id: number,
  name: string,
  correo: string,
  departament: string,
  rol: string,
  tipoUsuario: string,
  status: React.ReactNode,
  protein: React.ReactNode
): Data {
  return {
    id,
    name,
    correo,
    departament,
    rol,
    tipoUsuario,
    status,
    protein,
  };
}

export default function viewUser(props: any) {
  const [open, setOpen] = useState({
    active: false,
    user: {},
  });

  const handleClickOpen = (user: string) => {
    setOpen({ active: true, user });
  };

  const [searchParams, setSearchParams] = useState({
    codPagina: 1,
    codDepartamento: undefined,
    codEstatus: undefined,
    codTipo: undefined,
    nombreUsuario: undefined,
  });
  const onFinish = () => {
    setOpen({ active: false, user: {} });
    setSearchParams({
      codPagina: 1,
      codDepartamento: undefined,
      codEstatus: undefined,
      codTipo: undefined,
      nombreUsuario: undefined,
    });
  };
  const handleDeleteUser = (loginUsuario: string) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¿Deseas Eliminar registro?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#344a8f",
      confirmButtonText: "Aceptar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosInstance.delete(`usuarios/${loginUsuario}`);
        setSearchParams({
          codPagina: 1,
          codDepartamento: undefined,
          codEstatus: undefined,
          codTipo: undefined,
          nombreUsuario: undefined,
        });
        Swal.fire({
          title: "Completado",
          text: "Registro Eliminado",
          icon: "success",
        });
      }
    });
  };

  const handleResetPassword = (loginUsuario: string) => {
    Swal.fire({
      title: "Estas seguro?",
      text: "Deseas restablecer la contraseña",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosInstance.put(`usuarios/resetearclave/${loginUsuario}`);
        Swal.fire({
          title: "Completado",
          text: "Contraseña Restablecida",
          icon: "success",
        });
      }
    });
  };
  useEffect(() => {
    props.getUserList(searchParams);
  }, [searchParams]);

  const handleClose = () => {
    setOpen({
      active: false,
      user: {},
    });
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <SearchSeccion setSearchParams={setSearchParams} />
        <CustomTable
          columns={[
            { field: "nombre", title: "Nombre" },
            { field: "apellido", title: "Apellido" },
            { field: "correo", title: "Correo" },
            { field: "nombreDepartamento", title: "Departamento" },
            { field: "nombreRol", title: "Rol" },
            { field: "nombreTipo", title: "Tipo Usuario" },
            { field: "nombreEstatus", title: "Estatus" },
            {
              field: null,
              render: (row: any) => (
                <>
                  <ButtonGroup
                    variant="contained"
                    aria-label="Basic button group"
                  >
                    <Tooltip title="Editar Usuario" placement="top-end">
                      <Button onClick={() => handleClickOpen(row)}>
                        <BorderColorIcon />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Restablecer contraseña" placement="top-end">
                      <Button
                        onClick={() => handleResetPassword(row.loginUsuario)}
                      >
                        <LockIcon />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Eliminar Usuario" placement="top-end">
                      <Button
                        onClick={() => handleDeleteUser(row.loginUsuario)}
                      >
                        <DeleteIcon />
                      </Button>
                    </Tooltip>
                  </ButtonGroup>
                </>
              ),
              title: "accion",
            },
          ]}
          data={props.users?.data || []}
          pagination={{
            count: props.users?.totalUsers || 0,
            page: (props.users?.page || 1) - 1,
            itemsPerPage: 10,
            onPageChange: (event, page) => {
              setSearchParams((prevState) => ({
                ...prevState,
                codPagina: page + 1,
              }));
            },
          }}
        />
      </Paper>
      <CustomModalEdit
        open={open.active}
        handleClose={handleClose}
        onFinish={onFinish}
        title={"Editar Usuarios"}
        user={open.user}
      />
    </Box>
  );
}
