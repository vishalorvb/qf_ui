import useHead from "../hooks/useHead";
import Breadcrumbs from "./Breadcrumbs";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { IconButton } from "@mui/material";
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
        <div className="flex justify-content-between">
          <h2>
            {backButtonRender && (
              <IconButton onClick={() => navigate(-1)}>
                <ArrowBackIosIcon />
              </IconButton>
            )}
            <span>{header.name}</span>
            {header.plusButton && (
              <IconButton onClick={header.plusCallback}>
                <AddIcon />
              </IconButton>
            )}
          </h2>

          <Breadcrumbs />
        </div>
      )}
    </>
  );
}
