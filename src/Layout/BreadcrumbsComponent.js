import { useLocation, Link as RouterLink, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
export default function BreadcrumbsComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  let currentLocation = ``;

  const LinkRouter = (props) => {
    return <Link {...props} component={RouterLink} />;
  };
  let nav = -1;
  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "" && crumb !== "dashboard")
    .map((crumb, idx) => {
      currentLocation += `/${crumb}`;
      nav = ["Application"].includes(crumb) ? nav : nav + 1;
      return (
        <div className="crumb" key={idx}>
          <Typography
            underline="none"
            color="inherit"
            // to={currentLocation}
            onClick={() => navigate(-nav)}
            key={idx}
            sx={{ cursor: "pointer" }}
          >
            {crumb}
          </Typography>
        </div>
      );
    });

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <LinkRouter to={"/"}>
        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        Home
      </LinkRouter>
      {crumbs}
    </Breadcrumbs>
  );
}
