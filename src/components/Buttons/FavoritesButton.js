import React from 'react';
import FavoritesList from '../list/FavoritesList';
import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
    getDoc,
    setDoc,
  } from "firebase/firestore";
  import { firestore, auth } from "../../firebase";


  const FavoritesButton = ({ broadcastId, isFavorite, onToggleFavorite }) => {
    return (
      <button
        className={`bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md ${
          isFavorite ? "bg-green-500" : ""
        }`}
        onClick={() => onToggleFavorite(broadcastId)}
      >
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    );
  };
  
  export default FavoritesButton;