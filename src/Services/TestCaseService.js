
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