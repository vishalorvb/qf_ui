import React, { useEffect, useRef, useState } from 'react'

function GrowingTable(props) {

    let [rows, setRows] = useState([<GetRow />])
    let [tableData, setTableData] = useState([])

    function GetRow() {
        return (

            <tr >
                {props.header.map(head => <td style={{ border: "1px solid", padding: "4px" }}>
                    <input type="text" placeholder={head} style={{ width: "100%", height: "25px" }} />
                </td>)}
            </tr>

        )
    }

    function handleOnChange(e) {
        console.log("Calling onChange")
        let table = document.getElementById("mytable");
        let data = []
        for (let i = 1; i < table.rows.length; i++) {
            // console.log(table.rows[i].cells)
            let key = table.rows[i].cells[0].childNodes[0].value
            let value = table.rows[i].cells[1].childNodes[0].value
            let description = table.rows[i].cells[2].childNodes[0].value

            let tempdata = {
                "key": key,
                "value": value,
                "description": description
            }
            // console.log(key)
            // console.log(value)
            // console.log(description)
            data.push(tempdata)
        }
        console.log(data)
        setTableData(data)
        try {
            props.TableData(data)
        } catch (error) {
            console.log(error)
        }
    }
    // console.log(props.header)


    const tableRef = useRef()



    // console.log(tableRef)
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
    function appendRow(e) {
        console.log("Calling handleClick")
        setRows([...rows, <GetRow />])
        let table = document.getElementById("mytable");
        let lastrow = table.rows[table.rows.length - 1]
        // lastrow.addEventListener("click",e=>console.log("last row clicked"))
        console.log(table.rows.length - 1)
        console.log(lastrow)
        // var x = document.createElement("INPUT");
        // x.setAttribute("type", "text");
        // console.log(x)
        // let table = document.getElementById("mytable");
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
    // function appendRow() {
    //     console.log("calling append row")
    //     let table = document.getElementById("mytable");
    //     // getting last row of table
    //     let lastrow = table.rows[table.rows.length - 1]

    //     // To insert row ar end of table 
    //     let row = table.insertRow(- 1)
    //     row.setAttribute('style', "border : 1px solid, padding :4px")

    //     for (let i = 0; i < props.header.length; i++) {
    //         let cell = row.insertCell(i)
    //         let placeholder = props.header[i]
    //         cell.innerHTML = " <input type=" +
    //             "text" +
    //             "placeholder=" +
    //             placeholder +
    //             " value=" +
    //             ">"
    //     }
    // }
    // let table = document.getElementById("mytable");
    // console.log(table)

    // let lastrow = table.rows[0]
    // lastrow.addEventListener('click', handleClick)
    // let table = document.getElementById("mytable");
    // console.log(table)
    // let lastrow = table.rows[0]
    // lastrow.addEventListener('click', handleClick)
    // try {
    //     let lastrow = table.rows[0]
    //    console.log("inside try block")

    //     lastrow.addEventListener('click', handleClick)
    // } catch (error) {
    //     console.log(error)

    // }


    useEffect(() => {
        // console.log(tableRef)
        // const lastRow = tableRef.current.lastChild.lastChild
        // const firstCell = lastRow.firstChild
        // // firstCell.onClick = {e=>console.log("click")}
        // firstCell.addEventListener('click', handleClick)
        // console.log(firstCell)



        // let table = document.getElementById("mytable");
        // console.log(table)
        // let lastrow = table.rows[0]
        // lastrow.addEventListener('click', handleClick)
        // console.log(table)
    }, [tableRef])

useEffect(() => {
console.log(tableData)
}, [tableData])


    return (
        <div>
            <p
                onClick={appendRow}
            >THis is growing</p>
            <table ref={tableRef} id='mytable' onChange={handleOnChange} style={{ textAlign: "left", width: '100%', border: "1px solid", borderCollapse: "collapse" }}>
                <tr >
                    {props.header.map(head => <th style={{ border: "1px solid", padding: "4px" }}>{head}</th>)}
                </tr>

                {rows}

            </table>
        </div>
    )
}

export default GrowingTable
