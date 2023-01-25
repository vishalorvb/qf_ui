import { useLocation, Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "@mui/material";

export default function BreadcrumbsComponent() {
  const location = useLocation();

  let currentLocation = ``;

  const LinkRouter = (props) => {
    return <Link {...props} component={RouterLink} />;
  };

  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "" && crumb !== "dashboard")
    .map((crumb, idx) => {
      currentLocation += `/${crumb}`;
      return (
        <div className="crumb" key={idx}>
          {crumb === "application" ? (
            <p>Application</p>
          ) : (
            <LinkRouter
              underline="hover"
              color="inherit"
              to={currentLocation}
              key={idx}
            >
              {crumb}
            </LinkRouter>
          )}
        </div>
      );
    });

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <LinkRouter to={"dashboard"}>Dashboard</LinkRouter>
      {crumbs}
    </Breadcrumbs>
  );
}
