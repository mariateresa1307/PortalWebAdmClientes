'use client'
import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function CustomizedDialogs(props: any) {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  return (

    <Grid container spacing={1}>

      <Grid item xs={3} >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Departamento</InputLabel>
          <Select
            style={{ background: "white" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
           
            onChange={handleChange}
          >
            <MenuItem value={10}>Departamento</MenuItem>
            <MenuItem value={20}>Estatus</MenuItem>
            <MenuItem value={30}>Nombre Usuario</MenuItem>
            <MenuItem value={40}>Tipo de usuario</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={3} >
        <FormControl fullWidth>
          <InputLabel  id="demo-simple-select-label">Estatus</InputLabel>
          <Select
            style={{ background: "white" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            
            onChange={handleChange}
          >
            <MenuItem value={10}>Departamento</MenuItem>
            <MenuItem value={20}>Estatus</MenuItem>
            <MenuItem value={30}>Nombre Usuario</MenuItem>
            <MenuItem value={40}>Tipo de usuario</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      
      <Grid item xs={3} >
        <FormControl fullWidth>
          <InputLabel  id="demo-simple-select-label">Tipo de usuario</InputLabel>
          <Select
            style={{ background: "white" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            
            onChange={handleChange}
          >
            <MenuItem value={10}>Departamento</MenuItem>
            <MenuItem value={20}>Estatus</MenuItem>
            <MenuItem value={30}>Nombre Usuario</MenuItem>
            <MenuItem value={40}>Tipo de usuario</MenuItem>
          </Select>
        </FormControl>
      </Grid>


      <Grid item xs={3}>
        <TextField style={{ background: "white" }} id="outlined-basic" label="Buscar Nombre" variant="outlined" />
      </Grid>

    </Grid>
  )
}