import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ElementList from '../ElementList'
import useHead from '../../../hooks/useHead'
import { getPagesForTestcase, getPagesIntestcase } from '../../../Services/TestCaseService'
import MapScreen from './MapScreen'
function Web({ project, application, testcaseId, setScreen }) {
    let [page, setPage] = useState([])
    let [subpage, setSubpage] = useState({})
    let [screenList, setScreenList] = useState([])
    const { setShowloader } = useHead();


    useEffect(() => {
        //setShowloader(true);
        if (testcaseId === 0) {
            project != null && application != null && getPagesForTestcase(setPage, project?.project_id, application?.module_id)
                .then((res) => {
                    setShowloader(false);
                })
                .catch(() => {
                    setShowloader(false);
                })


            project != null && application != null && application?.sub_modules_list?.forEach(subapp => {
                console.log(subapp.module_id)
                getPagesForTestcase(() => { }, project?.project_id, subapp?.module_id)
                    .then((res) => {
                        let temp = { ...subpage }
                        temp[subapp.module_id] = res;
                        setSubpage(temp)
                    })
                    .catch(() => {

                    })
            });
        }
        else {
            project != null && application != null && getPagesIntestcase(setPage, project?.project_id, application?.module_id, testcaseId)
                .then((res) => {
                    setShowloader(false);
                })
                .catch(() => {
                    setShowloader(false);
                });
        }



    }, [project, application, testcaseId]);

    useEffect(() => {
        console.log(subpage)
    }, [subpage])

    return (
        <div>
            <Grid item container spacing={1} justifyContent="left">
                <Grid item xs={3} md={3}>
                    <MapScreen
                        pages={page}
                        setpages={setPage}
                    ></MapScreen>

                </Grid>
                <Grid item xs={9} md={9}>
                    screenlist
                    <ElementList
                        screenList={screenList}
                    ></ElementList>
                </Grid>
            </Grid>
        </div>
    )
}

export default Web
