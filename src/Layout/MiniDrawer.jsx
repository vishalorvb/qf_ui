import { useEffect, useState } from "react";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import MuiListItemIcon from "@mui/material/ListItemIcon";
import MuiListItemText from "@mui/material/ListItemText";
import { useLocation, useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ExpandMore } from "../CustomComponent/ExpandMore";
//navItems
import {
  testManagementList,
  reportsManagementList,
  functionalManagementList,
  opsManagementList,
  qfAdmin,
} from "./SidebarNavlist";
import { Button, Collapse, Typography } from "@mui/material";
import { Copyright } from "./Login";
import useAuth from "../hooks/useAuth";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import LogoutIcon from "@mui/icons-material/Logout";
import useLogout from "../hooks/useLogout";
import UserCard from "./UserCard";

const drawerWidth = 250;

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

export default function MiniDrawer({ open, setOpen }) {
  const logout = useLogout();
  const { auth } = useAuth();
  const role = auth?.roles;
  const [opensubNav, setOpensubNav] = useState(["Application"]);
  const location = useLocation();

  const openSubNavigationHandle = (navItem) => {
    setOpensubNav((ps) => {
      return ps.includes(navItem.name) ? [] : [navItem.name];
    });
  };

  const OpenInNewWindow = (navItem) => {
    window.open(navItem?.route).focus();
  };
  const navigate = useNavigate();
  const navigationItemRender = (rawList) => {
    const navigationList = rawList
      ?.filter((navItem) => navItem.accessRole.includes(role))
      ?.map((navItem, index) => {
        return (
          <ListItem disableGutters key={navItem.name} className="navListItem">
            <ListItemButton
              onClick={() => {
                navItem?.route === ""
                  ? openSubNavigationHandle(navItem)
                  : navItem?.route?.includes("//")
                  ? OpenInNewWindow(navItem)
                  : navigate(navItem.route, { state: navItem?.state || {} });
              }}
              dense
              className="navItems"
            >
              <MuiListItemIcon className="navListIconItem">
                {navItem.icon}
              </MuiListItemIcon>
              <MuiListItemText
                primary={navItem.name}
                className={
                  // selectedNavItem === navItem?.id
                  location?.pathname?.includes(navItem?.route)
                    ? "navListItemText navListItemTextSelected"
                    : "navListItemText"
                }
              />

              {navItem.subList && open && (
                <MuiListItemIcon className="navListIconItem">
                  <ExpandMore
                    expand={opensubNav.includes(navItem.name)}
                    // onClick={() => openSubNavigationHandle(navItem)}
                    aria-expanded={opensubNav.includes(navItem.name)}
                    aria-label="show more"
                    disableFocusRipple
                    disableRipple
                  >
                    <ExpandMoreIcon />
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

  const testManagementMenu = navigationItemRender(testManagementList);
  const reportsManagementMenu = navigationItemRender(reportsManagementList);
  const functionalManagementMenu = navigationItemRender(
    functionalManagementList
  );
  const opsManagementMenu = navigationItemRender(opsManagementList);
  const qfAdminMenu = navigationItemRender(qfAdmin);

  return (
    <ThemeProvider theme={drawerTheme}>
      <Drawer variant="permanent" open={open} className="drawer">
        <DrawerHeader className="drawerHeader">
          <Logo onClick={() => setOpen(true)}>QF</Logo>
          {open && <Typography>Quality Fusion</Typography>}
          <IconButton
            size="small"
            className="closeDrawerIcon"
            onClick={() => setOpen(false)}
          >
            <KeyboardArrowLeftIcon />
          </IconButton>
        </DrawerHeader>
        <div className="menu">
          <UserCard />
          {/* <div
            className="profile"
            style={{ width: drawerWidth - 20, overflow: "hidden" }}
          >
            {imageUrl !== " " && (
              <img
                onClick={(e) => {
                  navigate("/profile");
                }}
                alt="profile"
                src={imageUrl}
                width="40"
                height="40"
                style={{ borderRadius: "50%" }}
              />
            )}

            {imageUrl === " " && (
              <img
                onClick={(e) => {
                  navigate("/profile");
                }}
                alt="profile"
                src="profile.jpg"
                width="40"
                height="40"
                style={{ borderRadius: "50%" }}
              />
            )}

            {open && (
              <div>
                <Typography
                  sx={{
                    color: "white",
                    margin: "0px",
                    textOverflow: "ellipsis",
                  }}
                >
                  Welcome {auth?.info?.firstName}
                </Typography>
                <Typography variant="caption" sx={{ color: "#728FAD" }}>
                  {auth?.info?.userProfiles[0]?.type}
                </Typography>
              </div>
            )}
          </div> */}

          {testManagementMenu?.length > 0 && (
            <>
              {open && (
                <div className="sideNavSections">
                  <span>Test management</span>
                </div>
              )}
              <List className="menuList">{testManagementMenu}</List>
            </>
          )}
          {reportsManagementMenu?.length > 0 && (
            <>
              {open && (
                <div className="sideNavSections">
                  <span>Reports</span>
                </div>
              )}
              <List className="menuList">{reportsManagementMenu}</List>
            </>
          )}
          {functionalManagementMenu?.length > 0 && (
            <>
              {open && (
                <div className="sideNavSections">
                  <span>Functional</span>
                </div>
              )}
              <List className="menuList">{functionalManagementMenu}</List>
            </>
          )}
          {opsManagementMenu?.length > 0 && (
            <>
              {open && (
                <div className="sideNavSections">
                  <span>Ops</span>
                </div>
              )}
              <List className="menuList">{opsManagementMenu}</List>
            </>
          )}
          {qfAdminMenu?.length > 0 && (
            <>
              <List className="menuList">{qfAdminMenu}</List>
            </>
          )}
        </div>
        {open && (
          <Button
            sx={{
              justifyContent: "space-between",
              margin: "8px",
              marginBottom: "20px",
              color: "#728FAD",
              padding: "10px",
              backgroundColor: "#001c56",
              "&:hover": {
                backgroundColor: "#ffff",
              },
            }}
            endIcon={<LogoutIcon />}
            onClick={() => logout()}
          >
            Logout
          </Button>
        )}
        {open && <Copyright className="copyright" />}
      </Drawer>
    </ThemeProvider>
  );
}
