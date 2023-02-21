
import axios from "axios"
import { async } from "q"
import { baseUrl } from "../Environment"


const userid = 4


export async function createWebTestCase(data) {
    let res = await axios({
        method: 'post',
        url: `${baseUrl}/qfservice/webtestcase/web-createTestcase`,
        data: data
    }).then(response => {
        return response.data.status
    })
        .catch(err => {
            return "error"
        })
    return res
}

export async function createApitestcase(data){
    let res = await axios({
        method: 'post',
        url: `${baseUrl}/qfservice/CreateNewTestcase`,
        data: data
    }).then(response => {
        return response.data.status
    })
        .catch(err => {
            return "error"
        })
    return res
}

export function getApplication(callback){
    axios.get(`${baseUrl}/qfservice/getApplicationDetails`).then(res=>{
        callback(res.data)
    })
}

export async function createNewtestCase(data){
    let pid = data.project_id
    let aid = data.application_id
    delete data.application_id
    delete data.project_id
    let res =  axios({
        method: 'post',
        url: `${baseUrl}/qfservice/webtestcase/web-createTestcase?projectId=${pid}&applicationId=${aid}`,
        data: data
    }).then(response => {
        console.log(response.data.status)
        return response.data.status
    })
        .catch(err => {
            return "error"
        })
   return res
}