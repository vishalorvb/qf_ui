import { Button, Grid, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import TextField from "@mui/material/TextField";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SnackbarNotify from "../CustomComponent/SnackbarNotify";
import DownloadIcon from "@mui/icons-material/Download";
import Table from "../CustomComponent/Table";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import useHead from "../hooks/useHead";
import ProjectnApplicationSelector from "../Components/ProjectnApplicationSelector";
import { renderToString } from "react-dom/server";
import pagegenerator from "../Components/Reports/HTMLgenrator";
import HtmlIcon from "@mui/icons-material/Html";
import { getReport } from "../Services/ReportService";
import axios from "axios";

function Reports() {
  const [reportSuccessMsg, setReportSuccessMsg] = useState(false);
  const [reportFailMsg, setReportFailMsg] = useState(false);
  const [validationMsg, setValidationMsg] = useState(false);
  const [tbData, setTbData] = useState([]);

  const { auth } = useAuth();
  const loggedInId = auth.info.id;
  const navigate = useNavigate();
  const {
    globalProject,
    setglobalProject,
    globalApplication,
    setglobalApplication,
    setHeader,
  } = useHead();

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
  const [toDate, setToDate] = useState(values.to_Date);

  const handleHtmlDownload = async (reportData) => {
    const response = await axios.get(
      `http://10.11.12.243:8083/qfreportservice/reportResult/${reportData?.report_id}`
    );

    const htmlContent = renderToString(
      pagegenerator(response?.data?.info, reportData?.name)
    );
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${reportData.name ?? "Report"}.html`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

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
      field: "created_at_string",
      headerName: "Date",
      flex: 3,
      headerAlign: "center",
      sortable: false,
      align: "center",
    },
    {
      field: "user_name",
      headerName: "Executed By",
      flex: 3,
      headerAlign: "center",
      sortable: false,
      align: "center",
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
                  marginTop: "6px",
                }}
                variant="contained"
              />
            </a>
            <HtmlIcon
              onClick={() => handleHtmlDownload(params?.row)}
              style={{
                marginLeft: "5px",
                border: "1px solid #c4cbe1",
                width: "30px",
                height: "22px",
                cursor: "pointer",
              }}
              variant="contained"
            />
          </>
        );
      },
    },
  ];

  useEffect(() => {
    globalApplication?.module_id && submit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalApplication]);

  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Reports",
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const submit = (e) => {
    getReport(fromDate, toDate, globalApplication?.module_id, loggedInId).then(
      (Response) => {
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
      }
    );
  };

  return (
    <>
      <Grid container>
        <Grid item xs={8} container justifyContent="flex-start" spacing={1}>
          <Grid item>
            <TextField
              label="From Date"
              variant="outlined"
              type="date"
              size="small"
              fullWidth
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
              size="small"
              label="To Date"
              variant="outlined"
              type="date"
              fullWidth
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

export default Reports;
