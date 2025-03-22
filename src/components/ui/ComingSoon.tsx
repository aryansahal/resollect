import React from "react";

interface ComingSoonProps {
  pageName: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ pageName }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] p-6">
      <div className="bg-white rounded-lg shadow-sm p-10 max-w-md w-full text-center">
        <h2 className="text-2xl font-semibold mb-2">{pageName}</h2>
        <div className="w-16 h-1 bg-blue-500 mx-auto mb-6"></div>
        <p className="text-gray-600 mb-6">
          This feature is currently in development and will be available soon.
        </p>
        <div className="text-sm text-gray-500">
          Check back later for updates on this exciting new feature!
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
