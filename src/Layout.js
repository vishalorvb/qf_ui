import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { Container } from "@mui/system";
// import StickyFooter from './StickyFooter';
import AppContent from "./AppContent";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { Tooltip, Typography } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from '@mui/icons-material/Settings';
import Navigation from "./component/navigation/Navigation";
import AccessibilityModal from "./AccessibilityModal";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1
}),
);

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(7),
      },
    }),
  },
}));

const mdTheme = createTheme({
  typography: {
    fontSize: 13,
  },
  palette: {
    // mode: 'dark',
    primary: { main: '#0047ac', lightGrey: '#E2E7EE' },


    // background: { paper: 'rgba(137,196,244,0.1)' },
  },
  // "& .MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputSizeSmall.css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input":{
  //   padding:'1px 1px'
  // }
  "& .css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input": {
    height: '0.5em'
  }
});

function DashboardContent() {
  const [openAccessibility, setOpenAccessibility] = React.useState(false);
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      {/* whole app structure */}
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {/* app bar at top */}
        <AppBar position="absolute" open={open}>
          <Toolbar sx={{
            pr: "24px", // keep right padding when drawer closed 
          }} className="appHeader" >
            <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>

            <img className="logo" src="prolificstesting_logo_w.png" alt="logo" width={150} />

            <Toolbar className="rightContent" color="inherit">
              <Typography noWrap sx={{ marginRight: "20px", }}>
                Welcome {localStorage.getItem("resName")}!
              </Typography>
              <Tooltip title="Logout" placement="bottom">
                <LogoutIcon />
              </Tooltip>
            </Toolbar>
          </Toolbar>
        </AppBar>
        {/* navigation panel */}
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              {open ? <MenuOpenIcon /> : <MenuIcon />}
            </IconButton>
          </Toolbar>
          <Divider />
          {/* <ListItems openDrawer={open} setDrawerOpen={setOpen}/> */}
          <Navigation openDrawer={open} setDrawerOpen={setOpen} />
          <List component="div" disablePadding className="settingsBtn">
            <ListItemButton onClick={() => setOpenAccessibility(true)}>
              <ListItemIcon className="SettingsIcon">
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </List>
        </Drawer>
        {/* main app content */}
        <Box
          component="main"
          sx={{
            // backgroundColor: (theme) =>
            //   theme.palette.mode === "light"
            //     ? theme.palette.grey[100]
            //     : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth={false} sx={{ mt: 1, mb: 1 }}>
            <AppContent />
          </Container>
        </Box>
      </Box>
      <AccessibilityModal openAccessibility={openAccessibility} setOpenAccessibility={setOpenAccessibility} />
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
