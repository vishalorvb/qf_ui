import { useEffect, useState } from "react";
import useHead from "../../../hooks/useHead";
import Table from "../../../CustomComponent/Table";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import { useLocation } from "react-router";
import axios from "axios";
import ElementsDetails from "../../../CustomComponent/ElementsDetails";
import SnackbarNotify from "../../../CustomComponent/SnackbarNotify";
import { Button } from "@mui/material";
import AddElement from "./AddElement";
import BackdropLoader from "../../../CustomComponent/BackdropLoader";
import { qfservice } from "../../../Environment";
import { getElements } from "../../../Services/QfService";
export default function PageElements() {
    const { setHeader } = useHead();
    const location = useLocation();

    let [elements, setElements] = useState([]);
    let [elementid, setElementid] = useState(0);
    let [popup, setPopup] = useState(false);
    const [preSelectedElement, setPreSelectedElement] = useState([]);
    const [newchangedElement, setNewchangedElement] = useState({});
    const [updated, setUpdated] = useState(false);
    const [showAddElement, setShowAddElement] = useState(false);
    const [elementAdded, setelementAdded] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    let [currentPage, setCurrentPage] = useState(1);
    let [totalPage, settotalPage] = useState(1);
    let [totalElement, setTotalElement] = useState(0);

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
        setHeader((ps) => {
            return { ...ps, name: location?.state?.name + " PageElements" };
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setShowLoading(true);
        getElements(location.state.id, currentPage - 1).then(res => {
            console.log(res)
            setTotalElement(res.totalElement)
            settotalPage(res.totalPage)
            setShowLoading(false);
            setElements(res.elements)
            setPreSelectedElement(() => {
                const data = res.elements;
                const selectedData = data
                    ?.filter((item) => item.is_selected === true)
                    ?.map((item) => item.element_id);
                return selectedData;
            });
        })
        //setShowLoading(true);
        //axios
        //    .get(
        //        `${qfservice}/webpages/getWebPageElementsList?web_page_id=${location.state.id}&selected_elements_only=false`
        //    )
        //    .then((res) => {
        //        res?.data?.info && setElements(res?.data?.info);
        //        res?.data?.info &&
        //            setPreSelectedElement(() => {
        //                const data = res?.data?.info;
        //                const selectedData = data
        //                    ?.filter((item) => item.is_selected === true)
        //                    ?.map((item) => item.element_id);
        //                console.log(selectedData);
        //                return selectedData;
        //            });
        //        setShowLoading(false);
        //    })
        //    .catch((resp) => {
        //        setShowLoading(false);
        //    });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [elementAdded, updated, currentPage]);

    useEffect(() => {
        newchangedElement?.id &&
            axios
                .post(
                    `${qfservice}/webpages/updatePageElement?web_element_id=${newchangedElement?.id}&status=${newchangedElement?.added}`
                )
                .then((resp) => {
                    console.log(resp);
                });
    }, [newchangedElement]);
    return (
        <div>
            <div className="apptable">
                <div className="intable">
                    <div style={{ float: "right" }}>
                        <Button variant="contained" onClick={() => setShowAddElement(true)}>
                            Add Element
                        </Button>
                    </div>
                </div>
                <Table
                    searchPlaceholder="Search Elements"
                    rows={elements}
                    columns={elementColumns}
                    getRowId={(row) => row.element_id}
                    checkboxSelection={true}
                    selectionModel={preSelectedElement}
                    setSelectionModel={setPreSelectedElement}
                    setNewchangedElement={setNewchangedElement}
                    hideheaderCheckbox={true}
                    pagination={true}
                    currentPage={currentPage}
                    totalPage={totalPage}
                    totalElement={totalElement}
                    onNext={() => {
                        setCurrentPage(currentPage + 1);
                    }}
                    onPrevious={() => {
                        setCurrentPage(currentPage - 1);
                    }}
                />
            </div>
            {popup && (
                <ElementsDetails
                    ElementId={elementid}
                    setPopup={setPopup}
                    setUpdated={setUpdated}
                ></ElementsDetails>
            )}
            {showAddElement && (
                <AddElement
                    webPageId={location.state.id}
                    setPopup={setShowAddElement}
                    setelementAdded={setelementAdded}
                ></AddElement>
            )}
            <SnackbarNotify
                open={updated}
                close={setUpdated}
                msg={"Element is updated Successfully"}
                severity="success"
            />
            <SnackbarNotify
                open={elementAdded}
                close={setelementAdded}
                msg={"Element is Added Successfully"}
                severity="success"
            />
            <BackdropLoader open={showLoading} />
        </div>
    );
}
