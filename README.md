# DataTable Component Summary:

The DataTable component facilitates efficient tabular data management, with a unique focus on user customization. Users can seamlessly modify column order and visibility, and the component intelligently saves and retrieves these configurations for a consistent experience across sessions.

# Installation

Install the dependencies and start the server.

```sh
npm install
npm run dev
```

# Props:

### 1. tableKey: string;

Required: Yes
Description: Mandatory for DataTable to store the last saved column order and views in localStorage.

### 2. data:

Required: Yes
Description: The data to be listed in the DataTable.

### 3. handleSearch;

Required: No
Description: Controls the search action if the search prop is true.

### 4. columns: [];

Required: Yes
Description: Configuration of columns in the DataTable.

### 5. filter: boolean;

Required: No
Description: Controls the visibility of the DataTable column editor.

### 6. search: boolean;

Required: No
Description: Controls the visibility of the search input.

### 7. itemsPerPage: number;

Required: No
Description: Number of items per page.

### 8. loading: boolean;

Required: No
Description: Loading state indicator.

### 9. pagination: boolean;

Required: No
Description: Controls the pagination feature.

### 10. handlePageChange;

Required: No
Description: Handles page change events.

### 11. handleItemsPerPageChange;

Required: No
Description: Handles items per page change events.

### 12. selectableRows: boolean;

Required: No
Description: Makes rows selectable.

### 13. onSelectedRowsChange;

Required: No
Description: Tracks the selected rows.

### 14. paginationTotalRows: number;

Required: No
Description: Specifies the total number of pages.

### 15. noDataFoundComponent: React.ReactNode;

Required: No
Description: Component displayed when no data is found.

### 16. loadingComponent: React.ReactNode;

Required: No
Description: Component displayed during loading.

### 17. singleSelect: boolean;

Required: No
Description: Allows only one selection at a time. SelectableRows must be true.

### 18. debounceSearchTime: number;

Required: No
Description: Time delay applied to the search input.
