"use client";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import MaterialTable from "../../../(admin)/pages/users/viewUser";
import CustomCard from "../../../components/customCard";
import BarChartIcon from "@mui/icons-material/BarChart";
import FadAdd from "../../../elements/addFad";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CustomModal from "../users/addUsers";
import Typography from "@mui/material/Typography";
import { axiosInstance } from "@/app/helpers/axiosConfig";

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
  codDepartamento: string;
  codEstatus: string;
  codTipo: string;
  nombreUsuario: string;
}

export default function Home(props: any) {
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

  useEffect(() => {
    getUserList();
  }, []);

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
          <MaterialTable users={users} getUserList={getUserList} />
        </Grid>

        <FadAdd variant="outlined" type="button" onClick={handleClickOpen}>
          <AccountCircleIcon style={{ marginRight: "15px" }} /> Agregar Usuario
        </FadAdd>

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
