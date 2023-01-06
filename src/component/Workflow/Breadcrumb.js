import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function Breadcrumb(props) {
  const { projectName, workflowName } = props;
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize="small" />}
      >
        <Link underline="hover" color="inherit" href="/">
          {projectName} Workflow
        </Link>
        <Typography color="text.primary">{workflowName}</Typography>
      </Breadcrumbs>
    </div>
  );
}
