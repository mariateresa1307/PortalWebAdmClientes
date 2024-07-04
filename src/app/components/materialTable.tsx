'use client'
import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
//import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import SearchIcon from '@mui/icons-material/Search';
import { Search } from '@mui/icons-material';
import SearchSeccion from "./search"
import Grid from '@mui/material/Grid';
import Fab from '@mui/material/Fab';
import Swal from "sweetalert2";

interface Data {
  id: number;
  name: string;
  correoElectronico: string;
  departament: string;
  rol: string;
  protein: React.ReactNode;
}

function createData(
  id: number,
  name: string,
  correoElectronico: string,
  departament: string,
  rol: string,
  protein: React.ReactNode,
): Data {
  return {
    id,
    name,
    correoElectronico,
    departament,
    rol,
    protein,
  };
}
const useStyles = (props: any) => ({
  root: {
    backgroundColor: 'red',
    color: (props: any) => props.color,
  },
});
export default function EnhancedTable(props: any) {
const classes = useStyles(props);
const [open, setOpen] = React.useState(false);

const handleClickOpen = () => {
  console.log("aqui");

  setOpen(true);
};


const handleDeleteUser = () => {
  Swal.fire({
    title: "Estas seguro?",
    text: "Deseas Eliminar registro",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#344a8f",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ok!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Completado",
        text: "Registro Eliminado",
        icon: "success",
      });
    }
  });
};

const handleClose = () => {
  setOpen(false);
};

<div>

<IconButton   onClick={handleClickOpen}>
<DeleteIcon style={{color:"white"}} />
</IconButton>


</div>
const rows = [
  createData(
    1,
    "Cupcake",
    "cucake@Highlight.com",
    "RRHH",
    "User",
    <ButtonGroup variant="contained" aria-label="Basic button group">
      <Button onClick={handleClickOpen}>
        <BorderColorIcon />
      </Button>
      <Button onClick={handleDeleteUser}>
        <DeleteIcon />
      </Button>
    </ButtonGroup>
  ),

  createData(
    2,
    "Donut",
    "donut@Highlight.com",
    "RRHH",
    "User",
    <ButtonGroup variant="contained" aria-label="Basic button group">
      <Button onClick={handleClickOpen}>
        <BorderColorIcon />
      </Button>
      <Button onClick={handleDeleteUser}>
        <DeleteIcon />
      </Button>
    </ButtonGroup>
  ),

  createData(
    3,
    "Eclair",
    "262@Highlight.com",
    "RRHH",
    "User",
    <ButtonGroup variant="contained" aria-label="Basic button group">
      <Button onClick={handleClickOpen}>
        <BorderColorIcon />
      </Button>
      <Button onClick={handleDeleteUser}>
        <DeleteIcon />
      </Button>
    </ButtonGroup>
  ),

  createData(
    4,
    "Frozen yoghurt",
    "Frozen@Highlight.com",
    "RRHH",
    "User",
    <ButtonGroup variant="contained" aria-label="Basic button group">
      <Button onClick={handleClickOpen}>
        <BorderColorIcon />
      </Button>
      <Button onClick={handleDeleteUser}>
        <DeleteIcon />
      </Button>
    </ButtonGroup>
  ),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}



interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Nombres y Apellidos ',
  },
  {
    id: 'correoElectronico',
    numeric: true,
    disablePadding: false,
    label: 'Correo Electronico',
  },
  {
    id: 'departament',
    numeric: true,
    disablePadding: false,
    label: 'Departamento',
  },
  {
    id: 'rol',
    numeric: true,
    disablePadding: false,
    label: 'Rol Usuario',
  },
  {
    id: 'protein',
    numeric: true,
    disablePadding: false,
    label: '',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (

    
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" >
       
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            
          >
            <TableSortLabel
             
             
            >
              {headCell.label}
             
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
   
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;
  const [open, setOpen] = React.useState(false);


  const handleClickOpen = () => {
    setOpen(true);    
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div
    style={{
      background: "#202e9761",
      zIndex: 15,
      position: "relative",
      marginLeft: "20px",
      marginRight: "20px",
      borderBottomLeftRadius: "5px",
      borderTopLeftRadius: "5px",
      borderBottomRightRadius: "5px",
      borderTopRightRadius: "5px",
      backdropFilter: "blur(20px)",
      paddingTop: "10px",
    paddingBottom:"10px"
    }}
  >
   
   
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Gestion de Usuarios 
        </Typography>
      )}




        <Grid container spacing={1}>

        <Grid item xs={10} >
          <SearchSeccion/>
          </Grid>
          <Grid item xs={2} >
          <Fab  style={{background:" #6f68d7", color:"white"}} >
            <SearchIcon />
          </Fab>
        </Grid>
        </Grid>
        
    
    </Toolbar>
  
    </div>
  );
}

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('correoElectronico');
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
 

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;



  return (
    <div>

   {props.children}
  
    </div>
  );
                }

              
