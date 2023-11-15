import "../scss/navicons.scss";

export const testManagementList = [
  {
    name: "Dashboard",
    id: "8",
    route: "/",
    accessRole: [1, 2, 4],
    icon: <i className="qf icon-dashboard"></i>,
  },
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
    accessRole: [1, 2, 4],
    icon: <i className="qf icon-applications"></i>,
    subList: [
      {
        name: "Create",
        id: "21",
        route: "Application/Create",
        accessRole: [1, 2, 4],
      },
      {
        name: "Recent",
        id: "22",
        route: "Application/Recent",
        state: "recentApplication",
        accessRole: [1, 2, 4],
      },
      {
        name: "Search",
        id: "23",
        route: "Application/Search",
        accessRole: [1, 2, 4],
      },
    ],
  },
  {
    name: "Projects",
    id: "3",
    route: "",
    accessRole: [1, 2, 4],
    icon: <i className="qf icon-projects"></i>,
    subList: [
      {
        name: "Create",
        id: "31",
        route: "Projects/Create",
        accessRole: [1, 2, 4],
      },
      {
        name: "Favourite",
        id: "32",
        route: "Projects/favourite",
        state: "recentProjects",
        accessRole: [1, 2, 4],
      },
      {
        name: "Search",
        id: "33",
        route: "Projects/Search",
        accessRole: [1, 2, 4],
      },
    ],
  },
  {
    name: "Testcases",
    id: "4",
    route: "",
    accessRole: [1, 2, 4],
    icon: <i className="qf icon-testcases"></i>,
    subList: [
      {
        name: "Create",
        id: "41",
        route: "Testcase/Create",
        accessRole: [1, 2, 4],
      },
      {
        name: "Recent",
        id: "42",
        route: "Testcase/Recent",
        accessRole: [1, 2, 4],
      },
    ],
  },
  {
    name: "Testsets",
    id: "5",
    route: "",
    accessRole: [1, 2, 4],
    icon: <i className="qf icon-testsets"></i>,
    subList: [
      {
        name: "Create",
        id: "51",
        route: "Testset/Create",
        accessRole: [1, 2, 4],
      },
      {
        name: "Recent",
        id: "52",
        route: "Testset/Recent",
        accessRole: [1, 2, 4],
      },
    ],
  },
  {
    name: "Execution",
    route: "",
    accessRole: [1, 2, 4],
    icon: <i className="qf icon-execute"></i>,
    subList: [
      {
        name: "Testcase",
        route: "TestcaseExecution",
        accessRole: [1, 2, 4],
      },
      {
        name: "Testset",
        route: "TestsetExecution",
        accessRole: [1, 2, 4],
      },
    ],
  },
];

export const reportsManagementList = [
  {
    name: "Reports",
    id: "7",
    route: "reports",
    accessRole: [1, 2, 4],
    icon: <i className="qf icon-reports"></i>,
  },
  {
    name: "PowerBI",
    route: "",
    accessRole: [1, 2, 4],
    icon: <i className="qf icon-reports"></i>,
    subList: [
      {
        name: "Configuration",
        route: "BIReports",
        accessRole: [1, 2, 4],
      },
      {
        name: "BIReports",
        route: "https://app.powerbi.com/",
        accessRole: [1, 2, 4],
      },
    ],
  },
];
export const functionalManagementList = [
  {
    name: "Test Design",
    id: "5",
    route: "TestDesign",
    accessRole: [1, 2, 4],
    icon: <i className="qf icon-testsets"></i>,
  },
  {
    name: "Test Library",
    id: "5",
    route: "TestLibrary",
    accessRole: [1, 2, 4],
    icon: <i className="qf icon-testsets"></i>,
  },
  {
    name: "Custom Code",
    id: "6",
    route: "CustomCode",
    accessRole: [1, 2, 4],
    icon: <i className="qf icon-testsets"></i>,
  },
];
export const opsManagementList = [
  {
    name: "Release",
    id: "9",
    route: "",
    accessRole: [1, 2, 4],
    icon: <i className="qf icon-release"></i>,
    subList: [
      {
        name: "Create",
        id: "91",
        route: "release/createAnsibleInstance",
        accessRole: [1, 2, 4],
      },
      {
        name: "Recent",
        id: "92",
        route: "release",
        accessRole: [1, 2, 4],
      },
    ],
  },
  {
    name: "CI CD Pipeline",
    id: "1a",
    route: "",
    accessRole: [1, 2, 4],
    icon: <i className="qf icon-cicd"></i>,
    subList: [
      {
        name: "Create",
        id: "1a1",
        route: "pipeline/CreatePipeline",
        accessRole: [1, 2, 4],
      },
      {
        name: "Recent",
        id: "1a2",
        route: "pipeline",
        accessRole: [1, 2, 4],
      },
    ],
  },
];

export const qfAdmin = [
  {
    name: "Organization",
    id: "10",
    route: "",
    accessRole: [5],
    icon: <i className="qf icon-admin"></i>,
    subList: [
      {
        name: "Add Organization",
        id: "93",
        route: "AddOrganization",
        accessRole: [3, 5],
      },
      {
        name: "Recent",
        id: "94",
        route: "Organization",
        accessRole: [3, 5],
      },
    ],
  },
];
