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

const UpdateTestcasesOrder = lazy(() =>
  import("../Components/TestSet/UpdateTestcasesOrder")
);

const Settings = lazy(() => import("../pages/Settings"));
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
const CreateApiTestcase = lazy(() =>
  import("../Components/TestCases/apiTestcase/ApiTestcase")
);
const WebTestcase = lazy(() =>
  import("../Components/TestCases/webTestcase/WebTestcase")
);
const CreateWebTestcase = lazy(() =>
  import("../Components/TestCases/webTestcase/CreateWebTestcase")
);

const ViewReport = lazy(() => import("../pages/ViewReport"));

const AllReport = lazy(() => import("../Components/Reports/AllReports"))

const UpdateScreenOrder = lazy(() =>
  import("../Components/TestCases/UpdateScreenOrderinDataset")
);
const APIorderupdate = lazy(() =>
  import(`../Components/TestCases/apiTestcase/APIorderupdate`)
);

export const Routes = [
  {
    path: "ApiTestcase",
    element: CreateApiTestcase,
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
    path: "testcase",
    element: TestCases,
    accessRole: [1, 2, 3, 4, 5, 6, 7],
    subRoute: [
      {
        path: "CreateAPiTestcase",
        element: CreateApiTestcase,
        accessRole: [1, 2, 3, 4, 5, 6, 7],
      },
      {
        path: "CreateTestcase",
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
      {
        path: "UpdateTestcasesOrder",
        element: UpdateTestcasesOrder,
        accessRole: [1, 2, 3, 4, 5, 6, 7],
      },
    ],
  },
  {
    path: "application",
    element: Applications,
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
          {
            path: "updateScreen",
            element: UpdateScreen,
            accessRole: [1, 2, 3, 4, 5, 6, 7],
          },
        ],
      },
      {
        path: "Testcase",
        element: WebTestcase,
        accessRole: [1, 2, 3, 4, 5, 6, 7],
        subRoute: [
          {
            path: "CreateTestcase",
            element: CreateWebTestcase,
            accessRole: [1, 2, 3, 4, 5, 6, 7],
          },
        ],
      },
    ],
  },
];
