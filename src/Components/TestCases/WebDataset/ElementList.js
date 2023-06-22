import React, { useEffect, useRef, useState } from 'react'
import MuiltiSelect from '../../../CustomComponent/MuiltiSelect';
import { Button, Grid, Typography } from '@mui/material';
import Table from '../../../CustomComponent/Table';
import MastPop from '../../../CustomComponent/MastPop';

let click = ["InputText", "Link"]


function ElementList({ elementList, updateDataset, screenName }) {

    let [inputList, setInputList] = useState([]);
    let [popUp, setPopup] = useState(false);
    let [elementId, setElementId] = useState()
    let opt = useRef([
        {
            id: "custom_code",
            val: "Custom Code",
            mark: true
        },
        {
            id: "displayed",
            val: "Displayed",
            mark: true
        },
        {
            id: "element_wait",
            val: "Element Wait",
            mark: false
        },
        {
            id: "scrollup",
            val: "Scroll Up",
            mark: true
        },
        {
            id: "scrolldown",
            val: "Scroll Down",
            mark: true
        },
        {
            id: "is_random",
            val: "Random",
            mark: true
        },
        {
            id: "is_enter",
            val: "Enter",
            mark: true
        },
        {
            id: "is_validate",
            val: "Validate",
            mark: true
        },
    ])

    let inputopt = useRef([
        {
            id: "validate_text",
            label: "Validate",
            value: ""
        }
    ])
    function updateElementInfo(e) {
        let elements = document.getElementsByName("info")
        elements.forEach(ele => {
            updateDataset(elementId, ele.value, ele.checked);
        })
        inputopt.current.forEach(ele=>{
            let x = document.getElementById(ele.id).value
            updateDataset(elementId, ele.id, x);
        })


        setPopup(false)
    }
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
                                defaultValue={param.row.dataset_values.input_value}
                                style={{width:"100%"}}
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
                //if (param.row.dataset_values["is_validate"]) {
                //    let tmp = [...inputList]
                //    if (!tmp.includes(param.row.element_id)) {
                //        tmp.push(param.row.element_id)
                //        setInputList([...tmp])
                //    }
                //}
                //let preselect = opt.filter((e) => {
                //    if (param.row.dataset_values[e.id]) {
                //        return e;
                //    }
                //});
                return (
                    <div style={{ display: "flex" }}>
                        <div >
                            <button
                                onClick={e => {
                                    console.log(param.row)
                                    opt.current.forEach(ele => {
                                        ele.mark = param.row.dataset_values[ele.id]
                                    })
                                    inputopt.current.forEach(ele => {
                                        ele.value = param.row.dataset_values[ele.id]
                                    })
                                    setElementId(param.row.element_id)
                                    setPopup(true)
                                }}

                                type="">click</button>
                            {/*<MuiltiSelect
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
                            ></MuiltiSelect>*/}
                        </div>
                        {/*{inputList.includes(param.row.element_id) && <div style={{ marginTop: "10px" }}>
                            <input
                                onKeyDown={(event) => {
                                    event.stopPropagation();
                                }}
                                onChange={e => {
                                    updateDataset(param.row.element_id, "validate_text", e.target.value.trim())
                                }}
                                defaultValue={param.row.dataset_values.validate_text}
                                type="text" placeholder="Enter Value" />
                        </div>}*/}
                    </div>
                );
            },
            flex: 1,
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
            <MastPop
                open={popUp}
                setOpen={setPopup}
                heading="Dataset Element Info"
            >
                <Grid container spacing={2}>
                    {opt.current.map(val => {
                        return (
                            <Grid item xs={4} md={4}>
                                <span><label for="">{val.val}</label></span> <input defaultChecked={val.mark} type="checkbox" value={val.id} name='info' />
                            </Grid>
                        )
                    })}
                </Grid>
                <br />
                <Grid container spacing={2} justifyContent="center"
                    alignItems="center">

                    {inputopt.current.map(val => {
                        return (
                            <Grid item xs={12} md={12}>
                                <label for="">{val.label}</label>
                                <br />
                                <input type="text" name={val.id} id={val.id} defaultValue={val.value} />
                            </Grid>
                        )
                    })}

                </Grid>
                <br />
                <Grid container spacing={2} justifyContent="flex-end" alignItems="center">
                    <Grid item xs={1.5} md={1.5}>
                        <Button variant="text"
                            onClick={e => setPopup(false)}
                        >Cancel</Button>
                    </Grid>
                    <Grid item xs={1.5} md={1.5}>
                        <Button variant="contained"
                            onClick={e => updateElementInfo(e)}
                        >Save</Button>
                    </Grid>
                </Grid>
            </MastPop>
        </div>
    )
}

export default ElementList
