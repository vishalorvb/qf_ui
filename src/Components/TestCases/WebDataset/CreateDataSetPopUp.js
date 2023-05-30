
/*
**********  Vishal Kumar (4734) ********

input parameters (in Props):
        Callback (to pass dataset Info);
        Callback (to call when clicked on save button);
Result:
       It will pass dataset type,name and description
*/






import { Button, Grid, } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { validateFormbyName } from "../../../CustomComponent/FormValidation";
import SnackbarNotify from "../../../CustomComponent/SnackbarNotify";


let snackbarErrormsg = ""

function CreateDataSetPopUp({ func,dsName,dsDesciption,dsType, setToogle }) {
  let [snackBarError, setSnackBarError] = useState(false)

  let datasetinfo = useRef({
    "name": "",
    "description": "",
    "is_db_dataset": false
  })

  function handleSubmit(e) {

    // console.log(datasetinfo.current)
    if (validateFormbyName(["name", "desc"], "error")) {
      console.log(datasetinfo.current)
      func(datasetinfo.current)
    //   CreateDataset(DatasetRequest[0]).then((res) => {
    //     if (res == false) {
    //       if (datasetinfo.dataset_id == 0) {
    //         ReloadDataset("Create");
    //       }
    //       else {
    //         ReloadDataset("Update");
    //       }
    //     }
    //     else {
    //       snackbarErrormsg = res
    //       setSnackBarError(true)
    //     }
    //   });
    }
    else {
      snackbarErrormsg = "Fill all required fields"
      setSnackBarError(true)
    }
  }
  useEffect(() => {
    datasetinfo.current.name = dsName
    datasetinfo.current.description = dsDesciption
    datasetinfo.current.is_db_dataset = dsType
  }, [dsName,dsDesciption,dsType])

  try {
    return (
      <div>


        <Grid container spacing={1} justifyContent='flex-end'>
          <Grid item sm={2} md={2}>
            <select
            defaultValue={dsType}
              onChange={(e) => (datasetinfo.current.is_db_dataset = e.target.value)}
            >
              <option value={false}>Regular</option>
              <option value={true}>DB</option>
            </select>
          </Grid>

          <Grid item md={2}>
            <input
              type="text"
              name="name"
              placeholder="Dataset Name"
              defaultValue={dsName}
              onChange={(e) => {
                datasetinfo.current.name = e.target.value;
              }}
            />
          </Grid>

          <Grid item md={2}>
            <input
              type="text"
              name="desc"
              placeholder="Dataset Description"
              defaultValue={dsDesciption}
              onChange={(e) => {
                datasetinfo.current.description = e.target.value;
              }}
            />
          </Grid>
          <Grid item md={0.7}>
            <Button variant="contained" onClick={handleSubmit}>
              Save
            </Button>
          </Grid>
          <Grid item md={1}>
            <Button variant="outlined"
              onClick={setToogle}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
        <SnackbarNotify
          open={snackBarError}
          close={setSnackBarError}
          msg={snackbarErrormsg}
          severity="error"
        ></SnackbarNotify>
      </div>
    );
  } catch (error) {
    console.log(error);
    return (
      <div>
        <h1>Error in createDatasetPopUp </h1>
      </div>
    );
  }
}

export default CreateDataSetPopUp;
