import { Button, TextField, Typography } from "@mui/material";
import { Divider, Grid, List, ListItem, ListItemButton } from "@mui/material";
import { useEffect, useState } from "react";
import useHead from "../../hooks/useHead";
import axios from "../../api/axios";
import ProjectnApplicationSelector from "../ProjectnApplicationSelector";
import ExecuteTestSetDetails from "./ExecuteTestSetDetails";
import LinkProjectExecution from "./LinkProjectExecution";
import { useNavigate } from "react-router-dom";

export default function TestsetExecution() {
  const {
    setHeader,
    globalProject,
    setglobalProject,
    globalApplication,
    setglobalApplication,
  } = useHead();
  const [testcases, setTestcases] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);

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

  useEffect(() => {
    if (globalApplication) {
      axios
        .get(
          `/qfservice/webtestset/getWebTestsetInfoByProjectIdByApplicationId?project_id=${globalProject?.project_id}&module_id=${globalApplication?.module_id}`
        )
        .then((resp) => {
          const testcases = resp?.data?.info ? resp?.data?.info : [];
          setTestcases(testcases);
          setSelectedItem(testcases[0]?.testset_id);
        });
    } else {
      setTestcases([]);
    }
  }, [globalProject, globalApplication]);

  const itemRender = (rawList) => {
    const navigationList = rawList
      .filter(
        (apiItem) =>
          apiItem.testset_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          apiItem.testset_desc.toLowerCase().includes(searchTerm.toLowerCase())
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
            selected={selectedItem === apiItem?.testset_id}
          >
            <ListItemButton
              onClick={() => {
                setSelectedItem(apiItem?.testset_id);
              }}
            >
              <Typography>
                <b
                  style={{
                    fontSize: "15px",
                    color: "#009fee",
                    fontWeight: "400",
                  }}
                >
                  {apiItem.testset_name}
                </b>
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
          <>
            {globalApplication?.module_type != 19 && (
              <TextField
                size="small"
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
                fullWidth
              />
            )}
          </>
        </Grid>
        <Grid item md={5}>
          <ProjectnApplicationSelector
            globalProject={globalProject}
            setglobalProject={setglobalProject}
            globalApplication={globalApplication}
            setglobalApplication={setglobalApplication}
          />
        </Grid>
      </Grid>

      {globalApplication?.module_type != 19 ? (
        <Grid container justifyContent="space-between">
          <Grid item md={2.8} justifyContent="flex-start">
            <List
              sx={{
                overflowY: "auto",
                height: "70vh",
              }}
            >
              {testcases.length > 0 ? (
                itemRender(testcases)
              ) : (
                <div style={{ textAlign: "center" }}>
                  <Typography>No Testsets Found</Typography>
                  <br />
                  <Button
                    variant="contained"
                    onClick={() => {
                      navigate("/Testset/Create");
                    }}
                  >
                    Create Testset
                  </Button>
                </div>
              )}
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
        </Grid>
      ) : (
        <LinkProjectExecution
          projectId={globalProject?.project_id}
          applicationId={globalApplication?.module_id}
        />
      )}
    </>
  );
}
