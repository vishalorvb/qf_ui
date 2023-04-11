import { Autocomplete, Grid, IconButton, MenuItem, TextField, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import Table from "../../CustomComponent/Table";
// import CreateTestCasePopUp from "./CreateTestCasePopUp";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
import useHead from "../../hooks/useHead";
import { Navigate, useNavigate } from "react-router";
import ProjectnApplicationSelector from "../ProjectnApplicationSelector";
import ScreenshotMonitorIcon from "@mui/icons-material/ScreenshotMonitor";
import ApiOutlinedIcon from "@mui/icons-material/ApiOutlined";
import DataObjectOutlinedIcon from "@mui/icons-material/DataObjectOutlined";
import axios from "../../api/axios";
import AirplayIcon from "@mui/icons-material/Airplay";
import { Link } from "react-router-dom";
import { getProject } from "../../Services/ProjectService"
import { getApplicationOfProject } from "../../Services/ApplicationService"
import useAuth from "../../hooks/useAuth";
import TableActions from "../../CustomComponent/TableActions";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";



export default function TestCases() {
  const [testcases, setTestcases] = useState([]);
  const [snack, setSnack] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  let [project, setProject] = useState([])
  let [application, setApplication] = useState([])
  const navigate = useNavigate();
  const { auth } = useAuth();
  const columns = [
    {
      field: "name",
      headerName: "Test case name",
      flex: 2,
      sortable: false,
      align: "left",
      renderCell: param => {
        return (
          <div
            style={{ color: "#009fee", cursor: "pointer" }}
            onClick={() =>
              selectedApplication?.module_type === 1
                ? navigate("apidatasets", {
                  state: {
                    applicationId: param.row.module_id,
                    testcaseId: param.row.testcase_id,
                    projectId: selectedProject?.project_id,
                  },
                })
                : navigate("datasets", {
                  state: {
                    applicationId: param.row.module_id,
                    testcaseId: param.row.testcase_id,
                    projectId: selectedProject?.project_id,
                  },
                })
            }
          >
            {param.row.name}
          </div>
        )
      }
    },
    {
      field: "description",
      headerName: "Description",
      flex: 6,
      sortable: false,
      renderCell: (param) => {
        return (
          <TableActions
            heading={param.row?.description}
          >
            <MenuItem>
              <DeleteOutlineIcon sx={{ color: "red", mr: 1 }} />
              Delete
            </MenuItem>
            <MenuItem>
              <EditOutlinedIcon sx={{ color: "blue", mr: 1 }} />
              Edit
            </MenuItem>            
          </TableActions>
        )
      },
    },


  ];

  const { setHeader } = useHead();
  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Recent Testcases",
        // plusButton: true,
        // buttonName: "Create Testcase",
        plusCallback: () => {
          console.log("")
        },
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedApplication]);
  useEffect(() => {
    getProject(setProject, auth.userId)
  }, [])
  useEffect(() => {
    setSelectedProject(project[0])
  }, [project])
  useEffect(() => {
    getApplicationOfProject(setApplication, selectedProject?.project_id)
  }, [selectedProject])
  useEffect(() => {
    setSelectedApplication(application[0])
  }, [application])

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
      <div className="apptable">
        <div className="intable">
          <Grid item container spacing={2} justifyContent="flex-end">
            <Grid item md={4}>
              <label for="">Projects</label>
              <Autocomplete
                disablePortal
                disableClearable
                id="project_id"
                options={project}
                value={selectedProject || null}
                sx={{ width: "100%" }}
                getOptionLabel={(option) => option.project_name}
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
            <Grid item md={4}>
              <label for="">Application</label>
              <Autocomplete
                disablePortal
                disableClearable
                id="model_id"
                options={application}
                value={selectedApplication || null}
                sx={{ width: "100%" }}
                getOptionLabel={(option) => option.module_name}
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
        <Table
          rows={testcases}
          columns={columns}
          hidefooter={true}
          getRowId={(row) => row.testcase_id}
        ></Table>
      </div>
    </>
  );
}










