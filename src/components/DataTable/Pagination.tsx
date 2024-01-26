import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";

type PaginationProps = {
  totalRows: number;
  perPage: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  totalRows,
  onPageChange,
  perPage,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalRows / perPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      onPageChange(nextPage);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      onPageChange(prevPage);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers: React.ReactNode[] = [];
    const displayPages = 5; // İstediğiniz görünen sayfa sayısı

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - Math.floor(displayPages / 2) &&
          i <= currentPage + Math.floor(displayPages / 2))
      ) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`mx-1 px-3 py-1 rounded font-medium text-sm ${
              currentPage === i
                ? "bg-slate-200 text-gray-800"
                : " text-gray-600 hover:bg-slate-100"
            }`}
            disabled={currentPage === i}
          >
            {i}
          </button>
        );
      } else if (i === 2 && currentPage - Math.floor(displayPages / 2) > 2) {
        pageNumbers.push(
          <span key="start" className="mx-1">
            ...
          </span>
        );
      } else if (
        i === totalPages - 1 &&
        currentPage + Math.floor(displayPages / 2) < totalPages - 1
      ) {
        pageNumbers.push(
          <span key="end" className="mx-1">
            ...
          </span>
        );
      }
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-between mt-2 p-2">
      <div>
        <button
          disabled={currentPage === 1}
          onClick={handlePrevPage}
          className="px-3 py-1 rounded border-2 text-gray-800 font-medium flex items-center "
        >
          <Icon
            icon="lets-icons:back"
            color="black"
            width={20}
            height={20}
            className="mr-1"
          />
          Geri
        </button>
      </div>

      <div className="flex justify-between space-x-4">
        {renderPageNumbers()}
      </div>

      <div>
        <button
          disabled={currentPage === totalPages}
          onClick={handleNextPage}
          className="px-3 py-1 rounded border-2 text-gray-800 font-medium flex items-center "
        >
          İleri
          <Icon
            className="ml-1"
            icon="lets-icons:return"
            color="black"
            width={20}
            height={20}
          />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
