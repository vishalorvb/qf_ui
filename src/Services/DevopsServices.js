import axios from "axios";
import { baseUrl } from "../Environment";

let userId = 1;
// let module_id = 1052;
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

export function getCreatePipelineData(callback, setdefaultData, id) {
  // This function except name of state as a callback and set value in that state
  axios.get(`${baseUrl}/module/${module_id}/pipeline/${id}`).then((res) => {
    const data = res?.data?.data;
    console.log(data);
    callback(data);
    setdefaultData({
      releaseName: data?.pipelinerelase?.release_name,
      releaseDesc: data?.pipelinerelase?.release_desc,
      cicdType: data?.pipelinerelase?.cicd_type,
      release: data?.pipelinerelase?.ansiblereleaseId,
      webTest: data?.pipelinerelase?.webTestsetId,
      ApiTest: data?.pipelinerelase?.apiTestsetid,
      sonrCubePath: data?.pipelinerelase?.code_quality_path,
      sonrCubeKey: data?.pipelinerelase?.code_quality_project_key,
      unitTestPath: data?.pipelinerelase?.unittesttestset_path,
    });
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

export function executePipeline(callback, id) {
  // This function except name of state as a callback and set value in that state
  axios.post(`${baseUrl}/executepipeline?release_id=${id}`).then((res) => {
    console.log(res);
    callback(res);
  });
}

export function createPipeline(callback, params, id) {
  axios
    .post(`${baseUrl}/Createpipeline`, null, {
      params: {
        module_id: module_id,
        release_name: params.releaseName,
        release_desc: params.releaseDesc,
        ansiblereleaseId: params.release,
        webTestsetId: params.webTest,
        code_quality_path: params.sonrCubePath,
        code_quality_project_key: params.sonrCubeKey,
        unittesttestset_path: params.unitTestPath,
        apiTestsetid: params.ApiTest,
        cicd_type: params.cicdType,
        user_id: userId,
        release_id: id,
      },
    })
    .then((res) => {
      console.log(res?.data?.data.pipelinehisotory);
      callback(res?.data?.data.pipelinehisotory);
    });
}

export function getReleaseInstances(callback) {
  axios.get(`${baseUrl}/release-management/${module_id}`).then((res) => {
    console.log(res?.data?.data);
    res?.data?.data !== null && callback(res?.data?.data);
  });
}
