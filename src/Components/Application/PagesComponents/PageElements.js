import { useEffect, useState } from "react";
import useHead from "../../../hooks/useHead";
import Table from "../../../CustomComponent/Table";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import { getWebpagesElementList } from "../../../Services/ProjectService";
import { useLocation } from "react-router";
import axios from "../../../api/axios";
import ElementsDetails from "../../../CustomComponent/ElementsDetails";
export default function PageElements() {
  const { setHeader } = useHead();
  const location = useLocation();

  let [elements, setElements] = useState([]);
  let [elementid, setElementid] = useState(0);
  let [popup, setPopup] = useState(false);
  const [preSelectedElement, setPreSelectedElement] = useState([]);
  const [newchangedElement, setNewchangedElement] = useState({});

  const elementColumns = [
    {
      field: "name",
      headerName: "Field Name",
      flex: 4,
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
      flex: 2,
      sortable: false,
    },
    {
      field: "Actions",
      headerName: "Actions",
      flex: 1,
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
        `qfservice/webpages/getWebPageElementsList?web_page_id=${location.state.id}&selected_elements_only=false`
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
      });

    setHeader((ps) => {
      return { ...ps, name: "PageElements" };
    });
  }, []);

  useEffect(() => {
    console.log(newchangedElement);
    axios
      .post(
        `/qfservice/webpages/updatePageElement?web_element_id=${newchangedElement?.id}&status=${newchangedElement?.added}`
      )
      .then((resp) => {
        console.log(resp);
      });
  }, [newchangedElement]);
  return (
    <div>
      <Table
        rows={elements}
        columns={elementColumns}
        getRowId={(row) => row.element_id}
        checkboxSelection={true}
        selectionModel={preSelectedElement}
        setSelectionModel={setPreSelectedElement}
        setNewchangedElement={setNewchangedElement}
        hideheaderCheckbox={true}
      />
      {popup && (
        <ElementsDetails
          ElementId={elementid}
          setPopup={setPopup}
        ></ElementsDetails>
      )}
    </div>
  );
}
