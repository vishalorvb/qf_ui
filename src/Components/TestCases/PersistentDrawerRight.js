
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { Button, Grid, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

const drawerWidth = 240;
export let selected_screen;

export default function PersistentDrawerRight({ screen, screenId, setScreenId }) {
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function handleClick(e) {
    let val = parseInt(e.target.value)
    if (screenId.includes(val)) {
      let temp = screenId.filter(s => {
        if (s != val) {
          return s
        }
      })

      setScreenId([...temp])
    }
    else {
      let temp = screenId
      temp.push(val)

      setScreenId([...temp])
    }
  }

  useEffect(() => {
  }, [screenId])

  useEffect(() => {
    setScreenId([screen[0].screen_id])
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
          return (
            <Grid component={Paper} elevation={0} container className="header" >
              <div className="sidebar">
                <h5>{s.name}</h5>
                <p>{s.description}</p>
                <input onChange={handleClick} type="checkbox" checked={screenId.includes(s.screen_id)} value={s.screen_id} />
                <Divider />
              </div>
            </Grid>
          )
        })}

      </Drawer>
    </Box>
  );
}