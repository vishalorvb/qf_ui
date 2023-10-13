import { useEffect, useState } from "react";
import Scheduler from "../../CustomComponent/Scheduler";
import useAuth from "../../hooks/useAuth";
import { getEnvironment } from "../../Services/QfService";
import { getTestcaseInTestset } from "../../Services/QfService";
import { getExecutionLocation } from "../../Services/QfService";
import { qfservice } from "../../Environment";
import { scheduleJob } from "../../Services/OtherServices";
import useHead from "../../hooks/useHead";

function TestSetScheduler({ projectId, moduleId, testsetId, onSubmit }) {
  const { auth } = useAuth();
  const { setSnackbarData } = useHead();
  let [Scheduledate, setScheduleDate] = useState();
  let [executionLocation, setExecutionLocation] = useState([]);
  let [environment, setEnvironment] = useState([]);
  let [browser, setBrowser] = useState(["Chrome", "Edge", "Firefox", "Safari"]);
  let [data, setData] = useState({
    browser_type: "Chrome",
    build_environment_id: 0,
    build_environment_name: "",
    client_timezone_id: "Asia/Calcutta",
    execution_location: "",
    is_execute: true,
    is_generate: false,
    module_id: moduleId,
    repository_commit_message: "",
    runtimevariables: "null",
    web_testcases_list_to_execute: [
      {
        testcase_id: 0,
        selected_testcase_dataset_ids: [0],
      },
    ],
    testset_id: testsetId,
    user_id: auth.userId,
  });

  function handleSubmit(e) {
    let payload = {
      jobName: `Testset_${testsetId} `,
      baseurl: qfservice,
      apiurl: "/qfservice/ExecuteWebTestset_v11",
      cron: Scheduledate,
      requestbody: JSON.stringify(data),
    };
    scheduleJob(payload).then((res) => {
      if (res) {
        setSnackbarData({
          status: true,
          message: "Job Scheduled Successfully",
          severity: "success",
        });
      } else {
        setSnackbarData({
          status: true,
          message: "Something went wrong",
          severity: "error",
        });
      }
    });
  }

  useEffect(() => {
    getEnvironment(projectId, moduleId, () => {}).then((res) => {
      setData({ ...data, build_environment_id: res[0]?.id ?? 0 });
      setEnvironment(res);
    });
    getExecutionLocation(projectId, moduleId, setExecutionLocation).then(
      (res) => {
        setData({ ...data, execution_location: res[0]?.value ?? 0 });
      }
    );
  }, [projectId, moduleId]);

  useEffect(() => {
    getTestcaseInTestset(testsetId, () => {}).then((res) => {
      console.log(res);
      let temp = res.map((tc) => {
        return {
          testcase_id: tc.testcase_id,
          selected_testcase_dataset_ids: tc?.datasets.map(
            (ds) => ds.dataset_id
          ),
        };
      });
      setData({ ...data, web_testcases_list_to_execute: temp });
    });
  }, [testsetId]);
  return (
    <div>
      <div className="scheduler">
        <div className="dropdown">
          <label for="">Execution Location</label>
          <select
            onChange={(e) => {
              setData({ ...data, execution_location: e.target.value });
            }}
          >
            {executionLocation?.map((loc) => (
              <option value={loc.value}>{loc.name}</option>
            ))}
          </select>
        </div>
        <div className="dropdown">
          <label for="">Execution Environment</label>
          <select
            onChange={(e) => {
              setData({ ...data, build_environment_id: e.target.value });
              environment.find((env) => {
                if (env.id === e.target.value) {
                  console.log(env.name);
                  setData({ ...data, build_environment_name: e.target.value });
                }
              });
            }}
          >
            {environment?.map((env) => (
              <option value={env.id}>{env.name}</option>
            ))}
          </select>
        </div>
        <div className="dropdown">
          <label for="">Browser</label>
          <select
            onChange={(e) => {
              setData({ ...data, browser_type: e.target.value });
            }}
          >
            {browser?.map((br) => (
              <option value={br}>{br}</option>
            ))}
          </select>
        </div>
      </div>

      <Scheduler
        setDate={(date) => {
          handleSubmit();
          onSubmit();
          setScheduleDate(date);
        }}
      ></Scheduler>
    </div>
  );
}

export default TestSetScheduler;
