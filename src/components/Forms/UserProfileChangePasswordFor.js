import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { auth, firestore } from "../../Database/firebase"; // Import auth and firestore from firebase.js
import {
    query,
    where,
    getDocs,
    collection,
    updateDoc,
} from "firebase/firestore";
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword, sendPasswordResetEmail } from "firebase/auth";

const UserProfileChangePasswordFor = () => {
    const [user, setUser] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });
    const [loading, setLoading] = useState(true);

    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);
    const handleLogout = () => {
        auth
            .signOut()
            .then(() => {
                console.log("User signed out");
                // Redirect to login page or homepage after logout
                window.location.href = "/LoginPage";
            })
            .catch((error) => {
                console.error("Error signing out:", error);
            });
    };

    const handleSend = async () => {
        try {
            await sendPasswordResetEmail(auth, email);
            setSent(true);
            alert("Password reset link sent to your email!");
            handleLogout();
        } catch (error) {
            console.error("Error sending password reset link:", error);
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
          if (currentUser) {
            try {
              let userData;
              const collections = ["users", "admin", "s_admin"];
      
              for (const collectionName of collections) {
                const q = query(
                  collection(firestore, collectionName),
                  where("email", "==", currentUser.email)
                );
                const querySnapshot = await getDocs(q);
      
                if (!querySnapshot.empty) {
                  userData = querySnapshot.docs[0].data();
                  break;
                }
              }
      
              if (userData) {
                setUser(userData);
              } else {
                console.log("No matching documents found.");
                setUser(null);
              }
            } catch (error) {
              console.error("Error fetching user data: ", error);
            } finally {
              setLoading(false);
            }
          } else {
            setUser(null);
            setLoading(false);
          }
        });
      
        return () => unsubscribe();
      }, []);

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };



    const handleDeleteAccount = async () => {
        const currentUser = auth.currentUser;
        if (!currentUser) {
            console.error("User not authenticated.");
            return;
        }

        if (window.confirm("Are you sure you want to delete your account?")) {
            try {
                // Delete user document from Firestore
                const q = query(
                    collection(firestore, "users"),
                    where("email", "==", currentUser.email)
                );
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    const userDocRef = querySnapshot.docs[0].ref;
                    await userDocRef.delete();
                }
                // Delete user from Firebase Authentication
                await currentUser.delete();
                console.log("User account deleted successfully.");
            } catch (error) {
                console.error("Error deleting user: ", error.message);
                alert("Error deleting user. Please try again later.");
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div
                    className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                    role="status"
                >
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Password for Reset for
                    </h3>
                    <p>{user.email}</p>
                </div>

                <div className="p-7">
                    <form>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input
                                type="email"
                                placeholder={user.email}
                                className="bg-transparent w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
                                value={email}

                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="flex justify-end gap-4.5 mt-3 space-x-2">
                            <button
                                className="flex justify-center bg-red-500 rounded border border-stroke py-2 px-6 font-medium text-white hover:shadow-1 dark:border-strokedark dark:text-white"
                                type="button"
                                onClick={handleDeleteAccount}
                            >
                                Delete Account
                            </button>
                            <button
                                className="flex justify-center bg-red-500 rounded border border-stroke py-2 px-6 font-medium text-white hover:shadow-1 dark:border-strokedark dark:text-white"
                                type="button"
                            >
                                Cancel
                            </button>
                            <button
                                className="flex justify-center rounded bg-blue-500 py-2 px-6 font-medium text-white hover:bg-opacity-90"
                                type="submit"
                                onChange={handleChange}
                                onClick={handleSend}
                            >
                                Change
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserProfileChangePasswordFor;
