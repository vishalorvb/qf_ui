import { Box, Button, Grid, Typography } from "@mui/material";
import WorkflowNav from "./WorkflowNav";
import SubnavBar from "./SubnavBar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseUrl } from '../../../../Environment';
import axios from "axios";

export default function Workflow() {
  const navigate = useNavigate();

  const [workflowModules,setWorkFlowModule] = useState([
    {
        "is_api_module": null,
        "parent_module_id": 0,
        "module_type": 1,
        "sub_module_type": 0,
        "module_desc": "FleetStream ",
        "base_url": "http://veda-dev.internal.nio.io",
        "is_deleted": false,
        "module_id": 79,
        "project_id": 80,
        "bundle_id": null,
        "module_name": "FleetStream",
        "id": 4,
        "apk_name": null,
        "child": [
            {
                "is_api_module": null,
                "module_type": 1,
                "project_id": 80,
                "sub_module_type": 0,
                "is_deleted": false,
                "module_desc": "RareEvents API",
                "base_url": "http://veda-dev.internal.nio.io",
                "module_id": 88,
                "parent_module_id": 79,
                "id": 10,
                "bundle_id": null,
                "module_name": "RareEvents",
                "apk_name": null
            },
            {
                "is_api_module": null,
                "module_type": 1,
                "project_id": 80,
                "sub_module_type": 0,
                "is_deleted": false,
                "base_url": "http://veda-dev.internal.nio.io",
                "module_id": 91,
                "parent_module_id": 79,
                "module_name": "ScheduledTrip",
                "module_desc": "Sub Module of Fleet Stream",
                "bundle_id": null,
                "id": 12,
                "apk_name": null
            },
            {
                "module_desc": "Fleet Stream Sub Module",
                "is_api_module": null,
                "module_id": 80,
                "module_type": 1,
                "project_id": 80,
                "sub_module_type": 0,
                "is_deleted": false,
                "base_url": "http://veda-dev.internal.nio.io",
                "module_name": "VehicleHardPoint",
                "parent_module_id": 79,
                "bundle_id": null,
                "apk_name": null,
                "id": 5
            }
        ]
    },
    {
        "is_api_module": null,
        "parent_module_id": 0,
        "sub_module_type": 0,
        "module_type": 2,
        "module_desc": "Groups verification",
        "base_url": "http://veda-portal-dev.internal.nio.io:31080/",
        "is_deleted": false,
        "module_id": 108,
        "project_id": 80,
        "bundle_id": null,
        "module_name": "Groups",
        "id": 21,
        "apk_name": null,
        "child": []
    },
    {
        "is_api_module": null,
        "parent_module_id": 0,
        "module_desc": "Laser Tag URL\nhttp://veda-dev.internal.nio.io:",
        "module_type": 1,
        "sub_module_type": 0,
        "base_url": "http://veda-dev.internal.nio.io:",
        "is_deleted": false,
        "module_id": 77,
        "project_id": 80,
        "bundle_id": null,
        "module_name": "Laser Tag",
        "id": 3,
        "apk_name": null,
        "child": [
            {
                "module_name": "Event",
                "is_api_module": null,
                "module_type": 1,
                "project_id": 80,
                "sub_module_type": 0,
                "is_deleted": false,
                "module_desc": "Event API",
                "base_url": "http://veda-dev.internal.nio.io:",
                "parent_module_id": 77,
                "module_id": 92,
                "id": 13,
                "bundle_id": null,
                "apk_name": null
            },
            {
                "is_api_module": null,
                "module_type": 1,
                "project_id": 80,
                "sub_module_type": 0,
                "is_deleted": false,
                "base_url": "http://veda-dev.internal.nio.io:",
                "module_id": 90,
                "parent_module_id": 77,
                "module_name": "Geo",
                "id": 11,
                "module_desc": "Geo API",
                "bundle_id": null,
                "apk_name": null
            },
            {
                "is_api_module": null,
                "module_id": 87,
                "module_name": "Sensor",
                "module_type": 1,
                "project_id": 80,
                "sub_module_type": 0,
                "is_deleted": false,
                "base_url": "http://veda-dev.internal.nio.io",
                "parent_module_id": 77,
                "module_desc": "Sub Module of Laser Tag",
                "id": 8,
                "bundle_id": null,
                "apk_name": null
            },
            {
                "is_api_module": null,
                "module_type": 1,
                "module_id": 86,
                "project_id": 80,
                "sub_module_type": 0,
                "is_deleted": false,
                "base_url": "http://veda-dev.internal.nio.io",
                "parent_module_id": 77,
                "module_desc": "Sensormaster API",
                "module_name": "Sensormaster",
                "bundle_id": null,
                "id": 7,
                "apk_name": null
            },
            {
                "is_api_module": null,
                "module_type": 1,
                "project_id": 80,
                "sub_module_type": 0,
                "is_deleted": false,
                "base_url": "http://veda-dev.internal.nio.io:",
                "parent_module_id": 77,
                "module_id": 89,
                "module_name": "Shapedefinition",
                "id": 9,
                "bundle_id": null,
                "module_desc": "Laser Tag Shapedefinition API",
                "apk_name": null
            },
            {
                "module_name": "Tag",
                "is_api_module": null,
                "module_type": 1,
                "project_id": 80,
                "sub_module_type": 0,
                "is_deleted": false,
                "base_url": "http://veda-dev.internal.nio.io",
                "parent_module_id": 77,
                "id": 16,
                "module_id": 94,
                "module_desc": "Sub module of laser tag",
                "bundle_id": null,
                "apk_name": null
            },
            {
                "is_api_module": null,
                "module_type": 1,
                "project_id": 80,
                "sub_module_type": 0,
                "is_deleted": false,
                "base_url": "http://veda-dev.internal.nio.io",
                "parent_module_id": 77,
                "module_id": 93,
                "module_name": "TagDefintion",
                "id": 15,
                "bundle_id": null,
                "apk_name": null,
                "module_desc": "TagDefintion API"
            },
            {
                "is_api_module": null,
                "module_type": 1,
                "project_id": 80,
                "sub_module_type": 0,
                "module_id": 85,
                "is_deleted": false,
                "base_url": "http://veda-dev.internal.nio.io",
                "parent_module_id": 77,
                "module_desc": "TRIP API",
                "id": 14,
                "bundle_id": null,
                "module_name": "Trip",
                "apk_name": null
            },
            {
                "module_id": 82,
                "is_api_module": null,
                "module_type": 1,
                "project_id": 80,
                "sub_module_type": 0,
                "is_deleted": false,
                "base_url": "http://veda-dev.internal.nio.io",
                "parent_module_id": 77,
                "module_desc": "Vehicle Sub Module of Laser Tag",
                "module_name": "Vehicle",
                "bundle_id": null,
                "id": 6,
                "apk_name": null
            }
        ]
    },
    {
        "is_api_module": null,
        "parent_module_id": 0,
        "sub_module_type": 0,
        "module_type": 2,
        "module_desc": "Search Test Functionality ",
        "base_url": "http://veda-portal-dev.internal.nio.io:31080/",
        "is_deleted": false,
        "module_id": 96,
        "project_id": 80,
        "bundle_id": null,
        "id": 18,
        "module_name": "Laser Tag Search Test",
        "apk_name": null,
        "child": []
    },
    {
        "is_api_module": null,
        "parent_module_id": 0,
        "module_desc": "LaserTag Web verification",
        "sub_module_type": 0,
        "module_type": 2,
        "base_url": "http://veda-portal-dev.internal.nio.io:31080/",
        "is_deleted": false,
        "module_id": 107,
        "project_id": 80,
        "bundle_id": null,
        "module_name": "LaserTag web",
        "id": 20,
        "apk_name": null,
        "child": []
    }
]);

  const getWorkflowModules = () => {

    axios.get(baseUrl+"/ProjectMS/Project/getProjectWorkflows?projectId=80")
    .then((resp)=>{
        setWorkFlowModule(resp.data);
        console.log(resp.data);
    })
  }
 

  const [workFlowModuleDetails, setWorkFlowModuleDetails] = useState({});


  useEffect(() => {
    getWorkflowModules();
  }, [])
  

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      <WorkflowNav
        workflowModules={workflowModules}
        setWorkFlowModuleHead={setWorkFlowModuleDetails}
        navigationHeader={"WorkFlows"}
      />
      <Box
        component="main"
        sx={{
          border: "snow",
          flexGrow: 1,
          overflow: "auto",
          padding: "0px",
          margin: "0px",
        }}
      >
        <Grid container justifyContent='flex-end'>
          <Button
            variant="contained"
            onClick={() => navigate("/CreateWorkFlow")}
          >
            Create Workflow
          </Button>
        </Grid>
        
        <SubnavBar workFlowModuleDetails={workFlowModuleDetails} />
      </Box>
    </Box>
  );
}
