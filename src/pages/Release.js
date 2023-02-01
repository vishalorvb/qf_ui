import { useEffect, useState } from "react";
import useHead from "../hooks/useHead";
import Table from "../CustomComponent/Table";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Outlet, useNavigate } from "react-router-dom";
import SelectCreateInstanceModal from "../Components/ReleaseComponents/SelectCreateInstanceModal";
import { getReleaseInstances } from "../Services/DevopsServices";

export default function Release() {
  const { setHeader } = useHead();
  const [createInstance, setCreateInstance] = useState(false);
  const [instance, setInstance] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getReleaseInstances(setInstance);

    setHeader((ps) => {
      return {
        ...ps,
        name: "Release Instances",
        plusButton: true,
        plusCallback: () => setCreateInstance(true),
      };
    });
    return () =>
      setHeader((ps) => {
        return {
          ...ps,
          name: "",
          plusButton: false,
          plusCallback: () => console.log("null"),
        };
      });
  }, []);

  const instanceColumns = [
    {
      field: "release_name",
      headerName: "Name",
      flex: 3,
      sortable: false,
    },
    {
      field: "release_desc",
      headerName: "Description",
      flex: 3,
      sortable: false,
    },
    {
      field: "updated_at",
      headerName: "Last Updated",
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
        const row = param.row;
        return (
          <div>
            <EditOutlinedIcon
              onClick={() => navigate("CreateAnsibleInstance", { state: row })}
            />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Table rows={instance} columns={instanceColumns} />
      <SelectCreateInstanceModal
        createInstate={createInstance}
        setCreateInstance={setCreateInstance}
      />
      <Outlet />
    </>
  );
}
