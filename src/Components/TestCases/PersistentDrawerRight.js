
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { Button, Grid, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { getScreen } from '../../Services/ProjectService';


const drawerWidth = 240;


export default function PersistentDrawerRight({ selectedScreen, setSelectedScreen }) {
  const [open, setOpen] = useState(false);
  let [screen, setScreen] = useState([])
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function handleClick(screen) {
    console.log(selectedScreen)
    let temp = [...selectedScreen]
    temp.push(screen)
    setSelectedScreen(temp)
  }
  useEffect(() => {
    getScreen(setScreen, 768)
  }, [])
  return (
    <Box sx={{ display: 'flex' }}>
      <IconButton
        onClick={handleDrawerOpen}
      >
        <Button variant="contained">Add Step</Button>
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
          return (
            <Grid component={Paper} elevation={0} container className="header" draggable={true}>
            <div className="sidebar"
              onClick={e => {
                handleClick(s)
              }}
              onDragOver={e => {
                console.log(s.screen_id)
              }}
              draggable={true}
              
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