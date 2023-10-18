import React, { useState } from "react";

function GrowingTable(props) {
  let [rows, setRows] = useState([<GetRow />]);

  function* getId() {
    let i = 1;
    while (true) {
      yield i;
    }
    // i++;
  }
  let id = getId();

  function GetRow() {
    return (
      <tr>
        {props.header?.map((head) => (
          <td
            key={id.next().value}
            style={{ border: "1px solid", padding: "4px" }}
          >
            <input
              type="text"
              placeholder={head}
              style={{ width: "100%", height: "25px" }}
            />
          </td>
        ))}
      </tr>
    );
  }

  function handleOnChange(e) {
    let table = document.getElementById("mytable");
    let data = [];
    for (let i = 1; i < table.rows.length; i++) {
      let key = table.rows[i].cells[0].childNodes[0].value;
      let value = table.rows[i].cells[1].childNodes[0].value;
      let description = table.rows[i].cells[2].childNodes[0].value;

      let tempdata = {};
      tempdata[props.keypair[0]] = key;
      tempdata[props.keypair[1]] = value;
      tempdata[props.keypair[2]] = description;
      data.push(tempdata);
    }
    // console.log(data)

    try {
      props.TableData(data);
    } catch (error) {
      console.log(error);
    }
  }

  function addRow() {
    setRows([...rows, <GetRow />]);
  }
  function appendRow(e) {
    if (e.target.parentElement.parentElement.nextSibling === null) {
      addRow();
    }
  }

  return (
    <div>
      <table
        id="mytable"
        onFocus={appendRow}
        onChange={handleOnChange}
        style={{
          textAlign: "left",
          width: "100%",
          border: "1px solid",
          borderCollapse: "collapse",
        }}
      >
        <tr>
          {props.header?.map((head) => (
            <th style={{ border: "1px solid", padding: "4px" }}>{head}</th>
          ))}
        </tr>
        {props.prefilled !== undefined &&
          props.prefilled?.map((val) => {
            let i = -1;
            return (
              <tr>
                {props.header?.map((head) => {
                  i = i + 1;
                  return (
                    <td style={{ border: "1px solid", padding: "4px" }}>
                      <input
                        type="text"
                        defaultValue={val[props.order[i]]}
                        style={{ width: "100%", height: "25px" }}
                      />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        {rows}
      </table>
    </div>
  );
}

export default GrowingTable;
