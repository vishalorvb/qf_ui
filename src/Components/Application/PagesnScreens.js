import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AccordionTemplate from "../../CustomComponent/AccordionTemplate";
import useHead from "../../hooks/useHead";
import Pages from "./PagesComponents/Pages";
import Screen from "./ScreenComponents/Screen";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function PagesnScreens() {
  const [expanded, setExpanded] = useState("Pages");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const { setHeader } = useHead();
  const location = useLocation();
  const [expandedName, setExpandedName] = useState(true);
  console.log(location);
  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: location?.state?.module_name + " " + (expanded || ""),
      };
    });
  }, [expanded]);
  return (
    <>
      <Accordion
        expanded={expanded === "Pages"}
        onChange={handleChange("Pages")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Pages</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Pages location={location} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "Screens"}
        onChange={handleChange("Screens")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Screens</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Screen location={location} />
        </AccordionDetails>
      </Accordion>
    </>
  );
}