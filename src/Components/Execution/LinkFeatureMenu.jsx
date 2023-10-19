import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import RuntimeVariable from "./RuntimeVariable";
import ReportPath from "./ReportPath";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function LinkFeatureMenu({ runtimeVar, buildEnvId }) {
  // console.log(runtimeVar)
  const [openRuntimeVar, setOpenRuntimeVar] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [reportPath, setReportPath] = React.useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // console.log(location.pathname)

  return (
    <>
      <Button
        fullWidth
        sx={{ backgroundColor: "#009fee" }}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="contained"
      >
        Features <ArrowDropDownIcon />
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
        <MenuItem onClick={() => setReportPath(true)}>Report Path</MenuItem>
      </Menu>
      <RuntimeVariable
        open={openRuntimeVar}
        close={setOpenRuntimeVar}
        envId={buildEnvId}
        runtimeVar={runtimeVar}
      />
      <ReportPath
        open={reportPath}
        close={setReportPath}
        buildEnvId={buildEnvId}
      />
    </>
  );
}
