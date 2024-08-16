import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import LogoutIcon from "@mui/icons-material/Logout";
import RestoreIcon from "@mui/icons-material/Restore";
import Link from "@mui/material/Link";
import Fab from "@mui/material/Fab";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { getSession } from "@/app/helpers/session";
import Login from "../(login)/pages/login/page";
import { useState } from "react";


export default function FadeMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [login, setLogin] = useState("")


  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  

  React.useEffect(() => {
    setLogin(    getSession().loginUsuario )
  }, [])

  
  return (
   <>
      <Grid container spacing={2} style={{marginRight: 70, marginTop: 0}}>
        <Grid xs={8} >
          <Typography
            variant="h6"
            noWrap
            component="div"
            style={{ color: "white", marginRight: "38px" }}
          >
            Administración de Usuarios
          </Typography>

        </Grid>
      <Grid xs={4} style={{ textAlign:  "right" }}>

          <Typography style={{ fontWeight: "bold", marginTop: 5}}> { login }</Typography>
      </Grid>
        
      </Grid>
    
      <Fab
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        style={{
          position: "absolute",
          right: "31px",
          width: "51px",
          height: "51px",
          bottom: "9px",
          background: "#9f9f9f",
        }}
        onClick={handleClick}
      >
        <PersonIcon
          style={{ color: "#ffffff", width: "30px", height: "100%" }}
        />
      </Fab>

      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem
          onClick={handleClose}
          component={Link}
          href="/pages/users/restorePassword"
        >
          <RestoreIcon style={{ color: "#757575ba", marginRight: "10px" }} />{" "}
          Cambiar contraseña
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} href="/">
          {" "}
          <LogoutIcon style={{ color: "#757575ba", marginRight: "10px" }} />
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
