import { TColumn } from "./DataTable";
import TableCell from "./TableCell";

type TRow = {
  columns: TColumn[];
  allColumns: TColumn[];
  row: any;
  rowIndex: number;
  selectableRows?: boolean;
  selectedRows?: any;
  setSelectedRows?: any;
  singleSelect?: boolean;
  onSelectedRowsChange?: (selectedRows: number[]) => void;
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
  function handleSelect(row: any, rowIndex: number) {
    if (singleSelect) {
      handleSingleSelect(row, rowIndex);
    } else {
      handleMultiSelect(row, rowIndex);
    }
  }

  function handleSingleSelect(row: any, rowIndex: number) {
    const newRow = { ...row, rowIndex: rowIndex };

    if (onSelectedRowsChange) {
      setSelectedRows([newRow]);
      onSelectedRowsChange([newRow]);
    }
  }

  function handleMultiSelect(row: any, rowIndex: number) {
    if (onSelectedRowsChange) {
      if (
        selectedRows?.some(
          (selectedRow: any) => selectedRow.rowIndex === rowIndex
        )
      ) {
        const filteredRows = selectedRows?.filter(
          (selectedRow: any) => selectedRow?.rowIndex !== rowIndex
        );
        setSelectedRows(filteredRows);
        onSelectedRowsChange(filteredRows);
      } else {
        const newRow = { ...row, rowIndex: rowIndex };
        if (selectedRows?.length > 0) {
          setSelectedRows((prev: any) => [...prev, newRow]);
        } else {
          setSelectedRows([newRow]);
        }
        onSelectedRowsChange([...selectedRows, newRow]);
      }
    }
  }

  return (
    <tr
      key={rowIndex}
      className="hover:bg-gray-100"
      //className={selectedRows.includes(rowIndex) ? "selected" : ""}
    >
      {selectableRows && (
        <td className="py-2 px-4 border-b text-sm">
          <div className="flex space-x-1 justify-center items-center">
            <input
              checked={selectedRows?.some(
                (selectedRow: any) => selectedRow.rowIndex === rowIndex
              )}
              type="checkbox"
              onChange={() => handleSelect(row, rowIndex)}
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
