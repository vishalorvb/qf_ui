import PageHead from "./PageHead";
import MiniDrawer from "./MiniDrawer";
import { Box } from "@mui/system";

import { HeaderProvider } from "../context/HeaderProvider";

import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ProjectnApplicationProvider } from "../context/ProjectnApplicationProvider";

export default function AppLayout() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  try {
    return (
      <Box sx={{ display: "flex" }}>
        <MiniDrawer open={open} setOpen={setOpen} />
        <Box component="main" sx={{ flexGrow: 1 }} className="mainContent">
          <HeaderProvider>
            <PageHead />
            <ProjectnApplicationProvider>
              <Box
                className="content"
                style={{ maxWidth: open ? "83vw" : "98vw" }}
              >
                <Outlet />
              </Box>
            </ProjectnApplicationProvider>
          </HeaderProvider>
        </Box>
      </Box>
    );
  } catch (error) {
    console.log(error);
    navigate("/");
  }
}
