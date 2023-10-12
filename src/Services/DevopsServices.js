import axios from "axios";
import {
  authservice,
  biservice,
  dashboard,
  qfservice,
  report,
  userservice,
} from "../Environment";

export function getPipelines(callback, project_id) {
  // This function except name of state as a callback and set value in that state
  axios.get(`${qfservice}/qfservice/pipeline/${project_id}`).then((res) => {
    callback(res?.data?.data);
  });
}

export function getPipelinesHistory(callback, release_log, id) {
  // This function except name of state as a callback and set value in that state
  axios.get(`${qfservice}/qfservice/pipeline/${id}/release`).then((res) => {
    callback(res?.data?.data?.pipelinehisotory);
    release_log(res?.data?.data1);
  });
}

export function getCreatePipelineData(
  callback,
  setdefaultData,
  id,
  project_id
) {
  axios
    .get(`${qfservice}/qfservice/project/${project_id}/pipeline/${id}`)
    .then((res) => {
      const data = res?.data?.data;
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

export function getPipelinesHistoryReport(callback, setError, id, tag) {
  // This function except name of state as a callback and set value in that state
  axios
    .get(`${qfservice}/qfservice/pipeline/report/${id}/${tag}`)
    .then((res) => {
      setError(res?.data?.error?.description);
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

export function executePipeline(callback, id, userId) {
  axios
    .post(
      `${qfservice}/qfservice/executepipeline?release_id=${id}&user_id=${userId}`
    )
    .then((res) => {
      callback(res?.data?.message);
    });
}

export function createPipeline(callback, params, id, project_id, userId) {
  axios
    .post(`${qfservice}/qfservice/Createpipeline`, null, {
      params: {
        project_id: project_id,
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
      callback(res?.data?.data.pipelinehisotory);
    });
}

export async function getReleaseInstances(callback, project_id) {
  return await axios
    .get(`${qfservice}/qfservice/release-management/${project_id}`)
    .then((res) => {
      res?.data?.data !== null && callback(res?.data?.data);
    });
}

export async function deleteInstance(projectId, instanceId) {
  return await axios
    .delete(
      `${qfservice}/qfservice/DeleteRelease?release_id=${instanceId}&project_id=${projectId}`
    )
    .then((resp) => {});
}

export async function getGitData(callback, releaseId, historyId, projectId) {
  axios
    .get(
      `${qfservice}/qfservice/pipelinelogs/${releaseId}/logs/${historyId}?projectId=${projectId}`
    )
    .then((res) => {
      let status = {
        initialize: false,
        continuousIntegration: false,
        releaseAutomationTest: false,
        testAutomation: false,
      };
      status.initialize = res.data.stages?.Initialize[0].status;
      status.continuousIntegration =
        res.data?.stages["Continuous Integration"][0].status;
      status.releaseAutomationTest =
        res.data?.stages["Release Automation (Test)"][0].status;
      status.testAutomation = res.data?.stages["Test Automation"][0].status;
      callback(status);
    });
}

export async function getReleaseHistory(projectId, releaseId, callback) {
  axios
    .get(
      `${qfservice}/qfservice/project/${projectId}/ansible-release/${releaseId}/release-history`
    )
    .then((res) => {
      callback([res.data.data.webReleaseHistories] ?? []);
    });
}

export async function release(projectId, releaseId, userId) {
  return await axios
    .post(
      `${qfservice}/qfservice/ExecuteRelease?release_id=${releaseId}&project_id=${projectId}&user_id=${userId}`
    )
    .then((res) => {
      if (res.data.status == "FAIL") return false;
      else return res.data.info.id;
    });
}
