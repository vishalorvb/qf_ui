import { useEffect, useState } from "react";
import ElementsDetails from "../../../CustomComponent/ElementsDetails";
import Table from "../../../CustomComponent/Table";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import axios from "../../../api/axios";
import useHead from "../../../hooks/useHead";
import { useLocation } from "react-router-dom";
import CreateScreenPop from "./CreateScreenPop";

export default function UpdateScreen() {
  const { setHeader } = useHead();
  const location = useLocation();
  let [elements, setElements] = useState([]);
  let [elementid, setElementid] = useState(0);
  let [popup, setPopup] = useState(false);
  const [preSelectedElement, setPreSelectedElement] = useState([]);
  const [showCreateScreenPop, setShowCreateScreenPop] = useState(false);

  const elementColumns = [
    {
      field: "element_id",
      headerName: "ElementId",
      flex: 2,
    },
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
  useEffect(() => {
    axios
      .get(
        `qfservice/webpages/getWebPageElementsList?web_page_id=${location.state.pageId}&selected_elements_only=true`
      )
      .then((res) => {
        res?.data?.info && setElements(res?.data?.info);
      });

    axios
      .get(
        `http://10.11.12.243:8083/qfservice/screen/getScreenElementsList?screen_id=${location?.state?.screenId}`
      )
      .then((res) => {
        res?.data?.info &&
          setPreSelectedElement(() => {
            const data = res?.data?.info;
            const selectedData = data
              .filter((item) => item.is_selected === true)
              .map((item) => item.element_id);
            console.log(selectedData);
            return selectedData;
          });
      });
  }, []);

  useEffect(() => {
    setHeader((ps) => {
      return {
        ...ps,
        name: "Create Screen",
        plusButton: preSelectedElement.length > 0,
        plusCallback: () => setShowCreateScreenPop(true),
      };
    });
  }, [preSelectedElement]);

  return (
    <div>
      <Table
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
        ></ElementsDetails>
      )}
      <CreateScreenPop
        open={showCreateScreenPop}
        close={setShowCreateScreenPop}
        applicationId={location.state.applicationId}
        pageId={location.state.pageId}
        screenName={{ name: location.state.name, desc: location.state.desc }}
        elementsList={preSelectedElement.map((id) => {
          return { web_page_element_id: id };
        })}
      />
    </div>
  );
}
