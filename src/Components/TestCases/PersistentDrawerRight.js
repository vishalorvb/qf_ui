
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

export default function PersistentDrawerRight({screen,screenId,setScreenId}) {
  const [open, setOpen] = useState(true);
  // let [screen, setScreen] = useState([])
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function handleClick(e){
    if(screenId.includes(e.target.value)){
      console.log("includes")
      let temp = screenId.filter(s=>{
        console.log(s)
        console.log(e.target.value)
        if(s.screen_id != e.target.value){
          return s
        }
      })
      console.log(temp)
      setScreenId(temp)
    }
    else{
      let temp = screenId
      temp.push(e.target.value)
      setScreenId(temp)
    }
  }

  useEffect(() => {
    console.log(screen)
    console.log(screenId)
  }, [screen,screenId])
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
            <Grid component={Paper} elevation={0} container className="header" draggable={true}>
              <div className="sidebar"
               onDragOver={e=>{
                selected_screen= s
               }}
              >
                <h5>{s.name}</h5>
                <p>{s.description}</p>
               <input onChange={handleClick} checked={screenId.includes(s.screen_id)} type="checkbox" value={s.screen_id}/>
                <Divider />
              </div>
            </Grid>
          )
        })}

      </Drawer>
    </Box>
  );
}