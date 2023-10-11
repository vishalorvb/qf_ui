import { useState } from "react"
import Scheduler from "../../CustomComponent/Scheduler"


function TestSetScheduler({ projectId, moduleId, testsetId }) {

    let [Scheduledate, setScheduleDate] = useState()


    return (
        <div>
            <Scheduler
                setDate={setScheduleDate}
            ></Scheduler>
        </div>
    )
}

export default TestSetScheduler
