
import axios from "axios"
import { async } from "q"
import { baseUrl } from "../Environment"




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

export async function createApitestcase(data) {
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

export async function createNewtestCase(data) {
    let pid = data.project_id
    let aid = data.application_id
    delete data.application_id
    delete data.project_id
    let res = axios({
        method: 'post',
        url: `${baseUrl}/qfservice/webtestcase/web-createTestcase?projectId=${pid}&applicationId=${aid}`,
        data: data
    }).then(response => {
        return response.data.status
    })
        .catch(err => {
            return "error"
        })
    return res
}


export function getTestcase(callback, project_id) {
    axios.get(`${baseUrl}/qfservice/webtestcase/getWebTestcasesInModule?project_id=${project_id}`).then(res => {
        if(res.data.info != null){
            callback(res.data.info)
        }
        
    })
}

export function getElementsList(callback,screenId){
    axios.get(`http://10.11.12.242:8080/qfservice/screen/getScreenElementsList?screen_id=${screenId}`).then(res=>{
        callback(res.data.info)
    })
}


