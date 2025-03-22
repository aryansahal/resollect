import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Sidebar } from "./components/layout/Sidebar";
import { Navbar } from "./components/layout/Navbar";
import { Menu } from "lucide-react";
import Portfolio from "./pages/Portfolio";
import Dashboard from "./pages/Dashboard";
import Notifications from "./pages/Notifications";
import Notices from "./pages/Notices";
import Auction from "./pages/Auction";
import DataUpload from "./pages/DataUpload";
import ControlPanel from "./pages/ControlPanel";
import UserManagement from "./pages/UserManagement";
import Permissions from "./pages/Permissions";

function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen bg-gray-100">
        <div className="z-50">
          <Navbar />
        </div>

        <div className="flex flex-1 overflow-auto">
          <div
            className={`
              fixed top-[49px] bottom-0 left-0 z-40 transform transition-transform duration-300 ease-in-out overflow-y-auto
              ${
                showSidebar
                  ? "translate-x-0"
                  : "-translate-x-full lg:translate-x-0"
              }
            `}
          >
            <Sidebar onClose={() => setShowSidebar(false)} />
          </div>

          {/* Mobile menu toggle - only shown on small screens */}
          {!showSidebar && (
            <button
              onClick={() => setShowSidebar(true)}
              className="lg:hidden fixed top-20 left-4 z-50 p-2 rounded-lg bg-white shadow-md"
            >
              <Menu size={24} />
            </button>
          )}

          {/* Backdrop - only shown when sidebar is open on mobile */}
          {showSidebar && (
            <div
              className="fixed inset-0 top-[49px] bg-black bg-opacity-50 z-30 lg:hidden"
              onClick={() => setShowSidebar(false)}
            />
          )}

          <div className="flex-1 flex flex-col lg:pl-60 pt-0 w-full max-w-full overflow-auto">
            <div className="flex-1 w-full max-w-full overflow-auto">
              <Routes>
                <Route
                  path="/"
                  element={<Navigate to="/portfolio" replace />}
                />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/notices" element={<Notices />} />
                <Route path="/auction" element={<Auction />} />
                <Route path="/data-upload" element={<DataUpload />} />
                <Route path="/control-panel" element={<ControlPanel />} />
                <Route path="/user-management" element={<UserManagement />} />
                <Route path="/permissions" element={<Permissions />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
