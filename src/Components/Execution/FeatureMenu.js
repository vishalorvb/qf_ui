import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import RuntimeVar from "./RuntimeVar";

export default function FeatureMenu() {
  const [openRuntimeVar, setOpenRuntimeVar] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="contained"
      >
        + Features
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => setOpenRuntimeVar(true)}>
          Runtime Variables
        </MenuItem>
        <MenuItem onClick={handleClose}>Feature File</MenuItem>
      </Menu>
      <RuntimeVar open={openRuntimeVar} close={setOpenRuntimeVar} />
    </>
  );
}
