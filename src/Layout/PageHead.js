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
import { SelectElement, useForm } from "react-hook-form-mui";
import { yupResolver } from "@hookform/resolvers/yup";

export default function PageHead() {
  const { control } = useForm({
    resolver: yupResolver(),
  });

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
              spacing={0.5}
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
              {header?.name === "Pages" && (
                <SelectElement
                  name="browser"
                  label="Browser"
                  size="small"
                  fullWidth
                  sx={{ width: 100 }}
                  control={control}
                  options={[
                    {
                      id: "Custom",
                      label: "Custom",
                    },
                    {
                      id: "Chrome",
                      label: "Chrome",
                    },
                    {
                      id: "Mozilla",
                      label: "Mozilla",
                    },
                  ]}
                />
              )}
            </Stack>

            <BreadcrumbsComponent />
          </Grid>

          <div className="customDivider"></div>
        </>
      )}
    </>
  );
}
