'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import GppGoodIcon from '@mui/icons-material/GppGood';
import Typography from '@mui/material/Typography';
import ModeIcon from '@mui/icons-material/Mode';
import Rating from '@mui/material/Rating';
import CustomModalEdit from "../(admin)/pages/users/userRoles/editRoles";

export default function BasicCardRol() {
    const [value, setValue] = React.useState<number | null>(2);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      console.log("aqui");
  
      setOpen(true);
    };
  
  
    const handleClose = () => {
      
      setOpen(false);
      
    };

    return (
<Grid container  xs={12} lg={12} spacing={2}>

              <Grid item xs={3} md={3}>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>

                    <Grid container spacing={2}>
                      <Grid item xs={8} md={8}>

                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                          5 usuarios
                        </Typography>
                        <Typography style={{ fontSize: "18px", fontWeight: "bold" }} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                          Agente
                        </Typography>

                      </Grid>

                      <Grid style={{ textAlign: "end" }} item xs={4} md={4}>

                        <Button variant="contained" onClick={handleClickOpen}>
                          <ModeIcon />
                        </Button>

                      </Grid>

                      <Grid item xs={8} md={8}>

                        <Typography component="legend">Autoridad</Typography>
                        <Rating
                          name="simple-controlled"
                          value={value}
                          onChange={(event, newValue) => {
                            setValue(newValue);
                          }}
                        />

                      </Grid>
                      <CustomModalEdit open={open}  handleClose={handleClose}     title={" Editar Roles"}/>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={3} md={3}>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>

                    <Grid container spacing={2}>
                      <Grid item xs={8} md={8}>

                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                          5 usuarios
                        </Typography>
                        <Typography style={{ fontSize: "18px", fontWeight: "bold" }} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                          Cliente
                        </Typography>

                      </Grid>
                      <Grid style={{ textAlign: "end" }} item xs={4} md={4}>

                        <Button variant="contained" href="#contained-buttons">
                          <ModeIcon />
                        </Button>
                        
                      </Grid>

                      

                      <Grid item xs={8} md={8}>

                        <Typography component="legend">Autoridad</Typography>
                        <Rating
                          name="simple-controlled"
                          value={value}
                          onChange={(event, newValue) => {
                            setValue(newValue);
                          }}
                        />

                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={3} md={3}>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>

                    <Grid container spacing={2}>
                      <Grid item xs={8} md={8}>

                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                          5 usuarios
                        </Typography>
                        <Typography style={{ fontSize: "18px", fontWeight: "bold" }} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                          Admin
                        </Typography>

                      </Grid>
                      <Grid style={{ textAlign: "end" }} item xs={4} md={4}>

                        <Button variant="contained" href="#contained-buttons">
                          <ModeIcon />
                        </Button>
                        
                      </Grid>

                      <Grid item xs={8} md={8}>

                        <Typography component="legend">Autoridad</Typography>
                        <Rating
                          name="simple-controlled"
                          value={value}
                          onChange={(event, newValue) => {
                            setValue(newValue);
                          }}
                        />

                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

        

            </Grid>
    )
}