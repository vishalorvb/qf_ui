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
        route: "Application/Create",
        accessRole: [1, 2, 3, 4, 5, 6, 7],
      },
      {
        name: "Recent",
        id: "22",
        route: "Application/Recent",
        state: "recentApplication",
        accessRole: [1, 2, 3, 4, 5, 6, 7],
      },
      {
        name: "Search",
        id: "23",
        route: "Application/Search",
        accessRole: [1, 2, 3, 4, 5, 6, 7],
      },
    ],
  },
  {
    name: "Projects",
    id: "3",
    route: "",
    accessRole: [1, 2, 3, 4, 5, 6, 7],
    icon: <i className="qf icon-projects"></i>,
    subList: [
      {
        name: "Create",
        id: "31",
        route: "Projects/Create",
        accessRole: [1, 2, 3, 4, 5, 6, 7],
      },
      {
        name: "Recent",
        id: "32",
        route: "Projects/Recent",
        state: "recentProjects",
        accessRole: [1, 2, 3, 4, 5, 6, 7],
      },
      {
        name: "Search",
        id: "33",
        route: "Projects/Search",
        accessRole: [1, 2, 3, 4, 5, 6, 7],
      },
    ],
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
        route: "Testcase/Create",
        accessRole: [1, 2, 3, 4, 5, 6, 7],
      },
      {
        name: "Recent",
        id: "42",
        route: "Testcase/Recent",
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
        route: "Testset/Create",
        accessRole: [1, 2, 3, 4, 5, 6, 7],
      },
      {
        name: "Recent",
        id: "52",
        route: "Testset/Recent",
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
    route: "",
    accessRole: [1, 2, 3, 4, 5, 6, 7],
    icon: <i className="qf icon-execute"></i>,
    subList: [
      {
        name: "Testcase",
        route: "TestcaseExecution",
        accessRole: [1, 2, 3, 4, 5, 6, 7],
      },
      {
        name: "Testset",
        route: "TestsetExecution",
        accessRole: [1, 2, 3, 4, 5, 6, 7],
      },
    ],
  },
  {
    name: "Reports",
    id: "7",
    route: "reports",
    accessRole: [1, 2, 3, 4, 5, 6, 7],
    icon: <i className="qf icon-reports"></i>,
  },
  {
    name: "BIReports",
    id: "1c",
    route: "BIReports",
    accessRole: [ 2 ],
    icon: <i className="qf icon-bireports"></i>,
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
    route: "",
    accessRole: [1, 2, 3, 4, 5, 6, 7],
    icon: <i className="qf icon-release"></i>,
    subList: [
      {
        name: "Create",
        id: "91",
        route: "release/createAnsibleInstance",
        accessRole: [1, 2, 3, 4, 5, 6, 7],
      },
      {
        name: "Recent",
        id: "92",
        route: "release",
        accessRole: [1, 2, 3, 4, 5, 6, 7],
      },
    ],
  },
  {
    name: "CI CD Pipeline",
    id: "1a",
    route: "",
    accessRole: [1, 2, 3, 4, 5, 6, 7],
    icon: <i className="qf icon-cicd"></i>,
    subList: [
      {
        name: "Create",
        id: "1a1",
        route: "pipeline/CreatePipeline",
        accessRole: [1, 2, 3, 4, 5, 6, 7],
      },
      {
        name: "Recent",
        id: "1a2",
        route: "pipeline",
        accessRole: [1, 2, 3, 4, 5, 6, 7],
      },
    ],
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
