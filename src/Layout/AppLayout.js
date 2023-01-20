import PageHead from "./PageHead";
import AppHeader from "./AppHeader";
import MiniDrawer from "./MiniDrawer";
import { Box } from "@mui/system";

import { HeaderProvider } from "../context/HeaderProvider";

import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function AppLayout() {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <MiniDrawer open={open} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          background:
            "transparent linear-gradient(270deg, #FFFFFF 0%, #F5F5F6 100%) 0% 0% no-repeat padding-box",
        }}
      >
        <div className="header">
          <AppHeader setOpen={setOpen} />
        </div>
        <HeaderProvider>
          <div className="pageTitle">
            <PageHead />
          </div>
          <div className="mainContent">
            <Outlet />
          </div>
        </HeaderProvider>
      </Box>
    </Box>
  );
}
