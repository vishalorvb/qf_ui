import PageHead from "./PageHead";
import AppHeader from "./AppHeader";
import MiniDrawer from "./MiniDrawer";
import { Box } from "@mui/system";

import { HeaderProvider } from "../context/HeaderProvider";
import { ProjectProvider } from "../context/ProjectProvider";

import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Paper } from "@mui/material";

export default function AppLayout() {
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{ display: "flex" }}>
      <MiniDrawer open={open} />
      <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
        <AppHeader setOpen={setOpen} />
        <Box className="mainContent">
          <HeaderProvider>
            <PageHead />
            <Box>
              <ProjectProvider>
                <div className="content">
                  <Outlet />
                </div>
              </ProjectProvider>
            </Box>
          </HeaderProvider>
        </Box>
      </Box>
    </Box>
  );
}
