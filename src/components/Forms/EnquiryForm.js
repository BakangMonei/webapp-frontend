// src/components/Forms/EnquiryForm.js

import React, { useState, useEffect } from 'react';
import { firestore, auth } from '../../Database/firebase';
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const EnquiryForm = () => {
  const [email, setEmail] = useState('');
  const [enquiry, setEnquiry] = useState('');
  const [others, setOthers] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [responses, setResponses] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setEmail(user.email);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (currentUser) {
      const fetchResponses = async () => {
        const q = query(collection(firestore, 'enquiries'), where('email', '==', currentUser.email));
        const querySnapshot = await getDocs(q);
        const responseData = querySnapshot.docs.map(doc => doc.data());
        setResponses(responseData);
      };

      fetchResponses();
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(firestore, 'enquiries'), {
        email,
        enquiry,
        others,
        created: new Date()
      });
      setEnquiry('');
      setOthers('');
      setMessage('Enquiry submitted successfully!');
    } catch (error) {
      console.error('Error adding document: ', error);
      setMessage('Error submitting enquiry. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Submit an Enquiry</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="enquiry">
            Enquiry
          </label>
          <textarea
            id="enquiry"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={enquiry}
            onChange={(e) => setEnquiry(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="others">
            Other Information
          </label>
          <input
            type="text"
            id="others"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={others}
            onChange={(e) => setOthers(e.target.value)}
          />
        </div>
        {message && <p className="mb-4 text-sm text-green-500">{message}</p>}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>

      <h2 className="text-xl font-bold mt-8 mb-4">Your Enquiries and Responses</h2>
      <ul className="divide-y divide-gray-200">
        {responses.map((response, index) => (
          <li key={index} className="py-4">
            <p className="text-gray-700"><strong>Enquiry:</strong> {response.enquiry}</p>
            {response.reply && <p className="text-gray-700"><strong>Admin Reply:</strong> {response.reply}</p>}
            {response.others && <p className="text-gray-700"><strong>Other Information:</strong> {response.others}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EnquiryForm;
