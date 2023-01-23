import { useState } from "react";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import MuiListItemIcon from "@mui/material/ListItemIcon";
import MuiListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { NavLink, useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ExpandMore } from "../CustomComponent/ExpandMore";
//navItems
import {
  testManagementList,
  opsManagementList,
  qfAdmin,
} from "./SidebarNavlist";
import MuiChip from "@mui/material/Chip";
import { Collapse, Typography } from "@mui/material";

const drawerWidth = 240;

const drawerTheme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#002980",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          color: "white",
          fontSize: "0.7rem",
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          color: "white",
          fontSize: "12px",
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
  },
});

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: theme.spacing(0, 1),
  backgroundColor: "white",
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Logo = styled(Typography, {
  name: "Logo",
})({
  "&": {
    color: "#2255CE",
    fontSize: "1.7rem",
    fontWeight: "700",
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const role = "";

export default function MiniDrawer({ open }) {
  const [openApplication, setOpenApplicatiion] = useState(false);
  const navigate = useNavigate();
  const navigationItemRender = (rawList) => {
    const navigationList = rawList
      .filter((navItem) => navItem.accessRole.includes(role))
      .map((navItem, index) => {
        return (
          <ListItem disableGutters sx={{ display: "block" }} key={navItem.name}>
            <ListItemButton
              onClick={() => navigate(navItem.route)}
              dense
              sx={{
                minHeight: 30,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              {
                <MuiListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {navItem.icon}
                </MuiListItemIcon>
              }
              <MuiListItemText
                primary={navItem.name}
                sx={{ opacity: open ? 1 : 0 }}
              />
              {navItem.subList && open && (
                <MuiListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: "center",
                  }}
                >
                  <ExpandMore
                    expand={openApplication}
                    onClick={() => setOpenApplicatiion(!openApplication)}
                    aria-expanded={openApplication}
                    aria-label="show more"
                    disableFocusRipple
                    disableRipple
                  >
                    <ExpandMoreIcon sx={{ color: "white" }} />
                  </ExpandMore>
                </MuiListItemIcon>
              )}
            </ListItemButton>
            <Collapse in={openApplication}>
              {navItem.subList && (
                <List dense disablePadding>
                  {navigationItemRender(navItem.subList)}
                </List>
              )}
            </Collapse>
          </ListItem>
        );
      });
    return navigationList;
  };

  return (
    <ThemeProvider theme={drawerTheme}>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Logo>QF</Logo>
          {open && (
            <Typography
              sx={{
                color: "black",
                fontSize: "1.2rem",
                paddingLeft: "10px",
                fontWeight: "400",
              }}
            >
              Quality Fusion
            </Typography>
          )}
        </DrawerHeader>
        <List>{navigationItemRender(qfAdmin)}</List>
        <Divider
          textAlign="left"
          sx={{
            alignItems: "start",
            "&::before, &::after": {
              borderColor: "white",
            },
            borderColor: "white",
          }}
        >
          {open && <MuiChip variant="outlined" label="Test management" />}
        </Divider>
        <List dense disablePadding>
          {navigationItemRender(testManagementList)}
        </List>
        <Divider
          textAlign="left"
          sx={{
            alignItems: "start",
            "&::before, &::after": {
              borderColor: "white",
            },
            borderColor: "white",
          }}
        >
          {open && <MuiChip variant="outlined" label="Ops" />}
        </Divider>
        <List dense disablePadding>
          {navigationItemRender(opsManagementList)}
        </List>
      </Drawer>
    </ThemeProvider>
  );
}
