// src/components/SuperAdminEnquiryForm.js

import React, { useEffect, useState } from 'react';
import { firestore } from '../../Database/firebase';
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

const EnquiryCard = ({ enquiry, onReply }) => {
  const [reply, setReply] = useState('');

  const handleReply = async () => {
    if (reply) {
      await onReply(enquiry.id, reply);
      setReply('');
    }
  };

  return (
    <div className="max-w-md mx-auto mb-4 p-4 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <p className="text-gray-700"><strong>Email:</strong> {enquiry.email}</p>
        <p className="text-gray-700"><strong>Enquiry:</strong> {enquiry.enquiry}</p>
        {enquiry.others && <p className="text-gray-700"><strong>Other Information:</strong> {enquiry.others}</p>}
        {enquiry.reply && <p className="text-gray-700"><strong>Reply:</strong> {enquiry.reply}</p>}
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reply">
          Reply
        </label>
        <textarea
          id="reply"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          required
        />
        <button
          onClick={handleReply}
          className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Send Reply
        </button>
      </div>
    </div>
  );
};

const SuperAdminEnquiryForm = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  useEffect(() => {
    const fetchEnquiries = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'enquiries'));
      const enquiryData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEnquiries(enquiryData);
    };

    fetchEnquiries();
  }, []);

  const handleReply = async (enquiryId, reply) => {
    const enquiryRef = doc(firestore, 'enquiries', enquiryId);
    await updateDoc(enquiryRef, { reply });

    setEnquiries(enquiries.map(enq => enq.id === enquiryId ? { ...enq, reply } : enq));
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard - Enquiries</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Enquiries List</h2>
        {enquiries.map((enquiry) => (
          <EnquiryCard key={enquiry.id} enquiry={enquiry} onReply={handleReply} />
        ))}
      </div>
    </div>
  );
};

export default SuperAdminEnquiryForm;
