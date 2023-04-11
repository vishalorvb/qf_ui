import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import RuntimeVar from "./RuntimeVar";
import RuntimeVariable from "./RuntimeVariable";
import FeatureFile from "./FeatureFile";
import { useNavigate } from "react-router-dom";

export default function FeatureMenu() {
  const [openRuntimeVar, setOpenRuntimeVar] = React.useState(false);
  const [openFeaturefile,setFeatureFile] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        fullWidth
        sx={{backgroundColor: "#009fee"}} 
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
        <MenuItem onClick={() => setFeatureFile(true)}>Feature File</MenuItem>
        {/* <MenuItem onClick={(e) => {
                navigate("/addEnvironment", {
                  // state: { id: params.row.report_id },
                });
              }}>Add Environment</MenuItem> */}
      </Menu>
      {/* <RuntimeVar open={openRuntimeVar} close={setOpenRuntimeVar} /> */}
      <RuntimeVariable  open={openRuntimeVar} close={setOpenRuntimeVar}/>
      <FeatureFile open={openFeaturefile} close={setFeatureFile}/>
      
    </>
  );
}
