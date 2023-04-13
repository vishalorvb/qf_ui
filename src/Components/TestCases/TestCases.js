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

export default function TestCases() {
  const [testcases, setTestcases] = useState([]);
  const [snack, setSnack] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  let [project, setProject] = useState([]);
  let [application, setApplication] = useState([]);
  const navigate = useNavigate();
  const { auth } = useAuth();
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
                TCdata.project_id = param.row.project.project_id;
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
                      selectedProject?.project_id,
                      selectedApplication?.module_id
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

  const { setHeader } = useHead();
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
    setSelectedProject(project[0]);
  }, [project]);
  useEffect(() => {
    if (selectedProject !== null) {
      getApplicationOfProject(setApplication, selectedProject?.project_id);
    }
  }, [selectedProject]);
  useEffect(() => {
    setSelectedApplication(application[0]);
    GetTestCase(
      setTestcases,
      selectedProject?.project_id,
      selectedApplication?.module_id
    );
  }, [application]);
  useEffect(() => {
    GetTestCase(
      setTestcases,
      selectedProject?.project_id,
      selectedApplication?.module_id
    );
  }, [selectedApplication]);
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
            <Grid item>
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
            <Grid item>
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
          searchPlaceholder={"Search Testcase"}
        ></Table>
      </div>
    </>
  );
}
