import { Typography } from "@mui/material";
import { Divider, Grid, List, ListItem, ListItemButton } from "@mui/material";
import Testcase from "./Testcase";
import Testset from "./Testset";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import useHead from "../../hooks/useHead";
import axios from "../../api/axios";
import MuiListItemText from "@mui/material/ListItemText";
import MuiListItemIcon from "@mui/material/ListItemIcon";
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ProjectnApplicationSelector from "../ProjectnApplicationSelector";
import ExecutionDetails from "./ExecutionDetails";
import ExecuteTestSetDetails from "./ExecuteTestSetDetails";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Execution() {
  const { setHeader } = useHead();
  const [testcases, setTestcases] = useState([]);
  const [testsets, setTestsets] = useState([]);
const [tabVAaluE , setTabValue] = useState();
  const [selectedItem, setSelectedItem] = useState([]);
  const [selectedTestSetId,setSelectedTestSetId] = useState([]);

  const [selectedProject, setSelectedProject] = useState({
    project_name: "Project",
  });
  const [selectedApplication, setSelectedApplication] = useState({});
  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Execution",
      };
    });
  }, []);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(value)
  };

  useEffect(() => {
    console.log(selectedProject);
  }, [selectedProject]);

  useEffect(() => {
    console.log(value)
    value === 0 && axios
        .get(
          `/qfservice/webtestcase/getWebTestcasesInfoByApplicationId?application_id=${selectedApplication?.module_id}&project_id=${selectedProject?.project_id}`
        )
        .then((resp) => {
        
          const testcases = resp?.data?.info ? resp?.data?.info : [];
          console.log(testcases)
          setTestcases(testcases);
        });

    value === 1 &&  axios
    .get(
      `qfservice/webtestset/getWebTestsetInfoByProjectIdByApplicationId?project_id=${selectedProject?.project_id}&module_id=${selectedApplication?.module_id}`
    )
    .then((resp) => {
      console.log(resp.data.info);
      const testsets = resp?.data?.info ? resp?.data?.info : [];
      setTestcases(testsets);
    });
  }, [value]);
  const itemRender = (rawList) => {
    const navigationList = rawList?.map((apiItem, index) => {
      return (
        <ListItem
          sx={{
            display: "block",
            fontSize: "x-small",
          }}
          key={apiItem.name}
          divider
          selected={value === 0 ? selectedItem?.testcase_id === apiItem?.testcase_id : selectedItem?.testset_id === apiItem?.testset_id}
        >
          <ListItemButton onClick={() => {value === 0 ? setSelectedItem(apiItem?.testcase_id) : setSelectedTestSetId(apiItem?.testset_id)}}>
            <Typography >
           <b style={{fontSize:"15px"}}>{value === 0 ? apiItem.name : apiItem.testset_name}</b><br/>
           {value === 0 ? apiItem.description : apiItem.testset_desc}
          </Typography>
           
          </ListItemButton>
        </ListItem>
      );
    });
    return navigationList;
  };
  return (
    <Box sx={{ width: "100%" }}>
      {/* <ProjectsDropdown setSelectedProject={setSelectedProject} /> */}
      <ProjectnApplicationSelector
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
        selectedApplication={selectedApplication}
        setSelectedApplication={setSelectedApplication}
        isTestset={value === 1}
      />
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Testcase" {...a11yProps(0)} />
          <Tab label="Testset" {...a11yProps(1)} />
          
        </Tabs>
      </Box>
      <Grid container justifyContent="space-between">
        {/* <Testcase
          selectedProject={selectedProject}
          selectedApplication={selectedApplication}
        /> */}
         <Grid item md={3}>
      <TabPanel value={value} index={0}>

      <List>{itemRender(testcases)}</List>
      </TabPanel>

      <TabPanel value={value} index={1}>
          
      <List>{itemRender(testcases)}</List>
      </TabPanel>
    </Grid>
      
   
    <Divider orientation="vertical" flexItem />
   
    <Grid item md={8}>
      {/* <ReportDetails selectedItemData={selectedItem} /> */}
     {/* {value === 0 && <ExecutionDetails selectedItem={selectedItem}></ExecutionDetails> }
      {value === 1 && <ExecuteTestSetDetails selectedItem = {selectedTestSetId}></ExecuteTestSetDetails>} */}
    </Grid>
  </Grid>
    
    </Box>
  );
}
