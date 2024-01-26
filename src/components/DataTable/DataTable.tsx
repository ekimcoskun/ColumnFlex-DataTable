import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DebounceTextInput from "./DebounceTextInput";
import Pagination from "./Pagination";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";

export type TColumn = {
  id: string | number;
  name: string;
  selector: string | ((row: any) => any);
  fixed?: boolean;
};

type DataTableProps = {
  tableKey: any;
  data: any[];
  columns: TColumn[];
  filter?: boolean;
  search?: boolean;
  itemsPerPage?: number;
  loading?: boolean;
  pagination?: boolean;
  handlePageChange?: (page: number) => void;
  handleItemsPerPageChange?: (itemsPerPage: number) => void;
  selectableRows?: boolean;
  onSelectedRowsChange?: (selectedRows: number[]) => void;
  paginationTotalRows?: number;
  noDataFoundComponent?: React.ReactNode;
  loadingComponent?: React.ReactNode;
  singleSelect?: boolean;
};

type EditModes = "order" | "show" | null;

const DataTable: React.FC<DataTableProps> = ({
  tableKey,
  data = [],
  columns = [],
  itemsPerPage = 15,
  loading = false,
  filter = false,
  search = false,
  pagination = false,
  singleSelect = false,
  handlePageChange,
  handleItemsPerPageChange,
  selectableRows,
  onSelectedRowsChange,
  paginationTotalRows,
  noDataFoundComponent = <p className="flex justify-center">No Data</p>,
  loadingComponent = <p className="flex justify-center">Loading...</p>,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [editMode, setEditMode] = useState<EditModes>(null);
  const [selectedColumns, setSelectedColumns] = useState<TColumn[]>(
    columns.map((column) => column)
  );
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const handleButtonClick = () => {
    setShowDropdown(!showDropdown);
    setEditMode(null);
  };

  useEffect(() => {
    const edittedDataTable = localStorage.getItem("datatable" + tableKey);
    if (edittedDataTable) {
      const savedColumns = JSON.parse(edittedDataTable);
      if (Array.isArray(savedColumns) && savedColumns?.length > 0) {
        setSelectedColumns(savedColumns);
      } else {
        localStorage.setItem("datatable" + tableKey, JSON.stringify(columns));
      }
    } else {
      localStorage.setItem("datatable" + tableKey, JSON.stringify(columns));
    }
  }, [columns, tableKey]);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        showDropdown &&
        !(event.target as HTMLElement).closest(".dropdown-container")
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const handleEditMode = (mode: EditModes) => {
    setEditMode(mode);
    setShowDropdown(false);
  };

  const handleSelectAll = () => {
    if (selectedColumns.length === columns.length) {
      setSelectedColumns([]);
    } else {
      setSelectedColumns(columns);
      saveEdittedDataTable(columns);
    }
  };

  const handleColumnSelect = (col: TColumn) => {
    setSelectedColumns((prevSelectedColumns) => {
      if (prevSelectedColumns?.some((column) => column.id === col.id)) {
        const filteredColumns = prevSelectedColumns.filter(
          (column) => column.id !== col.id
        );
        saveEdittedDataTable(filteredColumns);
        setSelectedColumns(filteredColumns);
        return filteredColumns;
      } else {
        saveEdittedDataTable([...prevSelectedColumns, col]);
        setSelectedColumns([...prevSelectedColumns, col]);
        return [...prevSelectedColumns, col];
      }
    });
  };

  const saveEdittedDataTable = (dataTable: any) => {
    localStorage.setItem("datatable" + tableKey, JSON.stringify(dataTable));
  };

  const onColumnReorder = (dragIndex: number, hoverIndex: number) => {
    setSelectedColumns((prevColumns) => {
      const newArray = [...prevColumns];
      const elementToMove = newArray[dragIndex];
      newArray.splice(dragIndex, 1);
      newArray.splice(hoverIndex, 0, elementToMove);
      saveEdittedDataTable(newArray);
      return newArray;
    });
  };

  return (
    <div className="container mx-auto my-10 bg-white border border-gray-300 rounded-xl">
      {filter && (
        <div className="flex justify-between items-center p-4 border-b border-gray-300">
          <div className="flex items-center">
            {search && (
              <DebounceTextInput
                placeHolder="Search..."
                delay={1000}
                minLetter={2}
                onChange={(value) => console.log(value)}
              />
            )}
          </div>
          <div className="flex items-center space-x-3">
            <label className="text-gray-700 font-semibold mr-2">
              Per Page:
            </label>
            <select
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
              onChange={(e) => {
                handleItemsPerPageChange &&
                  handleItemsPerPageChange(Number(e.target.value));
                itemsPerPage = Number(e.target.value);
              }}
            >
              <option value="10" selected={itemsPerPage === 20}>
                Show 10 Rows
              </option>
              <option value="20" selected={itemsPerPage === 20}>
                Show 20 Rows
              </option>
              <option value="30" selected={itemsPerPage === 30}>
                Show 30 Rows
              </option>
            </select>
            <div className="relative">
              <button onClick={handleButtonClick}>
                <Icon icon="ri:more-2-fill" width={25} />
              </button>
              {showDropdown && (
                <div className="dropdown-container w-64 absolute top-full right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-md p-2 font-semibold">
                  <ul>
                    <li>
                      <button onClick={() => handleEditMode("order")}>
                        Edit Column Order
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleEditMode("show")}>
                        Edit Column Visibility
                      </button>
                    </li>
                  </ul>
                </div>
              )}
              {editMode === "show" && (
                <div className="dropdown-container w-60 absolute top-full right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-md p-2 z-50">
                  <ul>
                    <li className="border-b-2 py-1">
                      <label
                        className="flex items-center space-x-2 font-semibold text-gray-700"
                        onClick={handleSelectAll}
                      >
                        <input
                          type="checkbox"
                          checked={selectedColumns.length === columns.length}
                        />
                        <span>Select All</span>
                      </label>
                    </li>
                    {columns.map((column) => (
                      <li key={column?.id}>
                        <label
                          className="flex items-center space-x-2 font-semibold text-gray-700"
                          onClick={() => handleColumnSelect(column)}
                        >
                          <input
                            type="checkbox"
                            checked={selectedColumns?.some(
                              (col) => col?.id === column?.id
                            )}
                          />
                          <span>{column.name}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <DndProvider backend={HTML5Backend}>
        <div className="table-container overflow-x-auto">
          <table className="min-w-full rounded-3xl">
            <TableHeader
              columns={selectedColumns}
              editMode={editMode}
              onColumnReorder={onColumnReorder}
              selectableRows={selectableRows}
            />
            <tbody>
              {!loading ? (
                Array.isArray(data) && data.length > 0 ? (
                  data.map((row, rowIndex) => (
                    <TableRow
                      key={rowIndex}
                      row={row}
                      rowIndex={rowIndex}
                      columns={selectedColumns}
                      allColumns={columns}
                      selectableRows={selectableRows}
                      onSelectedRowsChange={onSelectedRowsChange}
                      selectedRows={selectedRows}
                      setSelectedRows={setSelectedRows}
                      singleSelect={singleSelect}
                    />
                  ))
                ) : (
                  <tr className="hover:bg-gray-100">
                    <td colSpan={columns.length} className="py-2 px-4 border-b">
                      {noDataFoundComponent}
                    </td>
                  </tr>
                )
              ) : (
                <tr className="hover:bg-gray-100">
                  <td colSpan={columns.length} className="py-2 px-4 border-b">
                    {loadingComponent}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </DndProvider>
      {pagination && paginationTotalRows && (
        <Pagination
          totalRows={paginationTotalRows}
          perPage={itemsPerPage}
          onPageChange={handlePageChange || (() => {})}
        />
      )}
    </div>
  );
};

export default DataTable;
