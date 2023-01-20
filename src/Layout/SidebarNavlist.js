import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";

export const testManagementList = [
  {
    name: "Admin",
    route: "admin",
    accessRole: "",
    icon: <AdminPanelSettingsOutlinedIcon />,
  },
  {
    name: "Application",
    route: "application/webApp",
    accessRole: "",
    icon: <AssessmentOutlinedIcon />,
    subList: [
      {
        name: "Web",
        route: "application/webApp",
        accessRole: "",
      },
      {
        name: "Mobile",
        route: "application/mobileApp",
        accessRole: "",
      },
      {
        name: "API",
        route: "application/apiApp",
        accessRole: "",
      },
    ],
  },
  {
    name: "Projects",
    route: "projects",
    accessRole: "",
    icon: <AnalyticsOutlinedIcon />,
  },
  {
    name: "Testcases",
    route: "testcase",
    accessRole: "",
    icon: <TaskOutlinedIcon />,
  },
  {
    name: "Testsets",
    route: "testset",
    accessRole: "",
    icon: <DescriptionOutlinedIcon />,
  },
  {
    name: "Execution",
    route: "execution",
    accessRole: "",
    icon: <PlayArrowOutlinedIcon />,
  },
  {
    name: "Reports",
    route: "reports",
    accessRole: "",
    icon: <SummarizeOutlinedIcon />,
  },
  {
    name: "Dashboard",
    route: "dashboard",
    accessRole: "",
    icon: <DashboardOutlinedIcon />,
  },
];

export const opsManagementList = [
  {
    name: "Release",
    route: "release",
    accessRole: "",
    icon: <RocketLaunchOutlinedIcon />,
  },
  {
    name: "CI CD Pipeline",
    route: "pipeline",
    accessRole: "",
    icon: <ChangeCircleOutlinedIcon />,
  },
];

export const qfAdmin = [
  {
    name: "QF Admin",
    route: "qfAdmin",
    accessRole: "",
    icon: <AdminPanelSettingsOutlinedIcon />,
  },
];
