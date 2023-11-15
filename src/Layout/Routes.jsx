import { lazy } from "react";
import MapDiffElements from "../Components/Application/MapDiffElements";

import PipelineAutomation from "../Components/DevopsComponent/PipelineAutomation";
import Report from "../Components/DevopsComponent/Report";

const Admin = lazy(() => import("../pages/Admin"));

const NotFound = lazy(() => import("../pages/NotFound"));
const Pipeline = lazy(() => import("../pages/Pipeline"));
const Projects = lazy(() => import("../pages/Projects"));
const Release = lazy(() => import("../pages/Release"));
const Reports = lazy(() => import("../pages/Reports"));
const TestCases = lazy(() => import("../Components/TestCases/TestCases"));
const Testset = lazy(() => import("../pages/Testset"));

const PageElements = lazy(() =>
  import("../Components/Application/PagesComponents/PageElements")
);
const CreateProject = lazy(() =>
  import("../Components/ProjectComponents/CreateProject")
);
const Phases = lazy(() => import("../Components/BIReports/Phases"));
const Cycles = lazy(() => import("../Components/BIReports/Cycles"));
const ActiveReports = lazy(() =>
  import("../Components/BIReports/ActiveReports")
);
const Dataset = lazy(() =>
  import("../Components/TestCases/WebDataset/WebDataset")
);
const TempDataset = lazy(() =>
  import("../Components/TestCases/WebDataset/WebDataset")
);
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
const ReleaseHistory = lazy(() =>
  import("../Components/ReleaseComponents/ReleaseHistory")
);
const ReleaseLogs = lazy(() => import("../Components/ReleaseComponents/Logs"));
const CreatePipeline = lazy(() =>
  import("../Components/DevopsComponent/CreatePipeline")
);

const UpdatPipeline = lazy(() =>
  import("../Components/DevopsComponent/CreatePipeline")
);
const createTestset = lazy(() => import("../Components/TestSet/TestsetCreate"));

const UpdateTestcasesOrder = lazy(() =>
  import("../Components/TestSet/UpdateTestcasesOrder")
);

const BiReports = lazy(() => import("../pages/BIReports"));

const Settings = lazy(() => import("../pages/Settings"));
const AddUser = lazy(() => import("../pages/AddUser"));
const EditUser = lazy(() => import("../Components/UsersPopups/EditUser"));
const GetTestcases = lazy(() => import("../pages/GetTestcases"));

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

const MapScreen = lazy(() =>
  import("../Components/TestCases/webTestcase/MapScreen")
);

const ViewReport = lazy(() => import("../pages/ViewReport"));

const AllReport = lazy(() => import("../Components/Reports/AllReports"));

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
const LinkProjectExecution = lazy(() =>
  import(`../Components/Execution/LinkProjectExecution`)
);
const AddTestSetLinkProject = lazy(() =>
  import(`../Components/Execution/AddTestSetLinkProject`)
);
const EditTestLinkProject = lazy(() =>
  import(`../Components/Execution/EditTestLinkProject`)
);
const AddOrganization = lazy(() => import(`../pages/AddOrganization`));
const Organization = lazy(() => import(`../pages/Organization`));
const OrganizationDashboard = lazy(() =>
  import(`../pages/OrganizationDashboard`)
);
const UserProfile = lazy(() => import("../Components/UsersPopups/UserProfile"));

const TestDesign = lazy(() => import(`../Components/TestDesign/TestDesign`));
const TestLibrary = lazy(() => import(`../Components/TestLibrary/TestLibrary`));
const UpdateOrganization = lazy(() => import(`../pages/UpdateOrganization`));

const MakeCopy = lazy(() => import(`../pages/MakeCopy`));

const jenkinsExecution = lazy(() => import(`../pages/JenkinsExecutionStatus`));

const ProjectSettings = lazy(() => import(`../pages/ProjectSettings`));
const CustomCode = lazy(() => import(`../pages/CustomCode`));

export const Routes = [
  {
    path: "ProjectSettings",
    element: ProjectSettings,
    accessRole: [1, 2, 4],
  },
  {
    path: "Application/Recent",
    element: applicationList,
    accessRole: [1, 2, 4],
    subRoute: [
      {
        path: ":pagesnscreen",
        element: pagesnscreen,
        accessRole: [1, 2, 4],
        subRoute: [
          {
            path: "Update",
            element: Api,
            accessRole: [1, 2, 4],
          },
          {
            path: "Create",
            element: Api,
            accessRole: [1, 2, 4],
          },
          {
            path: "PageElements",
            element: PageElements,
            accessRole: [1, 2, 4],
          },
          {
            path: "screenelements",
            element: ScreenElements,
            accessRole: [1, 2, 4],
          },
          {
            path: "SelectElements",
            element: SelectedPageElements,
            accessRole: [1, 2, 4],
          },
          {
            path: "UpdateScreen",
            element: UpdateScreen,
            accessRole: [1, 2, 4],
          },

          {
            path: "MapDiffElements",
            element: MapDiffElements,
            accessRole: [1, 2, 4],
          },
        ],
      },
      {
        path: "Update",
        element: createApplication,
        accessRole: [1, 2, 4],
      },
      {
        path: "CreateSubApplication",
        element: createApplication,
        accessRole: [1, 2, 4],
      },
    ],
  },
  {
    path: "Application/Search",
    element: applicationList,
    accessRole: [1, 2, 4],
    subRoute: [
      {
        path: ":pagesnscreen",
        element: pagesnscreen,
        accessRole: [1, 2, 4],
        subRoute: [
          {
            path: "Update",
            element: Api,
            accessRole: [1, 2, 4],
          },
          {
            path: "Create",
            element: Api,
            accessRole: [1, 2, 4],
          },
          {
            path: "PageElements",
            element: PageElements,
            accessRole: [1, 2, 4],
          },
          {
            path: "screenelements",
            element: ScreenElements,
            accessRole: [1, 2, 4],
          },
          {
            path: "SelectElements",
            element: SelectedPageElements,
            accessRole: [1, 2, 4],
          },
          {
            path: "UpdateScreen",
            element: UpdateScreen,
            accessRole: [1, 2, 4],
          },
          {
            path: "MapDiffElements",
            element: MapDiffElements,
            accessRole: [1, 2, 4],
          },
        ],
      },
      {
        path: "Update",
        element: createApplication,
        accessRole: [1, 2, 4],
      },
      {
        path: "CreateSubApplication",
        element: createApplication,
        accessRole: [1, 2, 4],
      },
    ],
  },
  {
    path: "Application/Create",
    element: createApplication,
    accessRole: [1, 2, 4],
  },
  {
    path: "Projects/favourite",
    element: Projects,
    accessRole: [1, 2, 4],
    subRoute: [
      {
        path: "Update",
        element: CreateProject,
        accessRole: [1, 2, 4],
      },
      {
        path: "CopyProject",
        element: MakeCopy,
        accessRole: [1, 2, 4],
      },
    ],
  },
  {
    path: "Projects/Search",
    element: Projects,
    accessRole: [1, 2, 4],
    subRoute: [
      {
        path: "Update",
        element: CreateProject,
        accessRole: [1, 2, 4],
      },
      {
        path: "CopyProject",
        element: MakeCopy,
        accessRole: [1, 2, 4],
      },
    ],
  },
  {
    path: "Projects/Create",
    element: CreateProject,
    accessRole: [1, 2, 4],
  },
  {
    path: "TestcasesList",
    element: getTestcases,
    accessRole: [1, 2, 4],
  },
  {
    path: "users",
    element: Admin,
    accessRole: [2, 3, 4],
  },
  {
    path: "settings",
    element: Settings,
    accessRole: [2, 3, 4],
  },

  {
    path: "BIReports/activeReports",
    element: ActiveReports,
    accessRole: [2],
  },
  {
    path: "addUser",
    element: AddUser,
    accessRole: [2, 3, 4],
  },
  {
    path: "users/editUser",
    element: EditUser,
    accessRole: [2, 3, 4],
  },
  {
    path: "BIReports",
    element: BiReports,
    accessRole: [1, 2, 4],
  },
  {
    path: "BIReports/phases",
    element: Phases,
    accessRole: [1, 2, 4],
  },
  {
    path: "BIReports/cycles",
    element: Cycles,
    accessRole: [1, 2, 4],
  },
  {
    path: "TestcaseExecution",
    element: TestcaseExecution,
    accessRole: [1, 2, 4],
    subRoute: [
      {
        path: "AddEnvironment",
        element: AddEnvironemt,
        accessRole: [1, 2, 4],
      },
      {
        path: "AddConfigureDevice",
        element: AddConfigurationPopUp,
        accessRole: [1, 2, 4],
      },
      {
        path: "ConfigureDevice",
        element: ConfigureDevice,
        accessRole: [1, 2, 4],
      },
    ],
  },
  {
    path: "TestsetExecution",
    element: TestsetExecution,
    accessRole: [1, 2, 4],
    subRoute: [
      {
        path: "AddEnvironment",
        element: AddEnvironemt,
        accessRole: [1, 2, 4],
      },
      {
        path: "ConfigureDevice",
        element: ConfigureDevice,
        accessRole: [1, 2, 4],
      },
      {
        path: "AddConfigureDevice",
        element: AddConfigurationPopUp,
        accessRole: [1, 2, 4],
      },
      {
        path: "UpdateDevice",
        element: UpdateConfigureDevice,
        accessRole: [1, 2, 4],
      },
    ],
  },
  {
    path: "TestcaseExecution",
    element: TestcaseExecution,
    accessRole: [1, 2, 4],
    subRoute: [
      {
        path: "AddEnvironment",
        element: AddEnvironemt,
        accessRole: [1, 2, 4],
      },
      {
        path: "ConfigureDevice",
        element: ConfigureDevice,
        accessRole: [1, 2, 4],
      },
      {
        path: "UpdateDevice",
        element: UpdateConfigureDevice,
        accessRole: [1, 2, 4],
      },
      {
        path: "LinkProjectExecution",
        element: LinkProjectExecution,
        accessRole: [1, 2, 4],
        subRoute: [
          {
            path: "AddLinkTestset",
            element: AddTestSetLinkProject,
            accessRole: [1, 2, 4],
          },
          {
            path: "EditLinkTestset",
            element: EditTestLinkProject,
            accessRole: [1, 2, 4],
          },
        ],
      },
      {
        path: "ConfigureDevice",
        element: ConfigureDevice,
        accessRole: [1, 2, 4],
      },

      {
        path: "AddConfigureDevice",
        element: AddConfigurationPopUp,
        accessRole: [1, 2, 4],
      },
      {
        path: "UpdateDevice",
        element: UpdateConfigureDevice,
        accessRole: [1, 2, 4],
      },
    ],
  },
  {
    path: "AddLinkTestset",
    element: AddTestSetLinkProject,
    accessRole: [1, 4],
  },
  {
    path: "EditLinkTestset",
    element: EditTestLinkProject,
    accessRole: [1, 4],
  },
  {
    path: "TestcaseExecution",
    element: TestcaseExecution,
    accessRole: [1, 2, 4],
    subRoute: [
      {
        path: "AddEnvironment",
        element: AddEnvironemt,
        accessRole: [1, 2, 4],
      },
      {
        path: "ConfigureDevice",
        element: ConfigureDevice,
        accessRole: [1, 2, 4],
      },
      {
        path: "UpdateDevice",
        element: UpdateConfigureDevice,
        accessRole: [1, 2, 4],
      },
    ],
  },

  {
    path: "TestsetExecution",
    element: TestsetExecution,
    accessRole: [1, 2, 4],
    subRoute: [
      {
        path: "AddEnvironment",
        element: AddEnvironemt,
        accessRole: [1, 2, 4],
      },
    ],
  },
  {
    path: "getTestcases",
    element: GetTestcases,
    accessRole: [1, 2, 4],
  },

  {
    path: "*",
    element: NotFound,
    accessRole: [1, 2, 3, 4],
  },
  {
    path: "pipeline",
    element: Pipeline,
    accessRole: [1, 2, 4],
    subRoute: [
      {
        path: "CreatePipeline",
        element: CreatePipeline,
        accessRole: [1, 2, 4],
      },
      {
        path: "UpdatPipeline",
        element: UpdatPipeline,
        accessRole: [1, 2, 4],
      },
      {
        path: "pipelineAutomation",
        element: PipelineAutomation,
        accessRole: [1, 2, 4],
        subRoute: [
          {
            path: "report",
            element: Report,
            accessRole: [1, 2, 4],
          },
        ],
      },
    ],
  },

  {
    path: "release",
    element: Release,
    accessRole: [1, 2, 4],
    subRoute: [
      {
        path: "CreateInstance",
        element: CreateInstance,
        accessRole: [1, 2, 4],
      },
      {
        path: "CreateAnsibleInstance",
        element: CreateAnsibleInstance,
        accessRole: [1, 2, 4],
      },
      {
        path: "UpdateAnsibleInstance",
        element: UpdateAnsibleInstance,
        accessRole: [1, 2, 4],
      },
      {
        path: "history",
        element: ReleaseHistory,
        accessRole: [1, 2, 4],
      },
      {
        path: "logs",
        element: ReleaseLogs,
        accessRole: [1, 2, 4],
      },
    ],
  },
  {
    path: "reports",
    element: Reports,
    accessRole: [1, 2, 4],
    subRoute: [
      {
        path: "viewReport",
        element: ViewReport,
        accessRole: [1, 2, 4],
      },
    ],
  },

  {
    path: "reports",
    element: Reports,
    accessRole: [1, 2, 4],
    subRoute: [
      {
        path: "AllReports",
        element: AllReport,
        accessRole: [1, 2, 4],
      },
    ],
  },

  {
    path: "Testcase/Recent",
    element: TestCases,
    accessRole: [1, 2, 4],
    subRoute: [
      {
        path: "MapApiTestCase",
        element: MapApiTestCase,
        accessRole: [1, 2, 4],
      },
      {
        path: "MapScreen",
        element: MapScreen,
        accessRole: [1, 2, 4],
      },
      {
        path: "datasets",
        element: Dataset,
        accessRole: [1, 2, 4],
      },
      {
        path: "tempdatasets",
        element: TempDataset,
        accessRole: [1, 2, 4],
      },
      //  {
      //    path: "updateScreenOrder",
      //    element: UpdateScreenOrder,
      //    accessRole: [1, 2, 4, 5],
      //  },
      {
        path: "updateAPIOrder",
        element: APIorderupdate,
        accessRole: [1, 2, 4],
      },
      {
        path: "apidatasets",
        element: ApiDatasets,
        accessRole: [1, 2, 4],
      },
      {
        path: "CopyTestcase",
        element: MakeCopy,
        accessRole: [1, 2, 4],
      },
    ],
  },
  {
    path: "Testcase/Create",
    element: CreateTestCase,
    accessRole: [1, 2, 4],
  },
  {
    path: "Testset/Recent",
    element: Testset,
    accessRole: [1, 2, 4],
    subRoute: [
      {
        path: "Update",
        element: createTestset,
        accessRole: [1, 2, 4],
      },
      {
        path: "Reorder",
        element: UpdateTestcasesOrder,
        accessRole: [1, 2, 4],
      },
      {
        path: "CopyTestset",
        element: MakeCopy,
        accessRole: [1, 2, 4],
      },
    ],
  },
  {
    path: "Testset/Create",
    element: createTestset,
    accessRole: [1, 2, 4],
  },
  {
    path: "AddOrganization",
    element: AddOrganization,
    accessRole: [5],
  },
  {
    path: "Organization",
    element: Organization,
    accessRole: [5],
    subRoute: [
      {
        path: "OrganizationDashboard",
        element: OrganizationDashboard,
        accessRole: [5],
      },
      {
        path: "UpdateOrganization",
        element: UpdateOrganization,
        accessRole: [5],
      },
    ],
  },

  {
    path: "/profile",
    element: UserProfile,
    accessRole: [1, 2, 3, 4, 5],
  },
  {
    path: "/TestDesign",
    element: TestDesign,
    accessRole: [1, 2, 4],
  },
  {
    path: "/TestLibrary",
    element: TestLibrary,
    accessRole: [1, 2, 4],
  },

  {
    path: "Dashboard/failedTestcases",
    element: TestcaseExecution,
    accessRole: [1, 2, 4],
  },
  {
    path: "jenkinsExecution",
    element: jenkinsExecution,
    accessRole: [1, 2, 4],
  },
  {
    path: "customcode",
    element: CustomCode,
    accessRole: [1, 2, 4],
  },
];
