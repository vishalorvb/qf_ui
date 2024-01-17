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
                route: "Add-User",
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
                route: "Create-Applications",
                accessRole: [1, 2, 4],
            },
            {
                name: "Recent",
                id: "22",
                route: "Recent-Applications",
                state: "recentApplication",
                accessRole: [1, 2, 4],
            },
            {
                name: "Search",
                id: "23",
                route: "Search-Applications",
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
                route: "Create-Projects",
                accessRole: [1, 2, 4],
            },
            {
                name: "Favourite",
                id: "32",
                route: "Favourite-Projects",
                state: "fav",
                accessRole: [1, 2, 4],
            },
            {
                name: "Search",
                id: "33",
                route: "Search-Projects",
                state: "search",
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
                route: "Create-Testcase",
                accessRole: [1, 2, 4],
            },
            {
                name: "Recent",
                id: "42",
                route: "Recent-Testcases",
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
                route: "Create-Testset",
                accessRole: [1, 2, 4],
            },
            {
                name: "Recent",
                id: "52",
                route: "Recent-Testsets",
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
                route: "Testcase-Execution",
                accessRole: [1, 2, 4],
            },
            {
                name: "Testset",
                route: "Testset-Execution",
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
        name: "Testset Report",
        route: "testset-report",
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
        route: "Test-Design",
        accessRole: [1, 2, 4],
        icon: <i className="qf icon-testsets"></i>,
    },
    {
        name: "Test Library",
        id: "6",
        route: "Test-Library",
        accessRole: [1, 2, 4],
        icon: <i className="qf icon-testsets"></i>,
    },
    {
        name: "Custom Code",
        id: "7",
        route: "Custom-Code",
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
                route: "Create-Ansible-Instance",
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
                route: "Create-Pipeline",
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
