import { lazy } from "react";

// loaders

import { getCreatePipelineData } from "../Services/DevopsServices";

import PipelineAutomation from "../Components/DevopsComponent/PipelineAutomation";
import Report from "../Components/DevopsComponent/Report";

const Admin = lazy(() => import("../pages/Admin"));
const ApiApp = lazy(() => import("../pages/ApiApp"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Execution = lazy(() => import("../pages/Execution"));
const MobileApp = lazy(() => import("../pages/MobileApp"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Pipeline = lazy(() => import("../pages/Pipeline"));
const Projects = lazy(() => import("../pages/Projects"));
const QFAdmin = lazy(() => import("../pages/QFAdmin"));
const Release = lazy(() => import("../pages/Release"));
const Reports = lazy(() => import("../pages/Reports"));
const Testcase = lazy(() => import("../pages/Testcase"));
const Testset = lazy(() => import("../pages/Testset"));
const WebApp = lazy(() => import("../pages/WebApp"));
const Pages = lazy(() => import("../pages/Pages"));
const PageElements = lazy(() => import("../pages/PageElements"));
const CreateProject = lazy(() => import("../pages/CreateProject"));
const APIsTable = lazy(() => import("../pages/APIsTable"));
const ApiCreateEdit = lazy(() => import("../pages/ApiCreateEdit"));
const TestSteps = lazy(() => import("../Components/TestCases/TestSteps"));
const CreateInstance = lazy(() =>
  import("../Components/ReleaseComponents/CreateInstance")
);
const CreateAnsibleInstance = lazy(() =>
  import("../Components/ReleaseComponents/CreateAnsibleInstance")
);
const AddTestcaseToTestset = lazy(() =>
  import("../Components/TestSet/AddTestcaseToTestset")
);
const CreatePipeline = lazy(() =>
  import("../Components/DevopsComponent/CreatePipeline")
);
const CreateTestcase = lazy(() =>
  import("../Components/TestSet/TestsetCreate")
);
const Settings = lazy(() => import("../pages/Settings"));
const Screen = lazy(() => import("../pages/Screen"));
const CreateScreen = lazy(() => import(`../pages/CreateScreen`));
const SelectedPageElements = lazy(() =>
  import("../Components/Application/SelectedPageElements")
);

const ScreenElements = lazy(() => import("../pages/ScreenElements"));

export const Routes = [
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
            element: ApiCreateEdit,
            accessRole: [1, 2, 3, 4, 5, 6, 7],
          },
        ],
      },
    ],
  },
  // {
  //   path: "/dashboard",
  //   element: Dashboard,
  //   accessRole: [1,2,3,4,5,6,7],
  // },
  {
    path: "execution",
    element: Execution,
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
        loaderFunction: getCreatePipelineData,
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
  {
    path: "projects",
    element: Projects,
    accessRole: [1, 2, 3, 4, 5, 6, 7],
    subRoute: [
      {
        path: "createProject",
        element: CreateProject,
        accessRole: [1, 2, 3, 4, 5, 6, 7],
      },
    ],
  },
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
    ],
  },
  {
    path: "reports",
    element: Reports,
    accessRole: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    path: "testcase",
    element: Testcase,
    accessRole: [1, 2, 3, 4, 5, 6, 7],
    subRoute: [
      {
        path: "AddTestSteps",
        element: TestSteps,
        accessRole: [1, 2, 3, 4, 5, 6, 7],
      },
    ],
  },
  {
    path: "testset",
    element: Testset,
    accessRole: [1, 2, 3, 4, 5, 6, 7],
    subRoute: [
      {
        path: "AddTestcaseToTestset",
        element: AddTestcaseToTestset,
        accessRole: [1, 2, 3, 4, 5, 6, 7],
      },
      {
        path: "createTestcase",
        element: CreateTestcase,
        accessRole: [1, 2, 3, 4, 5, 6, 7],
      },
    ],
  },
  {
    path: "application/webApp",
    element: WebApp,
    accessRole: [1, 2, 3, 4, 5, 6, 7],
    subRoute: [
      {
        path: "pages",
        element: Pages,
        accessRole: [1, 2, 3, 4, 5, 6, 7],
        subRoute: [
          {
            path: "PageElements",
            element: PageElements,
            accessRole: [1, 2, 3, 4, 5, 6, 7],
          },
        ],
      },
      {
        path: "screen",
        element: Screen,
        accessRole: [1, 2, 3, 4, 5, 6, 7],
        subRoute: [
          {
            path: "createscreen",
            element: CreateScreen,
            accessRole: [1, 2, 3, 4, 5, 6, 7],
            subRoute: [
              {
                path: "SelectElements",
                element: SelectedPageElements,
                accessRole: [1, 2, 3, 4, 5, 6, 7],
              },
            ],
          },
          {
            path: "screenelements",
            element: ScreenElements,
            accessRole: [1, 2, 3, 4, 5, 6, 7],
          },
        ],
      },
    ],
  },
];
