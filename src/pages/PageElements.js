import { useEffect, useState } from "react";
import useHead from "../hooks/useHead";
import Table from "../CustomComponent/Table";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import { getWebpagesElementList } from "../Services/ProjectService";
import { useLocation } from "react-router";
import axios from "../api/axios";
export default function PageElements() {
  const { setHeader } = useHead();
  const location = useLocation();

  let [elements, setElements] = useState([]);

  const elementColumns = [
    {
      field: "element_id",
      headerName: "ElementId",
      flex: 1,
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
          <div>
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
      });

    setHeader((ps) => {
      return { ...ps, name: "PageElements" };
    });
  }, []);

  return (
    <Table
      rows={elements}
      columns={elementColumns}
      getRowId={(row) => row.element_id}
    />
  );
}
