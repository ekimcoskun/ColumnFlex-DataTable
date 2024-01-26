import { Icon } from "@iconify/react/dist/iconify.js";
import { useDrag, useDrop } from "react-dnd";
import { TColumn } from "./DataTable";

type THeader = {
  columns: TColumn[];
  editMode: null | "order" | "show";
  onColumnReorder: (dragIndex: number, hoverIndex: number) => void;
  selectableRows?: boolean;
};

const DraggableColumn = ({
  column,
  index,
  onColumnReorder,
  editMode,
}: {
  column: TColumn;
  index: number;
  editMode: THeader["editMode"];
  onColumnReorder: THeader["onColumnReorder"];
}) => {
  const [, drop] = useDrop(() => ({
    accept: "column",
    drop: (draggedItem: { index: number }) => {
      //
      if (draggedItem.index !== index) {
        onColumnReorder(draggedItem.index, index);
        //draggedItem.index = index;
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

  /* const columnStyle = {
    border: isDragging ? "5px solid pink" : "0px",
  }; */

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`py-2 px-4 border-b text-gray-700 text-xs font-medium cursor-pointer flex items-center`} /* style={columnStyle} */
    >
      {editMode === "order" && <Icon icon="grommet-icons:drag" />}
      {column.name}
    </div>
  );
};

const TableHeader = ({
  columns,
  editMode,
  onColumnReorder,
  selectableRows,
}: THeader) => {
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
