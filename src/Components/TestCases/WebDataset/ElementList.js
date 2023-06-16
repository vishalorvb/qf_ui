import React, { useEffect, useState } from 'react'
import MuiltiSelect from '../../../CustomComponent/MuiltiSelect';
import { Typography } from '@mui/material';
import Table from '../../../CustomComponent/Table';


let opt = [
    {
        id: "custom_code",
        val: "Custom Code",
    },
    {
        id: "displayed",
        val: "Displayed",
    },
    {
        id: "element_wait",
        val: "Element Wait",
    },
    {
        id: "scrollup",
        val: "Scroll Up",
    },
    {
        id: "scrolldown",
        val: "Scroll Down",
    },
    {
        id: "is_random",
        val: "Random",
    },
    {
        id: "is_enter",
        val: "Enter",
    },
    {
        id: "is_validate",
        val: "Validate",
    },
];

let click = ["InputText", "Link"]


function ElementList({ elementList, updateDataset, screenName }) {


    let [inputList, setInputList] = useState([]);


    let elementcol = [
        {
            field: "fieldname",
            headerName: "Filed Name",
            renderCell: (param) => {
                return <p>{param.row.web_page_elements.name}</p>;
            },
            flex: 2,
            sortable: false,
            align: "left",
        },
        {
            field: "tagname",
            headerName: "Tag Name",
            renderCell: (param) => {
                return <p>{param.row.web_page_elements.tag_name}</p>;
            },
            flex: 2,
            sortable: false,
            align: "left",
        },
        {
            field: "Datasets",
            headerName: "DataSets",
            renderCell: (param) => {
                return (
                    <div >
                        {param.row.web_page_elements.input_type == "InputText" && (
                            <input
                                type="text"
                                placeholder="Enter Value"
                                defaultValue={param.row.dataset_values.input_value}
                                onKeyDown={(event) => {
                                    event.stopPropagation();
                                  }}
                                onChange={(e) => {
                                    updateDataset(
                                        param.row.element_id,
                                        "input_value",
                                        e.target.value
                                    );
                                }}
                            />
                        )}
                        {!click.includes(param.row.web_page_elements.input_type) && (
                            <input
                                type="checkbox"
                                defaultChecked={param.row.dataset_values.is_click}
                                style={{ height: "22px", width: "22px", margin: "4px", padding: "4px" }}
                                onChange={(e) => {
                                    updateDataset(
                                        param.row.element_id,
                                        "is_click",
                                        e.target.checked
                                    );
                                }}
                            />
                        )}
                        {param.row.web_page_elements.input_type == "Link" && (
                            <select
                                onChange={(e) => {
                                    updateDataset(
                                        param.row.element_id,
                                        "input_value",
                                        e.target.value
                                    );
                                }}
                                dangerouslySetInnerHTML={{ __html: param?.row?.web_page_elements?.child_text }}
                            >
                            </select>
                        )}
                    </div>
                );
            },
            flex: 2,
            sortable: false,
            align: "left",
        },
        {
            field: "elements",
            headerName: "Elements",
            renderCell: (param) => {
                if (param.row.dataset_values["is_validate"]) {
                    let tmp = [...inputList]
                    if (!tmp.includes(param.row.element_id)) {
                        tmp.push(param.row.element_id)
                        setInputList([...tmp])
                    }
                }
                let preselect = opt.filter((e) => {
                    if (param.row.dataset_values[e.id]) {
                        return e;
                    }
                });
                return (
                    <div style={{ display: "flex" }}>
                        <div >
                            <MuiltiSelect
                                preselect={preselect}
                                options={opt}
                                value="val"
                                id="id"
                                size="small"
                                stateList={(list) => {
                                    let templist = list.map((obj) => obj["id"]);
                                    opt.forEach((l) => {
                                        if (templist.includes(l.id)) {
                                            updateDataset(param.row.element_id, l.id, true);
                                        } else {
                                            updateDataset(param.row.element_id, l.id, false);
                                        }
                                    });
                                    if (templist.includes("is_validate")) {
                                        let tmp = [...inputList]
                                        tmp.push(param.row.element_id)
                                        setInputList([...tmp])
                                    }
                                    else {
                                        let tmp = [...inputList]
                                        tmp = tmp.filter(t => t != param.row.element_id)
                                        setInputList([...tmp])
                                    }
                                }}
                            ></MuiltiSelect>
                        </div>
                        {inputList.includes(param.row.element_id) && <div style={{ marginTop: "10px" }}>
                            <input
                              onKeyDown={(event) => {
                                event.stopPropagation();
                              }}
                                onChange={e => {
                                    updateDataset(param.row.element_id, "validate_text", e.target.value.trim())
                                }}
                                defaultValue={param.row.dataset_values.validate_text}
                                type="text" placeholder="Enter Value" />
                        </div>}
                    </div>
                );
            },
            flex: inputList.length == 0 ? 3 : 6,
            sortable: false,
            align: "left",
        },
    ];

    useEffect(() => {
    }, [elementList, updateDataset, screenName])
    return (
        <div>
            <Typography mt={2} mb={-2} sx={{ backgroundColor: "#e8edf2", padding: "10px", color: "002980" }}>
                {screenName}
            </Typography>
            <Table
                hideSearch={true}
                rows={elementList == undefined ? [] : elementList}
                columns={elementcol}
                hidefooter={true}
                getRowId={row => row.element_id}
                rowHeight={70}
            ></Table>
        </div>
    )
}

export default ElementList
