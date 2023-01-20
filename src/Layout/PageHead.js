import useHead from "../hooks/useHead";
import BreadcrumbsComponent from "./BreadcrumbsComponent";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { IconButton, Grid, Typography, Divider, Chip } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

export default function PageHead() {
  const navigate = useNavigate();
  const location = useLocation();
  const backButtonRender =
    location.pathname
      .split("/")
      .filter((path) => path !== "" && path !== "application").length > 1;
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
            <h2>
              {backButtonRender && (
                <IconButton onClick={() => navigate(-1)}>
                  <ArrowBackIosIcon />
                </IconButton>
              )}
              <Typography variant="h6" style={{ fontWeight: 600 }}>
                {header.name}
              </Typography>
              {header.plusButton && (
                <IconButton onClick={header.plusCallback}>
                  <AddIcon />
                </IconButton>
              )}
            </h2>

            <BreadcrumbsComponent />
          </Grid>

          <Divider />
          <Divider />
        </>
      )}
    </>
  );
}
