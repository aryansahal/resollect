import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  Bell,
  FileText,
  Upload,
  Settings,
  Users,
  Lock,
  X,
} from "lucide-react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, to, isActive }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const active = isActive || currentPath === to;

  return (
    <li>
      <Link
        to={to}
        className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg ${
          active ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <span className="text-[18px]">{icon}</span>
        <span className="text-sm">{label}</span>
      </Link>
    </li>
  );
};

interface SidebarProps {
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  return (
    <div className="w-60 h-full bg-white border-r flex flex-col">
      <div className="flex lg:hidden items-center justify-end p-4">
        <button onClick={onClose} className="text-gray-500">
          <X size={20} />
        </button>
      </div>

      <div className="p-4 flex-1 overflow-y-auto mt-4">
        <ul className="space-y-1">
          <NavItem
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
            to="/dashboard"
          />
          <NavItem
            icon={<Briefcase size={18} />}
            label="Portfolio"
            to="/portfolio"
          />
          <NavItem
            icon={<Bell size={18} />}
            label="Notifications"
            to="/notifications"
          />
          <NavItem
            icon={<FileText size={18} />}
            label="Notices"
            to="/notices"
          />
          <NavItem
            icon={<Briefcase size={18} />}
            label="Auction"
            to="/auction"
          />
          <NavItem
            icon={<Upload size={18} />}
            label="Data Upload"
            to="/data-upload"
          />
          <NavItem
            icon={<Settings size={18} />}
            label="Control Panel"
            to="/control-panel"
          />
          <NavItem
            icon={<Users size={18} />}
            label="User Management"
            to="/user-management"
          />
          <NavItem
            icon={<Lock size={18} />}
            label="Permissions"
            to="/permissions"
          />
        </ul>
      </div>

      <div className="p-4 border-t border-gray-200 text-xs text-center text-gray-500">
        powered by <span className="font-bold">Resollect</span>
      </div>
    </div>
  );
};
