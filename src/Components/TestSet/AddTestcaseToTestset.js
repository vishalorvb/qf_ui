import { Autocomplete, Button, Grid, IconButton, Paper, Tooltip } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import Table from "../../CustomComponent/Table";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import {useLocation} from 'react-router-dom';
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {getTestcasesOfTestset} from "../../Services/TestsetService";
import {getTestcases} from "../../Services/ProjectService";
import DeleteTestset from "./DeleteTestset";
import { getTestcaseDetails } from "../../Services/TestsetService";
import {updateTestset} from "../../Services/TestsetService";

export default function AddTestcaseToTestset() {

  const [testcaseObject, setTestcaseObject] = useState([]);
  const [datasetObject, setDatasetObject] = useState([]);
  const [allTestcases, setAllTestcases] = useState([]);
  const [tbData, setTbData] = useState([]);
  const location = useLocation();
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteObject ,setDeleteObject] = useState([]);
  const [testcaseId, setTestcaseId] = useState();
  const [datasetId, setDatasetId] = useState();
  const [tcObject, setTcObject] = useState([]);

  // console.log(location.state.testset_id);
  var testsetId = location.state.testset_id;

  const columns = [
    // { headerName: "S.No", field: 'sno', valueGetter: (index) => index.api.getRowIndex(index.row.id) + 1, flex: 1, headerAlign: "center", sortable: false, align: 'center' },
    {
      field: 'testcase_name',
      headerName: 'Testcase Name',
      flex: 3,
      headerAlign: "center",
      sortable: false,
      align: 'left'
    },
    {
      field: 'testcase_desc',
      headerName: 'Description',
      flex: 3,
      headerAlign: "center",
      sortable: false,
      align: 'left',
      // renderCell: (params) => {
      //   return (
      //     <div>
      //       {params.row.created_at}
      //     </div>
      //   )
      // }
    },
    // {
    //   field: 'dataset_name_in_testcase',
    //   headerName: 'Dataset ',
    //   flex: 3,
    //   headerAlign: "center",
    //   sortable: false,
    //   align: 'left',
    //   renderCell: (params) => {
    //     // console.log(params.row.datasetsList)
    //       return (
    //         <div>
    //           <Autocomplete
    //             size="small"
    //             options={params.row.datasetsList}
    //             getOptionLabel={(option) => option.dataset_name_in_testcase}
    //             onChange={(e, value) => {
    //               // console.log(value.testcase_id);
    //               // Uid.current = value.id;
    //               // setUserId(value.id);
    //               // setDatasetObject(testcaseObject.datasetsList.dataset_name_in_testcase);
    //               // handleDataset(value.testcase_id)
    //             }}
    //             noOptionsText={"Dataset not found"}
    //             renderInput={(params) => (
    //               <div ref={params.InputProps.ref}>
    //                 <input
    //                   type="text"
    //                   name="dataAutocomplete"
    //                   {...params.inputProps}
    //                   placeholder="Please Select"
    //                 />
    //               </div>
    //             )}
    //           />
    //         </div>
    //       )
    //     }
    // },
    {
      field: "",
      headerName: "Actions",
      flex: 3,
      sortable: false,
      renderCell: (param) => {
        return (
          <><Tooltip title="Delete">
          <IconButton
            onClick={(e) => {
              deleteUserHandler(param.row);
            }}
          >
            <DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>
          </IconButton>
        </Tooltip>
        </>
        );
      },
      headerAlign: "center",
      align: "center",
    }
  ];

  console.log(testcaseObject);

  const deleteUserHandler = (e) => {
    console.log("first")
    console.log(e);
    setOpenDelete(true);
    setDeleteObject(e);
  };

  function handleDataset(testcaseId) { 
    // setRadio(testcaseId) 
    let temp = (allTestcases.filter(ts => {
      if (ts.testcase_id == testcaseId) { 
        return ts.datasetsList 
      }
    }))
    setDatasetObject(temp[0].datasetsList)
  }

  function filter(){
    const test = testcaseObject.map(ts => ts.testcase_id)
    return(allTestcases.filter(ts =>  !test.includes( ts.testcase_id)));
  }

  const submit = (e) => {
    e.preventDefault();
    console.log(testcaseObject[0]);
    console.log(tcObject);
    // var data = {
    //   "module_id" : 1031,
    //   "testset_name" : test,
    //   "testset_desc" : "jhgajd",
    //   "testcases_list" : [{ "testcase_id" : 142, "testcase_order": 0,
    //   "testcase_dataset_id" : 162, "selected_testcase_dataset_ids" : [162]},
    //   { "testcase_id" : 140, "testcase_order": 0,
    //   "testcase_dataset_id" : 160, "selected_testcase_dataset_ids" : [160]}]
    // }

    // testcaseObject.push(tcObject);
  }

  useEffect(() => {
    getTestcasesOfTestset(setTestcaseObject,1031,testsetId);
  }, [])

  useEffect(() => {
    getTestcases(setAllTestcases,1031);
  }, [testcaseObject])
  useEffect(() => {
    // const test = testcaseObject.map(ts => ts.testcase_id)
    // return(allTestcases.filter(ts =>  !test.includes( ts.testcase_id)));
    // console.log(allTestcases.filter(ts =>  !test.includes( ts.testcase_id)));
    filter();
    getTestcaseDetails(setTcObject,1031,testcaseId);
  }, [allTestcases,testcaseId,testcaseObject])
  

  return (
    <div>
      <Paper
        elevation={1}
        sx={{ padding: "2px", marginTop: "10px", marginBottom: "10px" }}
      >
        <Container
          component={"div"}
          maxWidth={false}
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: "10px",
            justifyContent: "flex-start",
          }}
        >
          <Grid
            container
            item
            xs={12}
            sm={6}
            md={4}
            xl={4}
            sx={{ marginBottom: "10px" }}
          >
            <Grid item xs={6} sm={6} md={3.5} xl={4}>
              <label>
                Test Cases <span className="importantfield">*</span>:
              </label>
            </Grid>
            <Grid item xs={6} sm={6} md={8} xl={7}>
              <Autocomplete
                size="small"
                options={
                  // const test = testcaseObject.map(ts => ts.testcase_id)
                  // return(allTestcases.filter(ts =>  test.includes( ts.testcase_id)));
                  filter()
                }
                getOptionLabel={(option) => option.testcase_name}
                onChange={(e, value) => {
                  console.log(value.testcase_id);
                  setTestcaseId(value.testcase_id);
                  // Uid.current = value.id;
                  // setUserId(value.id);
                  // setDatasetObject(testcaseObject.datasetsList.dataset_name_in_testcase);
                  handleDataset(value.testcase_id)
                }}
                noOptionsText={"User not found"}
                renderInput={(params) => (
                  <div ref={params.InputProps.ref}>
                    <input
                      type="text"
                      name="userAutocomplete"
                      {...params.inputProps}
                      placeholder="Please Select"
                    />
                  </div>
                )}
              />
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={6}
            md={4}
            xl={4}
            sx={{ marginBottom: "10px" }}
          >
            <Grid item xs={6} sm={6} md={3.5} xl={4}>
              <label>
                Datasets <span className="importantfield">*</span>:
              </label>
            </Grid>
            <Grid item xs={6} sm={6} md={8} xl={7}>
              <Autocomplete
                size="small"
                options={datasetObject}
                getOptionLabel={(option) => option.dataset_name_in_testcase}
                onChange={(e, value) => {
                  setDatasetId(value.testcase_dataset_id);
                  // Project_Id.current = value.project_id;
                }}
                noOptionsText={"Datasets not found"}
                renderInput={(params) => (
                  <div ref={params.InputProps.ref}>
                    <input
                      type="text"
                      name="DatasetAutocomplete"
                      {...params.inputProps}
                      placeholder="Please Select"
                    />
                  </div>
                )}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            onClick={submit}
            startIcon={<AddOutlinedIcon />}
            sx={{
              marginLeft: "45%",
              marginRight: "auto",
              marginBottom: "10px",
              marginTop: "25px",
            }}
          >
            Add
          </Button>
        </Container>
      </Paper>
      <div className="datatable" style={{ marginTop: "15px" }}>
      {openDelete ? (
          <DeleteTestset
            object={deleteObject}
            openDelete={openDelete}
            setOpenDelete={setOpenDelete}
          />
        ) : (
          ""
        )}
        <Table
          columns={columns}
          rows={testcaseObject}
          //   hidefooter={false}
          getRowId={row => row.testcase_id}
        />
      </div>
    </div>
  );
}
