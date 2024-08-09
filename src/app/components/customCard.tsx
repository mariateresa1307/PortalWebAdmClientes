import React from "react"
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
interface DetailsCardProps {
  icons: React.ReactNode,
  title: string,
  content: string,
  background: string,
}

const DetailsCard = ({ icons, title, content, background }: DetailsCardProps) => (
  <>
    <Card elevation={0} style={{ width: "100%", backgroundImage: background }}>
      <CardContent className="card-content">
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={12} md={12} lg={10}>
            <Typography variant="h3" style={{ color: "white", textAlign: "center" }}>
              {icons} {content}
            </Typography>
            <Typography variant="h6" style={{ textAlign: "center", color: "#ffffff", fontWeight: "initial", fontSize: "1.1rem" }}>
              {title}
            </Typography>
          </Grid>


        </Grid>
      </CardContent>
    </Card>
  </>
)

export default DetailsCard
