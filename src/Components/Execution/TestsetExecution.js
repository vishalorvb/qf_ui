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
import { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";

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
  const { setHeader, globalProject, setglobalProject, globalApplication, setglobalApplication } = useHead();
  const [testcases, setTestcases] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  // const [globalProject, setglobalProject] = useState({
  //   project_name: "Project",
  // });
  // const [globalApplication, setglobalApplication] = useState({});
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
        `/qfservice/webtestset/getWebTestsetInfoByProjectIdByApplicationId?project_id=${globalProject?.project_id}&module_id=${globalApplication?.module_id}`
      )
      .then((resp) => {
        const testcases = resp?.data?.info ? resp?.data?.info : [];
        setTestcases(testcases);
        setSelectedItem(testcases[0]?.testset_id)
      });
  }, [globalProject, globalApplication]);

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
              <b style={{ fontSize: "15px" , color : "#009fee" ,fontWeight:"400"}}>{apiItem.testset_name}</b>
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

  // useEffect(() => {
  //   if (globalApplication?.module_type == 19) {
  //     navigate("/TestsetExecution/LinkProjectExecution", {
  //       state: { projectId: globalProject?.project_id, applicationId: globalApplication?.module_id },
  //     })

  //   }


  // }, [globalApplication])


  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item md={2.8}>
          <> {globalApplication?.module_type != 19 &&
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />}
          </>
        </Grid>
        <Grid>
          <ProjectnApplicationSelector
            globalProject={globalProject}
            setglobalProject={setglobalProject}
            globalApplication={globalApplication}
            setglobalApplication={setglobalApplication}
          />
        </Grid>
      </Grid>

      {globalApplication?.module_type != 19 ?
        <Grid container justifyContent="space-between">
          <Grid item md={2.8} justifyContent="flex-start">
            <List
              sx={{
                overflowY: "aurto",
                height: "70vh"
              }}
            >
              {(testcases.length) > 0 ? itemRender(testcases) : <div style={{ textAlign: "center" }}>
                <Typography>No Testsets Found</Typography><br />
                <Button
                  variant="contained"
                  onClick={() => { navigate("/Testset/Create") }}
                >Create Testset</Button></div>}
            </List>
          </Grid>

          <Divider orientation="vertical" flexItem />

          <Grid item md={9} mt={1}>
            <ExecuteTestSetDetails
              projectId={globalProject?.project_id}
              applicationType={globalApplication?.module_type}
              applicationId={globalApplication?.module_id}
              frameworkType={globalProject?.automation_framework_type}
              testsetId={selectedItem}
            ></ExecuteTestSetDetails>
          </Grid>
        </Grid> :
          <LinkProjectExecution projectId={globalProject?.project_id} applicationId={globalApplication?.module_id} /> }
    </>
  );
}
