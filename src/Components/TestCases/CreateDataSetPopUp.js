import { Button, Divider, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MastPop from '../../CustomComponent/MastPop'
import { validateFormbyName } from '../../CustomComponent/FormValidation'
import { CreateDataset } from '../../Services/TestCaseService'
import { datasetinfo } from './DatasetHelper'
import { DatasetRequest } from './Dataset'

function CreateDataSetPopUp({ close }) {
function handleSubmit(e){
   
   if (validateFormbyName(["name","desc"],"error")){
    DatasetRequest[0].datasets_list = [datasetinfo]
    console.log(DatasetRequest)
    CreateDataset(DatasetRequest[0])
   }
}


try {
    return (
        <div>
            <MastPop open={true} setOpen={() => close(false)}>
            <h4>Create Data Set</h4>

            <Divider></Divider>
            <br/>
                <Grid container columnSpacing={2}  justifyContent="flex-start">
                <Grid item xs={2} sm={2} md={2}>
                    <label for="">Dataset Type</label>
                    </Grid>
                    <Grid item xs={4} sm={4} md={4}>
                        <select
                        onChange={e=>datasetinfo.is_db_dataset = e.target.value}
                        >
                            <option value={false}>Regular</option>
                            <option value={true}>DB</option>
                        </select>
                    </Grid>
                </Grid>
                <div>
                    <label for="">Dataset Name</label>
                    <input type="text" name='name' defaultValue={datasetinfo.name}
                    onChange={e=>{
                        datasetinfo.name = e.target.value;
                    }}
                    />
                    <label for="">Dataset Description</label>
                    <input type="text" name='desc' defaultValue={datasetinfo.description}
                     onChange={e=>{
                        datasetinfo.description = e.target.value;
                    }}
                    />
                </div>
                <br/>
                <Grid container columnSpacing={2}  justifyContent="center">
                   
                    <Grid item xs={1} sm={1} md={1}>
                        <Button variant="contained" onClick={handleSubmit}>Save</Button>
                    </Grid>
                    <Grid item xs={1} sm={1} md={1}>
                        <Button variant="outlined" onClick={e=>close(false)}>Cancel</Button>
                    </Grid>
                </Grid>
            </MastPop>
        </div>
    )
} catch (error) {
    console.log(error)
    return(
        <div>
            <h1>Error in createDatasetPopUp </h1>
        </div>
    )
}
   
}

export default CreateDataSetPopUp
