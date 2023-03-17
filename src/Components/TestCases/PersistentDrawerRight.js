
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { Button, Grid, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
// import { getScreen } from '../../Services/ProjectService';
// import { getData_for_createDataset } from '../../Services/TestCaseService';


const drawerWidth = 240;
export let selected_screen;

export default function PersistentDrawerRight({screen}) {
  const [open, setOpen] = useState(true);
  // let [screen, setScreen] = useState([])
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    // getScreen(setScreen, 768)
    // getData_for_createDataset(setScreen,618)
    console.log(screen)
  }, [screen])
  return (
    <Box sx={{ display: 'flex' }}>
      <IconButton
        onClick={handleDrawerOpen}
      >
        <Button variant="contained">Show Screen</Button>
      </IconButton>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >


        <IconButton onClick={handleDrawerClose}>
          <Button variant="outlined">Screens</Button>
          <DoubleArrowIcon></DoubleArrowIcon>
        </IconButton>
        <Divider />
        <h6>List of screens</h6>
        {screen.map(s => {
          console.log(s)
          return (
            <Grid component={Paper} elevation={0} container className="header" draggable={true}>
              <div className="sidebar"
               onDragOver={e=>{
                selected_screen= s
               }}
               onClick={e=>console.log(s)}
              >
                <h5>{s.name}</h5>
                <p>{s.description}</p>
               
                <Divider />
              </div>
            </Grid>
          )
        })}

      </Drawer>
    </Box>
  );
}