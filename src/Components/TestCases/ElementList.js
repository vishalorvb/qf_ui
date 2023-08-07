import { useEffect, useState } from "react";
import { getElement } from "../../Services/TestCaseService";
import Table from "../../CustomComponent/Table";
import AccordionTemplate from "../../CustomComponent/AccordionTemplate";
import DragDrop from "../../CustomComponent/DragDrop";

function ElementList({ screenList }) {

    let [element, setElement] = useState([])

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


    useEffect(() => {
        screenList.forEach(screen => {
            if (!element.find(element => element.screenId == screen.screenId)) {
                getElement(screen.screenId, () => { }).then(res => {
                    setElement(pv => {
                        let x = [...pv]
                        let obj = { screenId: screen.screenId, elements: res }
                        x.push(obj)
                        return x
                    })
                })
            }
        });

    }, [screenList])

    useEffect(() => {
        console.log(screenList)
    }, [screenList])

    return <div>
        {screenList.map(screen => {
            return (
            
                    <AccordionTemplate name={screen.screenName}>
                        <Table
                            hideSearch={true}
                            rows={element.find(e => e.screenId === screen.screenId)?.elements ?? []}
                            columns={col}
                            hidefooter={true}
                            getRowId={(row) => row?.element_id}
                        ></Table>
                    </AccordionTemplate>
                
            )
        })}
    </div>;
}

export default ElementList;
