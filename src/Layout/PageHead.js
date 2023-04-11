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
    location.pathname.split("/").filter((path) => path !== "").length > 1;
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
              <Typography
                variant="h6"
                style={{ fontWeight: 600, color: "#009fee" }}
              >
                {header.name.replace(/ .*/, "")}
              </Typography>
              <Typography variant="h6" style={{ fontWeight: 600 }}>
                {header.name.replace(header.name.replace(/ .*/, ""), "")}
              </Typography>
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
              {header.plusButton && (
                <div id="outer" onClick={header.plusCallback}>
                  <IconButton size="small" className="addIcon">
                    <AddIcon fontSize="small" />
                  </IconButton>
                  <div id="inner">
                    <Typography
                      id="buttonName"
                      noWrap
                      lineHeight={2}
                      align="center"
                    >
                      {header?.buttonName}
                    </Typography>
                  </div>
                </div>
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
