import { useEffect, useState } from "react";
import useHead from "../hooks/useHead";
import Table from "../CustomComponent/Table";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Outlet, useNavigate } from "react-router-dom";
import SelectCreateInstanceModal from "../Components/ReleaseComponents/SelectCreateInstanceModal";

export default function Release() {
  const { setHeader } = useHead();
  const [createInstate, setCreateInstance] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
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
            <DeleteOutlinedIcon />
          </div>
        );
      },
    },
  ];

  const instances = [
    {
      id: 1,
      release_name: "PipelineAutomation",
      release_desc: "Gitops - CICD",
      ansiblereleaseId: 1,
      webTestsetId: 105,
      apiTestsetid: 90,
      code_quality_path: "/sonarconf.properties ",
      code_quality_project_key: "CodeQuality",
      unittesttestset_path: "testBDD/unit_testcases/test_classes/demo_test.py",
      created_at: "2023-01-23T07:49:24.600+00:00",
      updated_at: "2023-01-23T07:49:24.600+00:00",
      module_id: 1036,
      cicd_type: 2,
      stages: 8,
      stage_names: null,
      updated_at_string: null,
      editUrl: null,
      deleteUrl: null,
      clicktodetails: null,
    },
    {
      id: 2,
      release_name: "CodeConveyPipeline",
      release_desc: "Code convey Pipeline:EC2 Server Via Jenkins",
      ansiblereleaseId: 1,
      webTestsetId: 105,
      apiTestsetid: 90,
      code_quality_path: "/sonarconf.properties",
      code_quality_project_key: "CodeQuality",
      unittesttestset_path: "testBDD/unit_testcases/test_classes/demo_test.py",
      created_at: "2022-02-04T10:33:07.417+00:00",
      updated_at: "2022-02-04T10:33:07.417+00:00",
      module_id: 1036,
      cicd_type: 1,
      stages: 8,
      stage_names: null,
      updated_at_string: null,
      editUrl: null,
      deleteUrl: null,
      clicktodetails: null,
    },
  ];
  return (
    <>
      <Table rows={instances} columns={instanceColumns} />
      <SelectCreateInstanceModal
        createInstate={createInstate}
        setCreateInstance={setCreateInstance}
      />
      <Outlet />
    </>
  );
}
