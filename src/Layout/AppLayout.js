import Sidebar from "./Sidebar";
import PageHead from "./PageHead";
import AppHeader from "./AppHeader";

import { HeaderProvider } from "../context/HeaderProvider";

import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="header">
        <AppHeader />
      </div>
      <HeaderProvider>
        <div className="content">
          <div className="pageTitle">
            <PageHead />
          </div>
          <div className="mainContent">
            <Outlet />
          </div>
        </div>
      </HeaderProvider>
    </div>
  );
}