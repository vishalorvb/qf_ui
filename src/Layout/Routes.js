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

export const Routes = [
  {
    path: "admin",
    element: Admin,
    accessRole: [1,4],
  },
  {
    path: "application/apiApp",
    element: ApiApp,
    accessRole: [4],
    subRoute: [
      {
        path: ":id",
        element: APIsTable,
        accessRole: [4],
        subRoute: [
          {
            path: ":id",
            element: ApiCreateEdit,
            accessRole: [4],
          },
        ],
      },
    ],
  },
  // {
  //   path: "/dashboard",
  //   element: Dashboard,
  //   accessRole: [4],
  // },
  {
    path: "execution",
    element: Execution,
    accessRole: [4],
  },
  {
    path: "application/mobileApp",
    element: MobileApp,
    accessRole: [4],
    subRoute: [
      {
        path: ":id",
        element: Pages,
        accessRole: [4],
        subRoute: [
          {
            path: ":id",
            element: PageElements,
            accessRole: [4],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: NotFound,
    accessRole: [4],
  },
  {
    path: "pipeline",
    element: Pipeline,
    accessRole: [4],
    subRoute: [
      {
        path: "CreatePipeline",
        element: CreatePipeline,
        accessRole: [4],
        loaderFunction: getCreatePipelineData,
      },
      {
        path: "pipelineAutomation",
        element: PipelineAutomation,
        accessRole: [4],
        subRoute: [
          {
            path: "report",
            element: Report,
            accessRole: [4],
          },
        ],
      },
    ],
  },
  {
    path: "projects",
    element: Projects,
    accessRole: [4],
    subRoute: [
      {
        path: "createProject",
        element: CreateProject,
        accessRole: [4],
      },
    ],
  },
  {
    path: "qfAdmin",
    element: QFAdmin,
    accessRole: [1,4],
  },
  {
    path: "release",
    element: Release,
    accessRole: [4],
    subRoute: [
      {
        path: "CreateInstance",
        element: CreateInstance,
        accessRole: [4],
      },
      {
        path: "CreateAnsibleInstance",
        element: CreateAnsibleInstance,
        accessRole: [4],
      },
    ],
  },
  {
    path: "reports",
    element: Reports,
    accessRole: [4],
  },
  {
    path: "settings",
    element: Settings,
    accessRole: "",
  },
  {
    path: "testcase",
    element: Testcase,
    accessRole: [4],
  },
  {
    path: "testset",
    element: Testset,
    accessRole: [4],
    subRoute: [
      {
        path: "AddTestcaseToTestset",
        element: AddTestcaseToTestset,
        accessRole: [4],
      },
      {
        path: "createTestcase",
        element: CreateTestcase,
        accessRole: [4],
      },
    ],
  },
  {
    path: "application/webApp",
    element: WebApp,
    accessRole: [4],
    subRoute: [
      {
        path: ":id",
        element: Pages,
        accessRole: [4],
        subRoute: [
          {
            path: ":id",
            element: PageElements,
            accessRole: [4],
          },
        ],
      },
    ],
  },
];
