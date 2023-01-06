import React from "react";

// MasterData Config
const ProjectRecent = React.lazy(() =>
  import("./component/ProjectModule/RecentProject/Recent")
);
const ExecutionRecent = React.lazy(() =>
  import("./component/ExecutionModule/ExecutionRecent")
);
const ExecutionSearch = React.lazy(() =>
  import("./component/ExecutionModule/ExecutionSearch")
);
const OrganisationDashboard = React.lazy(() =>
  import("./component/Organisation/InformationDashboardComponent/Dashboard")
);
const OrganisationUsers = React.lazy(() =>
  import("./component/Organisation/UsersComponent/Users")
);
const OrganisationReport = React.lazy(() =>
  import("./component/Organisation/Report")
);
const OrganisationSettings = React.lazy(() =>
  import("./component/Organisation/Settings")
);
const ProjectFavorite = React.lazy(() =>
  import("./component/ProjectModule/Favourites/Favourite")
);
const ProjectSearch = React.lazy(() =>
  import("./component/ProjectModule/Search/SearchProject")
);

const routes = [
  {
    path: "/recent-project",
    name: "ProjectRecent",
    element: ProjectRecent,
    exact: true,
  },
  {
    path: "/recent-execution",
    name: "ExecutionRecent",
    element: ExecutionRecent,
    exact: true,
  },
  {
    path: "/search-execution",
    name: "ExecutionSearch",
    element: ExecutionSearch,
    exact: true,
  },
  {
    path: "/Dashboard",
    name: "OrganisationDashboard",
    element: OrganisationDashboard,
    exact: true,
  },
  {
    path: "/Users",
    name: "OrganisationUsers",
    element: OrganisationUsers,
    exact: true,
  },
  {
    path: "/Report",
    name: "OrganisationReport",
    element: OrganisationReport,
    exact: true,
  },
  {
    path: "/Settings",
    name: "OrganisationSettings",
    element: OrganisationSettings,
    exact: true,
  },
  {
    path: "/favorite",
    name: "ProjectFavorite",
    element: ProjectFavorite,
    exact: true,
  },
  {
    path: "/search",
    name: "ProjectSearch",
    element: ProjectSearch,
    exact: true,
  },
];

export default routes;
