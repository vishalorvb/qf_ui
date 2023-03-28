import { Typography } from "@mui/material";
import Pipeline from "../Components/Execution/Pipeline";
import Testcase from "../Components/Execution/Testcase";
import Testset from "../Components/Execution/Testset";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import useHead from "../hooks/useHead";
import ProjectsDropdown from "../Components/ProjectsDropdown";
import ProjectnApplicationSelector from "../Components/ProjectnApplicationSelector";
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
  };

  useEffect(() => {
    console.log(selectedProject);
  }, [selectedProject]);

  return (
    <Box sx={{ width: "100%" }}>
      {/* <ProjectsDropdown setSelectedProject={setSelectedProject} /> */}
      <ProjectnApplicationSelector
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
        selectedApplication={selectedApplication}
        setSelectedApplication={setSelectedApplication}
      />
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Testcase" {...a11yProps(0)} />
          <Tab label="Testset" {...a11yProps(1)} />
          <Tab label="Pipeline" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Testcase
          selectedProject={selectedProject}
          selectedApplication={selectedApplication}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Testset 
        selectedProject={selectedProject}
        selectedApplication={selectedApplication}
        />
      </TabPanel>
      {/* <TabPanel value={value} index={2}>
        <Pipeline selectedProject={selectedProject} />
      </TabPanel> */}
    </Box>
  );
}
