import { Paper, Box, Typography, Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { ExpandMore } from "./ExpandMore";

export default function AccordionTemplate(props) {
  const { name, children, defaultState, toggle } = props;
  const [accordionExpanded, setAccordionExpanded] = useState(() =>
    defaultState === undefined ? false : true
  );

  useEffect(() => {
    toggle !== undefined && setAccordionExpanded(toggle);
  }, [toggle]);

  return (
    <Paper className="accordion" elevation={1}>
      <Box sx={{ backgroundColor: "primary.lightGrey" }}>
        <ExpandMore
          expand={accordionExpanded}
          onClick={() => setAccordionExpanded(!accordionExpanded)}
          aria-expanded={accordionExpanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
        <Typography variant="p" gutterBottom>
          {name}
        </Typography>
      </Box>
      <Collapse in={accordionExpanded} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </Paper>
  );
}
