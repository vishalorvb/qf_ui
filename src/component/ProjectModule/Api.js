import axios from "axios"
import { baseUrl } from "../../Environment"


let userId = 112
export function getProjects(callback) {

    axios.get(baseUrl + '/ProjectsMS/Project/getProject?userId=' + userId).then(response => {
        console.table(response.data)
        callback(response.data)
    })
}

export function getAutomationType(callback) {
    axios.get(baseUrl + "/ProjectsMS/Project/getAutomationType").then(response => {
        callback(response.data)
        console.log(response.data)
    })
}

export async function DeleteProjectFromFavourite(projectId, userId) {
    console.log(projectId + "=======" + userId)
    await axios({
        method: 'delete',
        url: baseUrl + '/ProjectsMS/Project/deleteProjectToFavourite',
        data: {
            projectId: projectId,
            userId: userId
        }
    }).then(response => {
        console.log(response)
        if (response.data) {
            // getProject()
        }
    }).catch(error => {
        console.log(error)
    })
}

export function getUserFromProject(callback, projectId) {
    axios.get(baseUrl + '/ProjectsMS/Project/getUserFromProject?projectId=' + projectId).then((res) => {
        callback(res.data)
    })
}

export async function AddProject(projectData, DbData) {

    console.log("This is From create project")
    console.log(projectData)
    console.log(DbData)
    let project_id = await axios({
        method: 'post',
        url: baseUrl + '/ProjectsMS/Project/createProject',
        data: projectData
    })
    DbData.project_id = project_id.data
    let db = await axios({
        method: 'post',
        url: baseUrl + '/ProjectsMS/Project/addDatabaseDetails',
        data: DbData
    })
    await axios({
        method: 'post',
        url: baseUrl + '/ProjectsMS/Project/addProjectToUser',
        data: {
            "projectId": project_id.data,
            "userId": userId,
            "roleId": 1
        }
    })

    return { "flag": db.data, "project_id": project_id.data };

}

export async function updateProject(projectData, DbData){
    console.log("This is From create project")
    console.log(projectData)
    DbData.project_id = projectData.project_id
    console.log(DbData)

   await axios({
        method: 'put',
        url: baseUrl + '/ProjectsMS/Project/updateProject',
        data: projectData
    })

    await axios({
        method: 'put',
        url: baseUrl + '/ProjectsMS/Project/updateDatabase',
        data: DbData
    })
}

