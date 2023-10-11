import { useEffect, useState } from "react"
import Scheduler from "../../CustomComponent/Scheduler"
import useAuth from "../../hooks/useAuth";
import { getEnvironment } from "../../Services/TestsetService";
import { getTestcaseInTestset } from "../../Services/TestsetService";
import { baseUrl } from "../../Environment";
function TestSetScheduler({ projectId, moduleId, testsetId, onSubmit }) {

    const { auth } = useAuth();
    let [Scheduledate, setScheduleDate] = useState()

    let [data, setData] = useState({
        "browser_type": "Chrome",
        "build_environment_id": 0,
        "build_environment_name": "Testing",
        "client_timezone_id": "Asia/Calcutta",
        "execution_location": "local",
        "is_execute": true,
        "is_generate": false,
        "module_id": moduleId,
        "repository_commit_message": "",
        "runtimevariables": "null",
        "web_testcases_list_to_execute": [
            {
                "testcase_id": 0,
                "selected_testcase_dataset_ids": [
                    0
                ]
            }
        ],
        "testset_id": testsetId,
        "user_id": auth.userId
    })

    function handleSubmit(e) {
        let payload = {
            "jobName": `Testset_${testsetId} `,
            "baseurl": baseUrl,
            "apiurl": "/qfservice/ExecuteWebTestset_v11",
            "cron": Scheduledate,
            "requestbody": data
        }


    }

    useEffect(() => {
        getEnvironment(projectId, moduleId, () => { }).then(res => {
            setData({ ...data, build_environment_id: res[0]?.id ?? 0 })
        })
    }, [projectId, moduleId])

    useEffect(() => {
        getTestcaseInTestset(testsetId, () => { }).then(res => {
            console.log(res);
            let temp = res.map(tc => {
                return ({
                    testcase_id: tc.testcase_id,
                    selected_testcase_dataset_ids: tc?.datasets.map(ds => ds.dataset_id)
                })
            })
            setData({ ...data, web_testcases_list_to_execute: temp })
        })
    }, [testsetId])
    return (
        <div>
            <Scheduler
                setDate={date => {
                    handleSubmit()
                    onSubmit()
                    setScheduleDate(date)
                }}
            ></Scheduler>
        </div>
    )
}

export default TestSetScheduler
