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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { FormContainer, SelectElement, useForm } from "react-hook-form-mui";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";

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
  const { header, setHeader } = useHead();

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
                <FormControl fullWidth>
                  <InputLabel id="browser">Browser</InputLabel>
                  <Select
                    labelId="Browser"
                    id="Browser"
                    value={header?.browser}
                    label="Browser"
                    onChange={(e) => {
                      setHeader((ps) => {
                        return { ...ps, browser: e.target.value };
                      });
                    }}
                  >
                    <MenuItem value={"custom"}>Custom</MenuItem>
                    <MenuItem value={"chrome"}>Chrome</MenuItem>
                    <MenuItem value={"mozilla"}>Mozilla</MenuItem>
                  </Select>
                </FormControl>
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
