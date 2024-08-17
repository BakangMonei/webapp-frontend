import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, firestore, storage } from "../../Database/firebase"; // Import your firebase instances

function CreatePost() {
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [newComments, setNewComments] = useState({});

  useEffect(() => {
    // Fetch posts from Firestore and subscribe to updates
    const fetchData = async () => {
      const q = query(
        collection(firestore, "posts"),
        orderBy("timestamp", "desc")
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          const postData = doc.data();
          // Ensure comments and likes property is defined
          if (!postData.comments) {
            postData.comments = [];
          }
          if (!postData.likedBy) {
            postData.likedBy = [];
          }
          data.push({ id: doc.id, ...postData });
        });
        setPosts(data);
      });
      return unsubscribe;
    };

    fetchData();

    // Listen for auth state changes and fetch user data
    const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const collections = ["users", "admin", "s_admin"];
        let userData = null;

        for (const collectionName of collections) {
          const q = query(
            collection(firestore, collectionName),
            where("email", "==", user.email)
          );
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            userData = querySnapshot.docs[0].data();
            break;
          }
        }

        if (userData) {
          setCurrentUser(userData);
        } else {
          console.log("No matching documents found.");
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (newPostContent.trim() === "") return;

    try {
      let imageUrl = "";
      // Upload image to Firebase Storage
      if (image) {
        const imageRef = ref(storage, `posts/${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      // Add post to Firestore
      await addDoc(collection(firestore, "posts"), {
        content: newPostContent,
        timestamp: new Date(),
        user: currentUser ? `${currentUser.firstname} ${currentUser.lastname}` : "Unknown",
        userId: currentUser ? currentUser.email : "unknown",
        image: imageUrl,
        likes: 0,
        likedBy: [],
        comments: [],
      });

      setNewPostContent("");
      setImage(null);
      setImageUrl("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleDeletePost = async (postId) => {
    try {
      await deleteDoc(doc(firestore, "posts", postId));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleLikePost = async (postId, currentLikes, likedBy) => {
    if (likedBy.includes(currentUser.email)) {
      alert("You have already liked this post.");
      return;
    }
    try {
      const postRef = doc(firestore, "posts", postId);
      await updateDoc(postRef, {
        likes: currentLikes + 1,
        likedBy: [...likedBy, currentUser.email],
      });
    } catch (error) {
      console.error("Error liking document: ", error);
    }
  };

  const handleCommentChange = (postId, comment) => {
    setNewComments((prevComments) => ({
      ...prevComments,
      [postId]: comment,
    }));
  };

  const handleCommentSubmit = async (postId, comment) => {
    if (comment.trim() === "") return;
    try {
      const postRef = doc(firestore, "posts", postId);
      const postDoc = await getDoc(postRef);
      const post = postDoc.data();
      await updateDoc(postRef, {
        comments: [...post.comments, { text: comment, user: `${currentUser.firstname} ${currentUser.lastname}` }],
      });
      setNewComments((prevComments) => ({
        ...prevComments,
        [postId]: "",
      }));
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Post form */}
      <form
        onSubmit={handlePostSubmit}
        className="mb-4 border p-4 bg-white rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-bold mb-4">Post Something About The Games</h1>
        <textarea
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        ></textarea>
        <input type="file" onChange={handleImageChange} className="mb-4" />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Post
        </button>
      </form>

      {/* Display posts */}
      {posts.map((post) => (
        <div
          key={post.id}
          className="border border-gray-300 rounded-md p-4 mb-4 bg-white shadow-md flex"
        >
          {post.image && (
            <img
              src={post.image}
              alt="Post"
              className="w-32 h-32 object-cover rounded-md mr-4"
            />
          )}
          <div className="flex-1">
            <p className="text-lg font-semibold mb-2">{post.content}</p>
            <p className="text-gray-500">Posted by: {post.user}</p>
            <p className="text-gray-500">
              {new Date(post.timestamp.seconds * 1000).toLocaleString()}
            </p>
            <div className="mt-2 flex items-center">
              <button
                onClick={() => handleLikePost(post.id, post.likes, post.likedBy)}
                className="px-4 py-2 bg-green-500 text-white rounded-md mr-4"
              >
                Like
              </button>
              <span>{post.likes} {post.likes === 1 ? 'Like' : 'Likes'}</span>
              {currentUser && currentUser.email === post.userId && (
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="ml-auto px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Delete
                </button>
              )}
            </div>
            <div className="mt-4">
              <h3 className="font-semibold">Comments:</h3>
              {post.comments.map((comment, index) => (
                <p key={index} className="text-gray-700">{comment.user}: {comment.text}</p>
              ))}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCommentSubmit(post.id, newComments[post.id] || "");
                }}
                className="mt-2"
              >
                <textarea
                  value={newComments[post.id] || ""}
                  onChange={(e) => handleCommentChange(post.id, e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full p-2 border border-gray-300 rounded-md mb-2"
                ></textarea>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Comment
                </button>
              </form>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CreatePost;
