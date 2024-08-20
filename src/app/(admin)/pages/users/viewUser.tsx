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

import CustomCard from "../../../components/customCard";
import BarChartIcon from "@mui/icons-material/BarChart";
import FadAdd from "../../../elements/addFad";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CustomModal from "../users/addUsers";
import Typography from "@mui/material/Typography";

import Grid from "@mui/material/Grid";
import { findAccion, getSession } from "@/app/helpers/session";

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

interface UsersTable {
  data: Array<{
    nombre: string;
    apellido: string;
    nombreTipo: string;
    correo: string;
    nombreDepartamento: string;
    nombreRol: string;
    nombreActivo: string;
    loginUsuario: string;
    accion: Element;
  }>;
  page: number;
  pageCount: number;
  itemsPerPage: number;
  activeUsers: number;
  inactiveUsers: number;
  totalUsers: number;
}

interface GetUserList {
  codPagina: number;
  codDepartamento: string | undefined;
  codEstatus: string | undefined;
  codTipo: string | undefined;
  nombreUsuario: string | undefined;
}

export default function viewUser() {
  const [openEditUser, setOpenEditUser] = useState({
    active: false,
    user: {},
  });

  const [permissions , setPermissions] = useState({
    insert: false, 
    update: false, 
    delete: false, 
    resetPassword: false
  })

  const handleClickOpenEditUser = (user: string) => {
    setOpenEditUser({ active: true, user });
  };

  const [searchParams, setSearchParams] = useState<GetUserList>({
    codPagina: 1,
    codDepartamento: undefined,
    codEstatus: undefined,
    codTipo: undefined,
    nombreUsuario: undefined,
  });
  const onFinishEditUser = () => {
    setOpenEditUser({ active: false, user: {} });
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

        setSearchParams({
          codPagina: 1,
          codDepartamento: undefined,
          codEstatus: undefined,
          codTipo: undefined,
          nombreUsuario: undefined,
        })
        
      }
    });
  };
  useEffect(() => {
    getUserList(searchParams);
  }, [searchParams]);

  const handleCloseEditUser = () => {
    setOpenEditUser({
      active: false,
      user: {},
    });
  };

  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<UsersTable>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const getUserList = async (params?: GetUserList) => {
    try {
      const result = await axiosInstance.get("usuarios/", { params });

      setUsers(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onFinish = () => {
    setOpen(false);
    getUserList();
  };


  const checkPermissions = async () => {
    const result = await axiosInstance.get(`acciones/usuario/${getSession().loginUsuario}/pagina/${1}`);
    
    const data: Array<{codAccion: string, nombreAccion: string}> = result.data;


    setPermissions({
      insert: findAccion('Insertar', data),
      update: findAccion('Modificar', data), 
      delete: findAccion('Eliminar', data), 
      resetPassword: findAccion('Resetear Clave', data)
    })
  }

  useEffect(() => {
    checkPermissions()  
  }, [])


  return (
    <>
      <Typography
        sx={{ flex: 1, mb: 3 }}
        style={{ color: "#315e7f", fontWeight: "bold", fontSize: "22px" }}
      >
        <AccountCircleIcon sx={{ mr: 1 }} />
        Gestion de Usuarios
      </Typography>

      <Grid container justifyContent="center" spacing={1}>
        <Grid item xs={3} md={3} style={{ marginBottom: "20px" }}>
          <CustomCard
            title=" Activos"
            content={`${users?.activeUsers || "0"}`}
            background={
              "linear-gradient(to left, #5d7616, #68841b, #74921f, #7fa024, #8bae29, #91b629, #96be2a, #9cc62a, #9dc924, #9ecd1e, #9ed015, #9fd408)"
            }
            icons={<BarChartIcon />}
          />
        </Grid>
        <Grid item xs={3} md={3}>
          <CustomCard
            title=" Inactivos"
            content={`${users?.inactiveUsers || "0"}`}
            background={
              "linear-gradient(to left, #7559ce, #6f68d7, #6a76de, #6783e4, #678fe9"
            }
            icons={<BarChartIcon />}
          />
        </Grid>
        <Grid item xs={3} md={3}>
          <CustomCard
            title=" Total Usuarios"
            content={`${users?.totalUsers || "0"}`}
            background={
              "radial-gradient(circle at -20.71% 50%, #de9c2c 0, #e5922a 8.33%, #ea852b 16.67%, #ee772d 25%, #f16731 33.33%, #f35436 41.67%, #f23c3c 50%, #f01843 58.33%, #ed004c 66.67%, #e90057 75%, #e30064 83.33%, #db0071 91.67%, #d10080 100%)"
            }
            icons={<BarChartIcon />}
          />
        </Grid>

        <Grid item lg={11} md={11} style={{}}>
          <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
              <SearchSeccion setSearchParams={setSearchParams} searchParams={searchParams} />
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
                          { permissions.update && <Tooltip title="Editar Usuario" placement="top-end">
                            <Button onClick={() => handleClickOpenEditUser(row)}>
                              <BorderColorIcon />
                            </Button>
                          </Tooltip> }

                          { permissions.resetPassword && <Tooltip
                            title="Restablecer contraseña"
                            placement="top-end"
                          >
                            <Button
                              onClick={() =>
                                handleResetPassword(row.loginUsuario)
                              }
                            >
                              <LockIcon />
                            </Button>
                          </Tooltip> }

                          { permissions.delete && <Tooltip title="Eliminar Usuario" placement="top-end">
                            <Button
                              onClick={() => handleDeleteUser(row.loginUsuario)}
                            >
                              <DeleteIcon />
                            </Button>
                          </Tooltip> }
                        </ButtonGroup>
                      </>
                    ),
                    title: "accion",
                  },
                ]}
                data={
                  users?.data
                    ? users.data.map((v: any) => ({
                        id: v.loginUsuario,
                        ...v,
                      }))
                    : []
                }
                pagination={{
                  count: users?.totalUsers || 0,
                  page: (users?.page || 1) - 1,
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
              open={openEditUser.active}
              handleClose={handleCloseEditUser}
              onFinish={onFinishEditUser}
              title={"Editar Usuarios"}
              user={openEditUser.user}
            />
          </Box>
        </Grid>

        { permissions.insert && <FadAdd variant="outlined" type="button" onClick={handleClickOpen}>
          <AccountCircleIcon style={{ marginRight: "15px" }} /> Agregar Usuario
        </FadAdd> }

        <CustomModal
          open={open}
          handleClose={handleClose}
          onFinish={onFinish}
          title={"  Gestionar Usuarios"}
        />
      </Grid>
    </>
  );
}
