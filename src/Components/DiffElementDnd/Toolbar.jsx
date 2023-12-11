import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import { useLocation } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import useHead from "../../hooks/useHead";
import ConfirmPop from "../../CustomComponent/ConfirmPop";
import { useState } from "react";
import { qfservice } from "../../Environment";

export default function Toolbar({ dustbins, getElementsData }) {
  const location = useLocation();
  const { setShowloader, setSnackbarData } = useHead();
  const { auth } = useAuth();
  const pageData = location?.state;

  const [popup, setPopup] = useState(false);
  const [message, setMessage] = useState(false);

  const syncPage = () => {
    console.log("first");
    setShowloader(true);
    axios
      .post(`${qfservice}/webpages/LaunchJNLPToCreateWebPage`, null, {
        params: {
          user_id: auth?.userId,
          module_id: pageData?.module_id,
          web_page_url: pageData?.page_url,
          user_name: auth?.info?.firstName,
          mobile_os: ``,
          diff_page_id: pageData?.web_page_id,
        },
      })
      .then((resp) => {
        console.log(resp?.data);
        axios
          .postForm(`http://127.0.0.1:8765/connect`, {
            data: resp?.data?.info,
            jarName: "webpage",
          })
          .then((resp) => {
            console.log(resp);
            setShowloader(false);
            setSnackbarData({
              status: true,
              message: "Local client launched successfully",
              severity: "success",
            });
          })
          .catch((err) => {
            setShowloader(false);
            setSnackbarData({
              status: true,
              message: "Local client is not running",
              severity: "error",
            });
          });
      })
      .catch((err) => {
        setShowloader(false);
        setSnackbarData({
          status: true,
          message: "Something went wrong, Try Refreshing...",
          severity: "error",
        });
      });
  };

  const saveDiffElement = (check) => {
    const mappedElements = dustbins
      ?.filter((dustbin) => dustbin?.lastDroppedItem)
      ?.map((dustbin) => {
        return {
          old_element_id: dustbin?.elementData?.element_id,
          new_element_id: dustbin?.lastDroppedItem?.element_id,
        };
      });

    if (mappedElements?.length > 0) {
      setShowloader(true);

      const saveDiffElementData = {
        web_page_id: pageData?.web_page_id,

        mapped_elements: mappedElements,

        unmapped_old_elements: [],

        initial_check: check,
      };
      axios
        .post(`${qfservice}/SyncDiffElements`, saveDiffElementData)
        .then((resp) => {
          console.log(resp);
          setShowloader(false);
          if (check) {
            setMessage(resp?.data?.message);
            setPopup(true);
          } else {
            getElementsData();
            setSnackbarData({
              status: true,
              message: resp?.data?.message,
              severity: "success",
            });
          }
        })
        .catch((err) => {
          setShowloader(false);
          setSnackbarData({
            status: true,
            message: "Something went wrong, Try Refreshing...",
            severity: "error",
          });
        });
    } else {
      setSnackbarData({
        status: true,
        message: "Please add atleast one mapping",
        severity: "error",
      });
    }
  };

  return (
    <>
      <Stack direction="row" gap={1} justifyContent="flex-end" mb={5}>
        <Button variant="contained" size="small" onClick={syncPage}>
          Sync Page
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={() => saveDiffElement(true)}
        >
          Save Diff Elements
        </Button>
      </Stack>
      <ConfirmPop
        open={popup}
        handleClose={() => setPopup(false)}
        heading={"Map the selected Elements"}
        message={message}
        onConfirm={() => {
          saveDiffElement(false);
          setPopup(false);
        }}
      />
    </>
  );
}
