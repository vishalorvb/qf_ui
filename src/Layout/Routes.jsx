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
const TestsetReport = lazy(() => import("../Components/Reports/TestsetReport"));

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
const GitDetails = lazy(() =>
  import("../Components/UsersPopups/AddUserGitDetails")
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

const UserSettings = lazy(() => import(`../pages/UserSettings`));

export const Routes = [
  {
    path: "Project-Settings",
    element: ProjectSettings,
    accessRole: [1, 2, 4],
  },
  {
    path: "User-settings",
    element: UserSettings,
    accessRole: [1, 2, 3, 4, 5],
  },
  {
    path: "Recent-Applications",
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
    path: "Search-Applications",
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
    path: "Create-Applications",
    element: createApplication,
    accessRole: [1, 2, 4],
  },
  {
    path: "Favourite-Projects",
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
    path: "Search-Projects",
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
    path: "Create-Projects",
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
    path: "Active-Reports",
    element: ActiveReports,
    accessRole: [2],
  },
  {
    path: "Add-User",
    element: AddUser,
    accessRole: [2, 3, 4],
  },
  {
    path: "Edit-User",
    element: EditUser,
    accessRole: [2, 3, 4],
  },
  {
    path: "Add-Git-Details",
    element: GitDetails,
    accessRole: [2, 3, 4],
  },
  {
    path: "BIReports",
    element: BiReports,
    accessRole: [1, 2, 4],
  },
  {
    path: "Phases",
    element: Phases,
    accessRole: [1, 2, 4],
  },
  {
    path: "Cycles",
    element: Cycles,
    accessRole: [1, 2, 4],
  },
  {
    path: "Testcase-Execution",
    element: TestcaseExecution,
    accessRole: [1, 2, 4],
    subRoute: [
      {
        path: "Add-Environment",
        element: AddEnvironemt,
        accessRole: [1, 2, 4],
      },
      {
        path: "Add-Configure-Device",
        element: AddConfigurationPopUp,
        accessRole: [1, 2, 4],
      },
      {
        path: "Configure-Device",
        element: ConfigureDevice,
        accessRole: [1, 2, 4],
      },
    ],
  },
  {
    path: "Testset-Execution",
    element: TestsetExecution,
    accessRole: [1, 2, 4],
    subRoute: [
      {
        path: "Add-Environment",
        element: AddEnvironemt,
        accessRole: [1, 2, 4],
      },
      {
        path: "Configure-Device",
        element: ConfigureDevice,
        accessRole: [1, 2, 4],
      },
      {
        path: "Add-Configure-Device",
        element: AddConfigurationPopUp,
        accessRole: [1, 2, 4],
      },
      {
        path: "Update-Device",
        element: UpdateConfigureDevice,
        accessRole: [1, 2, 4],
      },
    ],
  },
  {
    path: "Testcase-Execution",
    element: TestcaseExecution,
    accessRole: [1, 2, 4],
    subRoute: [
      {
        path: "Add-Environment",
        element: AddEnvironemt,
        accessRole: [1, 2, 4],
      },
      {
        path: "Configure-Device",
        element: ConfigureDevice,
        accessRole: [1, 2, 4],
      },
      {
        path: "Update-Device",
        element: UpdateConfigureDevice,
        accessRole: [1, 2, 4],
      },
      {
        path: "Link-Project-Execution",
        element: LinkProjectExecution,
        accessRole: [1, 2, 4],
        subRoute: [
          {
            path: "Add-Link-Testset",
            element: AddTestSetLinkProject,
            accessRole: [1, 2, 4],
          },
          {
            path: "Edit-Link-Testset",
            element: EditTestLinkProject,
            accessRole: [1, 2, 4],
          },
        ],
      },
      {
        path: "Configure-Device",
        element: ConfigureDevice,
        accessRole: [1, 2, 4],
      },

      {
        path: "Add-Configure-Device",
        element: AddConfigurationPopUp,
        accessRole: [1, 2, 4],
      },
      {
        path: "Update-Device",
        element: UpdateConfigureDevice,
        accessRole: [1, 2, 4],
      },
    ],
  },
  {
    path: "Add-Link-Testset",
    element: AddTestSetLinkProject,
    accessRole: [1, 4],
  },
  {
    path: "Edit-Link-Testset",
    element: EditTestLinkProject,
    accessRole: [1, 4],
  },
  {
    path: "Testcase-Execution",
    element: TestcaseExecution,
    accessRole: [1, 2, 4],
    subRoute: [
      {
        path: "Add-Environment",
        element: AddEnvironemt,
        accessRole: [1, 2, 4],
      },
      {
        path: "Configure-Device",
        element: ConfigureDevice,
        accessRole: [1, 2, 4],
      },
      {
        path: "Update-Device",
        element: UpdateConfigureDevice,
        accessRole: [1, 2, 4],
      },
    ],
  },

  {
    path: "Testset-Execution",
    element: TestsetExecution,
    accessRole: [1, 2, 4],
    subRoute: [
      {
        path: "Add-Environment",
        element: AddEnvironemt,
        accessRole: [1, 2, 4],
      },
    ],
  },
  {
    path: "get-Testcases",
    element: GetTestcases,
    accessRole: [1, 2, 4],
  },

  {
    path: "*",
    element: NotFound,
    accessRole: [1, 2, 3, 4],
  },
  {
    path: "Create-Pipeline",
    element: CreatePipeline,
    accessRole: [1, 2, 4],
  },
  {
    path: "Pipeline",
    element: Pipeline,
    accessRole: [1, 2, 4],
    subRoute: [
      {
        path: "Update-Pipeline",
        element: UpdatPipeline,
        accessRole: [1, 2, 4],
      },
      {
        path: "Pipeline-Automation",
        element: PipelineAutomation,
        accessRole: [1, 2, 4],
        subRoute: [
          {
            path: "Report",
            element: Report,
            accessRole: [1, 2, 4],
          },
        ],
      },
    ],
  },
  {
    path: "Create-Ansible-Instance",
    element: CreateAnsibleInstance,
    accessRole: [1, 2, 4],
  },
  {
    path: "Release",
    element: Release,
    accessRole: [1, 2, 4],
    subRoute: [
      {
        path: "Create-Instance",
        element: CreateInstance,
        accessRole: [1, 2, 4],
      },

      {
        path: "Update-Ansible-Instance",
        element: UpdateAnsibleInstance,
        accessRole: [1, 2, 4],
      },
      {
        path: "History",
        element: ReleaseHistory,
        accessRole: [1, 2, 4],
      },
      {
        path: "Logs",
        element: ReleaseLogs,
        accessRole: [1, 2, 4],
      },
    ],
  },

  {
    path: "Reports",
    element: Reports,
    accessRole: [1, 2, 4],
    subRoute: [
      {
        path: "All-Reports",
        element: AllReport,
        accessRole: [1, 2, 4],
      },
      {
        path: "View-Report",
        element: ViewReport,
        accessRole: [1, 2, 4],
      },
    ],
  },

  {
    path: "Recent-Testcases",
    element: TestCases,
    accessRole: [1, 2, 4],
    subRoute: [
      {
        path: "Map-Api-TestCase",
        element: MapApiTestCase,
        accessRole: [1, 2, 4],
      },
      {
        path: "Map-Screen",
        element: MapScreen,
        accessRole: [1, 2, 4],
      },
      {
        path: "Datasets",
        element: Dataset,
        accessRole: [1, 2, 4],
      },
      {
        path: "Temp-Datasets",
        element: TempDataset,
        accessRole: [1, 2, 4],
      },

      {
        path: "Update-API-Order",
        element: APIorderupdate,
        accessRole: [1, 2, 4],
      },
      {
        path: "Api-Datasets",
        element: ApiDatasets,
        accessRole: [1, 2, 4],
      },
      {
        path: "Copy-Testcase",
        element: MakeCopy,
        accessRole: [1, 2, 4],
      },
    ],
  },
  {
    path: "Create-Testcase",
    element: CreateTestCase,
    accessRole: [1, 2, 4],
  },
  {
    path: "Recent-Testsets",
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
        path: "Copy-Testset",
        element: MakeCopy,
        accessRole: [1, 2, 4],
      },
    ],
  },
  {
    path: "Create-Testset",
    element: createTestset,
    accessRole: [1, 2, 4],
  },
  {
    path: "Add-Organization",
    element: AddOrganization,
    accessRole: [5],
  },
  {
    path: "Organization",
    element: Organization,
    accessRole: [5],
    subRoute: [
      {
        path: "Dashboard",
        element: OrganizationDashboard,
        accessRole: [5],
      },
      {
        path: "Update",
        element: UpdateOrganization,
        accessRole: [5],
      },
    ],
  },

  {
    path: "Profile",
    element: UserProfile,
    accessRole: [1, 2, 3, 4, 5],
  },
  {
    path: "Test-Design",
    element: TestDesign,
    accessRole: [1, 2, 4],
  },
  {
    path: "Test-Library",
    element: TestLibrary,
    accessRole: [1, 2, 4],
  },

  {
    path: "Failed-Testcases",
    element: TestcaseExecution,
    accessRole: [1, 2, 4],
  },
  {
    path: "Jenkins-Execution",
    element: jenkinsExecution,
    accessRole: [1, 2, 4],
  },
  {
    path: "Custom-Code",
    element: CustomCode,
    accessRole: [1, 2, 4],
  },
  {
    path: "Testset-Report",
    element: TestsetReport,
    accessRole: [1, 2, 4],
  },
];
