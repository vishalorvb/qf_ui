import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Typography } from '@mui/material'

export default function Accessibility(props) {

    const {openAccessibility, setOpenAccessibility } = props

    return<Dialog open = {openAccessibility} onClose={()=>setOpenAccessibility(false)} >tweaking the pallate can be done from here</Dialog>
}