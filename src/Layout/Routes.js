import { lazy } from "react";

import PipelineAutomation from "../Components/DevopsComponent/PipelineAutomation";
import Report from "../Components/DevopsComponent/Report";

const Admin = lazy(() => import("../pages/Admin"));
const ApiApp = lazy(() =>
  import("../Components/Application/ApiApplication/ApiApp")
);
const Execution = lazy(() => import("../pages/Execution"));
const MobileApp = lazy(() => import("../pages/MobileApp"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Pipeline = lazy(() => import("../pages/Pipeline"));
const Projects = lazy(() => import("../pages/Projects"));
const QFAdmin = lazy(() => import("../pages/QFAdmin"));
const Release = lazy(() => import("../pages/Release"));
const Reports = lazy(() => import("../pages/Reports"));
const TestCases = lazy(() => import("../Components/TestCases/TestCases"));
const Testset = lazy(() => import("../pages/Testset"));
const Applications = lazy(() => import("../pages/Applications"));
const Pages = lazy(() =>
  import("../Components/Application/PagesComponents/Pages")
);
const PageElements = lazy(() =>
  import("../Components/Application/PagesComponents/PageElements")
);
const CreateProject = lazy(() =>
  import("../Components/ProjectComponents/CreateProject")
);
const APIsTable = lazy(() =>
  import("../Components/Application/ApiApplication/APIsTable")
);
const Dataset = lazy(() => import("../Components/TestCases/Dataset"));
const Api = lazy(() => import("../Components/ApiComponents/Api"));
const ApiDatasets = lazy(() =>
  import("../Components/ApiComponents/CreateApi/ApiDatasets")
);
const CreateInstance = lazy(() =>
  import("../Components/ReleaseComponents/CreateInstance")
);
const CreateAnsibleInstance = lazy(() =>
  import("../Components/ReleaseComponents/CreateAnsibleInstance")
);
const UpdateAnsibleInstance = lazy(() =>
  import("../Components/ReleaseComponents/CreateAnsibleInstance")
);
const AddTestcaseToTestset = lazy(() =>
  import("../Components/TestSet/AddTestcaseToTestset")
);
const CreatePipeline = lazy(() =>
  import("../Components/DevopsComponent/CreatePipeline")
);
const createTestset = lazy(() => import("../Components/TestSet/TestsetCreate"));

const UpdateTestcasesOrder = lazy(() =>
  import("../Components/TestSet/UpdateTestcasesOrder")
);

const Settings = lazy(() => import("../pages/Settings"));
const AddUser = lazy(() => import("../pages/AddUser"));
const EditUser = lazy(() => import("../Components/UsersPopups/EditUser"));
const GetTestcases = lazy(() => import("../pages/GetTestcases"));
const Screen = lazy(() =>
  import("../Components/Application/ScreenComponents/Screen")
);
const CreateScreen = lazy(() =>
  import(`../Components/Application/ScreenComponents/CreateScreen`)
);
const SelectedPageElements = lazy(() =>
  import("../Components/Application/ScreenComponents/SelectedPageElements")
);

const ScreenElements = lazy(() =>
  import("../Components/Application/ScreenComponents/ScreenElements")
);
const UpdateScreen = lazy(() =>
  import("../Components/Application/ScreenComponents/UpdateScreen")
);
const MapApiTestCase = lazy(() =>
  import("../Components/TestCases/apiTestcase/MapApiTestCase")
);
const WebTestcase = lazy(() =>
  import("../Components/TestCases/webTestcase/WebTestcase")
);
const CreateWebTestcase = lazy(() =>
  import("../Components/TestCases/webTestcase/CreateWebTestcase")
);

const ViewReport = lazy(() => import("../pages/ViewReport"));

const AllReport = lazy(() => import("../Components/Reports/AllReports"));

const UpdateScreenOrder = lazy(() =>
  import("../Components/TestCases/UpdateScreenOrderinDataset")
);
const APIorderupdate = lazy(() =>
  import(`../Components/TestCases/apiTestcase/APIorderupdate`)
);

const ConfigureDevice = lazy(() =>
  import("../Components/ConfigureDevices/ConfigureDevice")
);
const UpdateConfigureDevice = lazy(() =>
  import("../Components/ConfigureDevices/UpdateConfigureDevice")
);
const AddConfigurationPopUp = lazy(() =>
  import("../Components/ConfigureDevices/AddConfigurationPopUp")
);
const getTestcases = lazy(() => import(`../pages/GetTestcases`));
const createApplication = lazy(() =>
  import(`../Components/Application/CreateApplication`)
);
const applicationList = lazy(() => import(`../pages/ApplicationList`));
const pagesnscreen = lazy(() =>
  import(`../Components/Application/PagesnScreens`)
);
const CreateTestCase = lazy(() =>
  import("../Components/TestCases/CreateTestCase")
);

const TestcaseExecution = lazy(() =>
  import(`../Components/Execution/TestcaseExecution`)
);
const TestsetExecution = lazy(() =>
  import(`../Components/Execution/TestsetExecution`)
);

const AddEnvironemt = lazy(() =>
  import(`../Components/Execution/AddEnvironment`)
);

export const Routes = [
  {
    path: "Application/Recent",
    element: applicationList,
    accessRole: [1, 2, 3, 4, 5, 6, 7],
    subRoute: [
      {
        path: ":pagesnscreen",
        element: pagesnscreen,
        accessRole: [1, 2, 3, 4, 5, 6, 7],
        subRoute: [
          {
            path: "PageElements",
            element: PageElements,
            accessRole: [1, 2, 3, 4, 5, 6, 7],
          },
          {
            path: "screenelements",
            element: ScreenElements,
            accessRole: [1, 2, 3, 4, 5, 6, 7],
          },
          {
            path: "SelectElements",
            element: SelectedPageElements,
            accessRole: [1, 2, 3, 4, 5, 6, 7],
          },
        ],
      },
    ],
  },
  {
    path: "Application/Search",
    element: applicationList,
    accessRole: [1, 2, 3, 4, 5, 6, 7],
    subRoute: [
      {
        path: ":pagesnscreen",
        element: pagesnscreen,
        accessRole: [1, 2, 3, 4, 5, 6, 7],
        subRoute: [
          {
            path: "PageElements",
            element: PageElements,
            accessRole: [1, 2, 3, 4, 5, 6, 7],
          },
          {
            path: "screenelements",
            element: ScreenElements,
            accessRole: [1, 2, 3, 4, 5, 6, 7],
          },
          {
            path: "SelectElements",
            element: SelectedPageElements,
            accessRole: [1, 2, 3, 4, 5, 6, 7],
          },
        ],
      },
    ],
  },
  {
    path: "Application/Create",
    element: createApplication,
    accessRole: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    path: "Projects/Recent",
    element: Projects,
    accessRole: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    path: "Projects/Search",
    element: Projects,
    accessRole: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    path: "Projects/Create",
    element: CreateProject,
    accessRole: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    path: "Projects/Search",
    element: CreateProject,
    accessRole: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    path: "TestcasesList",
    element: getTestcases,
    accessRole: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    path: "users",
    element: Admin,
    accessRole: [2],
  },
  {
    path: "settings",
    element: Settings,
    accessRole: [2],
  },
  {
    path: "addUser",
    element: AddUser,
    accessRole: [2],
  },
  {
    path: "users/editUser",
    element: EditUser,
    accessRole: [2],
  },
  {
    path: "application/apiApp",
    element: ApiApp,
    accessRole: [1, 2, 3, 4, 5, 6, 7],
    subRoute: [
      {
        path: "apiRequests",
        element: APIsTable,
        accessRole: [1, 2, 3, 4, 5, 6, 7],
        subRoute: [
          {
            path: "create",
            element: Api,
            accessRole: [1, 2, 3, 4, 5, 6, 7],
          },
        ],
      },
    ],
  },
  {
    path: "TestcaseExecution",
    element: TestcaseExecution,
    accessRole: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    path: "TestsetExecution",
    element: TestsetExecution,
    accessRole: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    path: "TestcaseExecution",
    element: TestcaseExecution,
    accessRole: [1, 2, 3, 4, 5, 6, 7],
  },

  {
    path: "TestsetExecution",
    element: TestsetExecution,
    accessRole: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    path: "addEnvironment",
    element: AddEnvironemt,
    accessRole: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    path: "getTestcases",
    element: GetTestcases,
    accessRole: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    path: "application/mobileApp",
    element: MobileApp,
    accessRole: [1, 2, 3, 4, 5, 6, 7],
    subRoute: [
      {
        path: ":id",
        element: Pages,
        accessRole: [1, 2, 3, 4, 5, 6, 7],
        subRoute: [
          {
            path: ":id",
            element: PageElements,
            accessRole: [1, 2, 3, 4, 5, 6, 7],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: NotFound,
    accessRole: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    path: "pipeline",
    element: Pipeline,
    accessRole: [1, 2, 3, 4, 5, 6, 7],
    subRoute: [
      {
        path: "CreatePipeline",
        element: CreatePipeline,
        accessRole: [1, 2, 3, 4, 5, 6, 7],
      },
      {
        path: "pipelineAutomation",
        element: PipelineAutomation,
        accessRole: [1, 2, 3, 4, 5, 6, 7],
        subRoute: [
          {
            path: "report",
            element: Report,
            accessRole: [1, 2, 3, 4, 5, 6, 7],
          },
        ],
      },
    ],
  },
  // {
  //   path: "projects",
  //   element: Projects,
  //   accessRole: [1, 2, 3, 4, 5, 6, 7],
  //   subRoute: [
  //     {
  //       path: "createProject",
  //       element: CreateProject,
  //       accessRole: [1, 2, 3, 4, 5, 6, 7],
  //     },
  //   ],
  // },
  {
    path: "qfAdmin",
    element: QFAdmin,
    accessRole: [1, 2],
  },
  {
    path: "release",
    element: Release,
    accessRole: [1, 2, 3, 4, 5, 6, 7],
    subRoute: [
      {
        path: "CreateInstance",
        element: CreateInstance,
        accessRole: [1, 2, 3, 4, 5, 6, 7],
      },
      {
        path: "CreateAnsibleInstance",
        element: CreateAnsibleInstance,
        accessRole: [1, 2, 3, 4, 5, 6, 7],
      },
      {
        path: "UpdateAnsibleInstance",
        element: UpdateAnsibleInstance,
        accessRole: [1, 2, 3, 4, 5, 6, 7],
      },
    ],
  },
  {
    path: "reports",
    element: Reports,
    accessRole: [1, 2, 3, 4, 5, 6, 7],
    subRoute: [
      {
        path: "viewReport",
        element: ViewReport,
        accessRole: [1, 2, 3, 4, 5, 6, 7],
      },
    ],
  },

  {
    path: "reports",
    element: Reports,
    accessRole: [1, 2, 3, 4, 5, 6, 7],
    subRoute: [
      {
        path: "AllReports",
        element: AllReport,
        accessRole: [1, 2, 3, 4, 5, 6, 7],
      },
    ],
  },

  {
    path: "configureDevice",
    element: ConfigureDevice,
    accessRole: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    path: "updateConfigureDevice",
    element: UpdateConfigureDevice,
    accessRole: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    path: "addConfigureDevice",
    element: AddConfigurationPopUp,
    accessRole: [1, 2, 3, 4, 5, 6, 7],
  },

  {
    path: "Testcase/Recent",
    element: TestCases,
    accessRole: [1, 2, 3, 4, 5, 6, 7],
    subRoute: [
      {
        path: "MapApiTestCase",
        element: MapApiTestCase,
        accessRole: [1, 2, 3, 4, 5, 6, 7],
      },
      {
        path: "AddScreen",
        element: CreateWebTestcase,
        accessRole: [1, 2, 3, 4, 5, 6, 7],
      },
      {
        path: "datasets",
        element: Dataset,
        accessRole: [1, 2, 3, 4, 5, 6, 7],
      },
      {
        path: "updateScreenOrder",
        element: UpdateScreenOrder,
        accessRole: [1, 2, 3, 4, 5, 6, 7],
      },
      {
        path: "updateAPIOrder",
        element: APIorderupdate,
        accessRole: [1, 2, 3, 4, 5, 6, 7],
      },
      {
        path: "apidatasets",
        element: ApiDatasets,
        accessRole: [1, 2, 3, 4, 5, 6, 7],
      },
    ],
  },
  {
    path: "Testcase/Create",
    element: CreateTestCase,
    accessRole: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    path: "Testset/Recent",
    element: Testset,
    accessRole: [1, 2, 3, 4, 5, 6, 7],
    subRoute: [
      {
        path: "Update",
        element: AddTestcaseToTestset,
        accessRole: [1, 2, 3, 4, 5, 6, 7],
      },
      {
        path: "Reorder",
        element: UpdateTestcasesOrder,
        accessRole: [1, 2, 3, 4, 5, 6, 7],
      },
    ],
  },
  {
    path: "Testset/Create",
    element: createTestset,
    accessRole: [1, 2, 3, 4, 5, 6, 7],
  },
  // {
  //   path: "application",
  //   element: Applications,
  //   accessRole: [1, 2, 3, 4, 5, 6, 7],
  //   subRoute: [
  //     {
  //       path: "pages",
  //       element: Pages,
  //       accessRole: [1, 2, 3, 4, 5, 6, 7],
  //       subRoute: [
  //         {
  //           path: "PageElements",
  //           element: PageElements,
  //           accessRole: [1, 2, 3, 4, 5, 6, 7],
  //         },
  //       ],
  //     },
  //     {
  //       path: "screen",
  //       element: Screen,
  //       accessRole: [1, 2, 3, 4, 5, 6, 7],
  //       subRoute: [
  //         {
  //           path: "createscreen",
  //           element: CreateScreen,
  //           accessRole: [1, 2, 3, 4, 5, 6, 7],
  //           subRoute: [
  //             {
  //               path: "SelectElements",
  //               element: SelectedPageElements,
  //               accessRole: [1, 2, 3, 4, 5, 6, 7],
  //             },
  //           ],
  //         },
  //         {
  //           path: "screenelements",
  //           element: ScreenElements,
  //           accessRole: [1, 2, 3, 4, 5, 6, 7],
  //         },
  //         {
  //           path: "updateScreen",
  //           element: UpdateScreen,
  //           accessRole: [1, 2, 3, 4, 5, 6, 7],
  //         },
  //       ],
  //     },
  //     {
  //       path: "Testcase",
  //       element: WebTestcase,
  //       accessRole: [1, 2, 3, 4, 5, 6, 7],
  //       subRoute: [
  //         {
  //           path: "CreateTestcase",
  //           element: CreateWebTestcase,
  //           accessRole: [1, 2, 3, 4, 5, 6, 7],
  //         },
  //       ],
  //     },
  //   ],
  // },
];
