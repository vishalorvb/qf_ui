import { MenuItem, Tooltip } from "@mui/material";
//import { TCdata } from "./CreateTestCase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { DeleteTestCase } from "../../Services/QfService";
import useHead from "../../hooks/useHead";
import TableActions from "../../CustomComponent/TableActions";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Table from "../../CustomComponent/Table";
import ConfirmPop from "../../CustomComponent/ConfirmPop";
import { getAlltestcaseOfApplicationandSubapplication } from "../../Services/QfService";

function TestcaseTable({ project, application }) {
    const [testcases, setTestcases] = useState([]);
    let [popup, setPopup] = useState(false);
    const navigate = useNavigate();
    const { setSnackbarData, setShowloader } = useHead();
    let [deletTestcaseId, setDeleteTestcaseId] = useState(0);
    let [currentPage, setCurrentPage] = useState(1);
    let [totalPage, settotalPage] = useState(1);

    const columns = [
        {
            field: "name",
            headerName: "Testcase name",
            flex: 2,
            sortable: false,
            align: "left",
            renderCell: (param) => {
                return (
                    <Tooltip title={param.row.name}>
                        <div
                            style={{ color: "#009fee", cursor: "pointer" }}
                            onClick={() =>
                                application?.module_type === 1
                                    ? navigate("apidatasets", {
                                        state: {
                                            applicationId: param.row.module_id,
                                            testcaseId: param.row.testcase_id,
                                            projectId: project?.project_id,
                                            testcaseName: param.row.name,
                                        },
                                    })
                                    : navigate("datasets", {
                                        state: {
                                            applicationId: param.row.module_id,
                                            testcaseId: param.row.testcase_id,
                                            projectId: project?.project_id,
                                            testcaseName: param.row.name,
                                        },
                                    })
                            }
                        >
                            {param.row.name}
                        </div>
                    </Tooltip>
                );
            },
        },
        {
            field: "module_name",
            headerName: "Application Name",
            flex: 2,
            sortable: false,
            align: "left",
        },
        {
            field: "description",
            headerName: "Description",
            flex: 6,
            sortable: false,
            renderCell: (param) => {
                return (
                    <TableActions heading={param.row?.description}>
                        <MenuItem
                            onClick={(e) => {
                                navigate("/Testcase/Create", {
                                    state: { testcaseId: param.row.testcase_id, isCopy: true },
                                });
                            }}
                        >
                            <ContentCopyOutlinedIcon sx={{ color: "green", mr: 1 }} />
                            Copy
                        </MenuItem>
                        <MenuItem
                            onClick={(e) => {
                                navigate("/Testcase/Create", {
                                    state: { testcaseId: param.row.testcase_id },
                                });
                            }}
                        >
                            <EditOutlinedIcon sx={{ color: "blue", mr: 1 }} />
                            Edit
                        </MenuItem>
                        <MenuItem
                            onClick={(e) => {
                                setDeleteTestcaseId(param.row.testcase_id);
                                setPopup(true);
                            }}
                        >
                            <DeleteOutlineIcon sx={{ color: "red", mr: 1 }} />
                            Delete
                        </MenuItem>
                    </TableActions>
                );
            },
        },
    ];
    useEffect(() => {
        setTestcases([]);
        setShowloader(true);
        getAlltestcaseOfApplicationandSubapplication(
            project?.project_id,
            application?.module_id,
            setTestcases,
            settotalPage,
            currentPage - 1
        ).then((res) => {
            setShowloader(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [project, application]);

    return (
        <div>
            <Table
                searchPlaceholder="Search Testcases"
                rows={testcases}
                columns={columns}
                hidefooter={true}
                currentPage={currentPage}
                totalPage={totalPage}
                getRowId={(row) => row.testcase_id}
                pagination={true}
                onNext={() => {
                    setTestcases([]);
                    getAlltestcaseOfApplicationandSubapplication(
                        project?.project_id,
                        application?.module_id,
                        setTestcases,
                        settotalPage,
                        currentPage
                    );
                    setCurrentPage(currentPage + 1);
                }}
                onPrevious={() => {
                    setTestcases([]);
                    getAlltestcaseOfApplicationandSubapplication(
                        project?.project_id,
                        application?.module_id,
                        setTestcases,
                        settotalPage,
                        currentPage
                    );
                    setCurrentPage(currentPage - 1);
                }}
            ></Table>
            <ConfirmPop
                open={popup}
                handleClose={() => {
                    setDeleteTestcaseId(0);
                    setPopup(false);
                }}
                heading={"Delete TestCase"}
                message={"Are you sure you want to delete this TestCase?"}
                onConfirm={() => {
                    setShowloader(true);

                    DeleteTestCase(deletTestcaseId).then((res) => {
                        if (res) {
                            getAlltestcaseOfApplicationandSubapplication(
                                project?.project_id,
                                application?.module_id,
                                setTestcases,
                                settotalPage,
                                currentPage - 1
                            );
                            setShowloader(false);

                            setSnackbarData({
                                status: true,
                                message: "Testcase Deleted Successfully",
                                severity: "success",
                            });
                        }
                    });

                    setPopup(false);
                }}
            ></ConfirmPop>
        </div>
    );
}
export default TestcaseTable;
