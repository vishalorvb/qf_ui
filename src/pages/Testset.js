import {
  Autocomplete,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Table from "../CustomComponent/Table";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useNavigate } from "react-router-dom";
import useHead from "../hooks/useHead";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import DeleteTestset from "../Components/TestSet/DeleteTestset";
import SnackbarNotify from "../CustomComponent/SnackbarNotify";
import ProjectnApplicationSelector from "../Components/ProjectnApplicationSelector";
import TestcaseSelectAndExecute from "../Components/Execution/TestcaseSelectAndExecute";
import { getApplicationOfProject } from "../Services/ApplicationService";
import { getProject } from "../Services/ProjectService";

function Testset() {
  const [testsetObject, setTestsetObject] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [openExecute, setOpenExecute] = useState(false);
  const [deleteObject, setDeleteObject] = useState([]);
  const [executeObject, setExecuteObject] = useState([]);
  const [delSuccessMsg, setDelSuccessMsg] = useState(false);
  const [project, setProject] = useState([]);
  const [application, setApplication] = useState([]);
  const [selectedProject, setSelectedProject] = useState({
    project_name: "Project",
  });
  const [selectedApplication, setSelectedApplication] = useState({});
  const navigate = useNavigate();
  const { auth } = useAuth();

  const createTestcaseHandler = (e) => {
    console.log(selectedProject?.project_id);
    console.log(selectedApplication?.module_id);
    navigate("createTestset", {
      state: {
        param1: e,
        param2: selectedProject?.project_id,
        param3: selectedApplication?.module_id,
      },
    });
  };

  const deleteTestcaseHandler = (e) => {
    console.log(e.testset_id);
    setOpenDelete(true);
    setDeleteObject(e);
  };

  function onChangeHandler() {
    axios
      .get(
        `qfservice/webtestset/getWebTestsetInfoByProjectIdByApplicationId?project_id=${selectedProject?.project_id}&module_id=${selectedApplication?.module_id}`
      )
      .then((resp) => {
        const testsets = resp?.data?.info ? resp?.data?.info : [];
        setTestsetObject(testsets);
      });
  }

  const columns = [
    {
      field: "testset_name",
      headerName: "Testset Name",
      flex: 4,
      headerAlign: "left",
      sortable: false,
      align: "left",
      renderCell: (param) => {
        return (
          <div
            style={{ color: "#009fee", cursor: "pointer" }}
            onClick={() =>
              navigate("Reorder", {
                state: {
                  applicationId: selectedApplication?.module_id,
                  testsetId: param.row.testset_id,
                  projectId: selectedProject?.project_id,
                },
              })
            }
          >
            {param.row.testset_name}
          </div>
        );
      },
    },
    {
      field: "testset_desc",
      headerName: "Testset Description",
      flex: 4,
      headerAlign: "left",
      sortable: false,
      align: "left",
      renderCell: (param) => {
        return TestsetDescriptionCell(
          param,
          selectedApplication,
          selectedProject,
          deleteTestcaseHandler
        );
      },
    },
  ];

  useEffect(() => {
    getProject(setProject, auth.userId);
  }, []);
  useEffect(() => {
    setSelectedProject(project[0]);
  }, [project]);
  useEffect(() => {
    selectedProject?.project_id && getApplicationOfProject(setApplication, selectedProject?.project_id);
    
  }, [selectedProject]);
  useEffect(() => {
    setSelectedApplication(application[0]);
  }, [application]);

  const { setHeader } = useHead();
  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Recent Testsets",
        plusButton: false,
        buttonName: "Create Testset",
        plusCallback: () => createTestcaseHandler(),
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
  }, [selectedProject, selectedApplication]);

  useEffect(() => {
    selectedApplication?.module_id &&
      axios
        .get(
          `qfservice/webtestset/getWebTestsetInfoByProjectIdByApplicationId?project_id=${selectedProject?.project_id}&module_id=${selectedApplication?.module_id}`
        )
        .then((resp) => {
          const testsets = resp?.data?.info ? resp?.data?.info : [];
          setTestsetObject(testsets);
        });
  }, [selectedApplication]);

  return (
    <div className="apptable">
      <div className="intable">
        <Grid item container spacing={2} justifyContent="flex-end">
          <Grid item>
            <label for="">Projects <span className="importantfield">*</span></label>
            <Autocomplete
              disablePortal
              disableClearable
              id="project_id"
              options={project}
              value={selectedProject || null}
              sx={{ width: "100%" }}
              getOptionLabel={(option) => (option.project_name ? option.project_name : "")}
              onChange={(e, value) => {
                setSelectedProject(value);
              }}
              renderInput={(params) => (
                <div ref={params.InputProps.ref}>
                  <input type="text" {...params.inputProps} />
                </div>
              )}
            />
          </Grid>
          <Grid item>
            <label for="">Application <span className="importantfield">*</span></label>
            <Autocomplete
              disablePortal
              disableClearable
              id="model_id"
              options={application}
              value={selectedApplication || null}
              sx={{ width: "100%" }}
              getOptionLabel={(option) => (option.module_name ?option.module_name : "")}
              onChange={(e, value) => {
                setSelectedApplication(value);
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

      <SnackbarNotify
        open={delSuccessMsg}
        close={setDelSuccessMsg}
        msg="Testset deleted successfully"
        severity="success"
      />
      <div
        className="recenttable"
        style={{ flot: "right", marginBottom: "10px" }}
      ></div>
      <div className="datatable" style={{ marginTop: "20px" }}>
        {openDelete ? (
          <DeleteTestset
            object={deleteObject}
            openDelete={openDelete}
            setOpenDelete={setOpenDelete}
            setDelSuccessMsg={setDelSuccessMsg}
            getTestsets={onChangeHandler}
          />
        ) : (
          ""
        )}
        {openExecute ? (
          <TestcaseSelectAndExecute
            object={executeObject}
            openDelete={openExecute}
            setOpenDelete={setOpenExecute}
            getTestsets={onChangeHandler}
            projectId={selectedProject?.project_id}
            applicationId={selectedApplication?.module_id}
          />
        ) : (
          ""
        )}
        <Table
          searchPlaceholder="Search Testset"
          columns={columns}
          rows={testsetObject}
          getRowId={(row) => row.testset_id}
        />
      </div>
    </div>
  );
}

const TestsetDescriptionCell = (
  param,
  selectedApplication,
  selectedProject,
  deleteTestcaseHandler
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
      <Typography variant="p">{param?.row?.testset_desc}</Typography>
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
            navigate("Update", {
              state: {
                param1: param?.row,
                param2: selectedProject?.project_id,
                param3: selectedApplication?.module_id,
              },
            })
          }
        >
          <EditOutlinedIcon sx={{ color: "blue", mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={() => deleteTestcaseHandler(param.row)}>
          <DeleteOutlineIcon sx={{ color: "red", mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Testset;
