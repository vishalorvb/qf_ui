import { useEffect, useState } from "react";
import useHead from "../hooks/useHead";
import Table from "../CustomComponent/Table";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Outlet, useNavigate } from "react-router-dom";
import { Autocomplete, Grid, Menu, MenuItem, Typography } from "@mui/material";
import { getPipelines } from "../Services/QfService";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { getProject } from "../Services/QfService";
import useAuth from "../hooks/useAuth";

export default function Pipeline() {
  const { setHeader, globalProject, setglobalProject } = useHead();
  const navigate = useNavigate();

  const [instances, setInstances] = useState([]);
  const [project, setProject] = useState([]);
  const { auth } = useAuth();

  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Pipeline Instances",
        plusButton: false,
        buttonName: "Create Pipeline",
        plusCallback: () =>
          navigate("CreatePipeline", {
            state: { id: 0, project_Id: globalProject?.project_id },
          }),
      };
    }, []);

    return () =>
      setHeader((ps) => {
        return {
          ...ps,
          name: "",
          plusButton: false,
          plusCallback: () => console.log("null"),
        };
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalProject]);

  useEffect(() => {
    getProject(setProject, auth.userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (globalProject === null) {
      setglobalProject(project[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  useEffect(() => {
    globalProject?.project_id
      ? getPipelines(setInstances, globalProject?.project_id)
      : setInstances([]);
  }, [globalProject]);

  const instanceColumns = [
    {
      field: "release_name",
      headerName: "Name",
      flex: 3,
      sortable: false,
      renderCell: (param) => {
        return (
          <Typography
            variant="p"
            onClick={() =>
              navigate("pipelineAutomation", { state: { id: param.row.id } })
            }
            style={{ color: "#009fee", cursor: "pointer" }}
          >
            {param.row.release_name}
          </Typography>
        );
      },
    },
    {
      field: "release_desc",
      headerName: "Description",
      flex: 3,
      sortable: false,
    },
    {
      field: "updated_at",
      headerName: "Last Updated",
      flex: 3,
      sortable: false,
      renderCell: (param) => {
        return PipelineActionCell(param);
      },
    },
  ];

  return (
    <>
      <div className="apptable">
        <div className="intable">
          <Grid container spacing={2} justifyContent="right">
            <Grid item md={5}>
              <label for="">Projects</label>
              <Autocomplete
                disablePortal
                disableClearable
                id="project_id"
                options={project}
                value={globalProject || null}
                sx={{ width: "100%" }}
                getOptionLabel={(option) => option.project_name}
                onChange={(e, value) => {
                  setglobalProject(value);
                }}
                renderInput={(params) => (
                  <div ref={params.InputProps.ref}>
                    <input type="text" {...params.inputProps} />
                  </div>
                )}
              />
            </Grid>
          </Grid>
        </div>
        <Table rows={instances} columns={instanceColumns} />
      </div>
      <Outlet />
    </>
  );
}

const PipelineActionCell = (param) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="descColumn">
      <Typography variant="p">{param.row.updated_at}</Typography>
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
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() =>
            navigate("UpdatPipeline", {
              state: param?.row,
            })
          }
        >
          <EditOutlinedIcon sx={{ color: "blue", mr: 1 }} />
          Edit
        </MenuItem>
        {/* <MenuItem onClick={() => setRowData(param.row)}>
          <DeleteOutlineIcon sx={{ color: "red", mr: 1 }} />
          Delete
        </MenuItem> */}
      </Menu>
    </div>
  );
};
