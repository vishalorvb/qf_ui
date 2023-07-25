import axios from "axios";
import { baseUrl } from "../Environment";





export function ReportPercentage(callback,projectId,sprintName=0){
    axios({
        method: 'post',
        url:`${baseUrl}/qfdashboard/getReportPercentagebyProjectandsprint?project_id=${projectId}${sprintName==0?"":`&sprintname=${sprintName}`}`

    }).then(res=>{
        console.log(res.data)
        console.log(Math.floor(res.data.data.total_pass_percentage))
        callback(Math.floor(res.data.data.total_pass_percentage))
    })
}
