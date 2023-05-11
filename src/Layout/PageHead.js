import useHead from "../hooks/useHead";
import BreadcrumbsComponent from "./BreadcrumbsComponent";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { IconButton, Grid, Typography, Stack } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

export default function PageHead() {
  const navigate = useNavigate();
  const location = useLocation();
  const backButtonRender =
    location.pathname.split("/").filter((path) => {
      return (
        path !== "" &&
        !["Application", "Projects", "Testcase", "Testset"].includes(path)
      );
    }).length > 1;
  const { header } = useHead();

  return (
    <>
      {header?.name === "notFound" ? (
        ""
      ) : (
        <>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ height: "55px" }}
          >
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={0.5}
            >
              {backButtonRender && (
                <IconButton size="small" onClick={() => navigate(-1)}>
                  <ArrowBackIosIcon fontSize="small" />
                </IconButton>
              )}
              <Typography
                variant="h6"
                style={{ fontWeight: 600, color: "#009fee" }}
              >
                {header.name.replace(/ .*/, "")}
              </Typography>
              <Typography variant="h6" style={{ fontWeight: 600 }}>
                {header.name.replace(header.name.replace(/ .*/, ""), "")}
              </Typography>
            </Stack>

            <BreadcrumbsComponent />
          </Grid>

          <div className="customDivider"></div>
        </>
      )}
    </>
  );
}
