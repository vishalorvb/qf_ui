
/*
**********  Vishal Kumar (4734) ********

input parameters (in Props):
          func (is call when click on save button and pass the input value of dataset name and description)
          dsName (dataset name for prefilled)
          dsDesciption (dataset desc for prefilled)
          dsType (dataset Type for prefilled)
          setToogle (function to call on cancel button clicked)
Result:
       It will pass dataset type,name and description
*/






import { Button, Grid, } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { validateFormbyName } from "../../../CustomComponent/FormValidation";
import SnackbarNotify from "../../../CustomComponent/SnackbarNotify";


let snackbarErrormsg = ""

function CreateDataSetPopUp({ func, dsName, dsDesciption, dsType, setToogle }) {
    let [snackBarError, setSnackBarError] = useState(false)

    let datasetinfo = useRef({
        "name": "",
        "description": "",
        "is_db_dataset": false
    })

    function handleSubmit(e) {
        if (validateFormbyName(["name", "desc"], "error")) {
            func(datasetinfo.current)
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
    }, [dsName, dsDesciption, dsType])


    try {
        return (
            <div>


                <Grid container spacing={1} justifyContent='flex-end'>
                    <Grid item sm={2} md={2}>
                        <label for="">Database Type:<span className="importantfield">*</span></label>
                        <select
                            defaultValue={dsType}
                            onChange={(e) => (datasetinfo.current.is_db_dataset = e.target.value)}
                        >
                            <option value={false}>Regular</option>
                            <option value={true}>DB</option>
                        </select>
                    </Grid>

                    <Grid item md={2}>
                        <label for="">Database Name: <span className="importantfield">*</span></label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Dataset Name"
                            defaultValue={dsName}
                            onChange={(e) => {
                                datasetinfo.current.name = e.target.value.trim();
                            }}
                        />
                    </Grid>

                    <Grid item md={2}>
                        <label for="">Database Description: <span className="importantfield">*</span></label>
                        <input
                            type="text"
                            name="desc"
                            placeholder="Dataset Description"
                            defaultValue={dsDesciption}
                            onChange={(e) => {
                                datasetinfo.current.description = e.target.value.trim();
                            }}
                        />
                    </Grid>
                    <Grid item md={0.7}>
                        <Button variant="contained" onClick={handleSubmit} sx={{ marginTop: "18px" }}>
                            Save
                        </Button>
                    </Grid>
                    <Grid item md={1}>
                        <Button variant="outlined"
                            sx={{ marginTop: "18px" }}
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
