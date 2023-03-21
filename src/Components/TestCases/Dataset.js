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
import { deleteDataset, getDataset } from "../../Services/TestCaseService";
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
  let [dropdown, setDropdown] = useState([]);

  let location = useLocation()
  let navigate = useNavigate()
  let projectId
  let applicationId
  let testcaseId
  try {
     projectId = location.state.projectId;
     applicationId = location.state.applicationId;
     testcaseId = location.state.testcaseId;
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
              <input
                type="text"
                className="datasetInput"
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
        let opt = [
          {
            id: "custom_code",
            val: "Custom Code",
          },
          {
            id: "displayed",
            val: "Displayed",
          },
          {
            id: "element_wait",
            val: "Element Wait",
          },
          {
            id: "scrollup",
            val: "Scroll Up",
          },
          {
            id: "scrolldown",
            val: "Scroll Down",
          },
          {
            id: "is_random",
            val: "Random",
          },
          {
            id: "is_enter",
            val: "Random",
          },
        ];
        let alllist = [
          "custom_code",
          "displayed",
          "element_wait",
          "scrollup",
          "scrolldown",
          "is_random",
          "is_enter",
        ];
        return (
          <div>
            <MuiltiSelect
              sx={{
                "& .MuiOutlinedInput-notchedOutline css-1d3z3hw-MuiOutlinedInput-notchedOutline":
                  {
                    border: "none",
                  },
              }}
              preselect={opt.filter((e) => {
                if (param.row.dataset_values[e.id]) {
                  return e;
                }
              })}
              options={opt}
              value="val"
              id="id"
              stateList={(list) => {
                let templist = list.map((obj) => obj["id"]);
                alllist.forEach((l) => {
                  if (templist.includes(l)) {
                    updateDataset(param.row.element_id, l, true);
                  } else {
                    updateDataset(param.row.element_id, l, false);
                  }
                });
              }}
            ></MuiltiSelect>
          </div>
        );
      },
      flex: 2,
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
                    param.row.dataset_id
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
              <IconButton
              onClick={e=>{
                console.log(param.row.dataset_id)
                deleteDataset(param.row.dataset_id)
              }}
              >
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
    getDataset(setDatasets,projectId , applicationId, testcaseId);
    getData_for_createDataset(setData, testcaseId);
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
