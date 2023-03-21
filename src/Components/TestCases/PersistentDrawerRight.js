import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { Stack } from "@mui/system";

const drawerWidth = 240;
export let selected_screen;

export default function PersistentDrawerRight({
  screen,
  screenId,
  setScreenId,
}) {
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function handleClick(e) {
    setScreenId([e]);
  }

  useEffect(() => {}, [screenId]);

  useEffect(() => {
    setScreenId([screen[0].screen_id]);
  }, [screen]);

  return (
    <>
      <Button variant="contained" onClick={handleDrawerOpen}>
        {open ? "Hide Screens" : "Show Screens"}
      </Button>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <IconButton size="small" onClick={handleDrawerClose}>
          <DoubleArrowIcon></DoubleArrowIcon>
        </IconButton>
        <Divider />
        <Typography align="center" m={2}>
          List of screens
        </Typography>
        {screen.map((s) => {
          return (
            <Stack
              mt={1}
              ml={1}
              sx={{
                backgroundColor: screenId.includes(s.screen_id) && "#e8edf2",
                cursor: "pointer",
              }}
              onClick={() => handleClick(s.screen_id)}
            >
              <Typography variant="p" sx={{ fontWeight: "bold" }}>
                {s.name}
              </Typography>
              <Typography variant="caption">{s.description}</Typography>
              {/* <input
                onChange={handleClick}
                type="checkbox"
                checked={screenId.includes(s.screen_id)}
              /> */}
              <Divider />
            </Stack>
          );
        })}
      </Drawer>
    </>
  );
}
