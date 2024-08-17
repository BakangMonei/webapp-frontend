import React, { useState } from 'react';
import { auth, firestore } from '../../Database/firebase'; // Make sure to import your Firebase config
import { updatePassword, sendPasswordResetEmail } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';

const ViewUsersUpdate = ({ user, onUpdate, onClose }) => {
    const [updatedUser, setUpdatedUser] = useState({
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        selectedCountry: user.selectedCountry,
        phonenumber: user.phonenumber,
        username: user.username,
        gender: user.gender,
        sport: user.sport,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSave = () => {
        onUpdate(updatedUser);
        onClose();
    };

    const generatePassword = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let password = '';
        for (let i = 0; i < 12; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    };

    const handleResetPassword = async () => {
        const newPassword = generatePassword();

        try {
            // Find the user by email
            const userDocRef = doc(firestore, 'users', user.id);
            
            // Update the user's password in Firebase Authentication
            const userCredential = await auth.signInWithEmailAndPassword(user.email, user.oldPassword); // oldPassword should be available
            await updatePassword(userCredential.user, newPassword);

            // Update the Firestore document if needed
            await updateDoc(userDocRef, { password: newPassword });

            // Send the new password to the user's email
            await sendPasswordResetEmail(auth, user.email, newPassword);

            alert(`Password has been reset and sent to ${user.email}`);
        } catch (error) {
            console.error('Error resetting password: ', error);
            alert('Check Email For New Password.');
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-black bg-opacity-40 z-50">
            <div className="bg-white w-96 p-4 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Edit Broadcaster</h2>
                <div className="mb-4">
                    <label className="block mb-2">Email:</label>
                    <input
                        type="text"
                        name="email"
                        value={updatedUser.email}
                        onChange={handleChange}
                        className="w-full border rounded-md px-2 py-1"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={updatedUser.username}
                        onChange={handleChange}
                        className="w-full border rounded-md px-2 py-1"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">First Name:</label>
                    <input
                        type="text"
                        name="firstname"
                        value={updatedUser.firstname}
                        onChange={handleChange}
                        className="w-full border rounded-md px-2 py-1"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Last Name:</label>
                    <input
                        type="text"
                        name="lastname"
                        value={updatedUser.lastname}
                        onChange={handleChange}
                        className="w-full border rounded-md px-2 py-1"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Country:</label>
                    <input
                        type="text"
                        name="selectedCountry"
                        value={updatedUser.selectedCountry}
                        onChange={handleChange}
                        className="w-full border rounded-md px-2 py-1"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Phone Number:</label>
                    <input
                        type="text"
                        name="phonenumber"
                        value={updatedUser.phonenumber}
                        onChange={handleChange}
                        className="w-full border rounded-md px-2 py-1"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Gender:</label>
                    <input
                        type="text"
                        name="gender"
                        value={updatedUser.gender}
                        onChange={handleChange}
                        className="w-full border rounded-md px-2 py-1"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Sport:</label>
                    <input
                        type="text"
                        name="sport"
                        value={updatedUser.sport}
                        onChange={handleChange}
                        className="w-full border rounded-md px-2 py-1"
                    />
                </div>
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={handleSave}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2"
                    >
                        Save
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleResetPassword}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                    >
                        Reset Password
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewUsersUpdate;
