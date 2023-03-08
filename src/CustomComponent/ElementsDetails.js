import React, { useEffect, useState } from 'react'
import MastPop from './MastPop'
import { getElementsDetails } from '../Services/ApplicationService'
import { Button, Divider, Grid } from '@mui/material'

function ElementsDetails({ ElementId, setPopup }) {

    let [details, setDetails] = useState()

    useEffect(() => {
        getElementsDetails(setDetails, ElementId)

    }, [ElementId])

    return (
        <div>
            <h3>This is elements details</h3>
            <MastPop
                open={true}
                setOpen={() => setPopup(false)}
            >
                <h3>Elements Details</h3>
                <hr />
                <div>
                    <h4>Locators</h4>
                    <Grid container columnSpacing={1} justifyContent="space-around">
                        <Grid item md={2}>
                            <p>Path</p>
                        </Grid>
                        <Grid item md={3}>
                            <select>
                                <option value="d">kmskmslmf</option>
                            </select>
                        </Grid>
                        <Grid item md={5}>
                            <input type="text" defaultValue={details == undefined ? "" : details.selected_xpath} />
                        </Grid>
                    </Grid>
                    <h4>Others</h4>
                    <Grid container spacing={2} justifyContent="space-around">
                        <Grid item md={2}>
                            <p>Field Name</p>
                        </Grid>
                        <Grid item md={8.7}>
                            <input type="text" defaultValue={details == undefined ? "" : details.name} />
                        </Grid>
                        <Grid item md={2}>
                            <p>Field Type</p>
                        </Grid>
                        <Grid item md={8.7}>
                            <select>
                                <option selected={details == undefined ? false : details.input_type == "Label" ? true : false} value="Label" >Label</option>
                                <option selected={details == undefined ? false : details.input_type == "Button" ? true : false} value="Button">Button</option>
                                <option selected={details == undefined ? false : details.input_type == "InputText" ? true : false} value="InputText" >InputText</option>
                                <option selected={details == undefined ? false : details.input_type == "Link" ? true : false} value="Link">Link</option>

                            </select>
                        </Grid>
                        <Grid item md={2}>
                            <p>Other Field Type</p>
                        </Grid>
                        <Grid item md={8.7}>
                            <select>
                                <option value="DropDown">DropDown</option>
                                <option value="MouseOver">MouseOver</option>
                                <option value="WindowSwitch">Window Switch</option>
                                <option value="Alert">Alert</option>

                            </select>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} justifyContent="space-around" sx={{padding:"4px"}}>
                        
                        <Grid item md={2}>
                            <Button variant="contained">Update</Button>
                        </Grid>
                    </Grid>
                </div>
            </MastPop>
        </div>
    )
}

export default ElementsDetails
