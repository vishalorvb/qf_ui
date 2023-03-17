import { Dialog, IconButton, Grid } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';


function ApiTestCasePopUp(props) {
  return (
    <Dialog open={props.open} fullWidth={true} maxWidth='sm'>
      <div>
        <Grid container justifyContent="space-between" columnSpacing={2}>
          <Grid item xs={3} md={3} lg={3}>
            <h4 style={{marginLeft:"10px" , marginTop:"10px" , color:"#1565c0"}}>{props.heading}</h4>
          </Grid>
          <Grid item xs={3} md={3} lg={3}>
            <IconButton sx={{ float: "right" }} onClick={props.setOpen}><CloseIcon ></CloseIcon></IconButton>
          </Grid>
        </Grid>
      </div>
      {props.children}
    </Dialog>
  )
}

export default ApiTestCasePopUp
