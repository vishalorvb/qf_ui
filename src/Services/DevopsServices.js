import axios from "axios";
import { baseUrl } from "../Environment";

let userId = 1;
let module_id = 1036;

export function getPipelines(callback) {
  // This function except name of state as a callback and set value in that state
  axios.get(`${baseUrl}/pipeline/${module_id}`).then((res) => {
    console.log(res?.data?.data);
    callback(res?.data?.data);
  });
}

export function getPipelinesHistory(callback, id) {
  // This function except name of state as a callback and set value in that state
  axios.get(`${baseUrl}/pipeline/${id}/release`).then((res) => {
    console.log(res?.data?.data.pipelinehisotory);
    callback(res?.data?.data.pipelinehisotory);
  });
}

export function getCreatePipelineData(callback, id) {
  // This function except name of state as a callback and set value in that state
  axios.get(`${baseUrl}/module/${module_id}/pipeline/${id}`).then((res) => {
    console.log(res?.data?.data);
    callback(res?.data?.data);
  });
}

export function getPipelinesHistoryReport(callback, id, tag) {
  // This function except name of state as a callback and set value in that state
  axios.get(`${baseUrl}/pipeline/report/${id}/${tag}`).then((res) => {
    console.log(res?.data?.data);
    const result = res?.data?.data;
    if (result !== null) {
      const unittestset = result?.unittestset;
      const apiresult = result?.apiresult;
      const webresult = result?.webresult;
      const sonarcubereport = result?.sonarcubereport?.issues;
      const pipelinereport = result?.pipelinereport;

      switch (tag) {
        case "API":
          callback(apiresult);

          break;
        case "WEB":
          callback(webresult);

          break;
        case "UNITTEST":
          callback(unittestset);

          break;
        case "INFO":
          callback(pipelinereport);

          break;
        case "SONAR":
          callback(sonarcubereport);

          break;

        default:
          callback([]);
          break;
      }
    }
  });
}
