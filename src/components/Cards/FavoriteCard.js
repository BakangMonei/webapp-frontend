import React, { useState, useEffect } from "react";
import { collection, doc, getDoc } from "firebase/firestore";
import { firestore } from "../../Database/firebase";

const FavoriteCard = ({ broadcastId, onRemove }) => {
  const [broadcastDetails, setBroadcastDetails] = useState(null);

  useEffect(() => {
    const fetchBroadcastDetails = async () => {
      try {
        const broadcastDoc = doc(firestore, "broadcasts", broadcastId);
        const docSnapshot = await getDoc(broadcastDoc);
        if (docSnapshot.exists()) {
          setBroadcastDetails(docSnapshot.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };

    fetchBroadcastDetails();
  }, [broadcastId]);

  return (
    <div className="bg-white shadow-md p-4 rounded-md">
      {broadcastDetails ? (
        <>
          <p>Title: {broadcastDetails.title}</p>
          <p>Sport Name: {broadcastDetails.sportName}</p>
          <p>Description: {broadcastDetails.description}</p>
          <p>Date & Time: {broadcastDetails.dateTime}</p>
          <p>Venue: {broadcastDetails.venue}</p>
          <p>Country: {broadcastDetails.country}</p>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            onClick={() => onRemove(broadcastId)}
          >
            Remove from Favorites
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FavoriteCard;
