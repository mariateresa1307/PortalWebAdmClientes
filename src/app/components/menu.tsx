"use client";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "@mui/material/Link";
import PeopleIcon from "@mui/icons-material/People";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import MyProfile from "./profile";
import { hasAvailablePage } from "../helpers/availablePages";
import { useState } from "react";
import { Grid } from "@mui/material";
import { getSession } from "@/app/helpers/session";

const drawerWidth = 240;
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

interface DrawerLeftProps {
  children: React.ReactNode;
}
export default function PersistentDrawerLeft({ children }: DrawerLeftProps) {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [MenuItemsState, setMenuItems] = useState(<> </>);
  const [login, setLogin] = useState("");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    setLogin(getSession().loginUsuario);
  }, []);

  React.useEffect(() => {
    setMenuItems(
      <>
        {hasAvailablePage("/home") && (
          <ListItem component={Link} href="/pages/home">
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText style={{ color: "gray" }} primary={"Usuario"} />
          </ListItem>
        )}

        {hasAvailablePage("/clients") && (
          <ListItem component={Link} href="/pages/clients">
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText style={{ color: "gray" }} primary={"Clientes"} />
          </ListItem>
        )}

        {hasAvailablePage("/reports") && (
          <ListItem component={Link} href="/pages/reports">
            <ListItemIcon>
              <TextSnippetIcon />
            </ListItemIcon>
            <ListItemText style={{ color: "gray" }} primary={"Reportes"} />
          </ListItem>
        )}
      </>
    );
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" style={{ background: "#000a29" }} open={open}>
        <Toolbar>
          <MyProfile />

          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>

          <Grid container spacing={2} style={{ marginRight: 70, marginTop: 0 }}>
            <Grid xs={8}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                style={{ color: "white", marginRight: "38px", paddingLeft:"34px" }}
              >
                Administración de Usuarios
              </Typography>
            </Grid>
            <Grid xs={4} style={{ textAlign: "right" }}>
              <Typography style={{ fontWeight: "bold", marginTop: 5 }}>
                {" "}
                {login}
              </Typography>
            </Grid>
          </Grid>

        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader style={{ background: "#000a29" }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            style={{ color: "white", marginRight: "38px" }}
          >
            NETUNO
          </Typography>
          <IconButton style={{ color: "white" }} onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider
          style={{
            position: "relative",
            zIndex: 0,
            borderBottom: "5px solid #7fb300",
          }}
        />
        <List>{MenuItemsState}</List>
        <Divider />
      </Drawer>
      <Main open={open} sx={{ pb: 10 }}>
        <DrawerHeader />

        {children}
      </Main>
    </Box>
  );
}
