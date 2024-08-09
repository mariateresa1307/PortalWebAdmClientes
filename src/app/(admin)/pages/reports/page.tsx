"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import AssessmentIcon from "@mui/icons-material/Assessment";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ReportOperaciones from "../../../components/reportOperaciones";
import ReportClients from "../../../components/reportClients";
import { read, utils, writeFileXLSX } from "xlsx";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function Report() {
  const [value, setValue] = React.useState<number | null>(2);
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState("");
  const [taps, setTaps] = React.useState(0);

  const handleChange1 = (event: React.SyntheticEvent, newValue: number) => {
    setTaps(newValue);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Typography
        sx={{ flex: 1, mb: 3 }}
        style={{ color: "#315e7f", fontWeight: "bold", fontSize: "22px" }}
      >
        <AssessmentIcon sx={{ mr: 1 }} />
        Gestion de Reportes
      </Typography>

      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={9} md={9}>
              <div
                style={{
                  fontSize: "18px",
                  color: "#315e7f",
                  fontWeight: "bold",
                }}
              >
                {" "}
                <DashboardCustomizeIcon style={{ marginRight: "10px" }} />
                Tabla de Datos
              </div>
            </Grid>
          </Grid>

          <Box sx={{ width: "100%", mt: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={taps}
                onChange={handleChange1}
                aria-label="basic tabs example"
              >
                <Tab label="Clientes" {...a11yProps(1)} />
                <Tab label="Operaciones" {...a11yProps(0)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={taps} index={0}>
              <ReportClients />
            </CustomTabPanel>
            <CustomTabPanel value={taps} index={1}>
              <ReportOperaciones />
            </CustomTabPanel>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
