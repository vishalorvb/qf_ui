import { Divider, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import moment from "moment";
import { Padding } from '@mui/icons-material';

export default function ReportDetails({ selectedItemData }) {
    return (
        <div>
            <Typography variant="subtitle1"><b style={{ color: "#5C6780", fontSize: "20px" }}>{selectedItemData?.testcase_name}</b></Typography>

            <Divider></Divider>
            <Grid container justifyContent="flex-start" columnSpacing={2} marginTop={"15px"} marginLeft={"0.1px"}>
                <Grid xs={0.5}>
                    <HourglassTopIcon sx={{ color: "#636161" }} />
                </Grid>
                <Grid xs={3}>
                    <Typography variant="subtitle1">START TIME</Typography>
                    <p style={{ color: "#66BB6A" }}><b>{moment(selectedItemData?.start_time).format('DD-MM-yyyy hh:mm:ss')}</b></p>
                </Grid>
                <Grid xs={0.5}>
                    <HourglassBottomIcon sx={{ color: "#636161" }} />
                </Grid>
                <Grid xs={3}>
                    <Typography variant="subtitle1">END TIME</Typography>
                    <p style={{ color: "#EF5350" }}><b>{moment(selectedItemData?.end_time).format('DD-MM-yyyy hh:mm:ss')}</b></p>
                </Grid>
                <Grid xs={0.5}>
                    <SettingsApplicationsIcon sx={{ color: "#636161" }} />
                </Grid>
                <Grid xs={3}>
                    <Typography variant="subtitle1">EXECUTION TIME</Typography>
                    <p style={{ color: "#596981" }}><b>{moment(selectedItemData?.execution_time).format(' hh:mm:ss')}</b></p>
                </Grid>
            </Grid><br />
            <Divider></Divider>

            {selectedItemData?.datasetdata?.map((dataset) => {
                console.log(dataset)
                return (<div>
                    {dataset?.result_type === "screen" && <Typography mb={0} mt={1} p={0.7} sx={{ color: "#5C6780", fontSize: "16px", backgroundColor: "#e8f2fd", borderRadius: "5px" }} variant='h6'>{dataset?.text}</Typography>}
                    <Grid>
                        {dataset?.result_type === "pass" && <div style={{ marginTop: "12px", marginBottom: "12px" }}>
                            {dataset?.text.includes("Entered User") === true ? <KeyboardIcon sx={{ color: "#636161", marginRight: "10px" }} />
                                : dataset?.text.includes("Entered Password") === true ? <VisibilityOffIcon sx={{ color: "#636161", marginRight: "10px" }} />
                                    : dataset?.text.includes("Text is displayed as :") === true ? <CheckCircleIcon sx={{ color: "green", marginRight: "10px" }} />
                                    : dataset?.text.includes("Clicked on") === true ? <TouchAppIcon sx={{ color: "#636161", marginRight: "10px" }} />
                                        : <KeyboardIcon sx={{ color: "#636161", marginRight: "10px" }} />}<Typography variant='p'>{dataset?.text}</Typography></div>}
                    </Grid>
                    <Grid>
                        {dataset?.result_type === "info" && <div style={{ marginTop: "12px", marginBottom: "12px" }} ><InfoIcon sx={{ color: "#636161", marginRight: "10px" }} /><Typography variant='p'>{dataset?.text}</Typography></div>}<Divider></Divider>
                    </Grid>
                    <Grid >
                        {dataset?.result_type === "fail" && <div style={{ marginTop: "12px", marginBottom: "12px" }} >{dataset?.result_type.includes("fail") ? <CancelIcon sx={{ color: "red", marginRight: "10px" }} /> : <CheckCircleIcon sx={{ color: "green", marginRight: "10px" }} />}<Typography variant='p'>{dataset?.text}</Typography></div>}
                    </Grid>
                    {dataset?.result_type === "fail" && <img src={`data:image/png;base64,${dataset?.screenshot}`} width={"250px"} />}
                </div>
                )
            })}

        </div>
    )
}