// NotFound.tsx
import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-7xl font-bold mb-4 text-black">404</h1>
      <p className="text-lg text-4xl font-bold text-gray-600 py-3">Page Not Found</p>
      <button id='backToHomeButton'><a href="/account" className="border border-blue-600 rounded p-2 px-5 flex text-lg bg-blue-700 text-white">Back to Home</a></button>
    </div>
  );
};
export default NotFound;