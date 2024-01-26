import React from "react";
import { TColumn } from "./DataTable";
import TableCell from "./TableCell";

type TRow = {
  columns: TColumn[];
  allColumns: TColumn[];
  row: Record<string, any>;
  rowIndex: number;
  selectableRows?: boolean;
  selectedRows?: Record<string, any>;
  setSelectedRows?: React.Dispatch<React.SetStateAction<any[]>>;

  singleSelect?: boolean;
  onSelectedRowsChange?: (selectedRows: any[]) => void;
};

const TableRow: React.FC<TRow> = ({
  row,
  rowIndex,
  columns,
  onSelectedRowsChange,
  allColumns,
  selectableRows,
  selectedRows,
  setSelectedRows,
  singleSelect,
}) => {
  const handleSelect = () => {
    if (singleSelect) {
      handleSingleSelect();
    } else {
      handleMultiSelect();
    }
  };

  const handleSingleSelect = () => {
    const newRow = { ...row, rowIndex };

    if (onSelectedRowsChange && setSelectedRows) {
      setSelectedRows([newRow]);
      onSelectedRowsChange([newRow]);
    }
  };

  const handleMultiSelect = () => {
    if (onSelectedRowsChange && setSelectedRows) {
      if (
        selectedRows?.some(
          (selectedRow: Record<string, any>) =>
            selectedRow?.rowIndex === rowIndex
        )
      ) {
        const filteredRows = selectedRows?.filter(
          (selectedRow: Record<string, any>) =>
            selectedRow?.rowIndex !== rowIndex
        );
        setSelectedRows(filteredRows);
        onSelectedRowsChange(filteredRows);
      } else {
        const newRow = { ...row, rowIndex };
        if (selectedRows?.length > 0) {
          setSelectedRows((prev) => [...prev, newRow]);
        } else {
          setSelectedRows([newRow]);
        }
        onSelectedRowsChange([
          ...(selectedRows as Record<string, any>[]),
          newRow,
        ]);
      }
    }
  };

  return (
    <tr key={rowIndex} className="hover:bg-gray-100">
      {selectableRows && (
        <td className="py-2 px-4 border-b text-sm">
          <div className="flex space-x-1 justify-center items-center">
            <input
              checked={selectedRows?.some(
                (selectedRow: Record<string, any>) =>
                  selectedRow?.rowIndex === rowIndex
              )}
              type="checkbox"
              onChange={handleSelect}
            />
            <p className="text-gray-700 font-semibold">{rowIndex + 1}</p>
          </div>
        </td>
      )}
      {columns.map((column, colIndex) => (
        <TableCell
          key={colIndex}
          row={row}
          colIndex={colIndex}
          column={column}
          allColumns={allColumns}
        />
      ))}
    </tr>
  );
};

export default TableRow;
