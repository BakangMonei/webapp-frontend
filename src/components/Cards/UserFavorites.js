import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, query, deleteDoc } from "firebase/firestore";
import { firestore, auth } from "../../Database/firebase";
import FavoriteCard from "../Cards/FavoriteCard";

// Existing imports...

const UserFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchUserFavorites();
  }, []);

  const fetchUserFavorites = async () => {
    const userId = auth.currentUser.uid;
    const userFavCollection = collection(firestore, `user_fav/${userId}/favorites`);
    const q = query(userFavCollection);

    const querySnapshot = await getDocs(q);
    const favoriteIds = querySnapshot.docs.map((doc) => doc.data().broadcastId);
    setFavorites(favoriteIds);
  };

  const handleRemoveFavorite = async (broadcastId) => {
    const userId = auth.currentUser.uid;
    const userFavCollection = collection(firestore, `user_fav/${userId}/favorites`);
    const broadcastRef = doc(userFavCollection, broadcastId);

    await deleteDoc(broadcastRef);
    setFavorites((prevFavorites) => prevFavorites.filter((id) => id !== broadcastId));
  };

  return (
    <div className="t-12 mb-8 flex flex-col gap-12">
      <h2 className="text-2xl font-semibold mb-5">Your Favorites</h2>
      {favorites.map((broadcastId) => (
        <FavoriteCard
          key={broadcastId}
          broadcastId={broadcastId}
          onRemove={handleRemoveFavorite}
        />
      ))}
    </div>
  );
};

export default UserFavorites;
