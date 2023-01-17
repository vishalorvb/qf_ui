import * as React from 'react';
import { Box } from "@mui/system"
import { Card,CardActions,CardContent, Typography,IconButton } from "@mui/material"
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Grid from '@mui/material/Grid';
export default function Example() {

    const crd = (
        <Card sx={{ Width: '100px' }}>
        <CardContent>
          <Typography sx={{ fontSize: 20 }} align='right' color="text.secondary" gutterBottom>
            Total Projects
          </Typography>
          <Typography variant="h3" align='right' component="div">
            41
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex",justifyContent: "flex-end"}}>
          <IconButton ><OpenInNewIcon/></IconButton>
        </CardActions>
      </Card>
    )

    return(
        <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {Array.from(Array(6)).map((_, index) => (
        <Grid item xs={2} sm={4} md={4} key={index}>
        {crd}
        </Grid>
      ))}
    </Grid>
  </Box>
    )
}