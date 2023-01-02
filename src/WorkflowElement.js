import { Paper,Box,Typography,Collapse,IconButton } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { useState } from "react";

import PagesScreen from "./component/ProjectModule/Actions/Workflow/WorkflowTabs/PagesScreen";


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function WorkflowElement(props) {

    const{workflowName} = props;
    const[workflowExpanded,setWorkFlowExpanded] = useState(false);

  return (
    <Paper elevation={1} sx={{ marginTop: '10px' }}>
      <Box sx={{backgroundColor: "primary.main" }}>
        <ExpandMore
          expand={workflowExpanded}
          onClick={() => setWorkFlowExpanded(!workflowExpanded)}
          aria-expanded={workflowExpanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
        <Typography variant="p" gutterBottom>
          {workflowName}
        </Typography>
      </Box>
      <Collapse in={workflowExpanded} timeout="auto" unmountOnExit><PagesScreen/></Collapse>
    </Paper>
  );
}
