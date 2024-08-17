import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
  query,
  where,
  setDoc,
} from "firebase/firestore";
import { firestore, auth } from "../../Database/firebase";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Carousel,
  Button,
} from "@material-tailwind/react";
import FavoriteCard from "./FavoriteCard";

const VideoPlayer = ({ videoURL }) => {
  return (
    <div className="mt-4">
      <iframe
        width="450"
        height="250"
        src={videoURL}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      />
    </div>
  );
};

const FavoriteButton = ({ broadcastId, isFavorite, onToggleFavorite }) => {
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

const CommentSection = ({ broadcastId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    // Add comment logic here
  };

  return (
    <div className="mt-4">
      <h3>Comments</h3>
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
        />
        <button type="submit">Comment</button>
      </form>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
    </div>
  );
};

const ShowMoreText = ({ text }) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const toggleTruncated = () => {
    setIsTruncated(!isTruncated);
  };

  const truncatedText = text.split(" ").slice(0, 15).join(" ") + "...";
  const displayText = isTruncated ? truncatedText : text;

  return (
    <div>
      <p>{displayText}</p>
      {text.split(" ").length > 15 && (
        <Button variant="text" color="blue" onClick={toggleTruncated}>
          {isTruncated ? "Show More" : "Show Less"}
        </Button>
      )}
    </div>
  );
};

const SportsCard = () => {
  const [broadcasts, setBroadcasts] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchBroadcasts();
  }, []);

  useEffect(() => {
    if (broadcasts.length > 0) {
      fetchFavorites();
    }
  }, [broadcasts]);

  const fetchBroadcasts = async () => {
    const broadcastsCollection = collection(firestore, "broadcasts");
    const broadcastsSnapshot = await getDocs(broadcastsCollection);
    const broadcastsData = [];
    broadcastsSnapshot.forEach((doc) => {
      broadcastsData.push({ id: doc.id, ...doc.data() });
    });
    setBroadcasts(broadcastsData);
  };

  const fetchFavorites = async () => {
    const userId = auth.currentUser.uid;
    const userFavCollection = collection(
      firestore,
      `user_fav/${userId}/favorites`
    );
    const q = query(
      userFavCollection,
      where(
        "broadcastId",
        "in",
        broadcasts.map((b) => b.id)
      )
    );
    const querySnapshot = await getDocs(q);
    const favoritesData = [];
    querySnapshot.forEach((doc) => {
      favoritesData.push({ id: doc.id, broadcastId: doc.data().broadcastId });
    });
    setFavorites(favoritesData);
  };

  const handleToggleFavorite = async (broadcastId) => {
    const userId = auth.currentUser.uid;
    const userFavCollection = collection(
      firestore,
      `user_fav/${userId}/favorites`
    );
    const broadcastRef = doc(userFavCollection, broadcastId);

    const docSnapshot = await getDoc(broadcastRef);
    const isFavorite = docSnapshot.exists();

    if (isFavorite) {
      await deleteDoc(broadcastRef);
    } else {
      await setDoc(broadcastRef, { broadcastId: broadcastId });
    }
  };

  // Group broadcasts by sport name
  const groupedBroadcasts = {};
  broadcasts.forEach((broadcast) => {
    if (!groupedBroadcasts[broadcast.sportName]) {
      groupedBroadcasts[broadcast.sportName] = [];
    }
    groupedBroadcasts[broadcast.sportName].push(broadcast);
  });

  return (
    <div className="t-12 mb-8 flex flex-col gap-12">
      {Object.entries(groupedBroadcasts).map(([sportName, broadcasts]) => (
        <Card key={sportName}>
          <CardHeader
            variant="gradient"
            color="gray"
            className=" mb-5 p-8 bg-black"
          >
            <Typography variant="h6" color="white">
              {sportName}
            </Typography>
          </CardHeader>
          <Carousel>
            <div className="container mx-auto p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {broadcasts.map((broadcast) => (
                  <div
                    key={broadcast.id}
                    className="bg-white rounded-lg shadow-md p-4"
                  >
                    <VideoPlayer videoURL={broadcast.videoURL} />
                    <h2 className="text-lg font-semibold mb-2">
                      {broadcast.sportName}
                    </h2>
                    {/* <h3 className="text-sm font-mono mb-2">
                      {broadcast.description}
                    </h3> */}
                    <ShowMoreText text={broadcast.description} />
                    <p>title: {broadcast.title}</p>
                    <p>Date & Time: {broadcast.dateTime}</p>
                    <p>Venue: {broadcast.venue}</p>
                    <p>Country: {broadcast.country}</p>

                    <div className="mt-4 space-x-2">
                      <FavoriteButton
                        broadcastId={broadcast.id}
                        isFavorite={favorites.some(
                          (fav) => fav.broadcastId === broadcast.id
                        )}
                        onToggleFavorite={handleToggleFavorite}
                      />
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                        onClick={() => console.log("Add Comment")}
                      >
                        Add Comment
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Carousel>
        </Card>
      ))}
    </div>
  );
};

export default SportsCard;
