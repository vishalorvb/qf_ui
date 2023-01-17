import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import FormatSizeIcon from '@mui/icons-material/FormatSize';

export default function Accessibility(props) {

    const {openAccessibility, setOpenAccessibility } = props

    return(
        <Dialog open = {openAccessibility} onClose={()=>setOpenAccessibility(false)} >
            <DialogTitle>
                Select Theme
            </DialogTitle>
            <DialogContent>
                <Box>

                <Paper>
                    <Typography>Dark Mode</Typography>
                </Paper>
                <Paper>
                    <FormatSizeIcon/><Typography>Text Size</Typography> 
                </Paper>
                </Box>
            </DialogContent> 
        </Dialog>
    )
}