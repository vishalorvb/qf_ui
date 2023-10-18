import React, { useEffect, useState } from "react";
import UploadIcon from "@mui/icons-material/Upload";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  Autocomplete,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import {
  DeleteManualTestcase,
  ExportManualTestcases,
  GetIssuesOfTestlibrary,
  GetSprintsOfJiraProject,
  GetTestLibrary,
  UploadManualTestcasesExcelFile,
} from "./TestLibraryService";
import Table from "../../CustomComponent/Table";
import * as XLSX from "xlsx";
import { getProject } from "../../Services/QfService";
import useHead from "../../hooks/useHead";
import useAuth from "../../hooks/useAuth";
import TableActions from "../../CustomComponent/TableActions";
import ConfirmPop from "../../CustomComponent/ConfirmPop";

let manual_testcase_id = 0;
const TestLibrary = () => {
  const [project, setProject] = useState("");
  const [sprints, setSprints] = useState("");
  const [issues, setIssues] = useState();
  const [data, setData] = useState([]);
  const [issueData, setIssueData] = useState();
  const [tableData, setTableData] = useState([]);
  const [projectKey, setProjectKey] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const { globalProject, setglobalProject, setSnackbarData, setHeader } =
    useHead();
  const [projectsList, setProjectList] = useState([]);
  const { auth } = useAuth();
  const userId = auth.info.id;
  const [sqeProjectId, setSqeProjectid] = useState();
  const [empty, setNotEmpty] = useState(false);
  let [popup, setPopup] = useState(false);

  const columns = [
    {
      field: "issue_key",
      headerName: "KEY",
      flex: 1,
      sortable: false,
      align: "left",
    },
    {
      field: "given_data",
      headerName: "Given",
      flex: 3,
      sortable: false,
      align: "left",
      renderCell: (params) => {
        return (
          <Tooltip title={params.row.given_data}>
            <div>{params.row.given_data}</div>
          </Tooltip>
        );
      },
    },
    {
      field: "when_data",
      headerName: "When",
      flex: 5,
      sortable: false,
      align: "left",
      renderCell: (params) => {
        return (
          <Tooltip title={params.row.when_data}>
            <div>{params.row.when_data}</div>
          </Tooltip>
        );
      },
    },
    {
      field: "then_data",
      headerName: "Then",
      flex: 4,
      sortable: false,
      align: "left",
      renderCell: (params) => {
        return (
          <Tooltip title={params.row.then_data}>
            <div>{params.row.then_data}</div>
          </Tooltip>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      sortable: false,
      align: "left",
      renderCell: (params) => {
        return (
          <TableActions>
            <MenuItem
              onClick={(e) => {
                manual_testcase_id = params.row.testcase_id;
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
  async function handleDownload() {
    if (issues === undefined) {
      setSnackbarData({
        status: true,
        message: "Please select Issue Key",
        severity: "error",
      });
      return;
    }
    const jsonData = await new Promise((resolve) => {
      ExportManualTestcases(
        (res) => {
          resolve(res);
          setSnackbarData({
            status: true,
            message: "File downloaded successfully",
            severity: "success",
          });
        },
        globalProject?.project_id,
        userId,
        projectKey,
        sprints,
        issues
      );
    });
    if (jsonData.length === 0) {
      const headers = [
        "Issue Key",
        "Given",
        "When",
        "Then",
        "Actual Result",
        "Defect",
        "Regression",
        "Created On",
        "Moved To Automation",
        "Issue Id",
        "Select Options",
        "Sprint Name",
      ];
      const data = [headers];
      const worksheet = XLSX.utils.aoa_to_sheet(data);
      // const headerStyle = {
      //   font: { bold: true },
      //   fill: { type: "pattern", patternType: "solid", fgColor: { rgb: "c6efce" } },
      // };
      const headerStyle = { font: { bold: true } };
      console.log(Object.keys(worksheet));
      console.log(worksheet);
      Object.keys(worksheet)
        .filter((cell) => cell.startsWith("A1"))
        .forEach((cell) => {
          worksheet[cell].s = headerStyle;
        });
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, `${issues}.xlsx`);
    } else {
      const selectedFields = jsonData.map(
        ({
          issue_key,
          given_data,
          when_data,
          then_data,
          actual_result,
          defect,
          action,
          created_at,
          moved_automation,
          issue_id,
          select_options,
          sprint_name,
        }) => ({
          "Issue Key": issue_key,
          Given: given_data,
          When: when_data,
          Then: then_data,
          "Actual Result": actual_result,
          Defect: defect,
          Regression: action,
          "Created On": created_at,
          "Moved To Automation": moved_automation,
          "Issue Id": issue_id,
          "Select Options": select_options,
          "Sprint Name": sprint_name,
        })
      );
      const workbook = XLSX.utils.book_new();
      console.log("in line 170");
      console.log(selectedFields);
      const worksheet = XLSX.utils.json_to_sheet(selectedFields);
      console.log(worksheet);
      const headerStyle = {
        font: { bold: true },
        fill: {
          type: "pattern",
          patternType: "solid",
          fgColor: { rgb: "c6efce" },
        },
      };
      console.log(Object.keys(worksheet));

      Object.keys(worksheet)
        .filter((cell) => cell.startsWith("A1"))
        .forEach((cell) => {
          worksheet[cell].s = headerStyle;
        });
      XLSX.utils.book_append_sheet(workbook, worksheet, "Test Data");
      const filename = `${issues}.xlsx`;
      XLSX.writeFile(workbook, filename);
    }
  }
  const handleFileInputChange = (event) => {
    var label = document.getElementById("myLabel");
    label.textContent = event.target.files[0].name;
    setSelectedFile(null);
    setSelectedFile(event.target.files[0]);
  };
  const handleUpload = () => {
    if (!selectedFile) {
      alert("Please select a file");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const range = XLSX.utils.decode_range(worksheet["!ref"]);
      const headers = [];
      for (let col = range.s.c; col <= range.e.c; col++) {
        const cellAddress = XLSX.utils.encode_cell({ r: range.s.r, c: col });
        const cell = worksheet[cellAddress];
        if (
          (cell &&
            (cell.v === "Issue Key" ||
              cell.v === "Given" ||
              cell.v === "Regression")) ||
          cell.v === "Moved To Automation" ||
          cell.v === "Issue Id" ||
          cell.v === "Sprint Name"
        ) {
          headers.push(cell.v);
        }
        if (headers.includes("Issue Key") && !worksheet["A2"]) {
          alert("Issue key cannot be empty in the file at A2 .");
          setSelectedFile("null");
          return;
        }
      }
      if (headers.includes("Given") && !worksheet["B2"]) {
        alert("Given data cannot be empty in the file at B2.");
        setSelectedFile("null");

        return;
      }
      if (headers.includes("Regression") && !worksheet["G2"]) {
        alert("Regression should either be TRUE or FALSE in the file at G2.");
        setSelectedFile("null");
        return;
      }
      if (headers.includes("Moved To Automation") && !worksheet["I2"]) {
        alert(
          "Moved to Automation should either be TRUE or FALSE in the file at I2."
        );
        setSelectedFile("null");
        return;
      }
      if (headers.includes("Issue Id") && !worksheet["J2"]) {
        alert("Issue ID cannot be empty the file at J2.");
        setSelectedFile("null");
        return;
      }
      if (headers.includes("Sprint Name") && !worksheet["L2"]) {
        alert("Sprint Name cannot be empty the file at L2.");
        setSelectedFile("null");
        return;
      }

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("sprint_name", sprints);
      formData.append("issue_key", issues);
      formData.append("user_id", userId);
      formData.append("project_id", globalProject?.project_id);
      UploadManualTestcasesExcelFile((res) => {
        if (res?.data?.status === "SUCCESS") {
          setSnackbarData({
            status: true,
            message: "File uploaded successfully",
            severity: "success",
          });
          GetTestLibrary(
            (res) => {
              if (res !== null) {
                setTableData(res);
              }
            },
            globalProject?.project_id,
            userId,
            projectKey,
            sprints
          );
        }
        if (res?.data?.status === "FAIL") {
          setSnackbarData({
            status: true,
            message:
              res?.data?.message +
              ".Please select relevant issue key before uploading!",
            severity: "error",
          });
        }
      }, formData);
    };
    reader.readAsArrayBuffer(selectedFile);
  };
  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Test Library",
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getProject((res) => {
      setProjectList(res);
      if (globalProject === null) {
        setglobalProject(res[0]);
      }
    }, auth.userId);
    if (globalProject === null) {
      setglobalProject(projectsList[0]);
      setSqeProjectid(projectsList[0]?.project_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await new Promise((resolve) => {
          GetSprintsOfJiraProject(
            (res) => {
              if (res !== null) {
                setNotEmpty(true);
                setData(res);
                setProject(res[0]?.sprintnamekey.value);
                setProjectKey(res[0]?.sprintnamekey.key);
                setSprints(res[0]?.name);
                resolve(res);
              }
            },
            userId,
            globalProject === null ? sqeProjectId : globalProject?.project_id
          );
        });
        await new Promise((resolve) => {
          GetIssuesOfTestlibrary(
            (res) => {
              if (res !== null) {
                setIssueData(res?.data?.info);
              }
            },
            data[0]?.name,
            data[0]?.sprintnamekey?.key,
            globalProject === null ? sqeProjectId : globalProject?.project_id
          );
          resolve();
        });
        await new Promise((resolve) => {
          GetTestLibrary(
            (res) => {
              if (res !== null) {
                setTableData(res);
                setSnackbarData({
                  status: true,
                  message: "Testcases fetched successfully",
                  severity: "success",
                });
              }
            },
            globalProject === null ? sqeProjectId : globalProject?.project_id,
            userId,
            data[0]?.sprintnamekey.key,
            data[0]?.name
          );
          resolve();
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //------------------------------- onChange of Project---------------------------
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await new Promise((resolve) => {
          GetSprintsOfJiraProject(
            (res) => {
              if (res !== null) {
                setNotEmpty(true);
                setData(res);
                setProject(res[0]?.sprintnamekey.value);
                setProjectKey(res[0]?.sprintnamekey.key);
                setSprints(res[0]?.name);
                resolve(res);
              }
            },
            userId,
            globalProject === null ? sqeProjectId : globalProject?.project_id
          );
        });
        await new Promise((resolve) => {
          GetIssuesOfTestlibrary(
            (res) => {
              setIssueData(res?.data?.info);
            },
            data[0]?.name,
            data[0]?.sprintnamekey?.key,
            globalProject === null ? sqeProjectId : globalProject?.project_id
          );
          resolve();
        });
        await new Promise((resolve) => {
          GetTestLibrary(
            (res) => {
              console.log(Object.keys(res).length);
              if (res !== null) {
                setTableData(res);
                setSnackbarData({
                  status: true,
                  message: "Testcases fetched successfully",
                  severity: "success",
                });
              }
            },
            globalProject === null ? sqeProjectId : globalProject?.project_id,
            userId,
            data[0]?.sprintnamekey.key,
            data[0]?.name
          );
          resolve();
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalProject]);
  // -------------------------------onChange of Sprint------------------------------
  useEffect(() => {
    async function fetchData() {
      await new Promise((resolve) => {
        GetIssuesOfTestlibrary(
          (res) => {
            setIssueData(res?.data?.info);
            // setIssues(res?.data?.info[0]?.key);
          },
          sprints,
          projectKey,
          globalProject?.project_id
        );
        resolve();
      });
      await new Promise((resolve) => {
        setIssueData([]);
        GetTestLibrary(
          (res) => {
            console.log(Object.keys(res).length);
            console.log(res);
            if (res !== null) {
              setTableData(res);
            }
          },
          globalProject?.project_id,
          userId,
          projectKey,
          sprints
        );
        resolve();
      });
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sprints]);

  //-------------------------------------------onChange of Sprint and Issue-----------------
  useEffect(() => {
    GetTestLibrary(
      (res) => {
        if (res !== null) {
          setTableData(res);
        }
      },
      globalProject?.project_id,
      userId,
      projectKey,
      sprints,
      issues
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [issues]);

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="flex-end"
            spacing={1}
            alignItems="end"
          >
            <Grid item>
              <label htmlFor="">Projects</label>
              <Autocomplete
                disablePortal
                disableClearable
                id="project_id"
                options={projectsList}
                value={globalProject || null}
                sx={{ width: "100%" }}
                getOptionLabel={(option) => option.project_name ?? ""}
                onChange={(e, value) => {
                  setglobalProject(value);
                  setNotEmpty(false);
                  setTableData([]);
                }}
                renderInput={(params) => (
                  <div ref={params.InputProps.ref}>
                    <input type="text" {...params.inputProps} />
                  </div>
                )}
              />
            </Grid>
            {empty ? (
              <>
                {" "}
                <Grid item>
                  <InputLabel id="demo-simple-select-label">
                    Jira Project
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={project}
                    onChange={(e) => setProject(e.target.value)}
                    size="small"
                    fullWidth
                  >
                    <MenuItem value={project}>{project}</MenuItem>
                  </Select>
                </Grid>
                <Grid item>
                  <InputLabel id="demo-simple-select-label">
                    Sprint Name
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sprints}
                    onChange={(e) => {
                      setSprints(e.target.value);
                    }}
                    size="small"
                    fullWidth
                  >
                    {data?.map((sprint) => (
                      <MenuItem key={sprint.id} value={sprint.name}>
                        {sprint.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item>
                  <InputLabel id="demo-simple-select-label">
                    Issue Key
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={issues}
                    onChange={(e) => {
                      setIssues(e.target.value);
                    }}
                    size="small"
                    fullWidth
                  >
                    {issueData?.map((issue) => (
                      <MenuItem key={issue.issue_id} value={issue.key}>
                        {issue.key}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </>
            ) : (
              <>
                <Grid item>
                  <Button
                    variant="contained"
                    startIcon={<ErrorIcon />}
                    style={{ marginBottom: "4px" }}
                  >
                    JIRA NOT CONFIGURED
                  </Button>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
        {empty && (
          <Grid item xs={12} mt={1}>
            <Grid
              container
              justifyContent="flex-end"
              spacing={1}
              alignItems="end"
            >
              <Grid item>
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  accept=".xlsx"
                  onChange={handleFileInputChange}
                />
                <label
                  id="myLabel"
                  for="fileInput"
                  class="fileButton"
                  style={{
                    backgroundColor: " #4CAF50",
                    borderRadius: "5px",
                    border: "none",
                    color: "white",
                    padding: "5px 20px",
                    textAlign: "center",
                    textDecoration: "none",
                    display: "inline-block",
                    fontSize: "16px",
                    cursor: "pointer",
                    width: "fullWidth",
                  }}
                >
                  Browse
                </label>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleUpload}
                  type="button"
                  id="upload-btn"
                  startIcon={<UploadIcon />}
                  size="small"
                >
                  Upload
                </Button>
              </Grid>
              <Grid item>
                <DownloadIcon
                  onClick={handleDownload}
                  style={{ cursor: "pointer", outline: "2px solid #1976d2" }}
                />
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Table
        columns={columns}
        rows={tableData}
        getRowId={(row) => row?.testcase_id}
      />
      {popup && (
        <ConfirmPop
          open={popup}
          handleClose={() => setPopup(false)}
          heading={"Delete Manual Testcase"}
          message={"Are you sure you want to delete this testcase?"}
          onConfirm={() => {
            DeleteManualTestcase(manual_testcase_id).then((res) => {
              if (res) {
                GetTestLibrary(
                  (res) => {
                    if (res !== null) {
                      setTableData(res);
                    }
                  },
                  globalProject?.project_id,
                  userId,
                  projectKey,
                  sprints
                );
              }
            });
            setPopup(false);
          }}
        ></ConfirmPop>
      )}
    </>
  );
};

export default TestLibrary;
