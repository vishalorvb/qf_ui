import { Autocomplete, Button, Container, Grid, Paper } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import Table from "../CustomComponent/Table";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import useHead from "../hooks/useHead";
import { getProject } from "../Services/ProjectService";
import { getModules } from "../Services/ProjectService";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import useAxios from "../hooks/useAxios";
import { baseUrl } from "../Environment";
import moment from "moment/moment";
import { resetClassName, validateForm } from "../CustomComponent/FormValidation";
import SnackbarNotify from "../CustomComponent/SnackbarNotify";

function Reports() {
  const [fromDate, setFromDate] = useState("");
  const From_Date = useRef(); 
  const [toDate, setToDate] = useState("");
  const to_Date = useRef(); 
  const [usersObject, setUsersObject] = useState([]);
  const [projectsObject, setProjectsObject] = useState([]);
  const [workflowsObject, setWorkflowsObject] = useState([]);
  const [userId, setUserId] = useState(0);
  const [projectId, setProjectId] = useState(0);
  const [workflowId, setWorkflowId] = useState(0);
  const [tbData, setTbData] = useState([]);
  const [reportSuccessMsg, setReportSuccessMsg] = useState(false);
  const [validationMsg, setValidationMsg] = useState(false);
  const axiosPrivate = useAxios();
  const { auth } = useAuth();
  console.log(auth.info);
  const loggedInId = auth.info.id;

  let autoComplete = [
    "userAutocomplete",
    "projectAutocomplete",
    "workflowAutocomplete",
  ];
  let requiredsFields = [From_Date, to_Date];

  const { setHeader } = useHead();
  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Reports",
      };
    });
  }, []);

  const columns = [
    {
      headerName: "S.No",
      field: "sno",
      valueGetter: (index) => index.api.getRowIndex(index.row.id) + 1,
      flex: 1,
      headerAlign: "center",
      sortable: false,
      align: "center",
    },
    {
      field: "testcases",
      headerName: "Testcase/Testset/Job/Host",
      flex: 3,
      headerAlign: "center",
      sortable: false,
      align: "left",
      renderCell: (params) => {
        return (
          <div>{params.row.testcase_name + "/ " + params.row.testset_name}</div>
        );
      },
    },
    {
      field: "created_at",
      headerName: "Date",
      flex: 3,
      headerAlign: "center",
      sortable: false,
      align: "left",
      renderCell: (params) => {
        return <div>{params.row.created_at}</div>;
      },
    },
    {
      field: "executed_by",
      headerName: "Executed By",
      flex: 3,
      headerAlign: "center",
      sortable: false,
      align: "left",
    },
    {
      field: "report_result",
      headerName: "Result",
      flex: 3,
      headerAlign: "center",
      sortable: false,
      align: "left",
    },
  ];

  const getUsers = () => {
    axiosPrivate.get(`/qfauthservice/user/listofAllUsers?orgId=${auth.info.organization_id}&ssoId=${auth.info.ssoId}`).then(res => {
      setUsersObject(res.data.info);
      console.log(res.data.info);
    })
      .catch((error) => {
        console.log(error)
      });
  };
  console.log(projectId);
  useEffect(() => {
    getUsers();
    getProject(setProjectsObject,loggedInId);
    getModules(setWorkflowsObject,projectId);
  }, [projectId, workflowId,fromDate,toDate]);
  console.log(projectId);

  const submit = (e) => {
    e.preventDefault();
    if (validateForm(requiredsFields, [], [], [], [], [autoComplete], "error")) {
      console.log(userId);
      console.log(projectId);
      console.log(workflowId);
      console.log(fromDate);
      console.log(toDate);
      axiosPrivate
        .post(`qfreportservice/GetReportsBetweenTwoDates?start_date=${fromDate}&end_date=${toDate}&module_id=${workflowId}&user_id=${loggedInId}`)
        .then((Response) => {
          setTbData(Response.data.info);
          console.log(Response.data.info);
          setReportSuccessMsg(true);
          setTimeout(() => {
            setReportSuccessMsg(false)
          }, 3000);
        })
        .catch((error) => {
          console.log(error)
        });
      console.log("Valid Form")
    }
    else {
      setValidationMsg(true);
      setTimeout(() => {
        setValidationMsg(false)
      }, 3000);
      console.log("Invalid form");
    }
  };

  return (
    <div onClick={resetClassName}>
      <Paper
        elevation={1}
        sx={{ padding: "2px", marginTop: "10px", marginBottom: "10px" }}
      >
        <Container
          component={"div"}
          maxWidth={false}
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: "10px",
            justifyContent: "flex-start",
          }}
        >
          {/* <Grid
            container
            item
            xs={12}
            sm={6}
            md={4}
            xl={4}
            sx={{ marginBottom: "10px" }}
          >
            <Grid item xs={6} sm={6} md={3.5} xl={4}>
              <label>
                User <span className="importantfield">*</span>:
              </label>
            </Grid>
            <Grid item xs={6} sm={6} md={8} xl={7}>
              <Autocomplete
                size="small"
                options={usersObject}
                getOptionLabel={(option) => option.firstName + " " + option.lastName}
                onChange={(e, value) => {
                  // Uid.current = value.id;
                  setUserId(value.id)
                }}
                noOptionsText={"User not found"}
                renderInput={(params) => (
                  <div ref={params.InputProps.ref}>
                    <input
                      type="text"
                      name="userAutocomplete"
                      {...params.inputProps}
                      placeholder=" Please Select"
                    />
                  </div>
                )}
              />
            </Grid>
          </Grid> */}
          <Grid
            container
            item
            xs={12}
            sm={6}
            md={4}
            xl={4}
            sx={{ marginBottom: "10px" }}
          >
            <Grid item xs={6} sm={6} md={3.5} xl={4}>
              <label>
                Projects <span className="importantfield">*</span>:
              </label>
            </Grid>
            <Grid item xs={6} sm={6} md={8} xl={7}>
              <Autocomplete
                size="small"
                options={projectsObject}
                getOptionLabel={(option) => option.project_name}
                onChange={(e, value) => {
                  // Project_Id.current = value.project_id;
                  setProjectId(value.project_id);
                }}
                noOptionsText={"Projects not found"}
                renderInput={(params) => (
                  <div ref={params.InputProps.ref}>
                    <input
                      type="text"
                      name="projectAutocomplete"
                      {...params.inputProps}
                      placeholder=" Please Select"
                    />
                  </div>
                )}
              />
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={6}
            md={4}
            xl={4}
            sx={{ marginBottom: "10px" }}
          >
            <Grid item xs={6} sm={6} md={3.5} xl={4}>
              <label>
                Workflow <span className="importantfield">*</span>:
              </label>
            </Grid>
            <Grid item xs={6} sm={6} md={8} xl={7}>
              <Autocomplete
                size="small"
                options={workflowsObject}
                getOptionLabel={(option) => option.module_name}
                onChange={(e, value) => {
                  // Workflow_Id.current = value.module_id;
                  setWorkflowId(value.module_id);
                }}
                noOptionsText={"Workflows not found"}
                renderInput={(params) => (
                  <div ref={params.InputProps.ref}>
                    <input
                      type="text"
                      name="workflowAutocomplete"
                      {...params.inputProps}
                      placeholder=" Please Select"
                    />
                  </div>
                )}
              />
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={6}
            md={4}
            xl={4}
            sx={{ marginBottom: "10px" }}
          >
            <Grid item xs={6} sm={6} md={3.5} xl={4}>
              <label>
                From Date <span className="importantfield">*</span>:
              </label>
            </Grid>
            <Grid item xs={6} sm={6} md={8} xl={7} style={{ width: "310px" }}>
              <input
                id="date"
                type="date"
                ref={From_Date}
                defaultValue={fromDate}
                sx={{ width: 158 }}
                onChange={(newValue) => {
                  console.log(newValue.target.value);
                  // setFromDate(moment(newValue.target.value).format('YYYY-MM-DD'));
                  setFromDate(newValue.target.value);
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={6}
            md={4}
            xl={4}
            sx={{ marginBottom: "10px" }}
          >
            <Grid item xs={6} sm={6} md={3.5} xl={4}>
              <label>
                To Date <span className="importantfield">*</span>:
              </label>
            </Grid>
            <Grid item xs={6} sm={6} md={8} xl={7}>
              <input
                id="date"
                type="date"
                ref={to_Date}
                defaultValue={toDate}
                sx={{ width: 158 }}
                onChange={(newValue) => {
                  // setToDate(moment(newValue.target.value).format('YYYY-MM-DD'));
                  setToDate(newValue.target.value);
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            onClick={submit}
            startIcon={<SearchOutlinedIcon />}
            sx={{
              marginLeft: "45%",
              marginRight: "auto",
              marginBottom: "10px",
              marginTop: "25px",
            }}
          >
            Search
          </Button>
        </Container>
      </Paper>
      <SnackbarNotify open={reportSuccessMsg} close={setReportSuccessMsg} msg="We got the report successfully" severity="success" />
      <SnackbarNotify open={validationMsg} close={setValidationMsg} msg="Fill all the required fields" severity="error" />
      <div className="datatable" style={{ marginTop: "15px" }}>
        <Table
          columns={columns}
          rows={tbData}
          // hidefooter={false}
        />
      </div>
    </div>
  );
}

export default Reports;
