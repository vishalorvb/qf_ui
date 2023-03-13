import { method } from "lodash";
import axios from "../api/axios";
import { baseUrl } from "../Environment";

export function getApis(callback, applicationId) {
    axios.get(`${baseUrl}/qfservice/${applicationId}/apis`).then(res => {
        console.log(res.data.data.apisList)
        callback(res.data.data.apisList)
    })
}

export async function createApiRequest(data) {
    let x = axios({
        method: 'post',
        data:  data ,
        url: `${baseUrl}/qfservice/createapi`
    }).then(res => {
            return true   
    }).catch(err => {
        console.log(err)
    })
    return x
}

export async function deleteApiRequest(apiId){
    let x = axios.post(`${baseUrl}/qfservice/deleteapi?api_id=${apiId}`).then(res=>{
        return true
    }).catch(res=>{
        return false
    })
    return x
}