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
import ConfirmPop from "../CustomComponent/ConfirmPop";
let rowData;

export default function Release() {
  const { setHeader } = useHead();
  const [createInstance, setCreateInstance] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [instance, setInstance] = useState([]);
  const [selectedProject, setSelectedProject] = useState([]);
  const [msg, setMsg] = useState(false);
  const [module, setmodule] = useState([]);
  const navigate = useNavigate();

  const addReleaseInstances = (e) => {
    console.log(selectedProject);
    navigate("/release/createAnsibleInstance", { state: selectedProject });
  };
  console.log(selectedProject);

  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Release Instances",
        plusButton: module ? true : false,
        buttonName: "Create Instance",
        plusCallback: addReleaseInstances,
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
  }, [selectedProject]);

  const getReleaseInstancesfromModule = () => {
    console.log(selectedProject);
    // const module = selectedProject.module ? (selectedProject.filter(mod => mod.modules.length >0 )).find(module => module?.module_type === 21) : [];
    // setmodule(module);
    // console.log(module);
    // module?.module_id
    //   ? getReleaseInstances(setInstance, module?.module_id)
    //   : setInstance([]);
    selectedProject?.project_id
      ? getReleaseInstances(setInstance, selectedProject?.project_id)
      : setInstance([]);
  };

  useEffect(() => {
    getReleaseInstancesfromModule();
  }, [selectedProject]);

  const deleteRelease = (row) => {
    axios
      .delete(
        `qfservice/DeleteRelease?release_id=${row?.id}&project_id=${selectedProject?.project_id}`
      )
      .then((resp) => {
        console.log(resp);
        setMsg(resp?.data?.message);
        resp?.data?.message && getReleaseInstancesfromModule();
      });
  };

  const setRowData = (e) => {
    setOpenDelete(true);
    rowData(e);
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
            <IconButton onClick={setRowData}>
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
      {openDelete ? (
        <ConfirmPop
          heading={"Delete Release"}
          open={openDelete}
          handleClose={() => setOpenDelete(false)}
          message={"Do You really want to delete this release"}
          onConfirm={deleteRelease(rowData)}
        />
      ) : (
        ""
      )}
      <ProjectsDropdown
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
      />
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
