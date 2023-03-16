import { Autocomplete, Grid, IconButton, Radio, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Table from "../../CustomComponent/Table";
import CreateTestCasePopUp from "./CreateTestCasePopUp";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
import useAuth from "../../hooks/useAuth";
import useHead from "../../hooks/useHead";
import { getTestcase } from "../../Services/TestCaseService";
import { useNavigate } from "react-router";
import { teststepData } from "./TestSteps";
import { getApplication } from "../../Services/ApplicationService";
import ProjectnApplicationSelector from "../ProjectnApplicationSelector";
import ScreenshotMonitorIcon from "@mui/icons-material/ScreenshotMonitor";
import axios from "../../api/axios";

export default function TestCases() {
  const [testcases, setTestcases] = useState([]);
  const [radio, setRadio] = useState(0);
  const [datasets, Setdatasets] = useState([]);
  const [application, setApplication] = useState([]);
  const [popup, setPopup] = useState(false);
  const [snack, setSnack] = useState(false);

  const [selectedProject, setSelectedProject] = useState({
    project_name: "Project",
  });
  const [selectedApplication, setSelectedApplication] = useState({});
  const { auth } = useAuth();
  const navigate = useNavigate();

  const handleRadio = (testcaseId) => {
    setRadio(testcaseId);
    const temp = testcases.filter((ts) => {
      if (ts.testcase_id == testcaseId) {
        return ts.datasetsList;
      }
    });
    Setdatasets(temp[0].datasetsList);
  };

  const columns = [
    {
      field: "testcase_id",
      headerName: "Test case ID",
      flex: 3,
      sortable: false,
      align: "left",
    },
    {
      field: "name",
      headerName: "Test case name",
      flex: 3,
      sortable: false,
      align: "left",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 3,
      sortable: false,
      align: "left",
    },

    {
      headerName: "Action",
      field: "action",
      renderCell: (param) => {
        return (
          <>
            <Tooltip title="Delete">
              <IconButton>
                <DeleteIcon className=""></DeleteIcon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Screen">
              <IconButton
                onClick={() =>
                  navigate("CreateTestcase", {
                    state: { applicationId: param.row.module_id },
                  })
                }
              >
                <ScreenshotMonitorIcon />
              </IconButton>
            </Tooltip>
          </>
        );
      },
      flex: 3,
      headerAlign: "left",
      sortable: false,
      align: "left",
    },
  ];

  const datasetColumn = [
    {
      field: "dataset_name_in_testcase",
      headerName: "Name",
      flex: 3,
      sortable: false,
      align: "left",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 3,
      sortable: false,
      align: "left",
    },
    {
      headerName: "Action",
      field: "action",
      renderCell: (param) => {
        return (
          <div>
            <Tooltip title="Add Data Set">
              <IconButton>
                <AddIcon></AddIcon>
              </IconButton>
            </Tooltip>
          </div>
        );
      },
      flex: 1,
      headerAlign: "left",
      sortable: false,
      align: "left",
    },
  ];

  useEffect(() => {
    getApplication(setApplication, auth.info.id);
  }, []);

  const { setHeader } = useHead();
  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Testcases",
        plusButton: true,
        plusCallback: () => setPopup(true),
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
  }, []);

  useEffect(() => {
    selectedApplication?.module_id &&
      axios
        .get(
          `/qfservice/webtestcase/getWebTestcasesInfoByApplicationId?application_id=${selectedApplication?.module_id}&project_id=${selectedProject?.project_id}`
        )
        .then((resp) => {
          const testcases = resp?.data?.info ? resp?.data?.info : [];
          setTestcases(testcases);
        });
  }, [selectedApplication]);

  return (
    <div>
      <SnackbarNotify
        open={snack}
        close={() => {
          setSnack(false);
        }}
        msg="Test Case Created SuccessFully"
        severity="success"
      ></SnackbarNotify>
      <ProjectnApplicationSelector
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
        selectedApplication={selectedApplication}
        setSelectedApplication={setSelectedApplication}
      />

      <Table
        rows={testcases}
        columns={columns}
        hidefooter={true}
        getRowId={(row) => row.testcase_id}
      ></Table>
      {/* 
      <Table
        rows={datasets}
        columns={datasetColumn}
        hidefooter={true}
        getRowId={(row) => row.testcase_dataset_id}
      ></Table> */}
      <CreateTestCasePopUp
        open={popup}
        close={setPopup}
        snackbar={setSnack}
        projectId={selectedProject?.project_id}
        applicationId={selectedApplication?.module_id}
      ></CreateTestCasePopUp>
    </div>
  );
}
