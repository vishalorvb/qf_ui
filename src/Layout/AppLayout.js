import Sidebar from "./Sidebar";
import PageHead from "./PageHead";
import AppHeader from "./AppHeader";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="flex">
      <div className="w-2 h-screen shadow-3 ">
        <Sidebar />
      </div>
      <div className="w-10">
        <AppHeader />
        <PageHead />
        <Outlet />
      </div>
    </div>
  );
}
