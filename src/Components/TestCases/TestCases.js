import { Grid, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import Table from "../../CustomComponent/Table";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
import useHead from "../../hooks/useHead";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import TableActions from "../../CustomComponent/TableActions";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { DeleteTestCase, GetTestCase } from "../../Services/TestCaseService";
import { TCdata } from "./CreateTestCase";
import ProjectnApplicationSelector from "../ProjectnApplicationSelector";
import ConfirmPop from "../../CustomComponent/ConfirmPop";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";

let snakbarmsg = "";

let delete_testcase_id = 0;

export default function TestCases() {
  const [testcases, setTestcases] = useState([]);
  const [snack, setSnack] = useState(false);
  let [project, setProject] = useState([]);
  let [application, setApplication] = useState([]);
  let [popup, setPopup] = useState(false);
  const navigate = useNavigate();
  const { auth } = useAuth();
  const {
    setHeader,
    globalProject,
    setglobalProject,
    globalApplication,
    setglobalApplication,
  } = useHead();

  const columns = [
    {
      field: "name",
      headerName: "Testcase name",
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
                      testcaseName: param.row.name,
                    },
                  })
                : navigate("datasets", {
                    state: {
                      applicationId: param.row.module_id,
                      testcaseId: param.row.testcase_id,
                      projectId: globalProject?.project_id,
                      testcaseName: param.row.name,
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
                navigate("CopyTestcase", {
                  state: {
                    name: param?.row?.testcase_name,
                    id: param?.row?.testcase_id,
                    projectId: globalProject?.project_id,
                  },
                });
              }}
            >
              <ContentCopyOutlinedIcon sx={{ color: "green", mr: 1 }} />
              Copy
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                TCdata.module_id = param.row.module_id;
                TCdata.project_id = param.row.project;
                TCdata.testcase_name = param.row.name;
                TCdata.testcase_description = param.row.description;
                TCdata.testcase_id = param.row.testcase_id;
                navigate("/Testcase/Create");
              }}
            >
              <EditOutlinedIcon sx={{ color: "blue", mr: 1 }} />
              Edit
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                delete_testcase_id = param.row.testcase_id;
                setPopup(true);
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
      };
    });
  }, []);

  useEffect(() => {
    if (globalApplication?.module_id !== undefined) {
      GetTestCase(
        setTestcases,
        globalProject?.project_id,
        globalApplication?.module_id
      );
    }
  }, [globalApplication]);

  return (
    <>
      <SnackbarNotify
        open={snack}
        close={() => {
          setSnack(false);
        }}
        msg={snakbarmsg}
        severity="success"
      ></SnackbarNotify>
      <div className="apptable">
        <div className="intable">
          <Grid item container spacing={2} justifyContent="flex-end">
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
        <ConfirmPop
          open={popup}
          handleClose={() => setPopup(false)}
          heading={"Delete TestCase"}
          message={"Are you sure you want to delete this TestCase?"}
          onConfirm={() => {
            DeleteTestCase(delete_testcase_id).then((res) => {
              if (res) {
                GetTestCase(
                  setTestcases,
                  globalProject?.project_id,
                  globalApplication?.module_id
                );
                snakbarmsg = "Testcase deleted Successfully";
                setSnack(true);
              }
            });
            setPopup(false);
          }}
        ></ConfirmPop>
      </div>
    </>
  );
}
