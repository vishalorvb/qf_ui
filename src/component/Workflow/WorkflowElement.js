import { Paper, Box, Typography, Collapse, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import { useState } from "react";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function WorkflowElement(props) {
  const { workflowName, component } = props;
  const [workflowExpanded, setWorkFlowExpanded] = useState(false);

  return (
    <Paper className="accordion" elevation={1}>
      <Box sx={{ backgroundColor: "primary.lightGrey" }}>
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
      <Collapse in={workflowExpanded} timeout="auto" unmountOnExit>
        {component}
      </Collapse>
    </Paper>
  );
}
