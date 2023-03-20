import React, { useEffect, useState } from 'react'
import Table from "../../CustomComponent/Table";
import CreateDataSetPopUp from './CreateDataSetPopUp';
import { Button, Chip, Grid, IconButton, Tooltip } from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { getDataset } from '../../Services/TestCaseService';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import PersistentDrawerRight from './PersistentDrawerRight';
import { getData_for_createDataset } from '../../Services/TestCaseService';
import { updateDataset } from './DatasetHelper';
import { clearDatasetinfo } from './DatasetHelper';
import { datasetinfo } from './DatasetHelper';
import MuiltiSelect from '../../CustomComponent/MuiltiSelect';



export let DatasetRequest

function Dataset() {

  let [createpopup, setCreatepopup] = useState(false)
  let [datasets, setDatasets] = useState([])
  let [drawer, setDrawer] = useState(false)
  let [screens, setScreens] = useState([])
  let [selectedScreen, setSelectedScreen] = useState([])
  let [screeninfo, setScreeninfo] = useState(false)
  let [data, setData] = useState()
  let [selectedScreenIds, setSelectedScreenIds] = useState([])





  let elementcol = [
    {
      field: "fieldname",
      headerName: "Filed Name",
      renderCell: (param) => {
        return (
          <div>
            <h5>{param.row.web_page_elements.name}</h5>
          </div>
        )
      },
      flex: 2,
      sortable: false,
      align: "left",
    },
    {
      field: "tagname",
      headerName: "Tag Name",
      renderCell: (param) => {
        return (
          <div>
            <h5>{param.row.web_page_elements.input_type}</h5>
          </div>
        )
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
          <div >
            {param.row.web_page_elements.input_type == "InputText" && <input type="text"
              onChange={e => {
                updateDataset(param.row.element_id, "input_value", e.target.value)
              }}
            />}
            {param.row.web_page_elements.input_type == "Link" && <input type="checkbox"
              onChange={e => {
                updateDataset(param.row.element_id, "is_click", e.target.checked)
              }}
            />}
            {param.row.web_page_elements.input_type == "Button" && <input type="checkbox"
              onChange={e => {
                updateDataset(param.row.element_id, "is_click", e.target.checked)
              }}
            />}
          </div>
        )
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
            <select multiple>
              <option value="1">Validate</option>
              <option value="1">Custom Code</option>
              <option value="1">Displayed</option>
              <option value="1">Element Wait</option>
              <option value="1">Scroll Up</option>
              <option value="1">Scroll Down</option>
              <option value="1">Random</option>
              <option value="1">Enter</option>
            </select>
          </div>
        )
      },
      flex: 3,
      sortable: false,
      align: "left",
    },

  ]
  let column = [
    {
      field: " ",
      headerName: "Select",
      renderCell: (param) => {
        return (
          <div>
            <input type="radio" name="radio" />
          </div>
        )
      },
      flex: 1,
      sortable: false,
      align: "left",
    },
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
          )
        }
        else {
          return (
            <div>

              <h4>DB DataSet</h4>

            </div>
          )
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
                onClick={e => {
                  getData_for_createDataset(setData,param.row.testcase_id,param.row.module_id)
                  setDrawer(!drawer)
                  datasetinfo.name = param.row.name
                  datasetinfo.description = param.row.description
                  datasetinfo.dataset_id = param.row.dataset_id
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
    }
  ]

  useEffect(() => {
    getDataset(setDatasets, 467, 768, 618)
    getData_for_createDataset(setData, 618)
  }, [])

  useEffect(() => {
    DatasetRequest = [data]
    try {
      setScreens(data.screens_in_testcase)
    } catch (error) {

    }
  }, [data])

  useEffect(() => {
    try {
      let x = screens.map(s => {
        return s.screeninfo
      })
      setScreeninfo(x)
    } catch (error) {

    }
  }, [screens])


  useEffect(() => {
    let temp = screens.filter(s => {
      if (selectedScreenIds.includes(s.screen_id)) {
        return s
      }
    })
    setSelectedScreen([...temp])
  }, [selectedScreenIds])

  useEffect(() => {
  }, [selectedScreen])

  useEffect(() => {
    return () => {
      clearDatasetinfo()
    };
  }, [])

  return (
    <div>
      {/* <MuiltiSelect></MuiltiSelect> */}
      <div>
        <Grid container columnSpacing={2}>
          <Grid item xs={2} md={2}>
            <Button variant="outlined"
              onClick={e => {
                setDrawer(!drawer)
              }}
            >
              {drawer ? "Cancel" : "Add DataSet"}
            </Button>
          </Grid>
          <Grid item xs={2} md={2}>
            {drawer && <Button
              variant="outlined"
              onClick={e => setCreatepopup(true)}
            >
              Save
            </Button>}
          </Grid>
          <Grid item xs={2} md={2}>
            {drawer &&
              <PersistentDrawerRight
                screen={screeninfo}
                screenId={selectedScreenIds}
                setScreenId={setSelectedScreenIds}
              ></PersistentDrawerRight>
            }
          </Grid>
        </Grid>
      </div>
      {drawer == false && <div>
        <Table
          rows={datasets}
          columns={column}
          hidefooter={true}
          getRowId={(row) => row.dataset_id}
        ></Table>
      </div>}
      {createpopup && <div> <CreateDataSetPopUp
        close={setCreatepopup}
      ></CreateDataSetPopUp> </div >}

      {selectedScreen != undefined && drawer && <div>
        {selectedScreen.map(s => {
          return (
            <div>
              <h5>{s.screeninfo.name}</h5>
              <Table
                hideSearch={true}
                rows={s.screen_elements[0]}
                columns={elementcol}
                hidefooter={true}
                getRowId={(row) => row.element_id}
              ></Table>
            </div>
          )
        })}
      </div>}
    </div>
  )
}

export default Dataset
