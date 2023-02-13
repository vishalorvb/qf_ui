import { useEffect, useState } from "react";
import useHead from "../hooks/useHead";
import Table from "../CustomComponent/Table";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Outlet, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { getPipelines } from "../Services/DevopsServices";
import ProjectsDropdown from "../Components/ProjectsDropdown";

export default function Pipeline() {
  const { setHeader } = useHead();
  const navigate = useNavigate();

  const [instances, setInstances] = useState([]);
  const [selectedProject, setSelectedProject] = useState([]);
  const [moduleId, setModuleId] = useState(0);

  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Pipeline Instances",
        plusButton: moduleId === 0 ? false : true,
        plusCallback: () =>
          navigate("CreatePipeline", { state: { id: 0, module: moduleId } }),
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
  }, [moduleId]);

  useEffect(() => {
    const module = selectedProject?.find(
      (module) => module?.module_type === 20
    );
    module?.module_id
      ? getPipelines(setInstances, module?.module_id)
      : setInstances([]);
    module?.module_id ? setModuleId(module?.module_id) : setModuleId(0);
    console.log(module?.module_type);
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
            sx={{ cursor: "pointer" }}
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
    },
    {
      field: "Actions",
      headerName: "Actions",
      flex: 3,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (param) => {
        return (
          <div>
            <EditOutlinedIcon
              onClick={() =>
                navigate("CreatePipeline", { state: { id: param.row.id } })
              }
            />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <ProjectsDropdown setSelectedProject={setSelectedProject} />
      <Table rows={instances} columns={instanceColumns} />
      <Outlet />
    </>
  );
}
