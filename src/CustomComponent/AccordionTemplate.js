import { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function AccordionTemplate(props) {
  const { name, children, defaultState, toggle } = props;
  const [accordionExpanded, setAccordionExpanded] = useState(() =>
    defaultState === undefined ? false : defaultState
  );

  useEffect(() => {
    toggle !== undefined && setAccordionExpanded(toggle);
  }, [toggle]);

  return (
    <Accordion
      expanded={accordionExpanded}
      onChange={() => setAccordionExpanded(!accordionExpanded)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{name}</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}
