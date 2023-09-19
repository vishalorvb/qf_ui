import { useEffect, useMemo, useState } from "react";
import { getElement } from "../../Services/TestCaseService";
import Table from "../../CustomComponent/Table";
import AccordionTemplate from "../../CustomComponent/AccordionTemplate";
import DragDrop from "../../CustomComponent/DragDrop";
import { Button, Grid } from "@mui/material";

function ElementList({ screenList }) {
    console.log(screenList)
    let [element, setElement] = useState([])
    let [screens, setScreens] = useState([])
    let [open, setOpen] = useState(false)


    let col = [
        {
            field: "name",
            headerName: "Element Name",
            flex: 3,
            sortable: false,
            align: "left",
        },
        {
            field: "input_type",
            headerName: "Input Type",
            flex: 3,
            sortable: false,
            align: "left",
        },
        {
            field: "tag_name",
            headerName: "Tag Name",
            flex: 3,
            sortable: false,
            align: "left",
        },
    ]

    let dragDropCol = useMemo(
        () => [
            {
                accessorKey: "locators",
                header: " ",
                Cell: ({ cell, column, row, table }) => {
                    return (
                        <AccordionTemplate name={row.original.screenName} toggle={open}>
                            <Table
                                hideSearch={true}
                                rows={row.original.elements ?? []}
                                columns={col}
                                hidefooter={true}
                                getRowId={(row) => row?.element_id}
                            ></Table>
                        </AccordionTemplate>
                    )
                },
            },
        ],
        [open]
    );
    useEffect(() => {
        screenList.forEach(screen => {
            if (!element.find(element => element.screenId == screen.screenId)) {
                getElement(screen.screenId, () => { }).then(res => {
                    setElement(pv => {
                        let x = [...pv]
                        let obj = { screenName: screen.screenName, screenId: screen.screenId, elements: res }
                        x.push(obj)
                        return x
                    })
                })
            }
        });

    }, [screenList])

    useEffect(() => {
        setScreens([])
        let x = []
        screenList.forEach(screen => {
            element.forEach(ele => {
                if (ele.screenId == screen.screenId) {
                    let obj = { screenName: screen.screenName, screenId: screen.screenId, elements: ele.elements }
                    x.push(obj)
                }
            })
        })
        setScreens(x)
    }, [screenList, element])



    return <div>
        <Grid container spacing={2} justifyContent="right" alignItems="right" >
            <Grid item xs={2} md={2}>
                <Button onClick={e => setOpen(!open)} variant="contained">{open ? "Hide All" : "Expand All"}</Button>

            </Grid>
        </Grid>

        <DragDrop
            columns={dragDropCol}
            row={screens}
            setRow={e => {
                setScreens(e)
            }}
        ></DragDrop>
    </div>;
}

export default ElementList;
