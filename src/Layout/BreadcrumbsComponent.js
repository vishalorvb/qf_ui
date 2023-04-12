import { useLocation, Link as RouterLink, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
export default function BreadcrumbsComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  let currentLocation = ``;
  console.log(location);
  const LinkRouter = (props) => {
    return <Link {...props} component={RouterLink} />;
  };
  const crumbName = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "" && crumb !== "dashboard");
  let nav = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "" && crumb !== "dashboard")?.length;
  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "" && crumb !== "dashboard")
    .map((crumb, idx) => {
      currentLocation += `/${crumb}`;

      nav = ["Application", "Projects", "Testcase", "Testset"].includes(crumb)
        ? nav - 2
        : ["Application", "Projects", "Testcase", "Testset"].includes(
            crumbName[idx - 1]
          )
        ? nav
        : nav - 1;
      let navigator = nav;
      return (
        <div className="crumb" key={idx}>
          <Typography
            underline="none"
            color="inherit"
            onClick={() => navigate(-navigator)}
            key={idx}
            sx={{ cursor: "pointer" }}
          >
            {crumb.replaceAll("%20", " ")}
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
