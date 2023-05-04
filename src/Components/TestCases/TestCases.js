import {
  Autocomplete,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Table from "../../CustomComponent/Table";
// import CreateTestCasePopUp from "./CreateTestCasePopUp";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
import useHead from "../../hooks/useHead";
import { useNavigate } from "react-router";
import { getProject } from "../../Services/ProjectService";
import { getApplicationOfProject } from "../../Services/ApplicationService";
import useAuth from "../../hooks/useAuth";
import TableActions from "../../CustomComponent/TableActions";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { DeleteTestCase, GetTestCase } from "../../Services/TestCaseService";
import { TCdata } from "./CreateTestCase";
import ProjectnApplicationSelector from "../ProjectnApplicationSelector";

export default function TestCases() {
  const [testcases, setTestcases] = useState([]);
  const [snack, setSnack] = useState(false);
  let [project, setProject] = useState([]);
  let [application, setApplication] = useState([]);
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { setHeader, globalProject, setglobalProject, globalApplication, setglobalApplication } = useHead();

  const columns = [
    {
      field: "name",
      headerName: "Test case name",
      flex: 2,
      sortable: false,
      align: "left",
      renderCell: (param) => {
        return (
          <div
            style={{ color: "#009fee", cursor: "pointer" }}
            onClick={() =>
              globalApplication?.module_type === 1
                ? navigate("apidatasets", {
                  state: {
                    applicationId: param.row.module_id,
                    testcaseId: param.row.testcase_id,
                    projectId: globalProject?.project_id,
                    testcaseName: param.row.name
                  },
                })
                : navigate("datasets", {
                  state: {
                    applicationId: param.row.module_id,
                    testcaseId: param.row.testcase_id,
                    projectId: globalProject?.project_id,
                    testcaseName: param.row.name
                  },
                })
            }
          >
            {param.row.name}
          </div>
        );
      },
    },
    {
      field: "description",
      headerName: "Description",
      flex: 6,
      sortable: false,
      renderCell: (param) => {
        return (
          <TableActions heading={param.row?.description}>
            <MenuItem
              onClick={(e) => {
                console.log(param.row);
                TCdata.module_id = param.row.module_id;
                TCdata.project_id = param.row.project;
                TCdata.testcase_name = param.row.name;
                TCdata.testcase_description = param.row.description;
                TCdata.testcase_id = param.row.testcase_id;
                console.log(TCdata);
                navigate("/Testcase/Create");
              }}
            >
              <EditOutlinedIcon sx={{ color: "blue", mr: 1 }} />
              Edit
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                DeleteTestCase(param.row.testcase_id).then((res) => {
                  if (res) {
                    GetTestCase(
                      setTestcases,
                      globalProject?.project_id,
                      globalApplication?.module_id
                    );
                  }
                });
              }}
            >
              <DeleteOutlineIcon sx={{ color: "red", mr: 1 }} />
              Delete
            </MenuItem>
          </TableActions>
        );
      },
    },
  ];

  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Recent Testcases",
        plusCallback: () => {
          console.log("");
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
  }, []);

  useEffect(() => {
    getProject(setProject, auth.userId);
  }, []);
  useEffect(() => {
    if (globalProject == null) {
      setglobalProject(project[0]);
    }

  }, [project]);
  useEffect(() => {
    if (globalProject !== null && globalProject?.project_id !== undefined) {
      getApplicationOfProject(setApplication, globalProject?.project_id);
    }
  }, [globalProject]);
  useEffect(() => {
 
      setglobalApplication(application[0]);

    if (globalApplication?.module_id !== undefined) {
      GetTestCase(
        setTestcases,
        globalProject?.project_id,
        globalApplication?.module_id
      );
    }

  }, [application]);
  useEffect(() => {
    if (globalApplication?.module_id !== undefined) {
      GetTestCase(
        setTestcases,
        globalProject?.project_id,
        globalApplication?.module_id
      );
    }
  }, [globalApplication]);
  useEffect(() => {
    console.log(globalApplication)
  }, [globalApplication])
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
            {/* <Grid item>
              <label htmlFor="">Projects</label>
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
            <Grid item>
              <label htmlFor="">Application</label>
              <Autocomplete
                disablePortal
                disableClearable
                id="model_id"
                options={application}
                value={globalApplication || null}
                sx={{ width: "100%" }}
                getOptionLabel={(option) => option.module_name}
                onChange={(e, value) => {
                  setglobalApplication(value);
                }}
                renderInput={(params) => (
                  <div ref={params.InputProps.ref}>
                    <input type="text" {...params.inputProps} />
                  </div>
                )}
              />
            </Grid> */}
              <ProjectnApplicationSelector
            globalProject={globalProject}
            setglobalProject={setglobalProject}
            globalApplication={globalApplication}
            setglobalApplication={setglobalApplication}
          />
          </Grid>
        </div>
        <Table
          searchPlaceholder="Search Testcases"
          rows={testcases}
          columns={columns}
          hidefooter={true}
          getRowId={(row) => row.testcase_id}
        ></Table>
      </div>
    </>
  );
}
