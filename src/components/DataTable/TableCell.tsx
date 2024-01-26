import React, { useEffect } from "react";
import { TColumn } from "./DataTable";

type TCell = {
  row: Record<string, any>;
  colIndex: number;
  column: TColumn;
  allColumns?: TColumn[];
};

const TableCell: React.FC<TCell> = ({ row, colIndex, column, allColumns }) => {
  const [cell, setCell] = React.useState<React.ReactNode | null>(null);

  useEffect(() => {
    const currentCell = allColumns?.find((col) => col.id === column.id);
    if (currentCell && typeof currentCell.selector === "function") {
      setCell(currentCell.selector(row));
    }
  }, [column, row, allColumns]);

  return (
    <td className="py-2 px-4 border-b text-sm" key={colIndex}>
      <div className="flex items-center justify-center">{cell}</div>
    </td>
  );
};

export default TableCell;
