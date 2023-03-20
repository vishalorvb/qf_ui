import React, { useEffect, useState } from "react";
import Table from "../../CustomComponent/Table";
import CreateDataSetPopUp from "./CreateDataSetPopUp";
import {
  Button,
  Chip,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { getDataset } from "../../Services/TestCaseService";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import PersistentDrawerRight from "./PersistentDrawerRight";
import { getData_for_createDataset } from "../../Services/TestCaseService";
import { updateDataset } from "./DatasetHelper";
import { clearDatasetinfo } from "./DatasetHelper";
import { datasetinfo } from "./DatasetHelper";
import MuiltiSelect from "../../CustomComponent/MuiltiSelect";
import { useLocation, useNavigate } from "react-router";
import ConfirmPop from "../../CustomComponent/ConfirmPop";
import { Stack } from "@mui/system";

export let DatasetRequest;

function Dataset() {
  let [createpopup, setCreatepopup] = useState(false);
  let [datasets, setDatasets] = useState([]);
  let [drawer, setDrawer] = useState(false);
  let [screens, setScreens] = useState([]);
  let [selectedScreen, setSelectedScreen] = useState([]);
  let [screeninfo, setScreeninfo] = useState(false);
  let [data, setData] = useState();
  let [selectedScreenIds, setSelectedScreenIds] = useState([]);

  let location = useLocation();
  let navigate = useNavigate();
  try {
    let projectId = location.state.projectId;
    let applicationId = location.state.applicationId;
    let testcaseId = location.state.testcaseId;
  } catch (error) {
    console.warn(
      "Fist from testcase, This page need projectId, applicationId and testcaseId"
    );
    navigate("/testcase");
  }

  let elementcol = [
    {
      field: "fieldname",
      headerName: "Filed Name",
      renderCell: (param) => {
        console.log(param.row);
        return <p>{param.row.web_page_elements.name}</p>;
      },
      flex: 2,
      sortable: false,
      align: "left",
    },
    {
      field: "tagname",
      headerName: "Tag Name",
      renderCell: (param) => {
        return <p>{param.row.web_page_elements.input_type}</p>;
      },
      flex: 2,
      sortable: false,
      align: "left",
    },
    {
      field: "Datasets",
      headerName: "DataSets",
      renderCell: (param) => {
        return (
          <div>
            {param.row.web_page_elements.input_type == "InputText" && (
              <TextField
                type="text"
                size="small"
                defaultValue={param.row.dataset_values.input_value}
                onChange={(e) => {
                  updateDataset(
                    param.row.element_id,
                    "input_value",
                    e.target.value
                  );
                }}
              />
            )}
            {param.row.web_page_elements.input_type == "Link" && (
              <input
                type="checkbox"
                checked={param.row.dataset_values.is_click}
                onChange={(e) => {
                  updateDataset(
                    param.row.element_id,
                    "is_click",
                    e.target.checked
                  );
                }}
              />
            )}
            {param.row.web_page_elements.input_type == "Button" && (
              <input
                type="checkbox"
                checked={param.row.dataset_values.is_click}
                onChange={(e) => {
                  updateDataset(
                    param.row.element_id,
                    "is_click",
                    e.target.checked
                  );
                }}
              />
            )}
          </div>
        );
      },
      flex: 2,
      sortable: false,
      align: "left",
    },
    {
      field: "elements",
      headerName: "Elements",
      renderCell: (param) => {
        return (
          <div>
            <select
              multiple
              // onChange={e=>console.log(e.target.value)}
            >
              <option onClick={(e) => console.log("clicked")} value="1">
                Validate
              </option>
              <option value="2">Custom Code</option>
              <option value="3">Displayed</option>
              <option value="4">Element Wait</option>
              <option value="5">Scroll Up</option>
              <option value="6">Scroll Down</option>
              <option value="7">Random</option>
              <option value="8">Enter</option>
            </select>
          </div>
        );
      },
      flex: 3,
      sortable: false,
      align: "left",
    },
  ];
  let column = [
    {
      field: "name",
      headerName: "DataSet Name",
      flex: 3,
      sortable: false,
      align: "left",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 3,
      sortable: false,
      align: "left",
    },
    {
      field: "dgn",
      headerName: "DataSet Type",
      renderCell: (param) => {
        if (!param.row.is_db_dataset) {
          return (
            <div>
              <h4>Regular</h4>
            </div>
          );
        } else {
          return (
            <div>
              <h4>DB DataSet</h4>
            </div>
          );
        }
      },
      flex: 3,
      sortable: false,
      align: "left",
    },
    {
      headerName: "Action",
      field: "action",
      renderCell: (param) => {
        return (
          <div>
            <Tooltip title="Copy">
              <IconButton>
                <ContentCopyOutlinedIcon></ContentCopyOutlinedIcon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit">
              <IconButton
                onClick={(e) => {
                  getData_for_createDataset(
                    setData,
                    param.row.testcase_id,
                    param.row.module_id
                  );
                  setDrawer(!drawer);
                  datasetinfo.name = param.row.name;
                  datasetinfo.description = param.row.description;
                  datasetinfo.dataset_id = param.row.dataset_id;
                }}
              >
                <EditOutlinedIcon></EditOutlinedIcon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton>
                <DeleteOutlined></DeleteOutlined>
              </IconButton>
            </Tooltip>
          </div>
        );
      },
      flex: 2,
      headerAlign: "center",
      sortable: false,
      align: "center",
    },
  ];

  useEffect(() => {
    getDataset(setDatasets, 467, 768, 618);
    getData_for_createDataset(setData, 618);
  }, []);

  useEffect(() => {
    DatasetRequest = [data];
    try {
      setScreens(data.screens_in_testcase);
    } catch (error) {}
  }, [data]);

  useEffect(() => {
    try {
      let x = screens.map((s) => {
        return s.screeninfo;
      });
      setScreeninfo(x);
    } catch (error) {}
  }, [screens]);

  useEffect(() => {
    let temp = screens.filter((s) => {
      if (selectedScreenIds.includes(s.screen_id)) {
        return s;
      }
    });
    setSelectedScreen([...temp]);
  }, [selectedScreenIds]);

  useEffect(() => {}, [selectedScreen]);

  useEffect(() => {
    return () => {
      clearDatasetinfo();
    };
  }, []);

  return (
    <div>
      <Stack spacing={1} direction="row">
        <Button
          variant="contained"
          size="small"
          onClick={(e) => {
            setDrawer(!drawer);
          }}
        >
          {drawer ? "Cancel" : "Add DataSet"}
        </Button>
        {drawer && (
          <Button
            variant="contained"
            size="small"
            onClick={(e) => setCreatepopup(true)}
          >
            Save
          </Button>
        )}
        {drawer && (
          <PersistentDrawerRight
            screen={screeninfo}
            screenId={selectedScreenIds}
            setScreenId={setSelectedScreenIds}
          ></PersistentDrawerRight>
        )}
      </Stack>
      {drawer == false && (
        <div>
          <Table
            rows={datasets}
            columns={column}
            hidefooter={true}
            getRowId={(row) => row.dataset_id}
          ></Table>
        </div>
      )}
      {createpopup && (
        <div>
          <CreateDataSetPopUp close={setCreatepopup} />
        </div>
      )}
      {selectedScreen != undefined &&
        drawer &&
        selectedScreen.map((s) => {
          return (
            <>
              <Typography mt={4} mb={-2}>
                {s.screeninfo.name}
              </Typography>
              <Table
                hideSearch={true}
                rows={s.screen_elements[0]}
                columns={elementcol}
                hidefooter={true}
                getRowId={(row) => row.element_id}
              ></Table>
            </>
          );
        })}
    </div>
  );
}

export default Dataset;
