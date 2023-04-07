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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import AdbIcon from '@mui/icons-material/Adb';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import AppleIcon from "@mui/icons-material/Apple";
import { Language } from "@mui/icons-material";
import { Box } from "@mui/system";
import {
  Divider,
  Card,
  CardContent,
  Typography,
  Autocomplete,
  Stack,
  TextField,
  FormControl,
  CircularProgress,
} from "@mui/material";
export default function Dashboard() {
  const { setHeader } = useHead();
  const { auth } = useAuth();
  const header = [<SettingsApplicationsIcon style={{width : "100%" , height : "100%" , color : "#009fee"}}/>,
                  <AssignmentIcon style={{width : "100%" , height : "100%", color : "#009fee"}}/>, 
                  <ManageSearchIcon style={{width : "100%" , height : "100%", color : "#009fee"}}/>];
  const [testCases, setTestCases] = useState();
    const [dataSets, setdataSets] = useState();
  const [totalSprint, settotalSprint] = useState();
  const data = [testCases, dataSets, totalSprint];
  const body = ["Total Testcases", "Total Datasets", "Total Sprints"];
  const [info, setInfo] = useState([]);
  const [projectsList, setProjectList] = useState([]);
  const [selectedProject, setSelectedProject] = useState({ project_name: "Project", });
  const [sprintName, setSprintName] = useState('All');
  const [progress, setProgress] = React.useState(0);
  const [androidTestcase,setAndroidTestcase] = useState();
  const [iosTestcase,setIosTestcase] = useState();
  const [webTestcase,setWebTestcase] = useState();
  const [apiTestcase,setApiTestcase] = useState();
  const [period,setPeriod] = useState();

  const [automation,setAutomation]= useState();
  const [defects,setDefects] = useState();
  const [coverage,setCoverage] =useState();
  const [testDesignPeriod,setTestDesingperiod] = useState();
  const [snackbar, setSnackbar] = useState(false)

  useEffect(() => {
    setHeader((ps) => {
      return { ...ps, name: "Dashboard" };
    });
  }, []);

  useEffect(() => {
    axios.get(`/qfdashboard/dashboard/${selectedProject?.project_id}?userId=${auth?.userId}`).then((res) => {
      setInfo(res?.data?.data?.model)
      setTestCases(res?.data?.data?.model.automation_test_cases_count)
      setdataSets(res?.data?.data?.model.automation_test_cases_dataset_count)
      settotalSprint(res?.data?.data?.model.sprint_overview)
      if((res?.data?.data?.model.pure_automation_graph).length > 0)
      {
        let info =(res?.data?.data?.model.pure_automation_graph).replace(/(&#034\;)/g,"\"");
        let jinfo = JSON.parse(info);
        let data = jinfo;
        const androidArray= data.map(element => element.android_testcases);
        setAndroidTestcase(androidArray)
        const iosArray= data.map(element => element.ios_testcases);
        setIosTestcase(iosArray)
        const webArray = data.map(element => element.web_testcases);
        setWebTestcase(webArray)
        const apiArray = data.map(element => element.api_testcases);
        setApiTestcase(apiArray)
        const periodArray = data.map(element => element.period);
        setPeriod(periodArray)
      }
      axios.post(`/qfdashboard/getTensorflowData?sqe_project_id=${selectedProject?.project_id}&userId=${auth?.userId}`).then((res) =>
       {
        if(res.data.message === 'Jira is not configured')
        {
          setSnackbar(true)
          setTimeout(() => {
            setSnackbar(false);
          }, 3000); 
        }
        if(res.data?.info?.next_sprint_pass_percentage != undefined || res.data?.info?.next_sprint_pass_percent != "" || res.data?.info?.next_sprint_pass_percentage > 0)
        {
          setProgress(res.data?.info?.next_sprint_pass_percentage)
        }
       })
    });
  }, [selectedProject])
  useEffect(() => {
    axios.get(`/qfdashboard/dashboard/${selectedProject?.project_id}/${sprintName}?userId=${auth?.userId}`).then((res) => {
      setInfo(res?.data?.data?.data?.model)
      setTestCases(res?.data?.data?.data?.model.automation_test_cases_count)
      setdataSets(res?.data?.data?.data?.model.automation_test_cases_dataset_count)
      settotalSprint(res?.data?.data?.data?.model.sprint_overview)
      if((res?.data?.data?.data?.model.pure_automation_graph).length > 0)
      {
        let info = (res?.data?.data?.data?.model.automation_graph).replace(/(&#034\;)/g,"\"");
        let jinfo = JSON.parse(info);
        let data = jinfo;
        const automationArray= data.map(element => element.automation);
        setAutomation(automationArray)
        const defectsArray= data.map(element => element.defects);
        setDefects(defectsArray)
        const coverageArray = data.map(element => element.coverage);
        setCoverage(coverageArray)
        const periodArray = data.map(element => element.period);
        setTestDesingperiod(periodArray)
      }
    });
    
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
      style : {
        'font-size':"20px",
        'font-weight':"bold",
        'font-family':"Roboto"
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
      //data:[2,3,5]
    }, {
      name: 'Web',
      data: webTestcase
      //data: [1,5]
    }, {
      name: 'Android',
      data: androidTestcase
       // data: [1,3,4,5]
    }, {
      name: 'iOS',
      // data: [1,4]
      data:iosTestcase
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
     style : {
       'font-size':"20px",
       'font-weight':"bold",
       'font-family':"Roboto"
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
     //data:[2,3,5]
   }, {
     name: 'Defects',
     data: defects
     //data: [1,5]
   }, 
   {
     name: 'Coverage',
     data: coverage
      // data: [1,3,4,5]
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
        <Box sx={{ display: "flex", flexDirection: "column" ,width : "150px"}}>
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

  const row_data =[
    createData("Total Regression Testcases", (info?.regression_testcases_count) != undefined ? info?.regression_testcases_count : 0),
    createData("Identified Automation Testcases",(info?.automation_testcases_by_sprint) != undefined ? info?.automation_testcases_by_sprint : 0),
    createData("Yet to Automate Testcases",(info?.yet_to_automate_testcases) != undefined ? info?.yet_to_automate_testcases : 0),
    createData("Test Datasets Created by Automated Testcases",(info?.datasets_created_for_automated_testcases) != undefined ? info?.datasets_created_for_automated_testcases : 0),
  ]
  return (
    <div style={{ overflowX : "hidden"}}>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
           spacing={1}
           mb={2}>
            <Typography><b>Filter by Project and Sprint : </b></Typography>
            <Autocomplete
              disablePortal
              id="project_id"
              options={projectsList}
              value={selectedProject}
              sx={{ width: "250px" }}
              getOptionLabel={(option) => option.project_name}
              onChange={(e, value) => {
                setSelectedProject(value);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Projects" size="small" />
              )}
            />
            <FormControl sx={{width :"150px" }}>
              <InputLabel id="demo-simple-select-label">Sprint</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sprintName}
                label="Sprint Name"
                onChange={(e) => { setSprintName(e.target.value)}}>
                <MenuItem value={"All"}>All</MenuItem>
                <MenuItem value={"Sprint 1"}>Sprint 1</MenuItem>
                <MenuItem value={"Sprint 2"}>Sprint 2</MenuItem>
                <MenuItem value={"Sprint 3"}>Sprint 3</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Divider orientation="horizontal" flexItem sx={{marginBottom : "10px"}}/>
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
        <Grid container justifyContent= "space-between" alignItems="center" sx={{marginTop:"20px"}}>
          <Grid item md={6} >
          <Card sx={{ maxWidth: 600 }} elevation={0}>
            <CardContent style={{ marginBottom: "20px", maxWidth: 600 }}>
               <HighchartsReact highcharts={Highcharts} options={graphData} /> 
            </CardContent>
            <Stack direction="row" spacing={1} style={{ marginLeft: "20px" }}>
                <Brightness5Icon style={{color :"rgb(124, 181, 236)"}}/>
                <Typography>API</Typography>
                <Language />
                <Typography>Web</Typography>
                <AdbIcon style={{color :"rgb(144, 237, 125)"}}/>
                <Typography>Android</Typography>
                <AppleIcon style={{color :"rgb(247,163,92)"}}/>
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
          </Grid>
          <Grid item md= {6} >
            {((progress != undefined || progress > 0) && sprintName == 'All') && <>
            <Grid>
                 <Typography style={{fontSize : "20px"}}><b>QualityFusion prediction : Success of Testcases in next sprint</b></Typography>
            </Grid>
            <Grid>
                 <Typography style={{position: 'relative', top: '195px', left: '250px',fontSize :"50px",fontWeight : "400"}}><b>{Math.round(progress)}%</b></Typography>
                <CircularProgress variant="determinate" value={69} size={300} sx={{ marginLeft : "130px",color:"#009fee"}} />
            </Grid>
            <Grid>
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
       </Grid>
         </>}
         {(sprintName =='Sprint 1'|| sprintName =='Sprint 2'|| sprintName =='Sprint 3') && <>
         <Card sx={{ maxWidth: 600 }} elevation={0}>
            <CardContent style={{ marginBottom: "20px", maxWidth: 600 }}>
               <HighchartsReact highcharts={Highcharts} options={testDesignGraphData} /> 
            </CardContent>
            <Stack direction="row" spacing={1} style={{ marginLeft: "20px" }}>
              <Brightness5Icon style={{color :"rgb(124, 181, 236)"}}/>
              <Typography>Automation</Typography>
              <Language />
              <Typography>Defects</Typography>
              <AdbIcon style={{color :"rgb(144, 237, 125)"}}/>
              <Typography>Coverage</Typography>
            </Stack>
          </Card>
          <Grid>
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
       </Grid>
          </>}
         { snackbar && <SnackbarNotify
                    open={snackbar}
                    close={setSnackbar}
                    msg="Jira is not configured"
                    severity="error"/>}
    </Grid>
  </Grid>
    </div>
  );
}
