import React, { useState, useEffect } from "react";
import {
  X,
  CheckCircle,
  ChevronDown,
  FileSpreadsheet,
  AlertCircle,
} from "lucide-react";

interface UploadSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ParsedDataItem {
  id: string;
  borrower?: string;
  amount?: string;
  [key: string]: any;
}

const UploadSidebar: React.FC<UploadSidebarProps> = ({ isOpen, onClose }) => {
  const [dataCategory, setDataCategory] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("No file chosen");
  const [showSuccess, setShowSuccess] = useState(false);
  const [parsedData, setParsedData] = useState<ParsedDataItem[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [documentType, setDocumentType] = useState("");
  const [documentRemark, setDocumentRemark] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");
    setParsedData([]);
    setShowPreview(false);

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFileName(file.name);

      const extension = file.name.split(".").pop()?.toLowerCase();
      if (extension !== "csv" && extension !== "xlsx" && extension !== "xls") {
        setErrorMessage(
          "Please upload a CSV or Excel file (.csv, .xlsx, .xls)"
        );
        return;
      }

      if (extension === "csv") {
        parseCSV(file);
      } else {
        setErrorMessage(
          "Excel parsing is not implemented in this demo. Please use CSV."
        );
      }
    }
  };

  const parseCSV = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csv = e.target?.result as string;
        const lines = csv.split("\n");

        const headers = lines[0].split(",").map((header) => header.trim());

        const data: ParsedDataItem[] = [];
        for (let i = 1; i < lines.length; i++) {
          if (lines[i].trim() === "") continue;

          const values = lines[i].split(",").map((val) => val.trim());
          const item: ParsedDataItem = { id: i.toString() };

          headers.forEach((header, index) => {
            if (values[index]) {
              item[header] = values[index];
              if (header === "id") {
                item.id = values[index];
              }
            }
          });

          data.push(item);
        }

        setParsedData(data);
        setShowPreview(true);
      } catch (error) {
        console.error("Error parsing CSV:", error);
        setErrorMessage("Failed to parse CSV file. Please check the format.");
      }
    };
    reader.readAsText(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!dataCategory || !selectedFile) {
      setErrorMessage("Please select a data category and upload a file");
      return;
    }

    if (parsedData.length === 0) {
      setErrorMessage("No valid data found in the file");
      return;
    }

    console.log({
      dataCategory,
      fileName,
      documentType,
      documentRemark,
      rowCount: parsedData.length,
      data: parsedData.slice(0, 3),
    });

    setShowSuccess(true);

    setDataCategory("");
    setSelectedFile(null);
    setFileName("No file chosen");
    setDocumentType("");
    setDocumentRemark("");
    setParsedData([]);
    setShowPreview(false);

    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 2000);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showSuccess) {
      timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [showSuccess]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
      <div className="fixed inset-0 bg-black bg-opacity-30" onClick={onClose} />

      {showSuccess && (
        <div className="fixed top-4 right-4 z-[60] bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-md flex items-center animate-fade-in">
          <CheckCircle size={20} className="mr-2 text-green-500" />
          <span>Data uploaded successfully!</span>
        </div>
      )}

      <div className="relative bg-white w-full max-w-md h-screen max-h-screen overflow-y-auto z-10 animate-slide-in-right">
        <header className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-medium">Upload Data</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="data-category"
              className="block text-sm text-gray-700"
            >
              Data Category
            </label>
            <div className="relative">
              <select
                id="data-category"
                value={dataCategory}
                onChange={(e) => setDataCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
                name="dataCategory"
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="loans">Loan Details</option>
                <option value="customers">Customer Information</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="document-type"
              className="block text-sm text-gray-700"
            >
              Document Type
            </label>
            <div className="relative">
              <select
                id="document-type"
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                name="documentType"
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="csv">CSV</option>
                <option value="excel">Excel</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="document-remark"
              className="block text-sm text-gray-700"
            >
              Document Remark
            </label>
            <textarea
              id="document-remark"
              value={documentRemark}
              onChange={(e) => setDocumentRemark(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              rows={2}
              name="documentRemark"
              placeholder="Add any notes or comments about this document"
            ></textarea>
          </div>
          <div className="space-y-2">
            <label htmlFor="data-file" className="block text-sm text-gray-700">
              Upload File (CSV, Excel)
            </label>
            <div className="flex items-center space-x-2">
              <label
                htmlFor="data-file"
                className="px-3 py-2 bg-blue-50 text-blue-500 rounded-md cursor-pointer hover:bg-blue-100 transition-colors flex items-center"
              >
                <FileSpreadsheet size={18} className="mr-2" />
                Choose file
                <input
                  id="data-file"
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileChange}
                  className="hidden"
                  name="dataFile"
                />
              </label>
              <span className="text-sm text-gray-500">{fileName}</span>
            </div>

            {errorMessage && (
              <div className="mt-2 text-red-500 text-sm flex items-center">
                <AlertCircle size={16} className="mr-1" />
                {errorMessage}
              </div>
            )}
          </div>

          {showPreview && parsedData.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">
                Data Preview
              </h3>
              <div className="border rounded-md overflow-x-auto max-h-60">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      {Object.keys(parsedData[0]).map((header) => (
                        <th
                          key={header}
                          className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {parsedData.slice(0, 15).map((row, index) => (
                      <tr key={index}>
                        {Object.values(row).map((value, i) => (
                          <td key={i} className="px-3 py-2 whitespace-nowrap">
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-500">
                {parsedData.length > 15
                  ? `Showing first 15 of ${parsedData.length} records`
                  : `Showing ${parsedData.length} records`}
              </p>
            </div>
          )}

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center"
              disabled={!selectedFile || parsedData.length === 0}
            >
              Upload Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadSidebar;
