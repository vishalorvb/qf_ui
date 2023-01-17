import { lazy } from "react";

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

export const Routes = [
  {
    path: "admin",
    element: Admin,
    accessRole: "",
  },
  {
    path: "application/apiApp",
    element: ApiApp,
    accessRole: "",
  },
  {
    path: "dashboard",
    element: Dashboard,
    accessRole: "",
  },
  {
    path: "execution",
    element: Execution,
    accessRole: "",
  },
  {
    path: "application/mobileApp",
    element: MobileApp,
    accessRole: "",
  },
  {
    path: "*",
    element: NotFound,
    accessRole: "",
  },
  {
    path: "pipeline",
    element: Pipeline,
    accessRole: "",
  },
  {
    path: "projects",
    element: Projects,
    accessRole: "",
  },
  {
    path: "qfAdmin",
    element: QFAdmin,
    accessRole: "",
  },
  {
    path: "release",
    element: Release,
    accessRole: "",
  },
  {
    path: "reports",
    element: Reports,
    accessRole: "",
  },
  {
    path: "testcase",
    element: Testcase,
    accessRole: "",
  },
  {
    path: "testset",
    element: Testset,
    accessRole: "",
  },
  {
    path: "application/webApp",
    element: WebApp,
    accessRole: "",
  },
];
