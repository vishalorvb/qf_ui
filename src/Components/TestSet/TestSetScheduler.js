import { useEffect, useState } from "react"
import Scheduler from "../../CustomComponent/Scheduler"
import useAuth from "../../hooks/useAuth";
import { getEnvironment } from "../../Services/TestsetService";

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
                "testcase_id": 1437,
                "selected_testcase_dataset_ids": [
                    1276
                ]
            }
        ],
        "testset_id": testsetId,
        "user_id": auth.userId
    })
    useEffect(() => {
        getEnvironment(projectId, moduleId, () => { }).then(res => {
            setData({ ...data, build_environment_id: res[0]?.id ?? 0 })
        })
    }, [projectId, moduleId])

    return (
        <div>
            <Scheduler
                setDate={date => {
                    onSubmit()
                    setScheduleDate(date)
                }}
            ></Scheduler>
        </div>
    )
}

export default TestSetScheduler
