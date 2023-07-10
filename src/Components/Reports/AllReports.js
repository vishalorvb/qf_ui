import { Button, Tooltip } from "@mui/material";
import { Stack } from "@mui/system";
import { useState, useRef, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import useAxios from "../../hooks/useAxios";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
import Table from "../../CustomComponent/Table";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function AllReports({}) {
  const location = useLocation();
  const to_Date = useRef();
  const From_Date = useRef();
  const [reportSuccessMsg, setReportSuccessMsg] = useState(false);
  const [reportFailMsg, setReportFailMsg] = useState(false);
  const [validationMsg, setValidationMsg] = useState(false);
  const [tbData, setTbData] = useState([]);
  const axiosPrivate = useAxios();
  const { auth } = useAuth();
  const loggedInId = auth.info.id;
  const navigate = useNavigate();
  const [fromDate, setFromDate] = useState(location.state.fromDate);
  const [toDate, setToDate] = useState(location.state.toDate);
  const report_type = location.state.id.report_type;
  const testcaseId = location.state.id.testcase_id;
  const testsetId = location.state.id.testset_id;

  const columns = [
    {
      field: "name",
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
      field: "user_name",
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
            &nbsp;<b>/</b>&nbsp;
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
          <Button
            sx={{
              backgroundColor: "#F0FFF0",
              color: "#2F4F4F",
              borderRadius: "10px",
              height: "25px",
              width: "110px",
              marginTop: "1px",
            }}
            variant="outlined"
            onClick={(e) => {
              navigate("/reports/ViewReport", {
                state: { id: params.id },
              });
            }}
          >
            View Report
          </Button>
        );
      },
    },
  ];

  const submit = (e, td, fd) => {
    {
      axiosPrivate
        .post(
          location.state.id.name.includes("TC_")
            ? `qfreportservice/testcase-reports/${auth?.userId}/${report_type}/${testcaseId}/${fromDate}/${toDate}`
            : `qfreportservice/testset-reports/${auth?.userId}/${report_type}/${testsetId}/${fromDate}/${toDate}`
        )
        .then((Response) => {
          if (Response.data.info.reports_list.length > 0) {
            setTbData(Response.data.info.reports_list);
            setReportSuccessMsg(true);
            setTimeout(() => {
              setReportSuccessMsg(false);
            }, 3000);
          } else {
            setTbData("");
            setReportFailMsg(true);
            setTimeout(() => {
              setReportFailMsg(false);
            }, 3000);
          }
        })
        .catch((error) => {});
    }
  };

  useEffect(() => {
    submit();
  }, []);

  return (
    <>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={5}
        mb={0}
      >
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
            defaultValue={location.state.fromDate}
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
            defaultValue={location.state.toDate}
            sx={{ width: 158 }}
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
            height: "50px",
            width: "150px",
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
          searchPlaceholder="Search Reports"
          columns={columns}
          rows={tbData}
          getRowId={(row) => row.report_id}
        />
      </div>
    </>
  );
}
