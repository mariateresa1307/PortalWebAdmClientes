"use client";
import * as React from "react";
import Grid from "@mui/material/Grid";
import MaterialTable from "../../../(admin)/pages/users/viewUser"
import CustomCard from '../../../components/customCard'
import BarChartIcon from '@mui/icons-material/BarChart';
import FadAdd from '../../../elements/addFad';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CustomModal from "../users/addUsers";

const useStyles = (props: any) => ({
  root: {
    backgroundColor: 'red',
    color: (props: any) => props.color,
  },
});


export default function Home(props: any) {

  const classes = useStyles(props);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    console.log("aqui");

    setOpen(true);
  };

  const handleClose = () => {
    
    setOpen(false);
    
  };


  return (
    <>


      <Grid container justifyContent="center">
        <Grid item xs={12} sm={6} md={3} lg={3} style={{ zIndex: "100", marginBottom: " 28px", marginRight: "10px" }} >
          <CustomCard title=" Activos" content="59" background={"linear-gradient(to left, #5d7616, #68841b, #74921f, #7fa024, #8bae29, #91b629, #96be2a, #9cc62a, #9dc924, #9ecd1e, #9ed015, #9fd408)"} icons={<BarChartIcon />} />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={3} style={{ zIndex: "100", marginBottom: " 28px", marginRight: "10px" }} >
          <CustomCard title=" Inactivos" content="59" background={"linear-gradient(to left, #7559ce, #6f68d7, #6a76de, #6783e4, #678fe9"} icons={<BarChartIcon />} />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={3} style={{ zIndex: "100", marginBottom: " 28px", marginRight: "10px" }} >
          <CustomCard title=" Total Usuarios" content="59" background={"radial-gradient(circle at -20.71% 50%, #de9c2c 0, #e5922a 8.33%, #ea852b 16.67%, #ee772d 25%, #f16731 33.33%, #f35436 41.67%, #f23c3c 50%, #f01843 58.33%, #ed004c 66.67%, #e90057 75%, #e30064 83.33%, #db0071 91.67%, #d10080 100%)"
          } icons={<BarChartIcon />} />
        </Grid>

     

        <Grid item lg={10} md={10} style={{}}>
          <MaterialTable />
        </Grid>


        <FadAdd variant="outlined" type="button" onClick={handleClickOpen} >
          <AccountCircleIcon style={{ marginRight: "15px" }} /> Agregar Usuario
        </FadAdd>

        <CustomModal open={open} handleClose={handleClose} title={"  Gestionar Clientes"} />
      </Grid>
    </>
  );
}
