import React, { useMemo } from 'react'
import MaterialReactTable from "material-react-table";


function DragDrop({ row, setRow ,children}) {

    const columns = useMemo(
        () => [
            {
                accessorKey: "locators",
                header: " ",
                Cell: ({ cell, column, row, table }) => {
                    return (
                        { children }
                    )
                },
            },
        ],
        [row]
    );

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
                           console.log(hoveredRow)
                           console.log(draggingRow)
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
