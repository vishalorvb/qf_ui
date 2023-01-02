import WorkflowElement from "./WorkflowElement"

export default function Workflows () {

    const tabs = [
        {value:"api",label:"API",moduleType:[1]},
        {value:"page",label:"Pages",moduleType:[1,2]},
        {value:"screen",label:"Screens",moduleType:[1,2]},
        {value:"testCase",label:"TestCases",moduleType:[1,2]},
        {value:"testSet",label:"TestSets",moduleType:[1,2]},
        {value:"report",label:"Report",moduleType:[1,2]},
      ];

      const type = 1;

      const moduleToTabsMap = [
        {}
      ]

    return(<>
        {
            tabs.filter((item)=>item.moduleType.includes(type)).map((item)=><WorkflowElement workflowName={item.label}/>)
        }
        </>     
    )
}