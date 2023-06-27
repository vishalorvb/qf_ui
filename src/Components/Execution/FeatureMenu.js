import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import RuntimeVar from "./RuntimeVar";
import RuntimeVariable from "./RuntimeVariable";
import FeatureFile from "./FeatureFile";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import useHead from "../../hooks/useHead";

export default function FeatureMenu({
  envId,
  runtimeVar,
  testcaseId,
  selectedDatasets,
  testsetId,
  frameworkType,
  projectId,
}) {
  const [openRuntimeVar, setOpenRuntimeVar] = React.useState(false);
  const [openFeaturefile, setFeatureFile] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const location = useLocation();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // const { setHeader, globalProject, setglobalProject, globalApplication, setglobalApplication  } = useHead();

  return (
    <>
      <Button
        sx={{ backgroundColor: "#009fee" }}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="contained"
        // endIcon={<ArrowDropDownIcon sx={{marginLeft:"20px"}} />}
      >
        Features
        <ArrowDropDownIcon />
      </Button>
      {location.pathname == "/TestcaseExecution" && (
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
          {/* {frameworkType == 4 && (
            <MenuItem
              onClick={() => {
                navigate("/TestcaseExecution/ConfigureDevice", {
                  state: {
                    projectId: projectId,
                    pathname: location.pathname,
                  },
                });
              }}
            >
              Configure Device
            </MenuItem>
          )} */}
        </Menu>
      )}
      {location.pathname == "/TestsetExecution" && (
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
          {/* {frameworkType == 4 && (
            <MenuItem
              onClick={() => {
                navigate("/TestsetExecution/ConfigureDevice", {
                  state: {
                    projectId: projectId,
                    pathname: location.pathname,
                  },
                });
              }}
            >
              Configure Device
            </MenuItem>
          )} */}
        </Menu>
      )}

      <RuntimeVariable
        open={openRuntimeVar}
        close={setOpenRuntimeVar}
        envId={envId}
        runtimeVar={runtimeVar}
      />
      <FeatureFile
        open={openFeaturefile}
        close={setFeatureFile}
        testcaseId={testcaseId}
        selectedDatasets={selectedDatasets}
      />
    </>
  );
}
