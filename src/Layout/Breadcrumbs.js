import { useLocation, Link } from "react-router-dom";

export default function Breadcrumbs() {
  const location = useLocation();

  let currentLocation;

  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "" && crumb !== "dashboard")
    .map((crumb) => {
      console.log(crumb);
      currentLocation = +`/${crumb}`;
      return (
        <div className="crumb" key={crumb}>
          {crumb === "application" ? (
            <p>{crumb}</p>
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
