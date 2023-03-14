import { Button, Divider, Grid } from '@mui/material'
import React from 'react'
import MastPop from '../../CustomComponent/MastPop'
import { validateFormbyName } from '../../CustomComponent/FormValidation'



function CreateDataSetPopUp({ close }) {

function handleSubmit(e){
    console.log("calling handle submit")
   if (validateFormbyName(["name","desc"],"error")){
    console.log("Valid form")
   }

}


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
                        <select>
                            <option value="1">Regular</option>
                            <option value="2">DB</option>
                        </select>
                    </Grid>
                </Grid>
                <div>
                    <label for="">Dataset Name</label>
                    <input type="text" name='name'/>
                    <label for="">Dataset Description</label>
                    <input type="text" name='desc'/>
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
}

export default CreateDataSetPopUp
