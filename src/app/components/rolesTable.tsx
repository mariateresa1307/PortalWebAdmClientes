import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import CustomModal from "../(admin)/pages/users/userRoles/addPermissions";
import { Divider } from 'theme-ui';
import GppGoodIcon from '@mui/icons-material/GppGood';
import { CardRole } from '../elements/card'
import CustomModalEdit from '../(admin)/pages/users/userRoles/editRoles';
import CustomModalEditPermission from '../(admin)/pages/users/userRoles/editPermissions'
import IconButton from '@mui/material/IconButton';
import ModeIcon from '@mui/icons-material/Mode';
import Typography from '@mui/material/Typography';
import ShieldIcon from '@mui/icons-material/Shield';
function createData(
  //protein: React.ReactElement,
  name: string,
) {


  return { name };
}

const rows = [

  createData('Agregar Usuarios',),
  createData('Modificar Usuarios',),
  createData('Eliminar Usuarios',),
  createData('Modificar Clientes',),
  createData('Eliminar Clientes',),
  createData('Agregar Roles',),
  createData('Modificar Roles',),
  createData('Reportes',),

];

export default function BasicTable() {

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [value, setValue] = useState<number | null>(2);
  const [open, setOpen] = useState(false);
  const [openRole, setOpenRole] = useState(false)
  const [openPermission, setOpenPermission] = useState(false)
  const handleClickOpen = () => {
    console.log("aqui");

    setOpen(true);
  };


  const handleOpenPermissionEdit = (status = true) => {
    setOpenPermission(status)
  }

  const handleOpenRoleEdit = (status = true) => {
    setOpenRole(status)
  }

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <>
      <TableContainer style={{ boxShadow: "none", background: "none" }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow >
            <TableCell style={{ fontWeight: "bold" }} > </TableCell>
            <TableCell style={{ fontWeight: "bold" }} > </TableCell>
            <TableCell style={{ fontWeight: "bold" }} > </TableCell>
            <TableCell style={{ fontWeight: "bold" }} > </TableCell>
            <TableCell style={{ fontWeight: "bold" }} > </TableCell>
            <TableCell style={{ fontWeight: "bold" }} > </TableCell>
            <TableCell style={{ fontWeight: "bold" }} > </TableCell>
            <TableCell style={{ fontWeight: "bold" }} > </TableCell>
            <TableCell style={{ fontWeight: "bold" }} > </TableCell>
            <TableCell style={{ fontWeight: "bold" }} > </TableCell>
            <TableCell style={{ fontWeight: "bold" }} > </TableCell>
            <TableCell style={{ fontWeight: "bold" }} > </TableCell>
            <TableCell style={{ fontWeight: "bold" }} > </TableCell>
           
               
              <TableCell style={{ fontWeight: "bold" }} >


                <CardRole title={'agente'} handleRating={() => {
                  console.log(1)
                }} handleOpenRoleEdit={handleOpenRoleEdit} />

              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} >
                <CardRole title={'cliente'} handleRating={() => {
                  console.log(1)
                }} />
              </TableCell>
              
              <TableCell style={{ fontWeight: "bold" }} >
                <CardRole title={'admin'} handleRating={() => {
                  console.log(1)
                }} />
              </TableCell>


              <TableCell style={{ fontWeight: "bold" }} > </TableCell>

              
            </TableRow>
          
          </TableHead>
          </Table>
          <TableContainer style={{ boxShadow: "none", background: "none" }} component={Paper}>

            <Typography sx={{ mb: 3 , mt:2}} style={{ color: "#315e7f", fontWeight: "bold", fontSize: "18px" }}  >
            <ShieldIcon sx={{ mr: 1 }} />Permisos de Usuarios</Typography>
          </TableContainer>
            <Table>
          <TableBody>
            
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                
                <TableCell component="th" scope="row" >
                  <IconButton size="large" onClick={() => handleOpenPermissionEdit()
                  }  >
                    <ModeIcon /></IconButton>


                  {row.name}
                </TableCell>
                <TableCell style={{ textAlign: "left" }} >{<Switch {...label} defaultChecked />} </TableCell>
                <TableCell style={{ textAlign: "left" }}>{<Switch {...label} defaultChecked />} </TableCell>
                <TableCell style={{ textAlign: "left" }} >{<Switch {...label} defaultChecked />}</TableCell>



              </TableRow>

            ))}

          </TableBody>

        </Table>
        <Divider style={{ color: "#e0e0e0" }} />
        <Grid container justifyContent={'end'} sx={{ mt: 4 }} spacing={2}>

          <Grid item xs={3} md={3}>
            <Button variant="contained" onClick={handleClickOpen} style={{ background: " #304074", fontWeight: "bold", borderRadius: "14px" }} fullWidth>Agregar Permisos</Button>
          </Grid>
          <CustomModal open={open} handleClose={handleClose} title={"  Gestionar Permisos"} />
        </Grid>
      </TableContainer>

      <CustomModalEdit open={openRole} handleClose={() => handleOpenRoleEdit(false)} title={" Editar Roles"} />
      <CustomModalEditPermission open={openPermission} handleClose={() => handleOpenPermissionEdit(false)} title={" Editar Permisos"} />
    </>

  );
}