import { useLocation, Link as RouterLink } from "react-router-dom";
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
          <LinkRouter
            underline="hover"
            color="inherit"
            to={currentLocation}
            key={idx}
          >
            {crumb}
          </LinkRouter>
        </div>
      );
    });

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <LinkRouter to={"/"}>Dashboard</LinkRouter>
      {crumbs}
    </Breadcrumbs>
  );
}
