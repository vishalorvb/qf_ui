import { Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ElementList from '../ElementList'
import useHead from '../../../hooks/useHead'
import { getPagesForTestcase, getPagesIntestcase } from '../../../Services/QfService'
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

        let screen = []
        page?.forEach(p => {
            screen.push(p.screens_list?.filter(screen => screen.is_select))
        });

        Object.keys(subpage)?.forEach(appId => {
            subpage[appId].forEach(p => {
                screen.push(p.screens_list?.filter(screen => screen.is_select))
            })
        });


        setScreenList([...screen.flat(Infinity)])

    }, [subpage, page])


    useEffect(() => {
        setScreen(screenList)

    }, [screenList])
    return (
        <div>
            <Grid item container spacing={1} justifyContent="left">
                <Grid item xs={3} md={3}>
                    <MapScreen
                        pages={page}
                        setpages={setPage}
                    ></MapScreen>
                    {application?.sub_modules_list?.map(app => <div>
                        {/*<Typography variant="h4" component="h2">
                            {app.module_name}
                        </Typography>*/}
                        <MapScreen
                            pages={subpage[app.module_id] ?? []}
                            setpages={list => {
                                let temp = { ...subpage }
                                temp[app.module_id] = list
                                setSubpage(temp)
                            }}

                        ></MapScreen>
                    </div>)}
                </Grid>
                <Grid item xs={9} md={9}>
                    <ElementList
                        screenList={screenList}
                        setScreenList={setScreenList}
                    ></ElementList>
                </Grid>
            </Grid>
        </div>
    )
}

export default Web
