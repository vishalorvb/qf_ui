import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MastPop from "../../CustomComponent/MastPop";
import { validateFormbyName } from "../../CustomComponent/FormValidation";
import { CreateDataset } from "../../Services/TestCaseService";
import { datasetinfo } from "./DatasetHelper";
import { DatasetRequest } from "./Dataset";
import { useNavigate } from "react-router";

function CreateDataSetPopUp({ close, ReloadDataset }) {
  let navigate = useNavigate();
  function handleSubmit(e) {
    if (validateFormbyName(["name", "desc"], "error")) {
      DatasetRequest[0].datasets_list = [datasetinfo];
      CreateDataset(DatasetRequest[0]).then((res) => {
        if (res) {
          close(false);
          ReloadDataset();
        }
      });
    }
  }

  try {
    return (
      <Dialog open={true} onClose={() => close(false)}>
        <DialogTitle className="dialogTitle">Create Data Set</DialogTitle>
        <DialogContent>
          <Grid container spacing={1} mt={1} justifyContent="flex-start">
            <Grid item container>
              <Grid md={3}>
                <label for="">Dataset Type</label>
              </Grid>
              <Grid item sm={4} md={4}>
                <select
                  onChange={(e) => (datasetinfo.is_db_dataset = e.target.value)}
                >
                  <option value={false}>Regular</option>
                  <option value={true}>DB</option>
                </select>
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item md={3}>
                <label for="">Dataset Name</label>
              </Grid>
              <Grid item md={7}>
                <input
                  type="text"
                  name="name"
                  defaultValue={datasetinfo.name}
                  onChange={(e) => {
                    datasetinfo.name = e.target.value;
                  }}
                />
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item md={3}>
                <label for="">Dataset Description</label>
              </Grid>
              <Grid item md={7}>
                <input
                  type="text"
                  name="desc"
                  defaultValue={datasetinfo.description}
                  onChange={(e) => {
                    datasetinfo.description = e.target.value;
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="outlined" onClick={(e) => close(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
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
