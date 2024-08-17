import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { auth, firestore } from "../../Database/firebase"; // Import auth and firestore from firebase.js
import {
    query,
    where,
    getDocs,
    collection,
    doc,
    updateDoc,
} from "firebase/firestore";

const UserProfileForm = () => {

    const { userId } = useParams();
    const [user, setUser] = useState({
        email: "",
        firstname: "",
        gender: "",
        lastname: "",
        phonenumber: "",
        selectedCountry: "",
        sport: "",
        username: "",
        notificationPreferences: "all",
    });
    const [loading, setLoading] = useState(true);
    const [originalUser, setOriginalUser] = useState(null); // store the original user data

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
          if (currentUser) {
            try {
              let userData;
              const collections = ["users", "admin", "s_admin"];
      
              for (const collectionName of collections) {
                const q = query(collection(firestore, collectionName), where("email", "==", currentUser.email));
                const querySnapshot = await getDocs(q);
      
                if (!querySnapshot.empty) {
                  userData = querySnapshot.docs[0].data();
                  break;
                }
              }
      
              if (userData) {
                setUser(userData);
                setOriginalUser(userData);
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
        const { name, value } = e.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!originalUser) return; // no original user data, do nothing

        const updatedUser = { ...user };
        const changes = {};

        Object.keys(updatedUser).forEach((key) => {
            if (updatedUser[key] !== originalUser[key]) {
                changes[key] = updatedUser[key];
            }
        });

        if (Object.keys(changes).length > 0) {
            try {
                const q = query(collection(firestore, "users"), where("email", "==", user.email));
                const querySnapshot = await getDocs(q);
                if (querySnapshot.empty) {
                    console.log("No matching documents found.");
                } else {
                    const userRef = querySnapshot.docs[0].ref;
                    await updateDoc(userRef, changes);
                    console.log("User data updated successfully!");
                    alert("User data updated successfully!");
                }
            } catch (error) {
                console.error("Error updating user data: ", error);
            }
        } 
        if (Object.keys(changes).length > 0) {
            try {
                const q = query(collection(firestore, "admin"), where("email", "==", user.email));
                const querySnapshot = await getDocs(q);
                if (querySnapshot.empty) {
                    console.log("No matching documents found.");
                } else {
                    const userRef = querySnapshot.docs[0].ref;
                    await updateDoc(userRef, changes);
                    console.log("User data updated successfully!");
                    alert("User data updated successfully!");
                }
            } catch (error) {
                console.error("Error updating user data: ", error);
            }
        }
        if (Object.keys(changes).length > 0) {
            try {
                const q = query(collection(firestore, "s_admin"), where("email", "==", user.email));
                const querySnapshot = await getDocs(q);
                if (querySnapshot.empty) {
                    console.log("No matching documents found.");
                } else {
                    const userRef = querySnapshot.docs[0].ref;
                    await updateDoc(userRef, changes);
                    console.log("User data updated successfully!");
                    alert("User data updated successfully!");
                }
            } catch (error) {
                console.error("Error updating user data: ", error);
            }
        }
        else {
            console.log("No changes to update.");
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
        <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                        Personal Information
                    </h3>
                </div>
                <div className="p-7">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row space-x-2">
                            <div className="w-full sm:w-1/2">
                                <label
                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                    htmlFor="firstname"
                                >
                                    firstname
                                </label>
                                <div className="relative flex items-center">
                                    <span className="mr-3">
                                        <svg
                                            className="fill-current"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g opacity="0.8">
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                                                    fill=""
                                                />
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                                                    fill=""
                                                />
                                            </g>
                                        </svg>
                                    </span>
                                    <input
                                        className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                        type="text"
                                        name="firstname"
                                        id="firstname"
                                        onChange={handleChange}
                                        placeholder="FirstName"
                                        value={user.firstname}
                                    />
                                </div>
                            </div>
                            <div className="w-full sm:w-1/2">
                                <label
                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                    htmlFor="firstname"
                                >
                                    LastName
                                </label>
                                <div className="relative flex items-center">
                                    <span className="mr-3">
                                        <svg
                                            className="fill-current"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g opacity="0.8">
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                                                    fill=""
                                                />
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                                                    fill=""
                                                />
                                            </g>
                                        </svg>
                                    </span>
                                    <input
                                        className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                        type="text"
                                        name="lastname"
                                        id="lastname"
                                        onChange={handleChange}
                                        placeholder="LastName"
                                        value={user.lastname}
                                    />
                                </div>
                            </div>

                            <div className="w-full sm:w-1/2">
                                <label
                                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                                    htmlFor="phoneNumber"
                                >
                                    Phone Number
                                </label>
                                <input
                                    className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    type="text"
                                    name="phonenumber"
                                    id="phoneNumber"
                                    placeholder="Phone Number"
                                    value={user.phonenumber}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="mb-5.5">
                            <label
                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                htmlFor="emailAddress"
                            >
                                Email Address
                            </label>
                            <div className="relative flex items-center">
                                <span className="mr-3">
                                    <svg
                                        className="fill-current"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g opacity="0.8">
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                                                fill=""
                                            />
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                                                fill=""
                                            />
                                        </g>
                                    </svg>
                                </span>
                                <input
                                    className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"

                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email Address"
                                    value={user.email}
                                    onChange={handleChange}
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="mb-5.5">
                            <label
                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                htmlFor="gender"
                            >
                                Gender
                            </label>
                            <div className="relative flex items-center">
                                <span className="mr-3">
                                    <svg
                                        className="fill-current"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M10 17.5C13.6467 17.5 16.875 14.3482 16.875 10.5C16.875 6.65176 13.6467 3.5 10 3.5C6.35327 3.5 3.125 6.65176 3.125 10.5C3.125 14.3482 6.35327 17.5 10 17.5ZM10 14.5C7.23858 14.5 5 12.2614 5 10C5 7.73858 7.23858 5.5 10 5.5C12.7614 5.5 15 7.73858 15 10C15 12.2614 12.7614 14.5 10 14.5Z"
                                            fill=""
                                        />
                                    </svg>
                                </span>
                                <input
                                    className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    type="text"
                                    name="gender"
                                    id="gender"
                                    placeholder="Gender"
                                    value={user.gender}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="mb-5.5">
                            <label
                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                htmlFor="sport"
                            >
                                Sports
                            </label>
                            <div className="relative flex items-center">
                                <span className="mr-3">
                                    <svg
                                        className="fill-current"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M10 17.5C13.6467 17.5 16.875 14.3482 16.875 10.5C16.875 6.65176 13.6467 3.5 10 3.5C6.35327 3.5 3.125 6.65176 3.125 10.5C3.125 14.3482 6.35327 17.5 10 17.5ZM10 14.5C7.23858 14.5 5 12.2614 5 10C5 7.73858 7.23858 5.5 10 5.5C12.7614 5.5 15 7.73858 15 10C15 12.2614 12.7614 14.5 10 14.5Z"
                                            fill=""
                                        />
                                    </svg>
                                </span>
                                <input
                                    className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"

                                    type="text"
                                    name="sport"
                                    id="sport"
                                    placeholder="Favorite Sport"
                                    value={user.sport}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="mb-5.5">
                            <label
                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                htmlFor="selectedCountry"
                            >
                                Country
                            </label>
                            <div className="relative flex items-center">
                                <span className="mr-3">
                                    <svg
                                        className="fill-current"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M10 17.5C13.6467 17.5 16.875 14.3482 16.875 10.5C16.875 6.65176 13.6467 3.5 10 3.5C6.35327 3.5 3.125 6.65176 3.125 10.5C3.125 14.3482 6.35327 17.5 10 17.5ZM10 14.5C7.23858 14.5 5 12.2614 5 10C5 7.73858 7.23858 5.5 10 5.5C12.7614 5.5 15 7.73858 15 10C15 12.2614 12.7614 14.5 10 14.5Z"
                                            fill=""
                                        />
                                    </svg>
                                </span>
                                <input
                                    className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"

                                    type="text"
                                    name="selectedCountry"
                                    id="selectedCountry"
                                    placeholder="Country"
                                    value={user.selectedCountry}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="mb-5.5">
                            <label
                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                htmlFor="username"
                            >
                                Username
                            </label>
                            <div className="relative flex items-center">
                                <span className="mr-3">
                                    <svg
                                        className="fill-current"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M10 17.5C13.6467 17.5 16.875 14.3482 16.875 10.5C16.875 6.65176 13.6467 3.5 10 3.5C6.35327 3.5 3.125 6.65176 3.125 10.5C3.125 14.3482 6.35327 17.5 10 17.5ZM10 14.5C7.23858 14.5 5 12.2614 5 10C5 7.73858 7.23858 5.5 10 5.5C12.7614 5.5 15 7.73858 15 10C15 12.2614 12.7614 14.5 10 14.5Z"
                                            fill=""
                                        />
                                    </svg>
                                </span>
                                <input
                                    className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder="username"
                                    value={user.username}
                                    onChange={handleChange}

                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-4.5 mt-4 space-x-2">
                            <button
                                className="flex justify-center rounded bg-red-500 border border-stroke py-2 px-6 font-medium text-white hover:shadow-1 dark:border-strokedark dark:text-white"
                                type="submit"
                            >
                                Cancel
                            </button>
                            <button
                                className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-white hover:bg-opacity-90 bg-blue-500 "
                                type="submit"
                                onSubmit={handleSubmit}
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}


export default UserProfileForm;