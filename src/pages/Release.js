import { useEffect, useState } from "react";
import useHead from "../hooks/useHead";
import Table from "../CustomComponent/Table";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Outlet, useNavigate } from "react-router-dom";
import SelectCreateInstanceModal from "../Components/ReleaseComponents/SelectCreateInstanceModal";
import { getReleaseInstances } from "../Services/DevopsServices";
import ProjectsDropdown from "../Components/ProjectsDropdown";
import { IconButton } from "@mui/material";
import axios from "../api/axios";
import SnackbarNotify from "../CustomComponent/SnackbarNotify";

export default function Release() {
  const { setHeader } = useHead();
  const [createInstance, setCreateInstance] = useState(false);
  const [instance, setInstance] = useState([]);
  const [selectedProject, setSelectedProject] = useState([]);
  const [msg, setMsg] = useState(false);
  const [module, setmodule] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Release Instances",
        plusButton: module ? true : false,
        plusCallback: () => setCreateInstance(true),
      };
    });
    return () =>
      setHeader((ps) => {
        return {
          ...ps,
          name: "",
          plusButton: false,
          plusCallback: () => console.log("null"),
        };
      });
  }, [module]);

  const getReleaseInstancesfromModule = () => {
    const module = selectedProject?.find(
      (module) => module?.module_type === 21
    );
    setmodule(module);
    module?.module_id
      ? getReleaseInstances(setInstance, module?.module_id)
      : setInstance([]);
  };

  useEffect(() => {
    getReleaseInstancesfromModule();
  }, [selectedProject]);

  const deleteRelease = (row) => {
    axios
      .delete(
        `qfservice/DeleteRelease?release_id=${row?.id}&module_id=${row?.module_id}`
      )
      .then((resp) => {
        console.log(resp);
        setMsg(resp?.data?.message);
        resp?.data?.message && getReleaseInstancesfromModule();
      });
  };

  const instanceColumns = [
    {
      field: "release_name",
      headerName: "Name",
      flex: 3,
      sortable: false,
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
        const row = param.row;
        return (
          <div>
            <IconButton
              onClick={() => navigate("CreateAnsibleInstance", { state: row })}
            >
              <EditOutlinedIcon />
            </IconButton>
            <IconButton onClick={() => deleteRelease(row)}>
              <DeleteOutlinedIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <SnackbarNotify
        open={msg && true}
        close={setMsg}
        msg={msg}
        severity="success"
      />
      <ProjectsDropdown setSelectedProject={setSelectedProject} />
      <Table rows={instance} columns={instanceColumns} />
      <SelectCreateInstanceModal
        createInstate={createInstance}
        setCreateInstance={setCreateInstance}
        module={module}
      />
      <Outlet />
    </>
  );
}
