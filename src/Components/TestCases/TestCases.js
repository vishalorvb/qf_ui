import { IconButton, Tooltip } from "@mui/material";
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

export default function TestCases() {
  const [testcases, setTestcases] = useState([]);

  const [popup, setPopup] = useState(false);
  const [snack, setSnack] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const navigate = useNavigate();

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
          style={{color:"#009fee",textDecoration:"underline"}}
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
      align: "left",
    },

    // {
    //   headerName: "Action",
    //   field: "action",
    //   renderCell: (param) => {
    //     return (
    //       <>
    //         <Tooltip title="Dataset">
    //           <IconButton
    //             onClick={() =>
    //               selectedApplication?.module_type === 1
    //                 ? navigate("apidatasets", {
    //                     state: {
    //                       applicationId: param.row.module_id,
    //                       testcaseId: param.row.testcase_id,
    //                       projectId: selectedProject?.project_id,
    //                     },
    //                   })
    //                 : navigate("datasets", {
    //                     state: {
    //                       applicationId: param.row.module_id,
    //                       testcaseId: param.row.testcase_id,
    //                       projectId: selectedProject?.project_id,
    //                     },
    //                   })
    //             }
    //           >
    //             <DataObjectOutlinedIcon sx={{ color: "green" }} />
    //           </IconButton>
    //         </Tooltip>

    //         {selectedApplication?.module_type === 1 ? (
    //           <Tooltip title="Update APIs ">
    //             <IconButton
    //               onClick={() =>
    //                 navigate("CreateApiTestcase", {
    //                   state: {
    //                     applicationId: param.row.module_id,
    //                     testcaseId: param.row.testcase_id,
    //                     projectId: selectedProject?.project_id,
    //                   },
    //                 })
    //               }
    //             >
    //               <ApiOutlinedIcon sx={{ color: "orange" }} />
    //             </IconButton>
    //           </Tooltip>
    //         ) : (
    //           <Tooltip title="Update Screens ">
    //             <IconButton
    //               onClick={() =>
    //                 navigate("CreateTestcase", {
    //                   state: {
    //                     applicationId: param.row.module_id,
    //                     testcaseId: param.row.testcase_id,
    //                     projectId: selectedProject?.project_id,
    //                   },
    //                 })
    //               }
    //             >
    //               <ScreenshotMonitorIcon />
    //             </IconButton>
    //           </Tooltip>
    //         )}
    //         {selectedApplication?.module_type !== 1 && (
    //           <Tooltip title="Screen Order Update">
    //             <IconButton
    //               onClick={() =>
    //                 navigate("updateScreenOrder", {
    //                   state: {
    //                     applicationId: param.row.module_id,
    //                     testcaseId: param.row.testcase_id,
    //                     projectId: selectedProject?.project_id,
    //                   },
    //                 })
    //               }
    //             >
    //               <AirplayIcon />
    //             </IconButton>
    //           </Tooltip>
    //         )}
    //         {selectedApplication?.module_type === 1 && (
    //           <Tooltip title="API Order Update">
    //             <IconButton
    //               onClick={() =>
    //                 navigate("updateAPIOrder", {
    //                   state: {
    //                     applicationId: param.row.module_id,
    //                     testcaseId: param.row.testcase_id,
    //                     projectId: selectedProject?.project_id,
    //                   },
    //                 })
    //               }
    //             >
    //               <AirplayIcon />
    //             </IconButton>
    //           </Tooltip>
    //         )}
    //         <Tooltip title="Delete">
    //           <IconButton>
    //             <DeleteOutlineIcon />
    //           </IconButton>
    //         </Tooltip>
    //       </>
    //     );
    //   },
    //   flex: 3,
    //   headerAlign: "left",
    //   sortable: false,
    //   align: "left",
    // },
  ];

  const { setHeader } = useHead();
  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Testcases",
        plusButton: true,
        buttonName: "Create Testcase",
        plusCallback: () => {
          navigate("CreateTestcaseAll", {
            state: {
              applicationId: selectedApplication,
              projectId: selectedProject?.project_id,
            },
          })
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
  }, [selectedProject,selectedApplication]);

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

      {/* <CreateTestCasePopUp
        open={popup}
        close={setPopup}
        snackbar={setSnack}
        projectId={selectedProject?.project_id}
        applicationId={selectedApplication?.module_id}
        setSnack={setSnack}
      ></CreateTestCasePopUp> */}
    </>
  );
}
