import { DatasetRequest } from "./Dataset";



export function updateDataset(elementId, tagname, value) {

    DatasetRequest.forEach(element => {
        try {
            element.screens_in_testcase.forEach(screen => {
                screen.screen_elements.forEach(selement => {
                    selement.forEach(ele => {
                        if (ele.element_id == elementId) {
                            // console.log(ele.dataset_values)
                            ele.dataset_values[tagname] = value
                        }
                    })
                })
            })
        } catch (error) {
            console.log(error)
        }
    });
  
}



export let datasetinfo = {
    "name": "",
    "description": "",
    "dataset_id": 0,
    "is_db_dataset": false
}

export function clearDatasetinfo() {
    datasetinfo = {
        "name": "",
        "description": "",
        "dataset_id": 0,
        "is_db_dataset": false
    }
}