import "../scss/navicons.scss";

export const testManagementList = [
  {
    name: "Admin",
    route: "",
    accessRole: [2],
    icon: <i className="qf icon-admin"></i>,
    subList: [
      {
        name: "Users",
        route: "users",
        accessRole: [2],
      },
      {
        name: "Settings",
        route: "settings",
        accessRole: [2],
      },
    ],
  },
  {
    name: "Application",
    route: "application",
    accessRole: [1, 2, 3, 4, 5, 6, 7],
    icon: <i className="qf icon-applications"></i>,
    // subList: [
    //   {
    //     name: "Web",
    //     route: "application/webApp",
    //     accessRole: [1, 2, 3, 4, 5, 6, 7],
    //   },
    //   {
    //     name: "Mobile",
    //     route: "application/mobileApp",
    //     accessRole: [1, 2, 3, 4, 5, 6, 7],
    //   },
    //   {
    //     name: "API",
    //     route: "application/apiApp",
    //     accessRole: [1, 2, 3, 4, 5, 6, 7],
    //   },
    // ],
  },
  {
    name: "Projects",
    route: "projects",
    accessRole: [1, 2, 3, 4, 5, 6, 7],
    icon: <i className="qf icon-projects"></i>,
  },
  {
    name: "Testcases",
    route: "testcase",
    accessRole: [1, 2, 3, 4, 5, 6, 7],
    icon: <i className="qf icon-testcases"></i>,
  },
  {
    name: "Testsets",
    route: "testset",
    accessRole: [1, 2, 3, 4, 5, 6, 7],
    icon: <i className="qf icon-testsets"></i>,
  },
  {
    name: "Execution",
    route: "execution",
    accessRole: [1, 2, 3, 4, 5, 6, 7],
    icon: <i className="qf icon-execute"></i>,
  },
  {
    name: "Reports",
    route: "reports",
    accessRole: [1, 2, 3, 4, 5, 6, 7],
    icon: <i className="qf icon-reports"></i>,
  },
  {
    name: "Dashboard",
    route: "/",
    accessRole: [1, 2, 3, 4, 5, 6, 7],
    icon: <i className="qf icon-dashboard"></i>,
  },
];

export const opsManagementList = [
  {
    name: "Release",
    route: "release",
    accessRole: [1, 2, 3, 4, 5, 6, 7],
    icon: <i className="qf icon-release"></i>,
  },
  {
    name: "CI CD Pipeline",
    route: "pipeline",
    accessRole: [1, 2, 3, 4, 5, 6, 7],
    icon: <i className="qf icon-cicd"></i>,
  },
];

export const qfAdmin = [
  {
    name: "QF Admin",
    route: "qfAdmin",
    accessRole: [2],
    icon: <i className="qf icon-admin"></i>,
  },
];
