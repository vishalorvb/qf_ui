import { Autocomplete, Button, Typography } from "@mui/material";
import { Divider, Grid, List, ListItem, ListItemButton } from "@mui/material";
import { useEffect, useState } from "react";
import useHead from "../../hooks/useHead";
import ProjectnApplicationSelector from "../ProjectnApplicationSelector";
import ExecutionDetails from "./ExecutionDetails";
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
import { useNavigate } from "react-router-dom";
import { GetTestCase } from "../../Services/TestCaseService";

export default function TestcaseExecution() {
  const {
    setHeader,
    globalProject,
    setglobalProject,
    globalApplication,
    setglobalApplication,
  } = useHead();
  const [testcases, setTestcases] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [reportFailMsg, setReportFailMsg] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

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
              style={{fontSize: "15px", color : "#009fee"}}
            >
             <b> {apiItem.name}</b>
                {/* <br />
                {apiItem.description} */}
            
            </ListItemButton>
          </ListItem>
        );
      });
    return navigationList;
  };

  useEffect(() => {
    GetTestCase(
      (res) => {
        setTestcases(res);
      },
      globalProject?.project_id,
      globalApplication?.module_id
    );
  }, [globalProject, globalApplication]);

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
            applicationId={globalApplication?.module_id}
          ></ExecutionDetails>
        </Grid>
      </Grid>
      <SnackbarNotify
        open={reportFailMsg}
        close={setReportFailMsg}
        msg="No Testcases are found for this Application."
        severity="error"
      />
    </>
  );
}
