import { List, Paper, Typography } from "@mui/material";
import { useState } from "react";
import NavItem from "./NavItem";

export default function WorkflowNav(props) {
  const { workflowModules, setWorkFlowModuleHead, navigationHeader } = props;

  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleListItemClick = (event, index, mod) => {
    setSelectedIndex(index);
    setWorkFlowModuleHead(mod);
  };

  return (
    <Paper  variant="outlined" >
      <List
        component="nav"
        aria-label="main mailbox folders"
        dense
        disablePadding
      >
        <Typography align="center" variant='h6' color="text.secondary" sx={{backgroundColor:'primary.main',lineHeight:2}}>{navigationHeader}</Typography>

        {workflowModules?.map((mod, index) => (
          <NavItem
            selectedIndex={selectedIndex}
            index={index}
            mod={mod}
            handleListItemClick={handleListItemClick}
            key={index}
          />
        ))}
      </List>
    </Paper>
  );
}
