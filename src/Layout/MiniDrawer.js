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
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ExpandMore } from "../CustomComponent/ExpandMore";
//navItems
import {
  testManagementList,
  opsManagementList,
  qfAdmin,
} from "./SidebarNavlist";
import { Collapse, Typography } from "@mui/material";
import { Copyright } from "./Login";
import useAuth from "../hooks/useAuth";

const drawerWidth = 200;

const drawerTheme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#002980",
          border: 0,
          display: "flex",
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

export default function MiniDrawer({ open }) {
  const { auth } = useAuth();
  const role = auth?.roles;
  const [opensubNav, setOpensubNav] = useState([]);

  const openSubNavigationHandle = (navItem) => {
    setOpensubNav((ps) => {
      return ps.includes(navItem.name)
        ? ps.filter((item) => item !== navItem.name)
        : [...ps, navItem.name];
    });
  };
  const navigate = useNavigate();
  const navigationItemRender = (rawList) => {
    const navigationList = rawList
      .filter((navItem) => navItem.accessRole.includes(role))
      .map((navItem, index) => {
        return (
          <ListItem
            disableGutters
            sx={{
              display: "block",
              paddingTop: open ? "1px" : "4px",
              paddingBottom: open ? "1px" : "4px",
            }}
            key={navItem.name}
          >
            <ListItemButton
              onClick={() =>
                navItem?.route === ""
                  ? openSubNavigationHandle(navItem)
                  : navigate(navItem.route)
              }
              dense
              className="navItems"
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
                    expand={opensubNav.includes(navItem.name)}
                    onClick={() => openSubNavigationHandle(navItem)}
                    aria-expanded={opensubNav.includes(navItem.name)}
                    aria-label="show more"
                    disableFocusRipple
                    disableRipple
                  >
                    <ExpandMoreIcon sx={{ color: "white" }} />
                  </ExpandMore>
                </MuiListItemIcon>
              )}
            </ListItemButton>
            <Collapse in={opensubNav.includes(navItem.name)}>
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
    <ThemeProvider className="sidebar" theme={drawerTheme}>
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
        <div className="menu">
          <List>{navigationItemRender(qfAdmin)}</List>

          {open && (
            <div className="sideNavSections">
              <span>Test management</span>
            </div>
          )}

          <List dense disablePadding>
            {navigationItemRender(testManagementList)}
          </List>

          {open && (
            <div className="sideNavSections">
              <span>Ops</span>
            </div>
          )}

          <List dense disablePadding>
            {navigationItemRender(opsManagementList)}
          </List>
        </div>
        {open && (
          <Copyright sx={{ position: "sticky", bottom: 10, color: "white" }} />
        )}
      </Drawer>
    </ThemeProvider>
  );
}
