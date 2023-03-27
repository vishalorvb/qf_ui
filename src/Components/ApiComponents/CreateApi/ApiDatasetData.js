import { getData } from "./APiListDrawer"


export let postData={
    "testcase_id": 0,
    "testcase_dataset_name": "",
    "apis_order": [],
    "description": "default desc",
    "tc_dataset_id": 0,
    "multi_datasets_of_testcase": []
}

export function setGetData(apiId,objectname,data){
    getData?.forEach(element => {
        if(element.api_id == apiId){
            element[objectname] = data
        }
    });
}
