import { Button, Divider, Typography } from '@mui/material'
import { Stack } from "@mui/system";
import React, { useEffect, useState } from 'react'
import SmartDrawer from '../../../CustomComponent/SmartDrawer'
import { getDatasetDetails } from '../../../Services/ApiService'
import { setGetData } from './ApiDatasetData';
import { postData } from './ApiDatasetData';
export let getData;

function APiListDrawer({setSelectedApi}) {


    let [showApi, setShowApi] = useState(false)
    let [Api, setApi] = useState([])
    let [ApiId,setApiId] = useState(0)

    useEffect(() => {
        // getApis(setApi, 941)
        getDatasetDetails(setApi,74)
    }, [])

    useEffect(() => {
       getData = [...Api]
       let api_order = []
       getData?.forEach(element => {
        // console.log(element.api_id)
        api_order.push(element.api_id)
       });
       postData.apis_order = api_order
    }, [Api])
    return (
        <div>
            <Button onClick={e => setShowApi(!showApi)} variant="outlined">{showApi?"Hide Api":"Show Api"}</Button>
            <SmartDrawer
                open={showApi}
                close={setShowApi}
            >
                <Typography align="center" m={2}>
                    List of Api
                </Typography>
                {Api?.map(s => {
                    return (
                        <Stack
                            mt={1}
                            ml={1}
                            sx={{
                                backgroundColor:ApiId == s.api_id?"#e8edf2":"",
                                cursor: "pointer",
                            }}
                            onClick={e => {
                                setApiId(s.api_id)
                                setSelectedApi({...s})
                            }}

                        >
                            <Typography variant="p" sx={{ fontWeight: "bold" }}>
                                {s.api_name}
                            </Typography>
                            <Typography variant="caption">{s.api_description}</Typography>
                            <Divider />
                        </Stack>
                    );
                })}
            </SmartDrawer>
        </div>
    )
}

export default APiListDrawer
