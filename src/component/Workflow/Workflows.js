import { Typography } from "@mui/material";
import API from "./WorkflowTabs/API";
import PagesScreen from "./WorkflowTabs/PagesScreen";
import Screens from "./WorkflowTabs/Screens";
import TestCases from "./WorkflowTabs/TestCases";
import TestSets from "./WorkflowTabs/TestSets";
import Report from "./WorkflowTabs/Report";
import AccordionTemplate from "../CustomComponent/AccordionTemplate";
import Breadcrumb from "./Breadcrumb";

export default function Workflows(props) {
  const { module, project } = props;

  console.table(module);
  const tabs = [
    {
      value: "api",
      label: "API",
      component: <API module={module} />,
      moduleType: [1],
    },
    {
      value: "page",
      label: "Pages",
      component: <PagesScreen module={module} />,
      moduleType: [1, 2],
    },
    {
      value: "screen",
      label: "Screens",
      component: <Screens module={module} />,
      moduleType: [1, 2],
    },
    {
      value: "testCase",
      label: "TestCases",
      component: <TestCases module={module} />,
      moduleType: [1, 2],
    },
    {
      value: "testSet",
      label: "TestSets",
      component: <TestSets module={module} />,
      moduleType: [1, 2],
    },
    {
      value: "report",
      label: "Report",
      component: <Report module={module} />,
      moduleType: [1, 2],
    },
  ];

  const type = 2;

  return (
    <div className="elementGroup">
      <Typography variant="h5" gutterBottom>
        {module.module_name}
      </Typography>
      <Breadcrumb
        projectName={project.project_name}
        workflowName={module.module_name}
      />
      <div className="accordionParent">
        {tabs
          .filter((item) => item.moduleType.includes(type))
          .map((item, index) => (
            <AccordionTemplate
              key={item.label}
              name={item.label}
              defaultState={index === 0}
            >
              {item.component}
            </AccordionTemplate>
          ))}
      </div>
    </div>
  );
}
