import PageHead from "./PageHead";
import MiniDrawer from "./MiniDrawer";
import { Box } from "@mui/system";

import { HeaderProvider } from "../context/HeaderProvider";
import { ProjectProvider } from "../context/ProjectProvider";

import { Outlet } from "react-router-dom";
import { useState } from "react";
import { ProjectnApplicationProvider } from "../context/ProjectnApplicationProvider";

export default function AppLayout() {
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{ display: "flex" }}>
      <MiniDrawer open={open} setOpen={setOpen} />
      <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
        <Box className="mainContent">
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
        </Box>
      </Box>
    </Box>
  );
}
