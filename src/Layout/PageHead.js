import useHead from "../hooks/useHead";
import BreadcrumbsComponent from "./BreadcrumbsComponent";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  IconButton,
  Grid,
  Typography,
  Divider,
  Chip,
  Stack,
} from "@mui/material";
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
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={0}
            >
              {backButtonRender && (
                <IconButton size="small" onClick={() => navigate(-1)}>
                  <ArrowBackIosIcon fontSize="small" />
                </IconButton>
              )}
              <Typography variant="h6" style={{ fontWeight: 600 }}>
                {header.name}
              </Typography>
              {header.plusButton && (
                <IconButton
                  size="small"
                  onClick={header.plusCallback}
                  className="addIcon"
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              )}
            </Stack>

            <BreadcrumbsComponent />
          </Grid>

          <Divider />
        </>
      )}
    </>
  );
}
