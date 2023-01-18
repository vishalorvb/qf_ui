import { useEffect } from "react";
import useHead from "../hooks/useHead";
import Table from "../CustomComponent/Table";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";

export default function PageElements() {
  const { setHeader } = useHead();

  const elementColumns = [
    {
      field: "id",
      headerName: "S.no.",
      flex: 1,
      valueGetter: (index) => index.api.getRowIndex(index.row.id) + 1,
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

  return <Table rows={[]} columns={elementColumns} />;
}
