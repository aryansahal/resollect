import React, { useState } from "react";
import { Search, Filter, ChevronDown } from "lucide-react";
import { FilterTab } from "../../types";
import { filterOptions } from "../../utils/constants";

interface PortfolioHeaderProps {
  searchQuery: string;
  onSearch: (query: string) => void;
  activeFilter: FilterTab;
  onFilterChange: (filter: FilterTab) => void;
}

export const PortfolioHeader: React.FC<PortfolioHeaderProps> = ({
  searchQuery,
  onSearch,
  activeFilter,
  onFilterChange,
}) => {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const getFilterLabel = (filter: FilterTab): string => {
    const option = filterOptions.find((opt) => opt.id === filter);
    return option ? option.label : "All";
  };

  return (
    <div className="bg-white px-4 sm:px-6 py-3 sm:py-4 pb-4 border-b">
      <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
        Portfolio
      </h1>

      {/* Mobile Filter Dropdown */}
      <div className="sm:hidden mb-4 relative">
        <button
          className="flex items-center justify-between w-full px-4 py-2 border rounded-lg text-sm"
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
        >
          <span>{getFilterLabel(activeFilter)}</span>
          <ChevronDown
            size={16}
            className={`transition-transform ${
              mobileFilterOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {mobileFilterOpen && (
          <div className="absolute mt-1 w-full z-10 bg-white border rounded-lg shadow-lg py-1">
            {(
              [
                "all",
                "preSarfaesi",
                "npa",
                "responses",
                "symbolic",
                "dmOrder",
                "physical",
                "auctions",
              ] as FilterTab[]
            ).map((filter) => (
              <button
                key={filter}
                className={`text-left w-full px-4 py-2 text-sm ${
                  activeFilter === filter
                    ? "bg-blue-50 text-blue-500"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => {
                  onFilterChange(filter);
                  setMobileFilterOpen(false);
                }}
              >
                {getFilterLabel(filter)}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Filter Tabs - hidden on mobile */}
      <div className="hidden sm:flex overflow-x-auto mb-6 space-x-2 pb-1 scrollbar-hide">
        <button
          className={`px-3 py-1.5 text-sm rounded-md whitespace-nowrap flex-shrink-0 ${
            activeFilter === "all"
              ? "bg-blue-500 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          onClick={() => onFilterChange("all")}
        >
          All
        </button>
        <button
          className={`px-3 py-1.5 text-sm rounded-md whitespace-nowrap flex-shrink-0 ${
            activeFilter === "preSarfaesi"
              ? "bg-blue-500 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          onClick={() => onFilterChange("preSarfaesi")}
        >
          Pre Sarfaesi
        </button>
        <button
          className={`px-3 py-1.5 text-sm rounded-md whitespace-nowrap flex-shrink-0 ${
            activeFilter === "npa"
              ? "bg-blue-500 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          onClick={() => onFilterChange("npa")}
        >
          NPA
        </button>
        <button
          className={`px-3 py-1.5 text-sm rounded-md whitespace-nowrap flex-shrink-0 ${
            activeFilter === "responses"
              ? "bg-blue-500 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          onClick={() => onFilterChange("responses")}
        >
          13(3) Responses
        </button>
        <button
          className={`px-3 py-1.5 text-sm rounded-md whitespace-nowrap flex-shrink-0 ${
            activeFilter === "symbolic"
              ? "bg-blue-500 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          onClick={() => onFilterChange("symbolic")}
        >
          Symbolic Possession
        </button>
        <button
          className={`px-3 py-1.5 text-sm rounded-md whitespace-nowrap flex-shrink-0 ${
            activeFilter === "dmOrder"
              ? "bg-blue-500 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          onClick={() => onFilterChange("dmOrder")}
        >
          DM Order
        </button>
        <button
          className={`px-3 py-1.5 text-sm rounded-md whitespace-nowrap flex-shrink-0 ${
            activeFilter === "physical"
              ? "bg-blue-500 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          onClick={() => onFilterChange("physical")}
        >
          Physical Possessions
        </button>
        <button
          className={`px-3 py-1.5 text-sm rounded-md whitespace-nowrap flex-shrink-0 ${
            activeFilter === "auctions"
              ? "bg-blue-500 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
          onClick={() => onFilterChange("auctions")}
        >
          Auctions
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search Loan Number"
            className="w-full px-4 py-2 pr-10 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
          />
          <Search
            className="absolute right-3 top-2.5 text-gray-400"
            size={18}
          />
        </div>
        <div className="flex gap-2 sm:gap-3">
          <button className="px-3 sm:px-4 py-2 border rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center whitespace-nowrap">
            Select Columns <ChevronDown size={14} className="ml-1" />
          </button>
          <button className="px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors flex items-center">
            <Filter className="mr-1.5" size={16} />
            <span className="whitespace-nowrap">More Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
};
