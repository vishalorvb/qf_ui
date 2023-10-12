import { useState, useEffect } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import useHead from "../hooks/useHead";
import SnackbarNotify from "../CustomComponent/SnackbarNotify";
import Grid from "@mui/material/Grid";
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
  const { auth } = useAuth();

  const [testCases, setTestCases] = useState("");
  const [dataSets, setdataSets] = useState("");
  const [totalSprint, settotalSprint] = useState("");

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
  let [percentage, setPercentage] = useState(0);
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

        {automationTDgraph && (
          <Grid item md={6}>
            <TestDesignAutomationGraph
              info={info}
              testDesignPeriod={testDesignPeriod}
              automation={automation}
              defects={defects}
              coverage={coverage}
            />
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
