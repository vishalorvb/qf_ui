import { useEffect, useState } from "react";
import useHead from "../hooks/useHead";
import Table from "../CustomComponent/Table";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import { getWebpagesElementList } from "../Services/ProjectService";
import { useLocation } from "react-router";
export default function PageElements() {
  const { setHeader } = useHead();
  const location = useLocation();

  console.log(location.state.id)

  let[elements,setElements] = useState([])

  const elementColumns = [
    {
      field: "id",
      headerName: "S.no.",
      flex: 1,
      valueGetter: (index) => index.api.getRowIndex(index.row.id) + 1,
    },
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
    setHeader((ps) => {
      return { ...ps, name: "PageElements" };
    });
  }, []);
  useEffect(() => {
    getWebpagesElementList(setElements,1801)
  }, [])

  return <Table 
  rows={elements} 
  columns={elementColumns}
  getRowId={row => row.element_id}
  />;
}
