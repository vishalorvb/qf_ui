import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import { useNavigate } from "react-router-dom";

export default function NavigationRenderer({ nav, openDrawer, setDrawerOpen }) {
  const navigate = useNavigate();

  const [showSubMenu, setShowSubMenu] = useState(false);

  const subMenuRender = (subnav) => {
    return (
      <ListItemButton
        key={subnav.item}
        sx={{ pl: 10 }}
        onClick={() => navigate(subnav.route)}
      >
        <ListItemText primary={subnav.item} />
      </ListItemButton>
    );
  };

  useEffect(() => {
    openDrawer === false ? setShowSubMenu(false) : console.log("drawer open");
  }, [openDrawer]);

  return (
    <>
      <Tooltip title={openDrawer ? "" : nav.item} placement="right-start">
        <ListItemButton
          onClick={() => {
            !openDrawer && setDrawerOpen(true);
            setShowSubMenu((ps) => !ps);
          }}
        >
          <ListItemIcon>{nav.icon}</ListItemIcon>
          <ListItemText primary={nav.item} />
          {showSubMenu ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </Tooltip>
      <Collapse in={showSubMenu} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {nav.children.map((item) => subMenuRender(item))}
        </List>
      </Collapse>
    </>
  );
}
