import { Button, Divider, Typography } from '@mui/material'
import { Stack } from "@mui/system";
import React, { useEffect, useState } from 'react'
import { getDatasetDetails } from '../../../Services/ApiService'

import { postData } from './ApiDatasetData';
export let getData;

function APiListDrawer({ setSelectedApi, datasetId }) {


    let [showApi, setShowApi] = useState(true)
    let [Api, setApi] = useState([])
    let [ApiId, setApiId] = useState(0)

    useEffect(() => {
        getDatasetDetails(setApi, datasetId)
    }, [])

    useEffect(() => {
        getData = [...Api]
        let api_order = []
        getData?.forEach(element => {
            api_order.push(element.api_id)
        });
        postData.apis_order = api_order
        console.log(Api[0])
        if (Api[0] !== undefined) {
            setSelectedApi(Api[0])
            setApiId(Api[0].api_id)
        }
    }, [Api])
    return (
        <div>
                <Typography align="center" m={2}>
                    List of Api
                </Typography>
                {Api?.map(s => {
                    return (
                        <Stack
                            mt={1}
                            ml={1}
                            sx={{
                                backgroundColor: ApiId == s.api_id ? "#e8edf2" : "",
                                cursor: "pointer",
                            }}
                            onClick={e => {
                                console.log(s.api_id)
                                setApiId(s.api_id)
                                setSelectedApi({ ...s })
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
        </div>
    )
}

export default APiListDrawer
