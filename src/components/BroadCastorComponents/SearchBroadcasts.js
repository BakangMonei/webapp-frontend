// components/SearchBroadcasts.js

import React, { useState } from "react";

const SearchBroadcasts = () => {
  // Dummy data for broadcasts
  const [broadcasts] = useState([
    { id: 1, title: "Broadcast 1", category: "Sports" },
    { id: 2, title: "Broadcast 2", category: "Entertainment" },
    { id: 3, title: "Broadcast 3", category: "News" },
    { id: 4, title: "Broadcast 4", category: "Sports" },
  ]);

  // State variable for search query
  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to filter broadcasts based on search query
  const filteredBroadcasts = broadcasts.filter(
    (broadcast) =>
      broadcast.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      broadcast.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Search Broadcasts</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        {/* Search input */}
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search broadcasts"
          className="border rounded py-2 px-3 w-full mb-4"
        />
        {/* Display filtered broadcasts */}
        <ul>
          {filteredBroadcasts.map((broadcast) => (
            <li key={broadcast.id} className="border-b py-2">
              <div className="font-semibold">{broadcast.title}</div>
              <div className="text-gray-600">{broadcast.category}</div>
            </li>
          ))}
          {filteredBroadcasts.length === 0 && (
            <li className="text-gray-600">No broadcasts found.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SearchBroadcasts;
