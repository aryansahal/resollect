import React, { useState, useEffect } from "react";
import { ArrowUpDown, Upload } from "lucide-react";
import loansData from "../../data/loans.json";
import { FilterTab, Loan } from "../../types";
import { formatCurrency, truncateText } from "../../utils/helpers";
import { TABLE_MIN_WIDTH } from "../../utils/constants";

interface LoansTableProps {
  searchQuery: string;
  activeFilter: FilterTab;
}

export const LoansTable: React.FC<LoansTableProps> = ({
  searchQuery,
  activeFilter,
}) => {
  const [data, setData] = useState<Loan[]>([]);
  const [sortColumn, setSortColumn] = useState<keyof Loan>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const getFilterLabel = () => {
    switch (activeFilter) {
      case "all":
        return "All";
      case "preSarfaesi":
        return "Pre Sarfaesi";
      case "npa":
        return "NPA";
      case "responses":
        return "13(3) Responses";
      case "symbolic":
        return "Symbolic Possession";
      case "dmOrder":
        return "DM Order";
      case "physical":
        return "Physical Possessions";
      case "auctions":
        return "Auctions";
      default:
        return "All";
    }
  };

  useEffect(() => {
    const processedData = loansData.map((loan) => ({
      ...loan,
      currentDPD: parseInt(loan.currentDPD, 10),
    }));

    setData(processedData);
  }, []);

  const handleSort = (column: keyof Loan) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const renderSortIcon = (column: keyof Loan) => (
    <div
      className="flex items-center cursor-pointer select-none"
      onClick={() => handleSort(column)}
    >
      <span className="mr-1 capitalize">{column}</span>
      <ArrowUpDown size={14} className="text-gray-400" />
    </div>
  );

  const handleSelectRow = (id: string) => {
    const newSelectedRows = new Set(selectedRows);

    if (selectedRows.has(id)) {
      newSelectedRows.delete(id);
    } else {
      newSelectedRows.add(id);
    }

    setSelectedRows(newSelectedRows);
  };

  const handleSelectAll = () => {
    if (selectedRows.size === filteredData.length) {
      setSelectedRows(new Set());
    } else {
      const newSelectedRows = new Set<string>();
      filteredData.forEach((row) => newSelectedRows.add(row.id));
      setSelectedRows(newSelectedRows);
    }
  };

  const filteredData = data.filter((loan) => {
    if (
      searchQuery.trim() &&
      !loan.id.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    switch (activeFilter) {
      case "all":
        return true;
      case "preSarfaesi":
        return loan.currentDPD < 90;
      case "npa":
        return loan.currentDPD >= 90;
      default:
        return true;
    }
  });

  const sortedData = [...filteredData].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    const direction = sortDirection === "asc" ? 1 : -1;

    if (typeof aValue === "number" && typeof bValue === "number") {
      return (aValue - bValue) * direction;
    }

    return String(aValue).localeCompare(String(bValue)) * direction;
  });

  const paginatedData = sortedData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleNextPage = () => {
    if ((currentPage + 1) * itemsPerPage < filteredData.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [activeFilter, searchQuery]);

  const isAllSelected =
    filteredData.length > 0 &&
    filteredData.every((row) => selectedRows.has(row.id));

  return (
    <div className="bg-white rounded-lg shadow-sm relative flex flex-col min-h-[500px] w-full overflow-auto">
      {activeFilter === "preSarfaesi" && (
        <div className="p-4 flex flex-wrap sm:flex-nowrap justify-between items-center border-b border-gray-200">
          <div className="flex flex-wrap gap-2 w-full sm:w-auto mb-2 sm:mb-0">
            <button className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors text-sm font-medium">
              Generate Pre Sarfaesi Notice({selectedRows.size})
            </button>
            <button className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors text-sm font-medium">
              Declare NPA ({selectedRows.size})
            </button>
          </div>
          <div className="text-sm text-gray-500">
            {selectedRows.size} loans selected
          </div>
        </div>
      )}

      {activeFilter !== "preSarfaesi" && (
        <div className="p-4 text-sm text-gray-500 flex justify-between items-center">
          <div>
            {selectedRows.size} loans selected
            {searchQuery && (
              <span className="ml-2">
                • Filtering by ID:{" "}
                <span className="font-medium">{searchQuery}</span>
              </span>
            )}
            {activeFilter !== "all" && (
              <span className="ml-2">
                • Category:{" "}
                <span className="font-medium">{getFilterLabel()}</span>
              </span>
            )}
          </div>
        </div>
      )}

      <div
        className="w-full overflow-x-auto flex-grow"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <table
          className="w-full text-sm"
          style={{ minWidth: `${TABLE_MIN_WIDTH}px` }}
        >
          <thead className="bg-gray-50 text-gray-600 border-y border-gray-200 sticky top-0">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  className="rounded"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="px-4 py-3 text-left whitespace-nowrap">
                {renderSortIcon("id")}
              </th>
              <th className="px-4 py-3 text-left whitespace-nowrap">
                {renderSortIcon("loanType")}
              </th>
              <th className="px-4 py-3 text-left whitespace-nowrap">
                {renderSortIcon("borrower")}
              </th>
              <th className="px-4 py-3 text-left whitespace-nowrap">
                {renderSortIcon("borrowerAddress")}
              </th>
              <th className="px-4 py-3 text-left whitespace-nowrap">
                {renderSortIcon("coBorrowerName")}
              </th>
              <th className="px-4 py-3 text-left whitespace-nowrap">
                {renderSortIcon("coBorrowerAddress")}
              </th>
              <th className="px-4 py-3 text-left whitespace-nowrap">
                {renderSortIcon("currentDPD")}
              </th>
              <th className="px-4 py-3 text-left whitespace-nowrap">
                {renderSortIcon("sanctionAmount")}
              </th>
              <th className="px-4 py-3 text-left whitespace-nowrap">
                {renderSortIcon("region")}
              </th>
              <th className="px-4 py-3 text-left whitespace-nowrap">
                {renderSortIcon("status")}
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row) => (
                <tr key={row.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      className="rounded"
                      checked={selectedRows.has(row.id)}
                      onChange={() => handleSelectRow(row.id)}
                    />
                  </td>
                  <td className="px-4 py-3 text-blue-500 whitespace-nowrap">
                    {row.id}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {row.loanType}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {truncateText(row.borrower, 20)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {truncateText(row.borrowerAddress, 25)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {truncateText(row.coBorrowerName, 20)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {truncateText(row.coBorrowerAddress, 25)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {row.currentDPD}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {formatCurrency(row.sanctionAmount)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{row.region}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{row.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={11}
                  className="px-4 py-8 text-center text-gray-500"
                >
                  {searchQuery
                    ? `No loans found matching "${searchQuery}"`
                    : `No loans found in ${getFilterLabel()} category`}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
        <div className="p-4 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-sm text-gray-500 text-center sm:text-left mb-2 sm:mb-0">
            {filteredData.length > 0 ? (
              <>
                Showing {currentPage * itemsPerPage + 1}-
                {Math.min(
                  (currentPage + 1) * itemsPerPage,
                  filteredData.length
                )}{" "}
                of {filteredData.length} rows
              </>
            ) : (
              "No results"
            )}
          </div>
          <div className="flex gap-4">
            <button
              className={`hover:text-gray-700 px-3 py-2 ${
                currentPage === 0 ? "text-gray-400 cursor-not-allowed" : ""
              }`}
              onClick={handlePrevPage}
              disabled={currentPage === 0}
            >
              Previous
            </button>
            <button
              className={`hover:text-gray-700 px-3 py-2 ${
                (currentPage + 1) * itemsPerPage >= filteredData.length
                  ? "text-gray-400 cursor-not-allowed"
                  : ""
              }`}
              onClick={handleNextPage}
              disabled={(currentPage + 1) * itemsPerPage >= filteredData.length}
            >
              Next
            </button>
          </div>
        </div>

        <div className="px-6 py-4 flex justify-center sm:justify-end border-t border-gray-100 sticky bottom-0 bg-white">
          <button
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors w-full sm:w-auto justify-center"
            onClick={() =>
              window.dispatchEvent(new CustomEvent("open-upload-modal"))
            }
          >
            <Upload size={18} className="mr-2" />
            Upload Document
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoansTable;
