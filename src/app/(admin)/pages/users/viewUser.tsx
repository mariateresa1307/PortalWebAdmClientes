"use client";
import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
//import Checkbox from '@mui/material/Checkbox';
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";
import logo from "../../../assets/image/user1.jpeg";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import SearchIcon from "@mui/icons-material/Search";
import { Search } from "@mui/icons-material";
import SearchSeccion from "../../../components/search";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import CustomModalEdit from "../users/editUser";
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
  protein: React.ReactNode
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
    backgroundColor: "red",
    color: (props: any) => props.color,
  },
});
export default function EnhancedTable(props: any) {
  const classes = useStyles(props);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
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

  type Order = "asc" | "desc";

  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
  ) => number {
    return order === "desc"
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
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "Nombres y Apellidos ",
    },
    {
      id: "correoElectronico",
      numeric: true,
      disablePadding: false,
      label: "Correo Electronico",
    },
    {
      id: "departament",
      numeric: true,
      disablePadding: false,
      label: "Departamento",
    },
    {
      id: "rol",
      numeric: true,
      disablePadding: false,
      label: "Rol Usuario",
    },
    {
      id: "protein",
      numeric: true,
      disablePadding: false,
      label: "",
    },
  ];

  interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (
      event: React.MouseEvent<unknown>,
      property: keyof Data
    ) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
  }

  function EnhancedTableHead(props: EnhancedTableProps) {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
    } = props;
    const createSortHandler =
      (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
      };

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox"></TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel>{headCell.label}</TableSortLabel>
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
          background: "#344a8f70",
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
          paddingBottom: "10px",
        }}
      >
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...(numSelected > 0 && {
              bgcolor: (theme) =>
                alpha(
                  theme.palette.primary.main,
                  theme.palette.action.activatedOpacity
                ),
            }),
          }}
        >
          <Grid container spacing={1}>
            <Grid item md={11}>
              <SearchSeccion />
            </Grid>
            <Grid item md={1}>
              <Fab style={{ background: " #344a8f", color: "white" }}>
                <SearchIcon />
              </Fab>
            </Grid>
          </Grid>

          <div></div>
        </Toolbar>
      </div>
    );
  }

  const [order, setOrder] = React.useState<Order>("asc");
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={0} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              order={order}
              orderBy={props.propsorderBy}
              onSelectAllClick={props.handleSelectAllClick}
              onRequestSort={props.handleRequestSort}
              rowCount={rows.length}
              numSelected={0}
            />
            <TableBody>
              {rows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Image
                        src={logo}
                        alt=""
                        style={{
                          width: "40px",
                          height: "40px",
                          display: "block",
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.correoElectronico}</TableCell>
                    <TableCell align="right">{row.departament}</TableCell>
                    <TableCell align="right">{row.rol}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={props.page}
          onPageChange={props.handleChangePage}
          onRowsPerPageChange={props.handleChangeRowsPerPage}
        />
      </Paper>
      <CustomModalEdit
        open={open}
        handleClose={handleClose}
        title={"  Gestionar Clientes"}
      />
    </Box>
  );
}
