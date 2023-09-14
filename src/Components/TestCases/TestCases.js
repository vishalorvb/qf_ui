import { useEffect } from "react";
import useHead from "../../hooks/useHead";
import ProjectnApplicationSelector from "../ProjectnApplicationSelector"
import TestcaseTable from "./TestcaseTable";

function TestCases() {
    const {
        setHeader,
        globalProject,
        globalApplication,
    } = useHead();
    useEffect(() => {
        setHeader((ps) => {
            return {
                ...ps,
                name: "Recent Testcases",
            };
        });
    }, []);

    return (
        <>
            <br />
            <div className="apptable">
                <div className="intable">
                    <ProjectnApplicationSelector />
                </div>
                {globalProject && globalApplication && <div>
                    <TestcaseTable
                        project={globalProject}
                        application={globalApplication}
                    ></TestcaseTable>
                </div>}
            </div>
            <div>
                {globalApplication?.sub_modules_list?.map(app =>
                    <TestcaseTable
                        project={globalProject}
                        application={app}
                        showname={true}
                    ></TestcaseTable>)}
            </div>
        </>
    )
}
export default TestCases