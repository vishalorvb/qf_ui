import { useEffect, useState } from "react";
import useHead from "../../../hooks/useHead";
import Table from "../../../CustomComponent/Table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button, MenuItem } from "@mui/material";
import ConfirmPop from "../../../CustomComponent/ConfirmPop";
import { Apidata, authdata } from "../../ApiComponents/Data";
import { getApiDetails, getApis } from "../../../Services/QfService";
//import { deleteApiRequest } from "../../../Services/ApiService";
import { deleteApiRequest } from "../../../Services/QfService";
import TableActions from "../../../CustomComponent/TableActions";
export default function APIsTable() {
    const { setHeader, setSnackbarData } = useHead();
    const location = useLocation();
    const navigate = useNavigate();
    let [apis, setApis] = useState([]);
    let [popup, setPopup] = useState(false);
    let [apiid, setApiid] = useState();

    function handleDelete(apiid) {
        deleteApiRequest(apiid).then((res) => {
            if (res) {
                getApis(setApis, location.state.module_id);
                setSnackbarData({
                    status: true,
                    message: "API deleted successfully",
                    severity: "success",
                });
            }
            setPopup(false);
        });
    }
    function handleEdit(row) {
        Apidata.api_url = row.api_url;
        Apidata.api_name = row.api_name;
        Apidata.module_id = row.module_id;
        Apidata.request_type = row.request_type;
        Apidata.body_type = row.body_type;
        Apidata.api_description = row.api_description;
        Apidata.api_id = row.api_id;

        getApiDetails(() => { }, Apidata.api_id).then((res) => {
            console.log(res);
            Apidata.headers_list = res.headersList === null ? [] : res.headersList;
            Apidata.params_list = res.paramsList === null ? [] : res.paramsList;
            Apidata.apiLinkProperties =
                res.apiLinkProperties == null ? [] : res.apiLinkProperties;
            Apidata.successResponseProperties =
                res.successResponseProperties == null
                    ? []
                    : res.successResponseProperties;

            Apidata.body_form_data_list =
                res.bodyFormDataList == null ? [] : res.bodyFormDataList;
            Apidata.body_form_url_encoded_list =
                res.bodyFormUrlEncodedList == null ? [] : res.bodyFormUrlEncodedList;

            Apidata.request_type = res.request_type;
            Apidata.body_type = res.body_type;
            Apidata.body_raw.raw_text =
                res.bodyRaw === null ? " " : res.bodyRaw.raw_text;
            Apidata.body_raw.raw_type_id =
                res.bodyRaw === null ? 1 : res.bodyRaw.raw_type_id;

            let auth = res.auth == null ? {} : JSON.parse(res.auth?.auth_data);
            authdata.authtype = auth?.authtype;
            authdata.basicauth.username = auth?.basicauth?.username;
            authdata.basicauth.password = auth?.basicauth?.password;
            authdata.apikey.key = auth?.apikey?.key;
            authdata.apikey.value = auth?.apikey?.value;
            authdata.apikey.addto = auth?.apikey?.addto;
            authdata.bearertoken.token = auth?.bearertoken?.token;
            authdata.oauth2.clientid = auth?.oauth2?.clientid;
            authdata.oauth2.clientsecret = auth?.oauth2?.clientsecret;
            authdata.oauth2.tokenurl = auth?.oauth2?.tokenurl;

            navigate("Create", { state: { application: location.state } });
        });
    }

    useEffect(() => {
        getApis(setApis, location.state.module_id);
    }, []);

    useEffect(() => {
        Apidata.module_id = location.state.module_id;
    }, []);

    let requests = [" ", "Get", "Post", "Put", "Delete"];
    const pageColumns = [
        {
            field: "api_name",
            headerName: "API Name",
            flex: 2,
            sortable: false,
        },
        {
            field: "reque",
            headerName: "Request Type",
            renderCell: (param) => {
                let x = param.row.request_type;
                return requests[x];
            },
            flex: 1,
            sortable: false,
        },
        {
            field: "api_description",
            headerName: "Description",
            flex: 4,
            sortable: false,
            renderCell: (param) => {
                return (
                    <TableActions heading={param.row.api_description}>
                        <MenuItem
                            onClick={(e) => {
                                handleEdit(param.row);
                            }}
                        >
                            <EditIcon sx={{ color: "blue", mr: 1 }} /> Edit
                        </MenuItem>
                        <MenuItem
                            onClick={(e) => {
                                setApiid(param.row.api_id);
                                setPopup(true);
                            }}
                        >
                            <DeleteIcon sx={{ color: "red", mr: 1 }} /> Delete
                        </MenuItem>
                    </TableActions>
                );
            },
        },
    ];

    return (
        <div className="apptable">
            <div className="intable">
                <div style={{ float: "right" }}>
                    <Button
                        variant="contained"
                        onClick={() =>
                            navigate("Create", { state: { application: location.state } })
                        }
                    >
                        Create API
                    </Button>
                </div>
            </div>

            <Table
                searchPlaceholder="Search APIs"
                rows={apis}
                columns={pageColumns}
                getRowId={(row) => row.api_id}
            />
            <Outlet />
            <ConfirmPop
                open={popup}
                handleClose={(e) => setPopup(false)}
                heading={"Delete API"}
                message={"Are you sure you want to delete this API"}
                onConfirm={(e) => handleDelete(apiid)}
            ></ConfirmPop>
        </div>
    );
}
