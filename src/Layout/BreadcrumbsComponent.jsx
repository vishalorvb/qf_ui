import { useLocation, Link as RouterLink, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
export default function BreadcrumbsComponent() {
  const location = useLocation();
  const navigate = useNavigate();

  const crumbTemplate = (idx, crumb) => (
    <div className="crumb" key={idx}>
      <Typography
        underline="none"
        color="inherit"
        key={idx}
        sx={{ cursor: "pointer" }}
      >
        {crumb.replaceAll("%20", " ").replaceAll("-", " ")}
      </Typography>
    </div>
  );

  const crumbs = location.pathname
    ?.split("/")
    ?.filter((crumb) => crumb !== "")
    ?.map((crumb, idx) => {
      return crumbTemplate(idx, crumb);
    });

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {/* <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" /> */}
      {crumbTemplate(99, "Dashboard")}
      {crumbs}
    </Breadcrumbs>
  );
}
