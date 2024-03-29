import CodeQuality from "./CodeQuality";
import UnitTest from "./UnitTest";
import ApiAutomation from "./ApiAutomation";
import WebAutomation from "./WebAutomation";
import Overview from "./Overview";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import useHead from "../../hooks/useHead";
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

export default function BasicTabs() {
  const { setHeader } = useHead();
  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Pipeline Automation Report",
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Overview" {...a11yProps(0)} />
          <Tab label="Code Quality Report" {...a11yProps(1)} />
          <Tab label="UnitTestset Report" {...a11yProps(2)} />
          <Tab label="API Automation Report" {...a11yProps(3)} />
          <Tab label="Web Automation Report" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Overview />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CodeQuality />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <UnitTest />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ApiAutomation />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <WebAutomation />
      </TabPanel>
    </Box>
  );
}
