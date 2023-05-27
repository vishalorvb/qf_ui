/*
**********  Vishal Kumar (4734) ********

input parameters (in Props):
        testcaseId ;
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




function CreateWebDataset(props) {

    let [data, setData] = useState();
    let [screenList, setScreenList] = useState([]);
    let [selectedScreenIds, setSelectedScreenIds] = useState(0)
    let [selectedScreenName, setSelectedScreenName] = useState()
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
        let sName = "hwllo"
        requestData.current?.screens_in_testcase.forEach(screens => {
            if (screens.screen_id == screenId) {
                sName =  screens.screen.name
            }
        })
        return sName
    }


    useEffect(() => {
        getData_for_createDataset(setData, 616)
    }, [props])

    useEffect(() => {
        setScreenList(getScreenList(data))
        requestData.current = data
    }, [data])


    useEffect(() => {
        setSelectedScreenIds(screenList[0]?.screen_id)
    }, [screenList])

    useEffect(() => {
        if(selectedScreenIds !== undefined && selectedScreenIds !== 0) {
            setSelectedScreenName(getScreenName(selectedScreenIds))
        }
    }, [selectedScreenIds])

    useEffect(() => {
    }, [selectedScreenName])

    return (
        <div>
            <CreateDataSetPopUp
                setToogle={props.setToogle}
            ></CreateDataSetPopUp>

            <Grid container columnSpacing={2}>
                <Grid item md={3}>
                    <ScreenList
                        testcaseId={props.testcaseId}
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
        </div>
    )
}

export default CreateWebDataset
