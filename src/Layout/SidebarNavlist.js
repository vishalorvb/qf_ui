import "../scss/navicons.scss";

export const testManagementList = [
  {
    name: "Admin",
    id: "1",
    route: "",
    accessRole: [2],
    icon: <i className="qf icon-admin"></i>,
    subList: [
      {
        name: "Add User",
        id: "11",
        route: "addUser",
        accessRole: [2],
      },
      {
        name: "Users",
        id: "12",
        route: "users",
        accessRole: [2],
      },
      {
        name: "Settings",
        id: "13",
        route: "settings",
        accessRole: [2],
      },
    ],
  },
  {
    name: "Application",
    id: "2",
    route: "",
    accessRole: [1, 2, 3, 4, 5, 6, 7],
    icon: <i className="qf icon-applications"></i>,
    subList: [
      {
        name: "Create",
        id: "21",
        route: "createApplication",
        accessRole: [1, 2, 3, 4, 5, 6, 7],
      },
      {
        name: "Recent",
        id: "22",
        route: "Application",
        state: "recentApplication",
        accessRole: [1, 2, 3, 4, 5, 6, 7],
      },
      {
        name: "Search",
        id: "23",
        route: "Application",
        accessRole: [1, 2, 3, 4, 5, 6, 7],
      },
    ],
  },
  {
    name: "Projects",
    id: "3",
    route: "projects",
    accessRole: [1, 2, 3, 4, 5, 6, 7],
    icon: <i className="qf icon-projects"></i>,
  },
  {
    name: "Testcases",
    id: "4",
    route: "",
    accessRole: [1, 2, 3, 4, 5, 6, 7],
    icon: <i className="qf icon-testcases"></i>,
    subList: [
      {
        name: "Create",
        id: "41",
        route: "/testcase/create",
        accessRole: [1, 2, 3, 4, 5, 6, 7],
      },
      {
        name: "Recent",
        id: "42",
        route: "testcase",
        accessRole: [1, 2, 3, 4, 5, 6, 7],
      },
      // {
      //   name: "Execution",
      //   route: "",
      //   accessRole: [1, 2, 3, 4, 5, 6, 7],
      // },
    ],
  },
  {
    name: "Testsets",
    id: "5",
    route: "",
    accessRole: [1, 2, 3, 4, 5, 6, 7],
    icon: <i className="qf icon-testsets"></i>,
    subList: [
      {
        name: "Create",
        id: "51",
        route: "testset/createTestset",
        accessRole: [1, 2, 3, 4, 5, 6, 7],
      },
      {
        name: "Recent",
        id: "52",
        route: "testset",
        accessRole: [1, 2, 3, 4, 5, 6, 7],
      },
      // {
      //   name: "Execution",
      //   route: "execution",
      //   accessRole: [1, 2, 3, 4, 5, 6, 7],
      // },
    ],
  },
  {
    name: "Execution",
    id: "6",
    route: "execution",
    accessRole: [1, 2, 3, 4, 5, 6, 7],
    icon: <i className="qf icon-execute"></i>,
  },
  {
    name: "Reports",
    id: "7",
    route: "reports",
    accessRole: [1, 2, 3, 4, 5, 6, 7],
    icon: <i className="qf icon-reports"></i>,
  },
  {
    name: "Dashboard",
    id: "8",
    route: "/",
    accessRole: [1, 2, 3, 4, 5, 6, 7],
    icon: <i className="qf icon-dashboard"></i>,
  },
];

export const opsManagementList = [
  {
    name: "Release",
    id: "9",
    route: "release",
    accessRole: [1, 2, 3, 4, 5, 6, 7],
    icon: <i className="qf icon-release"></i>,
  },
  {
    name: "CI CD Pipeline",
    id: "1a",
    route: "pipeline",
    accessRole: [1, 2, 3, 4, 5, 6, 7],
    icon: <i className="qf icon-cicd"></i>,
  },
];

export const qfAdmin = [
  {
    name: "QF Admin",
    id: "1b",
    route: "qfAdmin",
    accessRole: [2],
    icon: <i className="qf icon-admin"></i>,
  },
];
