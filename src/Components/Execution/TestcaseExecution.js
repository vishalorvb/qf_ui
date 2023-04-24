import { Button, Typography } from "@mui/material";
import { Divider, Grid, List, ListItem, ListItemButton } from "@mui/material";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import useHead from "../../hooks/useHead";
import axios from "../../api/axios";
import ProjectnApplicationSelector from "../ProjectnApplicationSelector";
import ExecutionDetails from "./ExecutionDetails";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
import { useNavigate } from "react-router-dom";
import { GetTestCase } from "../../Services/TestCaseService";
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

export default function TestcaseExecution() {
  const {
    setHeader,
    globalProject,
    setglobalProject,
    globalApplication,
    setglobalApplication,
  } = useHead();
  const [testcases, setTestcases] = useState([]);
  const [testcasesspare, setTestcasesspare] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [reportFailMsg, setReportFailMsg] = useState(false);

  const [selectedProject, setSelectedProject] = useState({
    project_name: "Project",
  });
  const [selectedApplication, setSelectedApplication] = useState({});

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

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

  useEffect(() => {
    // axios
    //   .get(
    //     `/qfservice/webtestcase/getWebTestcasesInfoByApplicationId?application_id=${globalApplication?.module_id}&project_id=${globalProject?.project_id}`
    //   )
    //   .then((resp) => {
    //     const testcases = resp?.data?.info ? resp?.data?.info : [];
    //     setTestcases(testcases);
    //     setTestcasesspare(testcases);
    //   });
    
    GetTestCase(
      (res) => {
        setTestcases(res);
        setTestcasesspare(res);
      },
      globalProject?.project_id,
      globalApplication?.module_id
    );
  }, [globalProject, globalApplication]);
  console.log(globalApplication)
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

  useEffect(() => {
    if (globalApplication?.module_type == 19) {
      setReportFailMsg(true);
      setTimeout(() => {
        setReportFailMsg(false);
      }, 3000);
    } else {
    }
  }, [globalApplication]);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item md={2.8}>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Grid>
          <Grid item md={5.5}>
            <ProjectnApplicationSelector
              globalProject={globalProject}
              setglobalProject={setglobalProject}
              globalApplication={globalApplication}
              setglobalApplication={setglobalApplication}
              // isTestset={value === 1}
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="space-between">
          <Grid item md={2.8}>
            <List
              sx={{
                overflowY: "auto",
                height: "70vh",
                width: "100%",
              }}
            >
              {testcases.length > 0 ? (
                itemRender(testcases)
              ) : (
                <div style={{ textAlign: "center" }}>
                  <Typography>No Testcases Found</Typography>
                  <br />
                  <Button
                    variant="contained"
                    onClick={() => {
                      navigate("/Testcase/Create");
                    }}
                  >
                    Create Testcase
                  </Button>
                </div>
              )}
            </List>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item md={9}>
            <ExecutionDetails
              selectedItem={selectedItem}
              testcaseId={selectedItem}
              projectId={globalProject?.project_id}
              frameworkType={globalProject?.automation_framework_type}
              applicationType={globalApplication?.module_type}
              applicationId={selectedApplication?.module_id}
            ></ExecutionDetails>
          </Grid>
        </Grid>
      </Box>
      <SnackbarNotify
        open={reportFailMsg}
        close={setReportFailMsg}
        msg="No Testcases are found for this Application."
        severity="error"
      />
    </>
  );
}
