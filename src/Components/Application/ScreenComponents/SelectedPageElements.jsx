import { useEffect, useState } from "react";
import ElementsDetails from "../../../CustomComponent/ElementsDetails";
import Table from "../../../CustomComponent/Table";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import axios from "axios";
import useHead from "../../../hooks/useHead";
import { useLocation } from "react-router-dom";
import CreateScreenPop from "./CreateScreenPop";
import SnackbarNotify from "../../../CustomComponent/SnackbarNotify";
import BackdropLoader from "../../../CustomComponent/BackdropLoader";
import { qfservice } from "../../../Environment";

export default function SelectedPageElements() {
  const { setHeader } = useHead();
  const location = useLocation();
  let [elements, setElements] = useState([]);
  let [elementid, setElementid] = useState(0);
  let [popup, setPopup] = useState(false);
  const [preSelectedElement, setPreSelectedElement] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const elementColumns = [
    {
      field: "name",
      headerName: "Field Name",
      flex: 3,
      sortable: false,
    },
    {
      field: "input_type",
      headerName: "field Type",
      flex: 3,
      sortable: false,
    },
    {
      field: "tag_name",
      headerName: "Fields Tag",
      flex: 3,
      sortable: false,
    },
    {
      field: "Actions",
      headerName: "Actions",
      flex: 3,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (param) => {
        return (
          <div
            onClick={(e) => {
              console.log(param.row.element_id);
              setElementid(param.row.element_id);
              setPopup(true);
            }}
          >
            <NearMeOutlinedIcon />
          </div>
        );
      },
    },
  ];
  const getPageElements = () => {
    setShowLoading(true);
    axios
      .get(
        `${qfservice}/webpages/getWebPageElementsList?web_page_id=${location.state.web_page_id}&selected_elements_only=true`
      )
      .then((res) => {
        res?.data?.info && setElements(res?.data?.info);
        res?.data?.info &&
          setPreSelectedElement(() => {
            const data = res?.data?.info;
            const selectedData = data
              .filter((item) => item.is_selected === true)
              .map((item) => item.element_id);
            console.log(selectedData);
            return selectedData;
          });
        setShowLoading(false);
      })
      .catch((err) => {
        setShowLoading(false);
      });
  };
  useEffect(() => {
    getPageElements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updated]);

  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: location?.state?.name + " Create Screen",
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(location);

  return (
    <div className="apptable">
      <div className="intable">
        <CreateScreenPop
          applicationId={location?.state?.module_id}
          pageId={location?.state?.web_page_id}
          elementsList={preSelectedElement.map((id) => {
            return { web_page_element_id: id };
          })}
        />
      </div>
      <Table
        searchPlaceholder="Search Elements"
        rows={elements}
        columns={elementColumns}
        getRowId={(row) => row.element_id}
        checkboxSelection={true}
        selectionModel={preSelectedElement}
        setSelectionModel={setPreSelectedElement}
      />
      {popup && (
        <ElementsDetails
          ElementId={elementid}
          setPopup={setPopup}
          setUpdated={setUpdated}
        ></ElementsDetails>
      )}
      <SnackbarNotify
        open={updated}
        close={setUpdated}
        msg={"Element is updated Successfully"}
        severity="success"
      />
      <BackdropLoader open={showLoading} />
    </div>
  );
}
