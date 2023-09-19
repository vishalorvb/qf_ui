import { MenuItem, Paper, Tooltip, Typography } from '@mui/material';
//import { TCdata } from "./CreateTestCase";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DeleteTestCase, GetTestCase } from '../../Services/TestCaseService';
import useHead from '../../hooks/useHead';
import TableActions from '../../CustomComponent/TableActions';
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Table from '../../CustomComponent/Table';
import ConfirmPop from '../../CustomComponent/ConfirmPop';

function TestcaseTable({ project, application, showname }) {
    const [testcases, setTestcases] = useState([]);
    let [popup, setPopup] = useState(false);
    const navigate = useNavigate();
    const { setSnackbarData } = useHead();
    let [deletTestcaseId, setDeleteTestcaseId] = useState(0)

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
            field: "description",
            headerName: "Description",
            flex: 6,
            sortable: false,
            renderCell: (param) => {
                return (
                    <TableActions heading={param.row?.description}>
                        <MenuItem
                            onClick={(e) => {
                                navigate("/Testcase/Create", { testcase_id: param.row.testcase_id });
                            }}
                        >
                            <ContentCopyOutlinedIcon sx={{ color: "green", mr: 1 }} />
                            Copy
                        </MenuItem>
                        <MenuItem
                            onClick={(e) => {
                                navigate("/Testcase/Create", { state: { testcaseId: param.row.testcase_id } });
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
        setTestcases([])
        GetTestCase(
            setTestcases,
            project?.project_id,
            application?.module_id
        );
    }, [project, application])
    return (
        <div >
            {showname && <Typography variant='h4' >{application.module_name}</Typography>}
            <Table
                searchPlaceholder="Search Testcases"
                rows={testcases}
                columns={columns}
                hidefooter={true}
                getRowId={(row) => row.testcase_id}
            ></Table>
            <ConfirmPop
                open={popup}
                handleClose={() => {
                    setDeleteTestcaseId(0)
                    setPopup(false)
                }}
                heading={"Delete TestCase"}
                message={"Are you sure you want to delete this TestCase?"}
                onConfirm={() => {
                    DeleteTestCase(deletTestcaseId).then((res) => {
                        if (res) {
                            GetTestCase(
                                setTestcases,
                                project?.project_id,
                                application?.module_id
                            );
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
    )
}
export default TestcaseTable
