"use client";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import ViewClients from "../../pages/clients/viewClients";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import CustomCard from "../../../components/customCard";
import BarChartIcon from "@mui/icons-material/BarChart";
import { axiosInstance } from "@/app/helpers/axiosConfig";
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
    protein: React.ReactNode;
  }>;
  page: number;
  pageCount: number;
  itemsPerPage: number;
  activeUsers: number;
  inactiveUsers: number;
  totalUsers: number;
}

export default function clients(props: any) {
  const [open, setOpen] = useState(false);
  const [client, setClient] = useState<ClientTable>();
  const [searchParams, setSearchParams] = useState({
    loginUsuario: getSession().loginUsuario,
    codPagina:1,
    tipoCliente:undefined,
    documento:undefined
  });
  const getClientList = async () => {
    try {
      
      const result = await axiosInstance.get("clientes/", {
        params: {
          loginUsuario: searchParams.loginUsuario,
          codPagina: searchParams.codPagina,
          tipoCliente: searchParams.tipoCliente ,
          documento: searchParams.documento,
        },
      });

      setClient(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClientList();
    
  }, [searchParams]);

  return (
    <>
      <Typography
        sx={{ flex: 1, mb: 3 }}
        style={{ color: "#315e7f", fontWeight: "bold", fontSize: "22px" }}
      >
        <PersonIcon sx={{ mr: 1 }} />
        Gestion de Clientes
      </Typography>

      <Grid container justifyContent="center" spacing={1}>
        <Grid item xs={3} md={3} style={{ marginBottom: "20px" }}>
          <CustomCard
            title=" Activos"
            content={`${client?.activeUsers || "0"}`}
            icons={<BarChartIcon />}
            background={
              "linear-gradient(to left, #5d7616, #68841b, #74921f, #7fa024, #8bae29, #91b629, #96be2a, #9cc62a, #9dc924, #9ecd1e, #9ed015, #9fd408)"
            }
          />
        </Grid>
        <Grid item xs={3} md={3}>
          <CustomCard
            title=" Inactivos"
            content={`${client?.inactiveUsers || "0"}`}
            background={
              "linear-gradient(to left, #7559ce, #6f68d7, #6a76de, #6783e4, #678fe9"
            }
            icons={<BarChartIcon />}
          />
        </Grid>
        <Grid item xs={3} md={3}>
          <CustomCard
            title=" Total Usuarios"
            content={`${client?.totalUsers || "0"}`}
            background={
              "radial-gradient(circle at -20.71% 50%, #de9c2c 0, #e5922a 8.33%, #ea852b 16.67%, #ee772d 25%, #f16731 33.33%, #f35436 41.67%, #f23c3c 50%, #f01843 58.33%, #ed004c 66.67%, #e90057 75%, #e30064 83.33%, #db0071 91.67%, #d10080 100%)"
            }
            icons={<BarChartIcon />}
          />
        </Grid>

        <Grid item lg={11} md={11}>
          <ViewClients client={client} setSearchParams={setSearchParams} />
        </Grid>
      </Grid>
    </>
  );
}
