import { useLocation, Link } from "react-router-dom";

export default function Breadcrumbs() {
  const location = useLocation();
  console.log(location);

  let currentLocation = ``;

  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "" && crumb !== "dashboard")
    .map((crumb, idx) => {
      console.log(crumb);
      currentLocation += `/${crumb}`;
      return (
        <div className="crumb" key={idx}>
          {crumb === "application" ? (
            <p>Application</p>
          ) : (
            <Link to={currentLocation}>{crumb}</Link>
          )}
        </div>
      );
    });

  return (
    <div className="breadcrumb">
      <div className="crumb">
        <Link to={"dashboard"}>Dashboard</Link>
      </div>
      {crumbs}
    </div>
  );
}
