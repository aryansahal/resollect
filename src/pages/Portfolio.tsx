import { useState, useEffect } from "react";
import { LoansTable } from "../components/portfolio/LoansTable";
import { PortfolioHeader } from "../components/portfolio/PortfolioHeader";
import UploadSidebar from "../components/modals/UploadSidebar";
import { FilterTab } from "../types";

const Portfolio = () => {
  const [query, setQuery] = useState("");
  const [currentFilter, setCurrentFilter] = useState<FilterTab>("all");
  const [showUploadSidebar, setShowUploadSidebar] = useState(false);

  const updateSearchQuery = (newQuery: string) => {
    setQuery(newQuery.trim());
  };

  const updateFilter = (newFilter: FilterTab) => {
    if (newFilter !== currentFilter) {
      setCurrentFilter(newFilter);
    }
  };

  useEffect(() => {
    function handleOpenUploadModal() {
      setShowUploadSidebar(true);
    }

    window.addEventListener("open-upload-modal", handleOpenUploadModal);
    return () => {
      window.removeEventListener("open-upload-modal", handleOpenUploadModal);
    };
  }, []);

  return (
    <div className="flex-1 max-w-full h-full overflow-auto">
      <PortfolioHeader
        searchQuery={query}
        onSearch={updateSearchQuery}
        activeFilter={currentFilter}
        onFilterChange={updateFilter}
      />

      <div className="px-6 pt-4 pb-6 w-full max-w-full overflow-x-auto overflow-y-visible">
        <LoansTable searchQuery={query} activeFilter={currentFilter} />
      </div>

      <UploadSidebar
        isOpen={showUploadSidebar}
        onClose={() => setShowUploadSidebar(false)}
      />
    </div>
  );
};

export default Portfolio;
