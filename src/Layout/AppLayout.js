import PageHead from "./PageHead";
import AppHeader from "./AppHeader";
import MiniDrawer from "./MiniDrawer";
import { Box } from "@mui/system";

import { HeaderProvider } from "../context/HeaderProvider";
import { ProjectProvider } from "../context/ProjectProvider";

import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Paper } from "@mui/material";
import { ProjectnApplicationProvider } from "../context/ProjectnApplicationProvider";
import { SnackbarProvider } from "../context/SnackbarProvider";

export default function AppLayout() {
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{ display: "flex" }}>
      <MiniDrawer open={open} setOpen={setOpen} />
      <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
        {/* <AppHeader setOpen={setOpen} /> */}
        <Box className="mainContent">
          <SnackbarProvider>
            <HeaderProvider>
              <PageHead />
              <Box>
                <ProjectProvider>
                  <ProjectnApplicationProvider>
                    <div className="content">
                      <Outlet />
                    </div>
                  </ProjectnApplicationProvider>
                </ProjectProvider>
              </Box>
            </HeaderProvider>
          </SnackbarProvider>
        </Box>
      </Box>
    </Box>
  );
}
