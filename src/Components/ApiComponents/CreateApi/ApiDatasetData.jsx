import { getData } from "./APiListDrawer";

let postDataInitialVal = {
  testcase_id: 0,
  testcase_dataset_name: "",
  apis_order: [],
  description: "",
  tc_dataset_id: 0,
  multi_datasets_of_testcase: [],
};

export let postData = { ...postDataInitialVal };
export function setGetData(apiId, objectname, data) {
  getData?.forEach((element) => {
    if (element.api_id === apiId) {
      element[objectname] = data;
    }
  });
}

export function clearPostData() {
  postData.testcase_dataset_name = "";
  postData.apis_order = [];
  postData.description = "";
  postData.tc_dataset_id = 0;
  postData.multi_datasets_of_testcase = [];
}
