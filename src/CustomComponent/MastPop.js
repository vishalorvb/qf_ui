import { Dialog, IconButton } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';


function MastPop(props) {
  return (
    <Dialog open={props.open} fullWidth={true} maxWidth='md'>
        <div>
            <IconButton sx={{float:"right"}} onClick={props.setOpen}><CloseIcon ></CloseIcon></IconButton>
        </div>
        <div style={{padding:"10px"}}>
        {props.children}
        </div>
        
    </Dialog>
  )
}

export default MastPop
