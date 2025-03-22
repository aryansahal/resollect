import React from "react";
import { ChevronDown } from "lucide-react";

export const Navbar: React.FC = () => {
  return (
    <div className="h-[49px] bg-white border-b py-3 px-6 w-full flex items-center">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2 flex-shrink-0">
            R
          </div>
          <span className="text-xl font-bold">esollect</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm font-medium">Tushar</div>
            <div className="text-xs text-gray-500">tushar@resollect.com</div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
          <ChevronDown size={24} className="text-gray-500" />
        </div>
      </div>
    </div>
  );
};
