import { Button, Typography } from "@mui/material";
import { Divider, Grid, List, ListItem, ListItemButton } from "@mui/material";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import useHead from "../../hooks/useHead";
import axios from "../../api/axios";
import ProjectnApplicationSelector from "../ProjectnApplicationSelector";
import ExecuteTestSetDetails from "./ExecuteTestSetDetails";
import LinkProjectExecution from "./LinkProjectExecution";
import { useNavigate } from "react-router-dom";

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

export default function TestsetExecution() {
  const { setHeader } = useHead();
  const [testcases, setTestcases] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
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
    axios
      .get(
        `qfservice/webtestset/getWebTestsetInfoByProjectIdByApplicationId?project_id=${selectedProject?.project_id}&module_id=${selectedApplication?.module_id}`
      )
      .then((resp) => {
        const testcases = resp?.data?.info ? resp?.data?.info : [];
        setTestcases(testcases);
      });
  }, [selectedProject, selectedApplication]);

  const itemRender = (rawList) => {
    const navigationList = rawList.filter(apiItem => apiItem.testset_name.toLowerCase().includes(searchTerm.toLowerCase()) || apiItem.testset_desc.toLowerCase().includes(searchTerm.toLowerCase()))?.map((apiItem, index) => {
      return (
        <ListItem
          sx={{
            display: "block",
            fontSize: "x-small",
          }}
          key={apiItem.name}
          divider
          selected={selectedItem === apiItem?.testset_id}
        >
          <ListItemButton
            onClick={() => {
              setSelectedItem(apiItem?.testset_id);
            }}
          >
            <Typography>
              <b style={{ fontSize: "15px" }}>{apiItem.testset_name}</b>
              <br />
              {apiItem.testset_desc}
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

        name: "Testset Execution",
      };
    });
  }, []);
  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item md={2.8}>
          <> {selectedApplication?.module_type != 19 &&
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />}
          </>
        </Grid>
        <Grid item md={5.5}>
          <ProjectnApplicationSelector
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            selectedApplication={selectedApplication}
            setSelectedApplication={setSelectedApplication}
          />
        </Grid>
      </Grid>
      {selectedApplication?.module_type != 19 ?
        <Grid container justifyContent="space-between">
          <Grid item md={2.8} justifyContent="flex-start">
            <List
              sx={{
                overflowY: "aurto",
                height: "70vh"
              }}
            >
               {(testcases.length) > 0 ? itemRender(testcases) : <div style={{textAlign : "center"}}>
           <Typography>No Testsets Found</Typography><br/>
           <Button
            variant = "contained"
            onClick={()=>{ navigate("/Testset/Create")}}
           >Create Testset</Button></div>} 
            </List>
          </Grid>

          <Divider orientation="vertical" flexItem />

          <Grid item md={9}>
            <ExecuteTestSetDetails
              projectId={selectedProject.project_id}
               applicationType={selectedApplication?.module_type} 
               applicationId={selectedApplication?.module_id}
               frameworkType = {selectedProject.automation_framework_type}
              testsetId={selectedItem}
            ></ExecuteTestSetDetails>
          </Grid>
        </Grid>:<LinkProjectExecution projectId={selectedProject.project_id}  applicationId={selectedApplication?.module_id}/>}
    </>
  );
}
