import React, { useMemo } from 'react'
import MaterialReactTable from "material-react-table";

function shiftElement(array, fromIndex, toIndex) {
    if (fromIndex === toIndex || fromIndex < 0 || fromIndex >= array.length || toIndex < 0 || toIndex >= array.length) {
        return array.slice();
    }

    const elementToShift = array.splice(fromIndex, 1)[0]; // Remove element at fromIndex and get its value
    array.splice(toIndex, 0, elementToShift); // Insert the element at toIndex

    return array;
}
function DragDrop({ columns, row, setRow }) {


    return (
        <div>
            <MaterialReactTable

                columns={columns}
                data={row}
                enableColumnActions={false}
                enablePagination={false}
                initialState={{ density: "compact" }}
                enableToolbarInternalActions={false}
                muiTableBodyRowProps={{ hover: false }}
                enableRowOrdering
                enableSorting={false}
                enableTopToolbar={false}
                enableBottomToolbar={false}
                muiTableBodyRowDragHandleProps={({ table }) => ({
                    onDragEnd: () => {
                        const { draggingRow, hoveredRow } = table.getState();
                        if (hoveredRow && draggingRow) {

                            let x = [...row]
                            x = shiftElement(x, draggingRow.index, hoveredRow.index)
                            setRow(x)
                        }
                    },
                })}
                muiTablePaperProps={{
                    elevation: 0,
                }}
            />
        </div>
    )
}

export default DragDrop
