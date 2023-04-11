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
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ProjectnApplicationSelector from "../ProjectnApplicationSelector";
import ExecutionDetails from "./ExecutionDetails";
import ExecuteTestSetDetails from "./ExecuteTestSetDetails";
import Searchbar from "./Searchbar";
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

export default function TestcaseExecution() {
  const { setHeader } = useHead();
  const [testcases, setTestcases] = useState([]);
  const [testcasesspare, setTestcasesspare] = useState([]);
  const [testsets, setTestsets] = useState([]);
  const [tabVAaluE, setTabValue] = useState();
  const [selectedItem, setSelectedItem] = useState([]);

  const [selectedProject, setSelectedProject] = useState({
    project_name: "Project",
  });
  const [selectedApplication, setSelectedApplication] = useState({});

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

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
    console.log(value);
  };

  useEffect(() => {
    console.log(selectedProject);
  }, [selectedProject]);

  useEffect(() => {
    axios
      .get(
        `/qfservice/webtestcase/getWebTestcasesInfoByApplicationId?application_id=${selectedApplication?.module_id}&project_id=${selectedProject?.project_id}`
      )
      .then((resp) => {
        const testcases = resp?.data?.info ? resp?.data?.info : [];
        console.log(testcases);
        setTestcases(testcases);
        setTestcasesspare(testcases);
      });
  }, [selectedProject, selectedApplication]);
  const itemRender = (rawList) => {
    const navigationList = rawList
      ?.filter(
        (apiItem) =>
          apiItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          apiItem.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      ?.map((apiItem, index) => {
        return (
          <ListItem
            sx={{
              display: "block",
              fontSize: "x-small",
            }}
            key={apiItem.name}
            divider
            selected={selectedItem === apiItem?.testcase_id}
          >
            <ListItemButton
              onClick={() => {
                setSelectedItem(apiItem?.testcase_id);
              }}
            >
              <Typography>
                <b style={{ fontSize: "15px" }}>{apiItem.name}</b>
                <br />
                {apiItem.description}
              </Typography>
            </ListItemButton>
          </ListItem>
        );
      });
    return navigationList;
  };
  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,

        name: "Testcase Execution",
      };
    });
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item md={2.8}>
          {/* <Searchbar/> */}
          <>
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </>
        </Grid>
        <Grid item md={9.2}>
          <ProjectnApplicationSelector
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            selectedApplication={selectedApplication}
            setSelectedApplication={setSelectedApplication}
            // isTestset={value === 1}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="space-between">
        <Grid item md={2.8}>
          <List
            sx={{
              overflowY: "scroll",
              height: "400px",
              width: "100%",
            }}
          >
            {itemRender(testcases)}
            {/* <Searchbar items={testcases != "undefined" ? testcases : 0} /> */}
          </List>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item md={9}>
          <ExecutionDetails
            selectedItem={selectedItem}
            projectId={selectedProject.project_id}
            applicationType={selectedApplication?.workflowType}
            applicationId={selectedApplication?.module_id}
          ></ExecutionDetails>
        </Grid>
      </Grid>
    </Box>
  );
}
