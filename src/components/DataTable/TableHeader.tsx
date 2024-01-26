import { Icon } from "@iconify/react/dist/iconify.js";
import { useDrag, useDrop } from "react-dnd";
import React from "react";
import { TColumn } from "./DataTable";

type DraggableColumnProps = {
  column: TColumn;
  index: number;
  editMode: "order" | "show" | null;
  onColumnReorder: (dragIndex: number, hoverIndex: number) => void;
};

const DraggableColumn: React.FC<DraggableColumnProps> = ({
  column,
  index,
  onColumnReorder,
  editMode,
}) => {
  const [, drop] = useDrop(() => ({
    accept: "column",
    drop: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        onColumnReorder(draggedItem.index, index);
      }
    },
  }));

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "column",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`py-2 px-4 border-b text-gray-700 text-xs font-medium cursor-pointer flex items-center`}
    >
      {editMode === "order" && <Icon icon="grommet-icons:drag" />}
      {column.name}
    </div>
  );
};

type TableHeaderProps = {
  columns: TColumn[];
  editMode: "order" | "show" | null;
  onColumnReorder: (dragIndex: number, hoverIndex: number) => void;
  selectableRows?: boolean;
};

const TableHeader: React.FC<TableHeaderProps> = ({
  columns,
  editMode,
  onColumnReorder,
  selectableRows,
}) => {
  return (
    <thead className="bg-gray-200">
      <tr className="">
        {selectableRows && (
          <th className="py-2 px-4 border-b text-gray-700 text-xs font-medium">
            No
          </th>
        )}
        {columns.map((column, index) => (
          <th key={index}>
            {editMode === "order" && !column.fixed ? (
              <DraggableColumn
                column={column}
                index={index}
                onColumnReorder={onColumnReorder}
                editMode={editMode}
              />
            ) : (
              <p className="py-2 px-4 border-b text-gray-700 text-xs font-medium">
                {column.name}
              </p>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
