import { Autocomplete, Button, Grid, Tooltip } from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState, useRef } from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { getApplicationOfProject } from "../../Services/ApplicationService";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import useAxios from "../../hooks/useAxios";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
import DownloadIcon from "@mui/icons-material/Download";
import Table from "../../CustomComponent/Table";
import moment from "moment";
import { useNavigate } from "react-router-dom";

export default function ReportFields({
  setSelectedProject,
  selectedProject,
  selectedApplication,
  setSelectedApplication,
}) {
  const [projectsList, setProjectList] = useState([]);
  const [applicationList, setapplicationList] = useState([]);
  const From_Date = useRef();
  const to_Date = useRef();
  const [reportSuccessMsg, setReportSuccessMsg] = useState(false);
  const [reportFailMsg, setReportFailMsg] = useState(false);
  const [validationMsg, setValidationMsg] = useState(false);
  const [tbData, setTbData] = useState([]);
  const axiosPrivate = useAxios();
  const [json, setJson] = useState();
  const { auth } = useAuth();
  const loggedInId = auth.info.id;
  const navigate = useNavigate();

  try {
  } catch (error) {}

  //   let autoComplete = [
  //     "userAutocomplete",
  //     "projectAutocomplete",
  //     "workflowAutocomplete",
  //   ];

  let date = new Date();
  date.setDate(date.getDate() - 7);
  let finalDate =
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2);
  let today_date = moment(new Date()).format("YYYY-MM-DD");
  const values = {
    from_Date: finalDate,
    to_Date: today_date,
  };

  const [fromDate, setFromDate] = useState(values.from_Date);
  console.log(json);
  const [toDate, setToDate] = useState(values.to_Date);
  const columns = [
    {
      field: "testcases",
      headerName: "Testcase/Testset/Job/Host",
      flex: 3,
      headerAlign: "center",
      sortable: false,
      align: "left",
      renderCell: (params) => {
        return (
          <Tooltip title={params.row.name}>
            <div>{params.row.name}</div>
          </Tooltip>
        );
      },
    },
    {
      field: "created_at",
      headerName: "Date",
      flex: 3,
      headerAlign: "center",
      sortable: false,
      align: "center",
      renderCell: (params) => {
        return moment(params.row.created_at).format("DD/MM/yyyy hh:mm:ss");
      },
    },
    {
      field: "executed_by",
      headerName: "Executed By",
      flex: 3,
      headerAlign: "center",
      sortable: false,
      align: "center",
      renderCell: (params) => {
        return <div>{params.row.user_name}</div>;
      },
    },
    {
      field: "report_result",
      headerName: "Result",
      flex: 3,
      headerAlign: "center",
      sortable: false,
      align: "center",
      renderCell: (params) => {
        let repo_result = params.row.report_result.split("/");
        return (
          <div
            style={{
              border: "1px solid grey",
              display: "flex",
              padding: "inherit",
              borderRadius: "15px",
            }}
          >
            <div style={{ color: "green", fontWeight: "600" }}>
              {repo_result[0]}
            </div>
            &nbsp;<b>/</b>
            &nbsp;
            <div style={{ color: "red", fontWeight: "600" }}>
              {repo_result[1]}
            </div>
          </div>
        );
      },
    },
    {
      headerName: "Actions",
      flex: 3,
      headerAlign: "center",
      align: "center",
      // justifyContent:"space-between",
      renderCell: (params) => {
        return (
          <>
            <Button
              sx={{
                backgroundColor: "#F0FFF0",
                color: "#2F4F4F",
                borderRadius: "10px",
                height: "25px",
                width: "110px",
                marginTop: "5px",
              }}
              variant="outlined"
              onClick={(e) => {
                navigate("ViewReport", {
                  state: { id: params.row.report_id },
                });
              }}
            >
              View Report
            </Button>
            <Button
              sx={{
                marginLeft: "5px",
                backgroundColor: "#EDFAF9",
                borderRadius: "10px",
                height: "25px",
                marginTop: "5px",
              }}
              variant="outlined"
              onClick={(e) => {
                navigate(
                  "AllReports",
                  {
                    state: {
                      id: params.row,
                      fromDate: fromDate,
                      toDate: toDate,
                    },
                  },
                  console.log(fromDate)
                );
              }}
            >
              View All
            </Button>
            <DownloadIcon
              style={{
                marginLeft: "5px",
                border: "1px solid #c4cbe1",
                width: "30px",
                height: "22px",
                cursor: "pointer",
                marginTop: "5px",
              }}
              variant="contained"
              onClick={(e) => {
                axios
                  .get(`/qfreportservice/reportResult/${params.id}.json`)
                  .then((res) => {
                    setJson(res.data);
                  });
              }}
            ></DownloadIcon>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    axios.get(`/qfservice/projects?user_id=${auth?.userId}`).then((res) => {
      const projects = res?.data?.result?.projects_list;
      setProjectList(projects);
      setSelectedProject(projects[0]);
    });
  }, []);

  useEffect(() => {
    setSelectedApplication(applicationList[0]);
  }, [applicationList]);

  useEffect(() => {
    submit();
  }, [selectedApplication]);

  useEffect(() => {
    setSelectedApplication({ module_name: "Select Project first" });
    selectedProject &&
      getApplicationOfProject(setapplicationList, selectedProject?.project_id);
  }, [selectedProject]);

  const submit = (e) => {
    // e.preventDefault();
    // if (
    //   validateForm(requiredsFields, [], [], [], [], "error")
    // )
    {
      axiosPrivate
        .post(
          `qfreportservice/GetReportsBetweenTwoDates?start_date=${fromDate}&end_date=${toDate}&module_id=${selectedApplication?.module_id}&user_id=${loggedInId}`
        )
        .then((Response) => {
          if (Response.data.info.length > 0) {
            setTbData(Response.data.info);
            setReportSuccessMsg(true);
            setTimeout(() => {
              setReportSuccessMsg(false);
            }, 3000);
          } else {
            setReportFailMsg(true);
            setTbData([]);
            setTimeout(() => {
              setReportFailMsg(false);
            }, 3000);
          }
        })
        .catch((error) => {});
    }
    //  else {
    //   setValidationMsg(true);
    //   setTimeout(() => {
    //     setValidationMsg(false);
    //   }, 3000);
    //   console.log("Invalid form");
    // }
  };

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={5}
        mb={0}
      >
        <Autocomplete
          disablePortal
          id="project_id"
          options={projectsList}
          value={selectedProject}
          sx={{ width: "20%" }}
          getOptionLabel={(option) => option.project_name}
          onChange={(e, value) => {
            setSelectedProject(value);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Projects" size="small" />
          )}
        />
        <Autocomplete
          disablePortal
          id="application_id"
          options={applicationList}
          value={selectedApplication}
          sx={{ width: "20%" }}
          getOptionLabel={(option) => option.module_name}
          onChange={(e, value) => {
            setSelectedApplication(value);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Applications" size="small" />
          )}
        />
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "35ch", minHeight: "5ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="From Date"
            variant="outlined"
            type="date"
            size="small"
            ref={From_Date}
            defaultValue={values.from_Date}
            sx={{ width: 220 }}
            onChange={(newValue) => {
              setFromDate(newValue.target.value);
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>

        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "35ch", minHeight: "5ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            size="small"
            label="To Date"
            variant="outlined"
            type="date"
            ref={to_Date}
            defaultValue={values.to_Date}
            sx={{ width: 220 }}
            onChange={(newValue) => {
              setToDate(newValue.target.value);
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
     
   
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
      
      </Stack>
      <SnackbarNotify
        open={reportSuccessMsg}
        close={setReportSuccessMsg}
        msg="We got the report successfully"
        severity="success"
      />
      <SnackbarNotify
        open={reportFailMsg}
        close={setReportFailMsg}
        msg="No reports found"
        severity="error"
      />
      <SnackbarNotify
        open={validationMsg}
        close={setValidationMsg}
        msg="Fill all the required fields"
        severity="error"
      />
      <div className="datatable" style={{ marginTop: "15px" }}>
        <Table
          columns={columns}
          hideSearch={true}
          rows={tbData}
          getRowId={(row) => row.report_id}
        />
      </div>
    </>
  );
}
