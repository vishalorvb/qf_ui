import * as React from "react";
import { useState, useEffect } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import useHead from "../hooks/useHead";
import SnackbarNotify from "../CustomComponent/SnackbarNotify";
import Grid from "@mui/material/Grid";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import AdbIcon from "@mui/icons-material/Adb";
import Brightness5Icon from "@mui/icons-material/Brightness5";
import AppleIcon from "@mui/icons-material/Apple";
import { Language } from "@mui/icons-material";
import { Box } from "@mui/system";
import {
  Divider,
  Card,
  CardContent,
  Typography,
  Stack,
  Alert,
} from "@mui/material";
import ProgressBar from "./ProgressBar";
import { useNavigate } from "react-router-dom";
import { ReportPercentage } from "../Services/DashboardService";
import ProjectnApplicationSelector from "../Components/ProjectnApplicationSelector";
import ProjectStatusCards from "../Components/DashboardComponents/ProjectStatusCards";
import AutomationGraph from "../Components/DashboardComponents/AutomationGraph";
import PredictionStatus from "../Components/DashboardComponents/PredictionStatus";
import TestDesignAutomationGraph from "../Components/DashboardComponents/TestdesignAutomationGraph";

export default function Dashboard() {
  const {
    setHeader,
    globalProject,
    setglobalProject,
    globalApplication,
    setglobalApplication,
  } = useHead();
  const navigate = useNavigate();
  const { auth } = useAuth();

  const [testCases, setTestCases] = useState("");
  const [dataSets, setdataSets] = useState("");
  const [totalSprint, settotalSprint] = useState("");
  const data = [testCases, dataSets, totalSprint];
  const body = ["Total Testcases", "Total Datasets", "Total Sprints"];
  const [info, setInfo] = useState([]);
  const [sprintName, setSprintName] = useState("All");
  const [progress, setProgress] = useState();
  const [androidTestcase, setAndroidTestcase] = useState();
  const [iosTestcase, setIosTestcase] = useState();
  const [webTestcase, setWebTestcase] = useState();
  const [apiTestcase, setApiTestcase] = useState();
  const [period, setPeriod] = useState();
  const [automation, setAutomation] = useState();
  const [defects, setDefects] = useState();
  const [coverage, setCoverage] = useState();
  const [testDesignPeriod, setTestDesingperiod] = useState();
  const [snackbar, setSnackbar] = useState(false);
  const [sprintList, setSprintList] = useState();
  const [failMsg, setFailMsg] = useState(false);
  const [showTensorFlow, setShowTensorFlow] = useState(false);
  const [automationGraph, setAutomationGraph] = useState(false);
  const [automationTDgraph, setAutomationTDgraph] = useState(false);
  const [showFailMsg, setShowFailMsg] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [predictionInfo, setPredictionInfo] = useState([]);
  let [percentage, setPercentage] = useState(10);
  let [faildata, setFaildata] = useState([]);

  function dashboardDetails() {
    setAutomationTDgraph(false);
    axios
      .get(
        `/qfdashboard/dashboard/${globalProject?.project_id}?userId=${auth?.userId}`
      )
      .then((res) => {
        setInfo(res?.data?.data?.model);
        setTestCases(res?.data?.data?.model.automation_test_cases_count);
        setdataSets(res?.data?.data?.model.automation_test_cases_dataset_count);
        settotalSprint(res?.data?.data?.model.sprint_overview);
        if (res?.data?.data?.model.automation_graph?.length > 0) {
          let info = (res.data?.data?.model.automation_graph).replace(
            /(&#034\;)/g,
            '"'
          );
          let jinfo = JSON.parse(info);
          const sprintList = jinfo.map((element) => element.period);
          setSprintList(sprintList);
        }
        if (res?.data?.data?.model.show_automation_graph == true) {
          setAutomationGraph(true);
        }
        if (res?.data?.data?.model.show_tensorflow == true) {
          setShowTensorFlow(true);
        }
        if (
          res?.data?.data?.model.show_automation_of_testdesign_graph == true
        ) {
          setAutomationTDgraph(true);
        }
        if (res?.data?.data?.model.pure_automation_graph?.length > 0) {
          let info = (res?.data?.data?.model.pure_automation_graph).replace(
            /(&#034\;)/g,
            '"'
          );
          let jinfo = JSON.parse(info);
          const androidArray = jinfo.map(
            (element) => element.android_testcases
          );
          setAndroidTestcase(androidArray);
          const iosArray = jinfo.map((element) => element.ios_testcases);
          setIosTestcase(iosArray);
          const webArray = jinfo.map((element) => element.web_testcases);
          setWebTestcase(webArray);
          const apiArray = jinfo.map((element) => element.api_testcases);
          setApiTestcase(apiArray);
          const periodArray = jinfo.map((element) => element.period);
          setPeriod(periodArray);
        }
      });
  }

  function getTensorflowData() {
    setShowFailMsg(false);
    setShowProgressBar(false);
    axios
      .post(
        `/qfdashboard/getTensorflowData?sqe_project_id=${globalProject?.project_id}&userId=${auth?.userId}`
      )
      .then((res) => {
        if (res.data.status == "FAIL") {
          setFailMsg(res.data.message);
          setSnackbar(true);
          if (
            res.data.message ==
            "Prediction is not available due to insufficient data."
          ) {
            setShowFailMsg(true);
          }
          setTimeout(() => {
            setSnackbar(false);
          }, 3000);
        }
        if (res.data.status == "SUCCESS") {
          let progress = Math.round(
            res.data?.info?.next_sprint_pass_percentage
          );
          setProgress(progress);
          setShowProgressBar(true);
        }
      });
  }
  function getPredictionTestcases() {
    axios
      .post(
        `/qfdashboard/getPredictionTestcases?sqe_project_id=${globalProject?.project_id}&userId=${auth?.userId}`
      )
      .then((res) => {
        setPredictionInfo(res?.data?.info);
      });
  }

  function dashboardDetailsBySprintId() {
    setShowTensorFlow(false);
    setShowProgressBar(false);
    axios
      .get(
        `/qfdashboard/dashboard/${globalProject?.project_id}/${sprintName}?userId=${auth?.userId}`
      )
      .then((res) => {
        setAutomationTDgraph(false);
        setShowTensorFlow(false);
        setInfo(res?.data?.data?.data?.model);
        setTestCases(res?.data?.data?.data?.model.automation_test_cases_count);
        setdataSets(
          res?.data?.data?.data?.model.automation_test_cases_dataset_count
        );
        settotalSprint(res?.data?.data?.data?.model.sprint_overview);
        if (res?.data?.data?.data?.model.show_automation_graph == true) {
          setAutomationGraph(true);
        }
        if (
          res?.data?.data?.data?.model.show_automation_of_testdesign_graph ==
          true
        ) {
          setAutomationTDgraph(true);
        }
        if (res?.data?.data?.data?.model.show_tensorflow == true) {
          setShowTensorFlow(true);
        }
        if ((res?.data?.data?.data?.model.pure_automation_graph).length > 0) {
          let info = (res?.data?.data?.data?.model.automation_graph).replace(
            /(&#034\;)/g,
            '"'
          );
          let jinfo = JSON.parse(info);
          const automationArray = jinfo.map((element) => element.automation);
          setAutomation(automationArray);
          const defectsArray = jinfo.map((element) => element.defects);
          setDefects(defectsArray);
          const coverageArray = jinfo.map((element) => element.coverage);
          setCoverage(coverageArray);
          const periodArray = jinfo.map((element) => element.period);
          setTestDesingperiod(periodArray);
        }
      });
  }

  const testDesignGraphData = {
    title: {
      text: "Automation of Test Design",
      align: "left",
      style: {
        "font-size": "20px",
        "font-weight": "bold",
        "font-family": "Roboto",
      },
    },
    xAxis: {
      categories: testDesignPeriod,
      crosshair: true,
    },
    yAxis: {
      allowDecimals: true,
      padding: 1,
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
      },
    },

    series: [
      {
        name: "Automation",
        data: automation,
      },
      {
        name: "Defects",
        data: defects,
      },
      {
        name: "Coverage",
        data: coverage,
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  };

  const cardsIconsSx = { fontSize: 100, color: "#009fee" };

  const header = [
    <SettingsApplicationsIcon sx={cardsIconsSx} />,
    <AssignmentIcon sx={cardsIconsSx} />,
    <ManageSearchIcon sx={cardsIconsSx} />,
  ];

  const card = (index) => {
    return (
      <Paper variant="outlined" sx={{ borderColor: "#b3e6ff" }}>
        <Stack direction="row">
          {header[index]}
          <Stack pl={2} sx={{ backgroundColor: "#b3e6ff", width: "100%" }}>
            <Typography variant="h3">{data[index]}</Typography>
            <Typography variant="subtitle1" align="left" component="div">
              <b>{body[index]}</b>
            </Typography>
          </Stack>
        </Stack>
      </Paper>
    );
  };

  function createData(summary, info) {
    return { summary, info };
  }

  const rows = [
    createData("Api Testcases", info?.api_testcases_count),
    createData("Web Testcases", info?.web_testcases_count),
    createData("Android Testcases", info?.android_testcases_count),
    createData("IOS Testcases", info?.ios_testcases_count),
  ];

  const row_data = [
    createData(
      "Total Regression Testcases",
      info?.regression_testcases_count != undefined
        ? info?.regression_testcases_count
        : 0
    ),
    createData(
      "Identified Automation Testcases",
      info?.automation_testcases_by_sprint != undefined
        ? info?.automation_testcases_by_sprint
        : 0
    ),
    createData(
      "Yet to Automate Testcases",
      info?.yet_to_automate_testcases != undefined
        ? info?.yet_to_automate_testcases
        : 0
    ),
    createData(
      "Test Datasets Created by Automated Testcases",
      info?.datasets_created_for_automated_testcases != undefined
        ? info?.datasets_created_for_automated_testcases
        : 0
    ),
  ];

  useEffect(() => {
    setHeader((ps) => {
      return { ...ps, name: "Dashboard" };
    });
  }, []);

  useEffect(() => {
    if (sprintName == "All") {
      dashboardDetails();
      getTensorflowData();
      getPredictionTestcases();
    }
    axios
      .post(
        `/qfdashboard/getFailTestcasesbyProjectandsprint?project_id=${
          globalProject?.project_id
        }${sprintName == "All" ? "" : `&sprintname=${sprintName}`}`
      )
      .then((res) => {
        setFaildata(res.data.data);
      });
  }, [globalProject, sprintName]);

  useEffect(() => {
    if (sprintName != "All") {
      dashboardDetailsBySprintId();
      getTensorflowData();
      getPredictionTestcases();
    }
  }, [sprintName]);

  useEffect(() => {
    ReportPercentage(setPercentage, globalProject?.project_id);
  }, [globalProject]);

  useEffect(() => {
    setSprintName("All");
    setSprintList([]);
    setAutomationTDgraph(false);
    setShowTensorFlow(false);
  }, [globalProject]);

  return (
    <>
      <Grid container spacing={2} justifyContent="right" mb={2}>
        <Grid item md={4}>
          <ProjectnApplicationSelector
            globalProject={globalProject}
            setglobalProject={setglobalProject}
            globalApplication={globalApplication}
            setglobalApplication={setglobalApplication}
            isApplication={false}
          />
        </Grid>
        <Grid item md={2}>
          <label for="">Sprint</label>
          <select
            style={{ height: "38px" }}
            id="demo-simple-select"
            value={sprintName}
            onChange={(e) => {
              setSprintName(e.target.value);
              ReportPercentage(
                setPercentage,
                globalProject?.project_id,
                e.target.value == "All" ? 0 : e.target.value
              );
            }}
          >
            <option value={"All"}>All</option>
            {sprintList?.map((period, index) => {
              return (
                <option value={period} key={index}>
                  {period}
                </option>
              );
            })}
          </select>
        </Grid>
      </Grid>

      <ProjectStatusCards
        testCases={testCases}
        dataSets={dataSets}
        totalSprint={totalSprint}
      />

      <Grid
        container
        justifyContent="flex-start"
        alignItems="flex-start"
        mt={2}
        spacing={2}
      >
        {automationGraph && (
          <Grid item md={6}>
            <AutomationGraph
              info={info}
              period={period}
              apiTestcase={apiTestcase}
              webTestcase={webTestcase}
              androidTestcase={androidTestcase}
              iosTestcase={iosTestcase}
            />
          </Grid>
        )}

        <Grid item md={6}>
          <PredictionStatus
            showFailMsg={showFailMsg}
            failMsg={failMsg}
            faildata={faildata}
            percentage={percentage}
          />
        </Grid>

        <TestDesignAutomationGraph />

        {automationTDgraph && (
          <Grid item md={6}>
            <Paper variant="outlined">
              <HighchartsReact
                highcharts={Highcharts}
                options={testDesignGraphData}
              />
              <Stack direction="row" spacing={1} style={{ marginLeft: "20px" }}>
                <Brightness5Icon style={{ color: "rgb(124, 181, 236)" }} />
                <Typography>Automation</Typography>
                <Language />
                <Typography>Defects</Typography>
                <AdbIcon style={{ color: "rgb(144, 237, 125)" }} />
                <Typography>Coverage</Typography>
              </Stack>
              <TableContainer
                style={{ marginTop: "20px", marginBottom: "10px" }}
              >
                <Table
                  sx={{ minWidth: 600 }}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Summary</TableCell>
                      <TableCell align="right">Info</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row_data.map((row) => (
                      <TableRow
                        key={row.summary}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.summary}
                        </TableCell>
                        <TableCell align="right">{row.info}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        )}
        {snackbar && (
          <SnackbarNotify
            open={snackbar}
            close={setSnackbar}
            msg={failMsg}
            severity="error"
          />
        )}
      </Grid>
    </>
  );
}
