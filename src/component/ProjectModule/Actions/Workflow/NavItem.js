import { useState } from "react";
import { Collapse, Paper } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { List, ListItemButton, ListItemText } from "@mui/material";

export default function NavItem({
  selectedIndex,
  handleListItemClick,
  index,
  mod,
}) {
  const [showSubMenu, setShowSubMenu] = useState(false);

  const subMenuRender = (subnav, index, i) => {
    return (
      <ListItemButton
        key={index + "." + i}
        selected={selectedIndex === index + "." + i}
        sx={{ pl: 4 }}
        onClick={(e) =>
            handleListItemClick(e, index + "." + i, subnav)
          }
      >
        <ListItemText
        key={index + "." + i}
          primary={subnav.module_name}
          primaryTypographyProps={{
            noWrap: true,
            fontSize: 12,
            lineHeight: "16px",
          }}
          
        />
      </ListItemButton>
    );
  };

  return (
    <Paper square variant="outlined">
      
      <ListItemButton selected={selectedIndex === index} onClick={(e) => handleListItemClick(e, index, mod)}>
        <ListItemText
          
          primary={mod.name === undefined ?( mod.testset_name === undefined ?  mod.module_name :  mod.testset_name  ) :  mod.name }
          primaryTypographyProps={{
            noWrap: true,
            fontSize: 12,
            lineHeight: "16px",
          }}
        />
        {mod.child?.length > 0 &&
          (showSubMenu ? (
            <ExpandLess onClick={() => setShowSubMenu(false)} />
          ) : (
            <ExpandMore onClick={() => setShowSubMenu(true)} />
          ))}
      </ListItemButton>
      <Collapse in={showSubMenu} timeout="auto" unmountOnExit>
        <List component="div" disablePadding dense>
          {mod.child?.map((item, i) => subMenuRender(item, index, i))}
        </List>
      </Collapse>
    </Paper>
  );
}
