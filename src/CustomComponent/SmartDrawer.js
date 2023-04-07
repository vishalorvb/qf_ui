import React, { Children } from 'react'
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



function SmartDrawer(props) {
  return (
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
        open={true}
      >
        <IconButton size="small" onClick={e=>props.close(false)}>
          <DoubleArrowIcon></DoubleArrowIcon>
        </IconButton>
        <Divider />
       {props.children}
      </Drawer>
  )
}

export default SmartDrawer
