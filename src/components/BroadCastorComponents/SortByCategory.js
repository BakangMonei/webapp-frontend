// components/SortByCategory.js

import React, { useState } from "react";

const SortByCategory = () => {
  // Dummy data for broadcasts
  const [broadcasts] = useState([
    { id: 1, title: "Broadcast 1", category: "Sports" },
    { id: 2, title: "Broadcast 2", category: "Entertainment" },
    { id: 3, title: "Broadcast 3", category: "News" },
    { id: 4, title: "Broadcast 4", category: "Sports" },
  ]);

  // State variable for sorted broadcasts
  const [sortedBroadcasts, setSortedBroadcasts] = useState(broadcasts);

  // Function to sort broadcasts by category
  const sortByCategory = () => {
    const sorted = [...broadcasts].sort((a, b) =>
      a.category.localeCompare(b.category)
    );
    setSortedBroadcasts(sorted);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sort By Category</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        {/* Button to trigger sorting */}
        <button
          onClick={sortByCategory}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Sort by Category
        </button>
        {/* Display sorted broadcasts */}
        <ul>
          {sortedBroadcasts.map((broadcast) => (
            <li key={broadcast.id} className="border-b py-2">
              <div className="font-semibold">{broadcast.title}</div>
              <div className="text-gray-600">{broadcast.category}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SortByCategory;
