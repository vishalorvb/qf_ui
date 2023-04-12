import { useEffect, useState } from "react";
import useHead from "../hooks/useHead";
import Table from "../CustomComponent/Table";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Outlet, useNavigate } from "react-router-dom";
import { Menu, MenuItem, Typography } from "@mui/material";
import { getPipelines } from "../Services/DevopsServices";
import ProjectsDropdown from "../Components/ProjectsDropdown";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function Pipeline() {
  const { setHeader } = useHead();
  const navigate = useNavigate();

  const [instances, setInstances] = useState([]);
  const [selectedProject, setSelectedProject] = useState({});
  const [moduleId, setModuleId] = useState(0);

  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Pipeline Instances",
        plusButton: false,
        buttonName: "Create Pipeline",
        plusCallback: () =>
          navigate("CreatePipeline", {
            state: { id: 0, project_Id: selectedProject?.project_id },
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
  }, [selectedProject]);

  useEffect(() => {
    // const module = selectedProject?.find(
    //   (module) => module?.module_type === 20
    // );
    // const module = selectedProject.module ? (selectedProject.filter(mod => mod.modules.length >0 )).find(module => module?.module_type === 20) : [];
    // module?.module_id
    //   ? getPipelines(setInstances, module?.module_id)
    //   : setInstances([]);
    // module?.module_id ? setModuleId(module?.module_id) : setModuleId(0);
    // console.log(module?.module_type);
    selectedProject?.project_id
      ? getPipelines(setInstances, selectedProject?.project_id)
      : setInstances([]);
  }, [selectedProject]);

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
        return (
          PipelineActionCell(param)
        )
      }
    },
  ];

  return (
    <>
      <ProjectsDropdown
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
      />
      <Table rows={instances} columns={instanceColumns} />
      <Outlet />
    </>
  );
}

const PipelineActionCell = (
  param
) => {
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
            navigate("UpdateAnsibleInstance", {
              state: param?.row
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

