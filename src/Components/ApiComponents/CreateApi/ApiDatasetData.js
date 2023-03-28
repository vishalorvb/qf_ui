import { get } from "lodash"
import { getData } from "./APiListDrawer"
// export let getData;


export let postData={
    "testcase_id": 0,
    "testcase_dataset_name": "",
    "apis_order": [],
    "description": "default desc",
    "tc_dataset_id": 0,
    "multi_datasets_of_testcase": []
}

export function setGetData(apiId,objectname,data){
    console.log("set function")
    console.log(apiId)
    console.log(objectname)
    console.log(data)
    getData?.forEach(element => {
        if(element.api_id == apiId){
            element[objectname] = data
        }
    });
    console.log("after data set")
    console.log(getData)
}
