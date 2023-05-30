/*
**********  Vishal Kumar (4734) ********

input parameters (in Props):
        testcaseId ;
        dataetId ;
        setToogle : is a function to call when click on cancel button
        copy : is a boolean value for is this create dataset is a copy of the dataset or not
Result:
       1.This component will fetch data for create Dataset of a above TestcaseId for web Type
*/




import React, { useEffect, useRef, useState } from 'react'
import CreateDataSetPopUp from './CreateDataSetPopUp'
import { getData_for_createDataset } from '../../../Services/TestCaseService';
import { getScreenList } from './DatasetHelper';
import ScreenList from './ScreenList';
import ElementList from './ElementList';
import { Grid } from '@mui/material';
import { CreateDataset } from '../../../Services/TestCaseService';
import SnackbarNotify from '../../../CustomComponent/SnackbarNotify';

let snackbarmsg = ""
let snackbarType = "info"



function CreateWebDataset({ datasetId, testcaseId, setToogle, copy }) {
    let [data, setData] = useState();
    let [screenList, setScreenList] = useState([]);
    let [selectedScreenIds, setSelectedScreenIds] = useState(0)
    let [selectedScreenName, setSelectedScreenName] = useState()
    let [snackbar, setSnackbar] = useState(false)
    let requestData = useRef()




    function updateDataset(elementId, tagname, value) {
        requestData.current.screens_in_testcase.forEach(screens => {
            screens.screen_elements.forEach(screenElements => {
                screenElements.forEach(element => {
                    if (element.element_id == elementId) {
                        element.dataset_values[tagname] = value
                    }
                });
            });
        });
    }

    function getScreenName(screenId) {
        let sName = ""
        requestData.current?.screens_in_testcase.forEach(screens => {
            if (screens.screen_id == screenId) {
                sName = screens.screen.name
            }
        })
        return sName
    }

    function handleSubmit(datasetInfo) {
        if (copy) {
            datasetInfo.dataset_id = 0
        }
        else {
            datasetInfo.dataset_id = datasetId
        }

        requestData.current.datasets_list = [datasetInfo]
        CreateDataset(requestData.current).then((res) => {
            if (res == false) {
                snackbarmsg = "Dataset Created successfully"
                snackbarType = "success"
                setSnackbar(true)
                setTimeout(() => {
                    setToogle(true)
                }, 1000);
            }
            else {
                snackbarmsg = res
                snackbarType = "error"
                setSnackbar(true)
            }
        });
    }



    useEffect(() => {
        getData_for_createDataset(setData, testcaseId, datasetId)
    }, [])

    useEffect(() => {
        setScreenList(getScreenList(data))
        requestData.current = data
    }, [data])


    useEffect(() => {
        setSelectedScreenIds(screenList[0]?.screen_id)
    }, [screenList])

    useEffect(() => {
        if (selectedScreenIds !== undefined && selectedScreenIds !== 0) {
            setSelectedScreenName(getScreenName(selectedScreenIds))
        }
    }, [selectedScreenIds])

    useEffect(() => {
    }, [selectedScreenName])

    return (
        <div>
            <CreateDataSetPopUp
                func={handleSubmit}
                dsName={requestData.current?.datasets_list[0]?.name}
                dsDesciption={requestData.current?.datasets_list[0]?.description}
                dsType={false}
                setToogle={setToogle}
            ></CreateDataSetPopUp>

            <Grid container columnSpacing={2}>
                <Grid item md={3}>
                    <ScreenList
                        testcaseId={testcaseId}
                        screen={screenList}
                        setScreenId={setSelectedScreenIds}
                    ></ScreenList>
                </Grid>
                <Grid item md={9}>
                    <ElementList
                        elementList={requestData.current?.screens_in_testcase.filter(screens => {
                            if (screens.screen_id == selectedScreenIds) {
                                return screens
                            }
                        })[0]?.screen_elements[0]}
                        updateDataset={updateDataset}
                        screenName={selectedScreenName}
                    ></ElementList>

                </Grid>
            </Grid>


            <SnackbarNotify
                open={snackbar}
                close={setSnackbar}
                msg={snackbarmsg}
                severity={snackbarType}
            ></SnackbarNotify>
        </div>
    )
}

export default CreateWebDataset
