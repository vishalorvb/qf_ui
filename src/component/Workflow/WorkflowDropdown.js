import { Typography, Autocomplete, Button } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { baseUrl } from "../../Environment";
import axios from "axios";

export default function WorkflowDropdown(props) {
  const { project, setDisplayWorkflow, setCollapseProject } = props;
  const selectedWorkflow = useRef();

  const [workflowModules, setWorkFlowModule] = useState([
    {
      is_api_module: null,
      parent_module_id: 0,
      module_type: 1,
      sub_module_type: 0,
      module_desc: "FleetStream ",
      base_url: "http://veda-dev.internal.nio.io",
      is_deleted: false,
      module_id: 79,
      project_id: 80,
      bundle_id: null,
      module_name: "FleetStream",
      id: 4,
      apk_name: null,
      child: [
        {
          is_api_module: null,
          module_type: 1,
          project_id: 80,
          sub_module_type: 0,
          is_deleted: false,
          module_desc: "RareEvents API",
          base_url: "http://veda-dev.internal.nio.io",
          module_id: 88,
          parent_module_id: 79,
          id: 10,
          bundle_id: null,
          module_name: "RareEvents",
          apk_name: null,
        },
        {
          is_api_module: null,
          module_type: 1,
          project_id: 80,
          sub_module_type: 0,
          is_deleted: false,
          base_url: "http://veda-dev.internal.nio.io",
          module_id: 91,
          parent_module_id: 79,
          module_name: "ScheduledTrip",
          module_desc: "Sub Module of Fleet Stream",
          bundle_id: null,
          id: 12,
          apk_name: null,
        },
        {
          module_desc: "Fleet Stream Sub Module",
          is_api_module: null,
          module_id: 80,
          module_type: 1,
          project_id: 80,
          sub_module_type: 0,
          is_deleted: false,
          base_url: "http://veda-dev.internal.nio.io",
          module_name: "VehicleHardPoint",
          parent_module_id: 79,
          bundle_id: null,
          apk_name: null,
          id: 5,
        },
      ],
    },
    {
      is_api_module: null,
      parent_module_id: 0,
      sub_module_type: 0,
      module_type: 2,
      module_desc: "Groups verification",
      base_url: "http://veda-portal-dev.internal.nio.io:31080/",
      is_deleted: false,
      module_id: 108,
      project_id: 80,
      bundle_id: null,
      module_name: "Groups",
      id: 21,
      apk_name: null,
      child: [],
    },
    {
      is_api_module: null,
      parent_module_id: 0,
      module_desc: "Laser Tag URL\nhttp://veda-dev.internal.nio.io:",
      module_type: 1,
      sub_module_type: 0,
      base_url: "http://veda-dev.internal.nio.io:",
      is_deleted: false,
      module_id: 77,
      project_id: 80,
      bundle_id: null,
      module_name: "Laser Tag",
      id: 3,
      apk_name: null,
      child: [
        {
          module_name: "Event",
          is_api_module: null,
          module_type: 1,
          project_id: 80,
          sub_module_type: 0,
          is_deleted: false,
          module_desc: "Event API",
          base_url: "http://veda-dev.internal.nio.io:",
          parent_module_id: 77,
          module_id: 92,
          id: 13,
          bundle_id: null,
          apk_name: null,
        },
        {
          is_api_module: null,
          module_type: 1,
          project_id: 80,
          sub_module_type: 0,
          is_deleted: false,
          base_url: "http://veda-dev.internal.nio.io:",
          module_id: 90,
          parent_module_id: 77,
          module_name: "Geo",
          id: 11,
          module_desc: "Geo API",
          bundle_id: null,
          apk_name: null,
        },
        {
          is_api_module: null,
          module_id: 87,
          module_name: "Sensor",
          module_type: 1,
          project_id: 80,
          sub_module_type: 0,
          is_deleted: false,
          base_url: "http://veda-dev.internal.nio.io",
          parent_module_id: 77,
          module_desc: "Sub Module of Laser Tag",
          id: 8,
          bundle_id: null,
          apk_name: null,
        },
        {
          is_api_module: null,
          module_type: 1,
          module_id: 86,
          project_id: 80,
          sub_module_type: 0,
          is_deleted: false,
          base_url: "http://veda-dev.internal.nio.io",
          parent_module_id: 77,
          module_desc: "Sensormaster API",
          module_name: "Sensormaster",
          bundle_id: null,
          id: 7,
          apk_name: null,
        },
        {
          is_api_module: null,
          module_type: 1,
          project_id: 80,
          sub_module_type: 0,
          is_deleted: false,
          base_url: "http://veda-dev.internal.nio.io:",
          parent_module_id: 77,
          module_id: 89,
          module_name: "Shapedefinition",
          id: 9,
          bundle_id: null,
          module_desc: "Laser Tag Shapedefinition API",
          apk_name: null,
        },
        {
          module_name: "Tag",
          is_api_module: null,
          module_type: 1,
          project_id: 80,
          sub_module_type: 0,
          is_deleted: false,
          base_url: "http://veda-dev.internal.nio.io",
          parent_module_id: 77,
          id: 16,
          module_id: 94,
          module_desc: "Sub module of laser tag",
          bundle_id: null,
          apk_name: null,
        },
        {
          is_api_module: null,
          module_type: 1,
          project_id: 80,
          sub_module_type: 0,
          is_deleted: false,
          base_url: "http://veda-dev.internal.nio.io",
          parent_module_id: 77,
          module_id: 93,
          module_name: "TagDefintion",
          id: 15,
          bundle_id: null,
          apk_name: null,
          module_desc: "TagDefintion API",
        },
        {
          is_api_module: null,
          module_type: 1,
          project_id: 80,
          sub_module_type: 0,
          module_id: 85,
          is_deleted: false,
          base_url: "http://veda-dev.internal.nio.io",
          parent_module_id: 77,
          module_desc: "TRIP API",
          id: 14,
          bundle_id: null,
          module_name: "Trip",
          apk_name: null,
        },
        {
          module_id: 82,
          is_api_module: null,
          module_type: 1,
          project_id: 80,
          sub_module_type: 0,
          is_deleted: false,
          base_url: "http://veda-dev.internal.nio.io",
          parent_module_id: 77,
          module_desc: "Vehicle Sub Module of Laser Tag",
          module_name: "Vehicle",
          bundle_id: null,
          id: 6,
          apk_name: null,
        },
      ],
    },
    {
      is_api_module: null,
      parent_module_id: 0,
      sub_module_type: 0,
      module_type: 2,
      module_desc: "Search Test Functionality ",
      base_url: "http://veda-portal-dev.internal.nio.io:31080/",
      is_deleted: false,
      module_id: 96,
      project_id: 80,
      bundle_id: null,
      id: 18,
      module_name: "Laser Tag Search Test",
      apk_name: null,
      child: [],
    },
    {
      is_api_module: null,
      parent_module_id: 0,
      module_desc: "LaserTag Web verification",
      sub_module_type: 0,
      module_type: 2,
      base_url: "http://veda-portal-dev.internal.nio.io:31080/",
      is_deleted: false,
      module_id: 107,
      project_id: 80,
      bundle_id: null,
      module_name: "LaserTag web",
      id: 20,
      apk_name: null,
      child: [],
    },
  ]);

  const getWorkflowModules = () => {
    axios
      .get(baseUrl + `/ProjectsMS/Project/getProjectWorkflows?projectId=${80}`)
      .then((resp) => {
        setWorkFlowModule(resp.data);
      });
  };

  const handleViewDetails = () => {
    setDisplayWorkflow((ps) => {
      return ps.module_id === selectedWorkflow.current?.module_id
        ? 0
        : selectedWorkflow.current;
    });

    selectedWorkflow.current !== undefined && setCollapseProject(false);
  };

  useEffect(() => {
    getWorkflowModules();
  }, []);

  return (
    <div className="workflowDetails">
      <Typography variant="h5" gutterBottom>
        Workflow-{project.project_name}
      </Typography>
      <div className="row">
        <div className="col-4">
          <Typography variant="p" gutterBottom>
            Select Workflow
          </Typography>
          <Autocomplete
            size="small"
            options={workflowModules}
            onChange={(e, value) => {
              selectedWorkflow.current = value;
            }}
            getOptionLabel={(option) => option.module_name}
            noOptionsText={"Workflow not found"}
            renderInput={(params) => (
              <div ref={params.InputProps.ref}>
                <input
                  type="text"
                  name="workflowAutocomplete"
                  {...params.inputProps}
                />
              </div>
            )}
          />
        </div>
      </div>
      <div className="btnGroup">
        <Button variant="contained" onClick={handleViewDetails}>
          {" "}
          View Details{" "}
        </Button>
      </div>
    </div>
  );
}
