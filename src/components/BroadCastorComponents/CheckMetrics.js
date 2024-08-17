// components/CheckMetrics.js

import React from "react";

const CheckMetrics = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Check Metrics</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-2">Metrics for Broadcasts</h2>
        {/* Metrics data display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded p-4">
            <h3 className="text-lg font-semibold mb-2">Views</h3>
            {/* Display views metrics */}
            <p className="text-gray-700">Total Views: 100</p>
            <p className="text-gray-700">Average Views: 20</p>
          </div>
          <div className="border rounded p-4">
            <h3 className="text-lg font-semibold mb-2">Engagement</h3>
            {/* Display engagement metrics */}
            <p className="text-gray-700">Likes: 50</p>
            <p className="text-gray-700">Comments: 20</p>
            <p className="text-gray-700">Shares: 10</p>
          </div>
          {/* Add more metrics display as needed */}
        </div>
      </div>
    </div>
  );
};

export default CheckMetrics;
