import React from "react"
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

interface DetailsCardProps {
  icons:  React.ReactNode,
  title: string,
  content:string,
  background:string,


} 


const DetailsCard = ( {  icons, title, content, background } : DetailsCardProps) => (
  <div>
    <Card elevation={0} style={{ backgroundImage: background }}>
      <CardContent className="card-content">
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Typography variant="h2" style={{ color: "white", textAlign: "center" }}>
              {icons} {content}
            </Typography>
            <Typography variant="h6" style={{ textAlign: "center", color: "#ffffff", fontWeight: "initial", fontSize: "1.1rem" }}>
              {title}
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={6}
            style={{
              textAlignLast: "end",
              marginTop: "auto",
            }}
          >
          
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  </div>
)

export default DetailsCard
