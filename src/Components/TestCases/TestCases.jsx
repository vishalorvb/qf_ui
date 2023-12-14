import { useEffect } from "react";
import useHead from "../../hooks/useHead";
import ProjectnApplicationSelector from "../ProjectnApplicationSelector";
import TestcaseTable from "./TestcaseTable";

function TestCases() {
  const { setHeader, globalProject, globalApplication } = useHead();
  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Recent Testcases",
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <br />
      <div className="apptable">
        <div className="intable">
          <ProjectnApplicationSelector />
        </div>

        <TestcaseTable
          project={globalProject}
          application={globalApplication}
        ></TestcaseTable>
      </div>
    </>
  );
}
export default TestCases;
