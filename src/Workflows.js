import { Typography } from "@mui/material";
import WorkflowElement from "./WorkflowElement";
import API from "./component/ProjectModule/Actions/Workflow/WorkflowTabs/API";
import PagesScreen from "./component/ProjectModule/Actions/Workflow/WorkflowTabs/PagesScreen";
import Screens from "./component/ProjectModule/Actions/Workflow/WorkflowTabs/Screens";
import TestCases from "./component/ProjectModule/Actions/Workflow/WorkflowTabs/TestCases";
import TestSets from "./component/ProjectModule/Actions/Workflow/WorkflowTabs/TestSets";
import Report from "./component/ProjectModule/Actions/Workflow/WorkflowTabs/Report";

export default function Workflows(props) {
  const { project } = props;

  const tabs = [
    {
      value: "api",
      label: "API",
      component: <API module={project} />,
      moduleType: [1],
    },
    {
      value: "page",
      label: "Pages",
      component: <PagesScreen module={project} />,
      moduleType: [1, 2],
    },
    {
      value: "screen",
      label: "Screens",
      component: <Screens module={project} />,
      moduleType: [1, 2],
    },
    {
      value: "testCase",
      label: "TestCases",
      component: <TestCases module={project} />,
      moduleType: [1, 2],
    },
    {
      value: "testSet",
      label: "TestSets",
      component: <TestSets module={project} />,
      moduleType: [1, 2],
    },
    {
      value: "report",
      label: "Report",
      component: <Report module={project} />,
      moduleType: [1, 2],
    },
  ];

  const type = 2;

  return (
    <div className="elementGroup">
      <Typography variant="h5" gutterBottom>
        {project.module_name}
      </Typography>
      <div className="accordionParent">
        {tabs
          .filter((item) => item.moduleType.includes(type))
          .map((item) => (
            <WorkflowElement
              workflowName={item.label}
              component={item.component}
            />
          ))}
      </div>
    </div>
  );
}
