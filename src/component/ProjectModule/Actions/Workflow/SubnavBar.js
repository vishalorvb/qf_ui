import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PagesScreen from './WorkflowTabs/PagesScreen';
import Screens from './WorkflowTabs/Screens';
import TestCases from './WorkflowTabs/TestCases';
import TestSets from './WorkflowTabs/TestSets';
import Report from './WorkflowTabs/Report';
import API from './WorkflowTabs/API';
import { useEffect } from 'react';

export default function SubnavBar ({workFlowModuleDetails}) {

    const tabs = [
      {value:"api",label:"API",component:<API module={workFlowModuleDetails}/>,moduleType:[1]},
      {value:"page",label:"Pages",component:<PagesScreen module={workFlowModuleDetails}/>,moduleType:[1,2]},
      {value:"screen",label:"Screens",component:<Screens module={workFlowModuleDetails}/>,moduleType:[1,2]},
      {value:"testCase",label:"TestCases",component:<TestCases module={workFlowModuleDetails}/>,moduleType:[1,2]},
      {value:"testSet",label:"TestSets",component:<TestSets module={workFlowModuleDetails}/>,moduleType:[1,2]},
      {value:"report",label:"Report",component:<Report module={workFlowModuleDetails}/>,moduleType:[1,2]},
    ];

    const [value, setValue] = React.useState(null);
    const [tabDisplay, setTabDisplay] = React.useState(null);

    const handleChange = (e, newValue) => {
      setValue(newValue);
    };

    const switchTab = (component) => {
        setTabDisplay(component)
    }

    useEffect(() => {
      setTabDisplay(()=>{
        const match = tabs.find((tab)=> tab.moduleType.includes(workFlowModuleDetails.module_type));
        return match?.component;
      })
      setValue(()=>{
        const match = tabs.find((tab)=> tab.moduleType.includes(workFlowModuleDetails.module_type));
        return match?.value;
      })
      console.log(workFlowModuleDetails)
    }, [workFlowModuleDetails])
    


    return (
        <Box sx={{ width: '100%' }} >
          {Object.keys(workFlowModuleDetails).length === 0 && "Select a WorkFlow"}
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            variant="fullWidth"
          >
            {tabs.filter(tab=>tab.moduleType.includes(workFlowModuleDetails.module_type)).map((tab)=><Tab disabled={tab.value === "module_name"} sx={{border: tab.value === "module_name" ? ' 5px double rgba(137,196,244,1)' : ''}} value={tab.value} label={tab.label} onClick={()=>switchTab(tab.component)} />)}
          </Tabs>
          <Box sx={{marginTop:'10px'}}>{tabDisplay}</Box>
        </Box>
      );
}