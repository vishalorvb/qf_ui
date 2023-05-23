import React, { useEffect, useState } from "react";
import Table from "../../CustomComponent/Table";
import CreateDataSetPopUp from "./CreateDataSetPopUp";
import {
  Button,
  Grid,
  MenuItem,
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
import SnackbarNotify from "../../CustomComponent/SnackbarNotify";
import AddIcon from '@mui/icons-material/Add';
import TableActions from "../../CustomComponent/TableActions";
import useHead from "../../hooks/useHead";


export let DatasetRequest;
let snabarMessage = " "

function Dataset() {
  let [datasets, setDatasets] = useState([]);
  let [drawer, setDrawer] = useState(false);
  let [screens, setScreens] = useState([]);
  let [selectedScreen, setSelectedScreen] = useState([]);
  let [screeninfo, setScreeninfo] = useState(false);
  let [data, setData] = useState();
  let [selectedScreenIds, setSelectedScreenIds] = useState([]);
  let [deletepopup, setDeletepopup] = useState(false);
  let [deletedatasetId, setDeletedatasetId] = useState();
  let [snackbar, setSnackbar] = useState(false);
  // let deletedatasetId = null

  let location = useLocation();
  let navigate = useNavigate();
  let projectId;
  let applicationId;
  let testcaseId;
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

  let click = ["input", "select"]



  let elementcol = [
    {
      field: "fieldname",
      headerName: "Filed Name",
      renderCell: (param) => {
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
        return <p>{param.row.web_page_elements.tag_name}</p>;
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
          <div style={{ width: "100%" }}>
            {param.row.web_page_elements.tag_name == "input" && (
              <input
                type="text"
                className="datasetInput"
                placeholder="Enter Value"
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
            {!click.includes(param.row.web_page_elements.tag_name) && (
              <input
                type="checkbox"
                defaultChecked={param.row.dataset_values.is_click}
                onChange={(e) => {
                  updateDataset(
                    param.row.element_id,
                    "is_click",
                    e.target.checked
                  );
                }}
              />
            )}
            {/* {param.row.web_page_elements.tag_name == "Button" && (
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
            )} */}
            {param.row.web_page_elements.tag_name == "select" && (
              <select
                onChange={(e) => {
                  updateDataset(
                    param.row.element_id,
                    "input_value",
                    e.target.value
                  );
                }}
                dangerouslySetInnerHTML={{ __html: param?.row?.web_page_elements?.child_text }}
              >
              </select>
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
            val: "Enter",
          },
          {
            id: "is_validate",
            val: "Validate",
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
          "is_validate"
        ];
        let flag = false;
        let preselect = opt.filter((e) => {
          if (param.row.dataset_values[e.id]) {
            return e;
          }
        });
        return (
          <div>
            <MuiltiSelect
              sx={{
                "& .MuiOutlinedInput-notchedOutline css-1d3z3hw-MuiOutlinedInput-notchedOutline":
                {
                  border: "none",
                },
              }}
              preselect={preselect}
              // preselect ={opt}
              options={opt}
              value="val"
              id="id"
              stateList={(list) => {
                let templist = list.map((obj) => obj["id"]);
                if (flag || preselect.length !== templist.length) {
                  flag = true;
                  alllist.forEach((l) => {
                    if (templist.includes(l)) {
                      updateDataset(param.row.element_id, l, true);
                    } else {
                      updateDataset(param.row.element_id, l, false);
                    }
                  });
                }
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
      flex: 6,
      renderCell: param => {

        return (
          <TableActions
            heading={param.row?.description}
          >
            <MenuItem
              onClick={(e) => {
                getData_for_createDataset(
                  setData,
                  param.row.testcase_id,
                  param.row.dataset_id
                );
                setDrawer(!drawer);

              }}
            >
              <ContentCopyOutlinedIcon></ContentCopyOutlinedIcon>
              Copy
            </MenuItem>
            <MenuItem
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
              Edit
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                setDeletedatasetId(param.row.dataset_id);
                setDeletepopup(true);
              }}
            >
              <DeleteOutlined></DeleteOutlined>
              Delete
            </MenuItem>
          </TableActions>
        )
      },
      sortable: false,
      align: "left",
    },
  ];
  function ReloadDatset(val) {
    getDataset(setDatasets, projectId, applicationId, testcaseId);
    setDrawer(!drawer);
    if (val == "Create") {
      snabarMessage = "Dataset Created Successfully"
    }
    if (val == "Update") {
      snabarMessage = "Dataset Updated Successfully"
    }
    setSnackbar(true);
  }
  useEffect(() => {
    getDataset(setDatasets, projectId, applicationId, testcaseId);
    getData_for_createDataset(setData, testcaseId);
  }, []);

  useEffect(() => {
    if (data != undefined && data.screens_in_testcase.length == 0) {
      // navigate("/testcase")
    }
    DatasetRequest = [data];
    try {
      setScreens(data.screens_in_testcase);
    } catch (error) { console.log(error) }
  }, [data]);

  useEffect(() => {
    try {
      let x = screens.map((s) => {
        return s.screeninfo;
      });
      setScreeninfo(x);
    } catch (error) { console.log(error) }
  }, [screens]);

  useEffect(() => {
    try {
      let temp = screens.filter((s) => {
        if (selectedScreenIds.includes(s.screen_id)) {
          return s;
        }
      });
      setSelectedScreen([...temp]);
    } catch (error) {
      console.log(error)
    }

  }, [selectedScreenIds]);

  useEffect(() => { }, [selectedScreen]);

  useEffect(() => {
    return () => {
      clearDatasetinfo();
    };
  }, []);

  const { setHeader } = useHead();
  useEffect(() => {

    setHeader((ps) => {
      return {
        ...ps,
        name: location?.state?.testcaseName,
      };
    });

  }, [location.state.testcaseName]);


  return (
    <div>
      {drawer && <div>

        <CreateDataSetPopUp
          ReloadDataset={ReloadDatset}
          drawer={drawer}
          setDrawer={setDrawer}
        />
        <Grid container columnSpacing={2}>
          <Grid item md={3}>
            {screeninfo.length > 0 && (
              <PersistentDrawerRight
                testcaseId={location.state.testcaseId}
                screen={screeninfo}
                screenId={selectedScreenIds}
                setScreenId={setSelectedScreenIds}
              ></PersistentDrawerRight>
            )}
          </Grid>
          <Grid item md={9}>
            {selectedScreen != undefined &&
              selectedScreen.map((s) => {
                return (
                  <>
                    <Typography mt={2} mb={-2} sx={{ backgroundColor: "#e8edf2", padding: "10px", color: "002980" }}>
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
          </Grid>
        </Grid>
      </div>}
      {drawer == false && <div>
        <div className="apptable">
          <div className="intable">
            <div style={{ marginTop: "12px", float: "right" }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                size="small"
                onClick={(e) => {
                  setDrawer(!drawer);
                }}
              >
                Add Datasets
              </Button>
            </div>
          </div>
          <Table
            rows={datasets}
            columns={column}
            hidefooter={true}
            getRowId={(row) => row.dataset_id}
          ></Table>
        </div>
      </div>}
      <ConfirmPop
        open={deletepopup}
        handleClose={() => setDeletepopup(false)}
        heading="Delete Data Set"
        message="Are you sure you want to delete?"
        onConfirm={() => {
          deleteDataset(deletedatasetId).then((res) => {
            if (res) {
              setDeletepopup(false);
              setDeletedatasetId(null);
              getDataset(setDatasets, projectId, applicationId, testcaseId);
              snabarMessage = "Data Set deleted successfully"
              setSnackbar(true)
            }
          });
        }}
      ></ConfirmPop>
      <SnackbarNotify
        open={snackbar}
        close={setSnackbar}
        msg={snabarMessage}
        severity="success"
      ></SnackbarNotify>
    </div>
  );
}

export default Dataset;
