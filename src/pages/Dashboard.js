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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import AdbIcon from '@mui/icons-material/Adb';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import AppleIcon from "@mui/icons-material/Apple";
import { Language } from "@mui/icons-material";
import { Box } from "@mui/system";
import {Divider,Card,CardContent,Typography,Autocomplete,Stack,TextField,FormControl,CircularProgress} from "@mui/material";
import ProgressBar from "./ProgressBar";

export default function Dashboard() {
  const { setHeader } = useHead();
  const { auth } = useAuth();
  const header = [<SettingsApplicationsIcon style={{ width: "100%", height: "100%", color: "#009fee" }} />,
                  <AssignmentIcon style={{ width: "100%", height: "100%", color: "#009fee" }} />,
                  <ManageSearchIcon style={{ width: "100%", height: "100%", color: "#009fee" }} />];
  const [testCases, setTestCases] = useState();
  const [dataSets, setdataSets] = useState();
  const [totalSprint, settotalSprint] = useState();
  const data = [testCases, dataSets, totalSprint];
  const body = ["Total Testcases", "Total Datasets", "Total Sprints"];
  const [info, setInfo] = useState([]);
  const [projectsList, setProjectList] = useState([]);
  const [selectedProject, setSelectedProject] = useState({ project_name: "Project", });
  const [sprintName, setSprintName] = useState('All');
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
  const [snackbar, setSnackbar] = useState(false)
  const [sprintList, setSprintList] = useState()
  const [failMsg, setFailMsg] = useState(false);
  const [showTensorFlow, setShowTensorFlow] = useState(false)
  const [automationGraph,setAutomationGraph] = useState(false)
  const [automationTDgraph,setAutomationTDgraph] = useState(false)
  const [showFailMsg,setShowFailMsg]= useState(false)
  const [showProgressBar,setShowProgressBar]= useState(false)
  const [predictionInfo,setPredictionInfo]= useState([])

  function dashboardDetails ()
  {
    setAutomationTDgraph(false)
    axios.get(`/qfdashboard/dashboard/${selectedProject?.project_id}?userId=${auth?.userId}`).then((res) => 
    {
      console.log("api called")
      setInfo(res?.data?.data?.model)
      setTestCases(res?.data?.data?.model.automation_test_cases_count)
      setdataSets(res?.data?.data?.model.automation_test_cases_dataset_count)
      settotalSprint(res?.data?.data?.model.sprint_overview)
      if ((res?.data?.data?.model.automation_graph)?.length > 0) {
        let info = (res.data?.data?.model.automation_graph).replace(/(&#034\;)/g, "\"")
        let jinfo = JSON.parse(info);
        const sprintList = jinfo.map(element => element.period)
        setSprintList(sprintList);
      }
      console.log(res)
      console.log(res?.data?.data?.model.show_automation_graph)
      if(res?.data?.data?.model.show_automation_graph == true)
      {
        setAutomationGraph(true)
      }
      if(res?.data?.data?.model.show_tensorflow == true)
      {
        setShowTensorFlow(true)
      }
      if(res?.data?.data?.model.show_automation_of_testdesign_graph == true)
      {
        setAutomationTDgraph(true)
      }
      if ((res?.data?.data?.model.pure_automation_graph)?.length > 0)
       {
        let info = (res?.data?.data?.model.pure_automation_graph).replace(/(&#034\;)/g, "\"");
        let jinfo = JSON.parse(info);
        const androidArray = jinfo.map(element => element.android_testcases);
        setAndroidTestcase(androidArray)
        const iosArray = jinfo.map(element => element.ios_testcases);
        setIosTestcase(iosArray)
        const webArray = jinfo.map(element => element.web_testcases);
        setWebTestcase(webArray)
        const apiArray = jinfo.map(element => element.api_testcases);
        setApiTestcase(apiArray)
        const periodArray = jinfo.map(element => element.period);
        setPeriod(periodArray)
      }
    },
    )
  }
 
  function getTensorflowData ()
  {
    setShowFailMsg(false)
    setShowProgressBar(false)
    axios.post(`/qfdashboard/getTensorflowData?sqe_project_id=${selectedProject?.project_id}&userId=${auth?.userId}`).then((res) => 
    {
        console.log(res.data.status == 'FAIL')
        console.log(res.data.message == 'Prediction is not available due to insufficient data.')
        if (res.data.status == 'FAIL') 
        {
          setFailMsg(res.data.message)
          setSnackbar(true)
          if(res.data.message == 'Prediction is not available due to insufficient data.')
          {
            setShowFailMsg(true)
          }
          setTimeout(() => {
            setSnackbar(false);
          }, 3000);
        }
        if (res.data.status == 'SUCCESS') {
          console.log("inside success")
          let progress = Math.round(res.data?.info?.next_sprint_pass_percentage);
          console.log(progress)
          setProgress(progress)
          setShowProgressBar(true)
        }
      })
  }
  function getPredictionTestcases()
  {
    axios.post(`/qfdashboard/getPredictionTestcases?sqe_project_id=${selectedProject?.project_id}&userId=${auth?.userId}`).then((res) => 
    {
      console.log(res?.data?.info?.web?.fail)
      setPredictionInfo(res?.data?.info)
    })
  }
  function dashboardDetailsBySprintId()
  {
    setShowTensorFlow(false)
    setShowProgressBar(false)
    axios.get(`/qfdashboard/dashboard/${selectedProject?.project_id}/${sprintName}?userId=${auth?.userId}`).then((res) => {
      setAutomationTDgraph(false)
      setShowTensorFlow(false)
      setInfo(res?.data?.data?.data?.model)
      setTestCases(res?.data?.data?.data?.model.automation_test_cases_count)
      setdataSets(res?.data?.data?.data?.model.automation_test_cases_dataset_count)
      settotalSprint(res?.data?.data?.data?.model.sprint_overview)
      if(res?.data?.data?.data?.model.show_automation_graph == true)
      {
        setAutomationGraph(true)
      }
      if(res?.data?.data?.data?.model.show_automation_of_testdesign_graph == true)
      {
        setAutomationTDgraph(true)
      }
      if(res?.data?.data?.data?.model.show_tensorflow == true)
      {
        setShowTensorFlow(true)
      }
      if ((res?.data?.data?.data?.model.pure_automation_graph).length > 0) {
        let info = (res?.data?.data?.data?.model.automation_graph).replace(/(&#034\;)/g, "\"");
        let jinfo = JSON.parse(info);
        const automationArray = jinfo.map(element => element.automation);
        setAutomation(automationArray)
        const defectsArray = jinfo.map(element => element.defects);
        setDefects(defectsArray)
        const coverageArray = jinfo.map(element => element.coverage);
        setCoverage(coverageArray)
        const periodArray = jinfo.map(element => element.period);
        setTestDesingperiod(periodArray)
      }
    });
  }
  useEffect(() => {
    setHeader((ps) => {
      return { ...ps, name: "Dashboard" };
    });
  }, []);

  useEffect(() => 
  {
    if(sprintName == 'All')
    {
      dashboardDetails()
     getTensorflowData()
     getPredictionTestcases()
    }
  }, [selectedProject,sprintName])
  useEffect(() => {
    if(sprintName != 'All')
    {
   dashboardDetailsBySprintId()
   getTensorflowData()
   getPredictionTestcases()
    }
  }, [sprintName]);
 

  useEffect(() => {
    axios.get(`/qfservice/projects?user_id=${auth?.userId}`).then((res) => {
      const projects = res?.data?.result?.projects_list;
      setProjectList(projects);
      setSelectedProject(projects[0]);
    });
  }, []);


  const graphData = {
    title: {
      text: 'Automation',
      align: 'left',
      style: {
        'font-size': "20px",
        'font-weight': "bold",
        'font-family': "Roboto"
      }
    },
    xAxis: {
      categories: period,
      crosshair: true,
    },
    yAxis: {
      allowDecimals: true,
      padding: 1,
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
      }
    },

    series: [{
      name: 'API',
      data: apiTestcase
    }, {
      name: 'Web',
      data: webTestcase
    }, {
      name: 'Android',
      data: androidTestcase
    }, {
      name: 'iOS',
      data: iosTestcase
    }],

    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }

  }
  const testDesignGraphData = {
    title: {
      text: 'Automation of Test Design',
      align: 'left',
      style: {
        'font-size': "20px",
        'font-weight': "bold",
        'font-family': "Roboto"
      }
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
          connectorAllowed: false
        },
      }
    },

    series: [{
      name: 'Automation',
      data: automation
    }, {
      name: 'Defects',
      data: defects
    },
    {
      name: 'Coverage',
      data: coverage
    }],
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }

  }
  const crd = (index) => {
    return (
      <Card sx={{ Width: "100px", display: "flex", height: "90px" }}>
        <Box sx={{ display: "flex", flexDirection: "column", width: "150px" }}>
          {header[index]}
        </Box>
        <Box
          sx={{ display: "flex", flexDirection: "column", marginLeft: "50px" }}
        >
          <Typography variant="h3" align="left" component="div" marginBottom={1} >
            {data[index]}
          </Typography>
          <Typography variant="subtitle1" align="left" component="div">
            <b>{body[index]}</b>
          </Typography>
        </Box>
      </Card>
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
    createData("Total Regression Testcases", (info?.regression_testcases_count) != undefined ? info?.regression_testcases_count : 0),
    createData("Identified Automation Testcases", (info?.automation_testcases_by_sprint) != undefined ? info?.automation_testcases_by_sprint : 0),
    createData("Yet to Automate Testcases", (info?.yet_to_automate_testcases) != undefined ? info?.yet_to_automate_testcases : 0),
    createData("Test Datasets Created by Automated Testcases", (info?.datasets_created_for_automated_testcases) != undefined ? info?.datasets_created_for_automated_testcases : 0),
  ]

  const fail_row_data = [
    //fail_row_data
    createData("API",(predictionInfo?.api?.fail) != undefined ? predictionInfo.api?.fail :0),
    createData("Web",(predictionInfo?.web?.fail) != undefined ? predictionInfo.web?.fail : 0),
    createData("Android",(predictionInfo?.web?.android) != undefined ? predictionInfo.web?.android : 0),
    createData("iOS",(predictionInfo?.android?.fail) != undefined ? predictionInfo.android?.fail : 0)
  ]

  return (
    <div style={{ overflowX: "hidden" }}>
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={1}
        mb={2}>
        <Autocomplete
          disablePortal
          id="project_id"
          options={projectsList}
          value={selectedProject}
          sx={{ width: "250px" }}
          getOptionLabel={(option) => option.project_name}
          onChange={(e, value) => {
            setSelectedProject(value);
            setSprintName('All')
            setSprintList([])
            setAutomationTDgraph(false)
            setShowTensorFlow(false)
          }}
          renderInput={(params) => (
            <TextField {...params} size="small" />
          )}
        />
        <FormControl sx={{ width: "150px" }}>
          <Select
            id="demo-simple-select"
            value={sprintName}
            onChange={(e) => { setSprintName(e.target.value) }}
          >
            <MenuItem value={"All"}>All</MenuItem>
            {sprintList?.map((period, index) => {
              return <MenuItem value={period} key={index}>{period}</MenuItem>
            })}
          </Select>
        </FormControl>
      </Stack>
      <Divider orientation="horizontal" flexItem sx={{ marginBottom: "10px" }} />
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {Array.from(Array(3)).map((_, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              {crd(index)}
            </Grid>
          ))}
        </Grid>
      </Box>
     
      <Grid container justifyContent="flex-start" alignItems="flex-start" sx={{ marginTop: "20px" }}>
      {automationGraph &&  <Grid item md={6} >
          <Card sx={{ maxWidth: 600 }} elevation={0}>
            <CardContent style={{ marginBottom: "20px", maxWidth: 600 }}>
              <HighchartsReact highcharts={Highcharts} options={graphData} />
            </CardContent>
            <Stack direction="row" spacing={1} style={{ marginLeft: "20px" }}>
              <Brightness5Icon style={{ color: "rgb(124, 181, 236)" }} />
              <Typography>API</Typography>
              <Language />
              <Typography>Web</Typography>
              <AdbIcon style={{ color: "rgb(144, 237, 125)" }} />
              <Typography>Android</Typography>
              <AppleIcon style={{ color: "rgb(247,163,92)" }} />
              <Typography>iOS</Typography>
            </Stack>
            <TableContainer
              component={Paper}
              style={{ marginTop: "20px", marginBottom: "10px" }}>
              <Table
                sx={{ minWidth: 600 }}
                size="small"
                aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Summary</TableCell>
                    <TableCell align="right">Info</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.summary}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
          </Card>
        </Grid>}
       
          {showTensorFlow && 
            <Grid item md={6}  justifyContent="space-between" alignItems="center">
              <Card sx={{maxWidth : 600 ,alignItems : "center"}}  elevation={0}>
                <CardContent style={{ marginBottom: "20px", maxWidth: 600 }}>
              <Typography style={{ fontSize: "20px" }}><b>QualityFusion prediction : Success of Testcases in next sprint</b></Typography>
              { showProgressBar && <ProgressBar percentage = {progress}/>}
              {showFailMsg && <Typography 
              style={{  fontSize: "50px",  fontWeight: "400" }}><b style={{fontSize : "15px"}}>{failMsg != 'Jira is not configured'?failMsg : ""}</b></Typography>}
                </CardContent>
                <TableContainer
                component={Paper}
                style={{ marginTop: "20px", marginBottom: "10px" }}>
                <Table
                  sx={{ minWidth: 600 }}
                  size="small"
                  aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Fail Prediction Testcases</TableCell>
                      <TableCell align="right">Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {fail_row_data.map((row) => (
                      <TableRow
                        key={row.summary}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
              </Card>
            </Grid>
            }
          {automationTDgraph && <Grid item md={6}>
            <Card sx={{ maxWidth: 600 }} elevation={0}>
              <CardContent style={{ marginBottom: "20px", maxWidth: 600 }}>
                <HighchartsReact highcharts={Highcharts} options={testDesignGraphData} />
              </CardContent>
              <Stack direction="row" spacing={1} style={{ marginLeft: "20px" }}>
                <Brightness5Icon style={{ color: "rgb(124, 181, 236)" }} />
                <Typography>Automation</Typography>
                <Language />
                <Typography>Defects</Typography>
                <AdbIcon style={{ color: "rgb(144, 237, 125)" }} />
                <Typography>Coverage</Typography>
              </Stack>
              <TableContainer
                component={Paper}
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
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
              </Card>
            </Grid>
          }
          {snackbar && <SnackbarNotify
            open={snackbar}
            close={setSnackbar}
            msg={failMsg}
            severity="error" />}
        </Grid>
    </div>
  );
}
