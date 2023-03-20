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
import ApiOutlinedIcon from "@mui/icons-material/ApiOutlined";
import DataObjectOutlinedIcon from "@mui/icons-material/DataObjectOutlined";
import axios from "../../api/axios";

export default function TestCases() {
  const [testcases, setTestcases] = useState([]);

  const [popup, setPopup] = useState(false);
  const [snack, setSnack] = useState(false);

  const [selectedProject, setSelectedProject] = useState({
    project_name: "Project",
  });
  const [selectedApplication, setSelectedApplication] = useState({});

  const navigate = useNavigate();

  const columns = [
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
            <Tooltip title="Dataset">
              <IconButton
                onClick={() =>
                  navigate("datasets", {
                    state: {
                      applicationId: param.row.module_id,
                      testcaseId: param.row.testcase_id,
                      projectId: selectedProject?.project_id,
                    },
                  })
                }
              >
                <DataObjectOutlinedIcon />
              </IconButton>
            </Tooltip>

            {selectedApplication?.module_type === 1 ? (
              <Tooltip title="Update APIs ">
                <IconButton
                  onClick={() =>
                    navigate("CreateApiTestcase", {
                      state: {
                        applicationId: param.row.module_id,
                        testcaseId: param.row.testcase_id,
                        name: param.row.name,
                        desc: param.row.description,
                      },
                    })
                  }
                >
                  <ApiOutlinedIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Update Screens ">
                <IconButton
                  onClick={() =>
                    navigate("CreateTestcase", {
                      state: {
                        applicationId: param.row.module_id,
                        testcaseId: param.row.testcase_id,
                        projectId: selectedProject?.project_id,
                      },
                    })
                  }
                >
                  <ScreenshotMonitorIcon />
                </IconButton>
              </Tooltip>
            )}
          </>
        );
      },
      flex: 3,
      headerAlign: "left",
      sortable: false,
      align: "left",
    },
  ];

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
  }, [selectedApplication, popup]);

  return (
    <>
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

      <CreateTestCasePopUp
        open={popup}
        close={setPopup}
        snackbar={setSnack}
        projectId={selectedProject?.project_id}
        applicationId={selectedApplication?.module_id}
        setSnack={setSnack}
      ></CreateTestCasePopUp>
    </>
  );
}
