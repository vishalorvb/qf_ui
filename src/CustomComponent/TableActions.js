import { Menu, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function TableActions(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    // handleClose();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const heading = props?.heading ?? "";
  return (
    <div className="descColumn">
      <Tooltip title={heading?.length <= 140 ? "" : heading}>
        <Typography variant="p">
          {heading?.length <= 140 ? heading : heading?.substr(0, 140) + "..."}
        </Typography>
      </Tooltip>
      <MoreVertIcon
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="descOption"
      />

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {props.children}
      </Menu>
    </div>
  );
}

export default TableActions;
