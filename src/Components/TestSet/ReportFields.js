import { Button, Grid, Tooltip } from "@mui/material";
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
import useHead from "../../hooks/useHead";
import ProjectnApplicationSelector from "../ProjectnApplicationSelector";

export default function ReportFields() {
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
  const {
    globalProject,
    setglobalProject,
    globalApplication,
    setglobalApplication,
  } = useHead();

  try {
  } catch (error) {}
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
        const date = new Date(params.row.created_at);
        const utcTime = date.toLocaleString("en-US", { timeZone: "UTC" });
        return utcTime;
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
      renderCell: (params) => {
        return (
          <>
            <div
              style={{
                border: "1px solid grey",
                display: "flex",
                padding: "inherit",
                borderRadius: "15px",
              }}
            >
              <div
                style={{ color: "green", fontWeight: "600", cursor: "pointer" }}
                onClick={(e) => {
                  navigate("ViewReport", {
                    state: { id: params.row.report_id },
                  });
                }}
              >
                View Report
              </div>
              &nbsp;<b>|</b>
              &nbsp;
              <div
                style={{ color: "red", fontWeight: "600", cursor: "pointer" }}
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
              </div>
            </div>
            <a
              href={`//10.11.12.243:8083/qfreportservice/reportResult/${params.id}.pdf`}
            >
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
              />
            </a>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    submit();
  }, [globalApplication]);

  useEffect(() => {
    globalProject &&
      getApplicationOfProject(setapplicationList, globalProject?.project_id);
  }, [globalProject]);

  const submit = (e) => {
    {
      axiosPrivate
        .post(
          `qfreportservice/GetReportsBetweenTwoDates?start_date=${fromDate}&end_date=${toDate}&module_id=${globalApplication?.module_id}&user_id=${loggedInId}`
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
  };

  return (
    <>
      <Grid container>
        <Grid item xs={8} container justifyContent="flex-start" spacing={1}>
          <Grid item>
            <TextField
              id="outlined-basic"
              label="From Date"
              variant="outlined"
              type="date"
              size="small"
              fullWidth
              ref={From_Date}
              defaultValue={values.from_Date}
              onChange={(newValue) => {
                setFromDate(newValue.target.value);
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              id="outlined-basic"
              size="small"
              label="To Date"
              variant="outlined"
              type="date"
              fullWidth
              ref={to_Date}
              defaultValue={values.to_Date}
              onChange={(newValue) => {
                setToDate(newValue.target.value);
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={submit}
              startIcon={<SearchOutlinedIcon />}
              fullWidth
              style={{ marginBottom: "8px" }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid item>
            <ProjectnApplicationSelector
              globalProject={globalProject}
              setglobalProject={setglobalProject}
              globalApplication={globalApplication}
              setglobalApplication={setglobalApplication}
            />
          </Grid>
        </Grid>
      </Grid>
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
