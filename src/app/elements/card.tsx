import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ModeIcon from '@mui/icons-material/Mode';
import Rating from '@mui/material/Rating';

export function CardRole(props: any) {

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>

        <Grid container spacing={2}>
          <Grid item xs={8} md={8}>

            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              5 usuarios
            </Typography>
            <Typography style={{ fontSize: "18px", fontWeight: "bold" }} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {props.title}
            </Typography>

          </Grid>

          <Grid style={{ textAlign: "end" }} item xs={4} md={4}>

            <Button variant="contained" onClick={props.handleOpenRoleEdit}>
              <ModeIcon />
            </Button>

          </Grid>

          <Grid item xs={8} md={8}>

            <Typography component="legend">Autoridad</Typography>
            <Rating
              name="simple-controlled"
              value={props.value}
              onChange={props.handleRating}
            />

          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}