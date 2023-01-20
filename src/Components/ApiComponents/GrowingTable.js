import React, { useState } from 'react'

function GrowingTable(props) {
    console.log(props.header)

    let[temp,setTemp]=useState(["vishal"])
   function handleClick(e){
        console.log(e)
    }
    function appendRow() {
        console.log("calling appendRow")
        return (
            <tr >
            {props.header.map(head => <td style={{ border: "1px solid", padding: "4px" }}>
                <input type="text" placeholder={head} style={{ width: "100%", height: "25px" }} />
            </td>)}
        </tr>
    )
    }


    return (
        <div>
            This is Growing Table
            <table onClick={handleClick} id='mytable' style={{ textAlign: "left", width: '100%', border: "1px solid", borderCollapse: "collapse" }}>
                <tr >
                    {props.header.map(head => <th style={{ border: "1px solid", padding: "4px" }}>{head}</th>)}
                </tr>
                <tr >
                    {props.header.map(head => <td style={{ border: "1px solid", padding: "4px" }}>
                        <input type="text" placeholder={head} style={{ width: "100%", height: "25px" }} />
                    </td>)}
                </tr>
                {temp.map(t=>appendRow())}
            </table>
        </div>
    )
}

export default GrowingTable
