import React, { useState } from 'react';
import { firestore } from "../../Database/firebase"; // Import your Firebase configuration

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = async () => {
    if (searchTerm.trim() !== '') {
      try {
        const snapshot = await firestore.collection('admin').where('email', '==', searchTerm).get();
        const searchData = snapshot.docs.map(doc => doc.data());
        setSearchResult(searchData);
      } catch (error) {
        console.error('Error searching:', error);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-4">
      <input
        type="text"
        placeholder="Search by email"
        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Search
      </button>
      <div className="mt-4">
        {searchResult.length > 0 ? (
          searchResult.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-md shadow-md mb-4">
              <p><strong>Name:</strong> {item.firstname}</p>
              <p><strong>Email:</strong> {item.email}</p>
              {/* Add other fields as needed */}
            </div>
          ))
        ) : (
          <p className="text-gray-600">No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
