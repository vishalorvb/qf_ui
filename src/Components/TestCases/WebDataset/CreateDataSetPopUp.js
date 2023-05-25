import {
  Button,

  Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { validateFormbyName } from "../../../CustomComponent/FormValidation";
import { CreateDataset } from "../../../Services/TestCaseService";
import { datasetinfo } from "./DatasetHelper";
import { DatasetRequest } from "./Dataset";
import { useNavigate } from "react-router";
import SnackbarNotify from "../../../CustomComponent/SnackbarNotify";

let snackbarErrormsg = ""

function CreateDataSetPopUp({ ReloadDataset, drawer, setDrawer }) {
  let navigate = useNavigate();

  let [snackBarError, setSnackBarError] = useState(false)

  function handleSubmit(e) {
    if (validateFormbyName(["name", "desc"], "error")) {
      DatasetRequest[0].datasets_list = [datasetinfo];
      CreateDataset(DatasetRequest[0]).then((res) => {
        if (res == false) {
          if (datasetinfo.dataset_id == 0) {
            ReloadDataset("Create");
          }
          else {
            ReloadDataset("Update");
          }
        }
        else {
          snackbarErrormsg = res
          setSnackBarError(true)
        }
      });
    }
    else{
      snackbarErrormsg = "Fill all required fields"
      setSnackBarError(true)
    }
  }


  try {
    return (
      <div>


        <Grid container spacing={1} justifyContent='flex-end'>
          <Grid item sm={2} md={2}>
            <select
              onChange={(e) => (datasetinfo.is_db_dataset = e.target.value)}
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
              defaultValue={datasetinfo.name}
              onChange={(e) => {
                datasetinfo.name = e.target.value;
              }}
            />
          </Grid>

          <Grid item md={2}>
            <input
              type="text"
              name="desc"
              placeholder="Dataset Description"
              defaultValue={datasetinfo.description}
              onChange={(e) => {
                datasetinfo.description = e.target.value;
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
              onClick={(e) => {
                setDrawer(!drawer);
              }}
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
