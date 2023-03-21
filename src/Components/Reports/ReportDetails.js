import { Button, Divider, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from '../../api/axios';
import SnackbarNotify from '../../CustomComponent/SnackbarNotify';
import { useLocation } from "react-router-dom";
import { Stack } from "@mui/system";
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import Card from '@mui/material/Card';
import { ConnectedTvOutlined } from '@mui/icons-material';
import moment from "moment";

export default function ReportDetails({ selectedItemData }) {

    return (
        <div>
            <Typography variant="subtitle1">{selectedItemData?.testcase_name}</Typography>

            <Divider></Divider>
            <Grid container justifyContent="flex-start" columnSpacing={2} marginTop={"15px"}>
                <Grid>
                    <HourglassTopIcon></HourglassTopIcon>
                </Grid>
                <Stack
                    direction="column"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={0}
                    mb={0}
                >
                    <Typography variant="subtitle1">START TIME</Typography>
                    <p>{moment(selectedItemData?.start_time).format('DD/MM/yyyy hh:mm:ss')}</p>
                </Stack>

                <Grid>
                    <HourglassBottomIcon></HourglassBottomIcon>
                </Grid>
                <Stack
                    direction="column"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={0}
                    mb={0}
                >
                    <Typography variant="subtitle1">END TIME</Typography>
                    <p>{moment(selectedItemData?.end_time).format('DD/MM/yyyy hh:mm:ss')}</p>

                </Stack>

                <Grid>
                    <SettingsApplicationsIcon></SettingsApplicationsIcon>
                </Grid>
                <Stack
                    direction="column"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={0}
                    mb={0}
                >
                    <Typography variant="subtitle1">EXECUTION TIME</Typography>
                    <p>{moment(selectedItemData?.execution_time).format(' hh:mm:ss')}</p>

                </Stack>
            </Grid><br />
            <Divider></Divider>

            {selectedItemData?.datasetdata?.map((dataset)=>{
                
                return(<div>
                {dataset?.result_type === "screen" && <Typography variant='h5'>{dataset?.text}</Typography>}           
                {dataset?.result_type === "pass" && <Typography variant='p'>{dataset?.text}</Typography> }
                {dataset?.result_type === "info" && <Typography variant='p'>{dataset?.text}</Typography> }
                {dataset?.result_type === "fail" && <Typography variant='p'>{dataset?.text}</Typography> }
                {dataset?.result_type === "fail" && <img src={`data:image/png;base64,${dataset?.screenshot}`}/> }
                </div>          
                )})}

        </div>
    )
}