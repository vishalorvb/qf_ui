import axios from "../api/axios";
import { baseUrl } from "../Environment";

export function getApis(callback, applicationId) {
  axios.get(`${baseUrl}/qfservice/${applicationId}/apis`).then((res) => {
    callback(res.data.data.apisList);
  });
}

export async function createApiRequest(data) {
  let x = axios({
    method: "post",
    data: data,
    url: `${baseUrl}/qfservice/createapi`,
  })
    .then((res) => {
      return true;
    })
    .catch((err) => {
      console.log(err);
    });
  return x;
}

export async function deleteApiRequest(apiId) {
  let x = axios
    .post(`${baseUrl}/qfservice/deleteapi?api_id=${apiId}`)
    .then((res) => {
      return true;
    })
    .catch((res) => {
      return false;
    });
  return x;
}

export function getApiDatasets(callback, testcaseId) {
  axios
    .get(`${baseUrl}/qfservice/api/testcases/${testcaseId}/datasets`)
    .then((res) => {
      if (res.data.data != null) {
        callback(res.data.data);
      }
    });
}

export function getDatasetDetails(callback, datasetId) {
  axios({
    method: "post",
    url: `${baseUrl}/qfservice/GetDatasetDetailsByDatasetId?dataset_id=${datasetId}`,
  }).then((res) => {
    callback(res.data.data.apidatasets);
  });
}

export async function createApiDataset(userId, Data) {
  let x = await axios({
    method: "post",
    url: `${baseUrl}/qfservice/createdataset?userId=${userId}`,
    data: Data,
  }).then((res) => {
    if (res.data.error == null) {
      return false;
    } else {
      console.log(res.data.error.description);
      return res.data.error.description;
    }
  });
  return x;
}

export async function DeleteApiDataset(datasetId) {
  let x = await axios({
    method: "post",
    url: `${baseUrl}/qfservice/DeleteDataset?dataset_id=${datasetId}`,
  }).then((res) => {
    if (res.data.message !== null) {
      return true;
    } else {
      return false;
    }
  });
  return x;
}


export async function getApiDetails(callback,apiId) {
return axios.post(`${baseUrl}/qfservice/getapibyid?api_id=${apiId}`).then(res=>{
  callback(res.data?.data)
  return res.data?.data
})
}