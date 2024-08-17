// SearchBar.js
import React, { useState, useEffect } from 'react';
import { firestore } from "../../Database/firebase"; 
import { collection, query, where, getDocs } from 'firebase/firestore';
import SportsCard from '../Cards/SportsCard';

const UserSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.trim()!== '') {
        setLoading(true);
        const broadcastsRef = collection(firestore, 'broadcasts');
        const q = query(broadcastsRef, where('title', '>=', searchQuery), where('title', '<=', searchQuery + '\uf8ff'));
        const results = await getDocs(q);
        const searchResults = results.docs.map((doc) => doc.data());
        setSearchResults(searchResults);
        setLoading(false);
        setIsSearching(true);
      } else {
        setIsSearching(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center justify-center w-full mb-4">
      <div className="flex items-center justify-center w-full mb-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for sports..."
          className="w-full px-4 py-2 text-lg text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          onClick={handleSearch}
          className="ml-2 px-4 py-2 text-lg text-white bg-blue-600 hover:bg-blue-700 rounded-md"
        >
          Search
        </button>
      </div>
      {isSearching? (
        loading? (
          <p>Loading...</p>
        ) : (
          <SportsCard broadcasts={searchResults} />
        )
      ) : (
        <p>Enter a search query to start searching...</p>
      )}
    </div>
  );
};

export default UserSearchBar;