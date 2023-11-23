import PageHead from "./PageHead";
import MiniDrawer from "./MiniDrawer";
import { Box } from "@mui/system";

import { HeaderProvider } from "../context/HeaderProvider";

import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ProjectnApplicationProvider } from "../context/ProjectnApplicationProvider";

export default function AppLayout() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const renderMenu = !location.pathname.includes("Projects");
  try {
    return (
      <Box sx={{ display: "flex" }}>
        {renderMenu && <MiniDrawer open={open} setOpen={setOpen} />}
        <Box component="main" sx={{ flexGrow: 1 }} className="mainContent">
          <HeaderProvider>
            <PageHead />
            <ProjectnApplicationProvider>
              <Box
                className="content"
                style={{ maxWidth: open && renderMenu ? "83vw" : "98vw" }}
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
