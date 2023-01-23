import React, { useEffect, useRef, useState } from 'react'

function GrowingTable(props) {
    console.log(props.header)

    let inputstyle = {
        width: "100%", height: "25px"
    }
    const tableRef = useRef()
    
    console.log(tableRef)
    // let lastRow = null
    // let firstCell = null
    // if (tableRef.current != null) {
    //     console.log(tableRef.current)
    //     console.log("Not null")
    //     lastRow = tableRef.current.lastChild
    //     firstCell = lastRow.firstChild
    //     console.log(firstCell)
    //     firstCell.onclick = { handleClick }
    // }





    // let[temp,setTemp]=useState(["vishal"])
    function handleClick(e) {

        // var x = document.createElement("INPUT");
        // x.setAttribute("type", "text");
        // console.log(x)
        let table = document.getElementById("mytable");
        // let row = table.insertRow(0);
        // let cell1 = row.insertCell(0);
        // var cell2 = row.insertCell(1);
        // cell1.appendChild = x.value;
        // cell2.innerHTML = "<input type="
        //     + "text" 

        //     + " />";

        // console.log(e.target.parentNode)
        // console.log(table.rows[table.rows.length - 1])
        // console.log(table.rows[1])
        // let lastrow = table.rows[1]
        // console.log(lastrow.getElementsByTagName("td")[0])
        console.log("calling handle click")
    }
    function appendRow() {
        console.log("calling append row")
        let table = document.getElementById("mytable");
        // getting last row of table
        let lastrow = table.rows[table.rows.length - 1]

        // To insert row ar end of table 
        let row = table.insertRow(- 1)
        row.setAttribute('style', "border : 1px solid, padding :4px")

        for (let i = 0; i < props.header.length; i++) {
            let cell = row.insertCell(i)
            let placeholder = props.header[i]
            cell.innerHTML = " <input type=" + "text" + "+placeholder=" + placeholder + ">"
        }
    }

    // useEffect(() => {
    //     console.log(tableRef)
    //     const lastRow = tableRef.current.lastChild.lastChild
    //     const firstCell = lastRow.firstChild
    //     // firstCell.onClick = {e=>console.log("click")}
    //     firstCell.addEventListener('click', handleClick)
    //     console.log(firstCell)
    // }, [tableRef])

    return (
        <div>
            This is Growing Table
            <table ref={tableRef} id='mytable' style={{ textAlign: "left", width: '100%', border: "1px solid", borderCollapse: "collapse" }}>
                <tr >
                    {props.header.map(head => <th style={{ border: "1px solid", padding: "4px" }}>{head}</th>)}
                </tr>
                <tr >
                    {props.header.map(head => <td style={{ border: "1px solid", padding: "4px" }}>
                        <input type="text" placeholder={head} style={{ width: "100%", height: "25px" }} />
                    </td>)}
                </tr>
                {/* {temp.map(t=>appendRow())} */}
            </table>
        </div>
    )
}

export default GrowingTable
