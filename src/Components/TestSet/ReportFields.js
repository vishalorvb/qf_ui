import { Autocomplete,Button ,Grid ,Tooltip} from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState, useRef } from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { getApplicationOfProject } from "../../Services/ApplicationService";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import useAxios from "../../hooks/useAxios";
import { resetClassName,validateForm } from "../../CustomComponent/FormValidation";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
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
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const to_Date = useRef();
  const [reportSuccessMsg, setReportSuccessMsg] = useState(false);
  const [validationMsg, setValidationMsg] = useState(false);
  const [tbData, setTbData] = useState([]);
  const axiosPrivate = useAxios();
  let requiredsFields = [From_Date, to_Date];
  const { auth } = useAuth();
  const loggedInId = auth.info.id;
  const navigate = useNavigate();
  //   let autoComplete = [
//     "userAutocomplete",
//     "projectAutocomplete",
//     "workflowAutocomplete",
//   ];
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
            <Tooltip title={params.row.name} >
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
       
        return (
            moment(params.row.created_at).format('DD/MM/yyyy hh:mm:ss')
        )
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
        return (
          <div>{params.row.user_name}</div>
        );
      },
      
    },
    {
      field: "report_result",
      headerName: "Result",
      flex: 3,
      headerAlign: "center",
      sortable: false,
      align: "center",
      renderCell:(params) => {
        let repo_result = params.row.report_result.split('/');

        console.log(repo_result)
        return (
           <>
            <div style={{color:"green"}}>{repo_result[0]}</div>&nbsp;<b>/</b>&nbsp;<div style={{color:"red"}}>{repo_result[1]}</div>
            </>
          );
      }
    },
    {
        
        headerName: "Actions",
        flex: 3,
        headerAlign: "center",
        align: "center",
        renderCell:(params) => {
            return (
        <Button variant="contained" onClick={navigate("ViewReport", {
            state: { id: ""},})}>View Report</Button>
            )
        }
    
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
    setSelectedApplication({ module_name: "Select Project first" });
    selectedProject &&
      getApplicationOfProject(setapplicationList, selectedProject?.project_id);
  }, [selectedProject]);

  const submit = (e) => {
    e.preventDefault();
    // if (
    //   validateForm(requiredsFields, [], [], [], [], "error")
    // )
     {
      axiosPrivate
        .post(
          `qfreportservice/GetReportsBetweenTwoDates?start_date=${fromDate}&end_date=${toDate}&module_id=768&user_id=${loggedInId}`
        )
        .then((Response) => {
          setTbData(Response.data.info);
          setReportSuccessMsg(true);
          setTimeout(() => {
            setReportSuccessMsg(false);
          }, 3000);
        })
        .catch((error) => {
        });
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
          console.log(value);
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
          "& > :not(style)": { m: 1, width: "27ch", minHeight: "7ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="From Date"
          variant="outlined"
          type="date"
          ref={From_Date}
          defaultValue={fromDate}
          sx={{ width: 158 }}
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
          "& > :not(style)": { m: 1, width: "27ch", minHeight: "7ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="To Date"
          variant="outlined"
          type="date"
          ref={to_Date}
          defaultValue={toDate}
          sx={{ width: 158 }}
          onChange={(newValue) => {
            setToDate(newValue.target.value);
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>
    </Stack>
    <Grid container justifyContent="flex-center">
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
    </Grid>
    <SnackbarNotify
        open={reportSuccessMsg}
        close={setReportSuccessMsg}
        msg="We got the report successfully"
        severity="success"
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
          rows={tbData}
          getRowId={(row) => row.report_id}
        />
      </div>
    </>
  );
}