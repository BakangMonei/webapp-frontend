import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../Database/firebase"; // Adjust the path as needed

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [sAdmins, setSAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const adminsCollection = collection(firestore, "admin");
        const sAdminsCollection = collection(firestore, "s_admin");

        const adminSnapshot = await getDocs(adminsCollection);
        const sAdminSnapshot = await getDocs(sAdminsCollection);

        const adminData = adminSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const sAdminData = sAdminSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        setAdmins(adminData);
        setSAdmins(sAdminData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  const sendEmail = (email) => {
    window.location.href = `mailto:${email}`;
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Admins</h2>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden mb-8">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-3 px-4">Email</th>
            <th className="py-3 px-4">First Name</th>
            <th className="py-3 px-4">Last Name</th>
            <th className="py-3 px-4">Phone Number</th>
            <th className="py-3 px-4">Country</th>
            <th className="py-3 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id} className="bg-gray-100 border-b border-gray-200">
              <td className="py-3 px-4">{admin.email}</td>
              <td className="py-3 px-4">{admin.firstname}</td>
              <td className="py-3 px-4">{admin.lastname}</td>
              <td className="py-3 px-4">{admin.phonenumber}</td>
              <td className="py-3 px-4">{admin.selectedCountry}</td>
              <td className="py-3 px-4">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                  onClick={() => sendEmail(admin.email)}
                >
                  Send Email
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-2xl font-bold mb-6 text-center">Super Admins</h2>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-3 px-4">Email</th>
            <th className="py-3 px-4">First Name</th>
            <th className="py-3 px-4">Last Name</th>
            <th className="py-3 px-4">Phone Number</th>
            <th className="py-3 px-4">Country</th>
            <th className="py-3 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {sAdmins.map((sAdmin) => (
            <tr key={sAdmin.id} className="bg-gray-100 border-b border-gray-200">
              <td className="py-3 px-4">{sAdmin.email}</td>
              <td className="py-3 px-4">{sAdmin.firstname}</td>
              <td className="py-3 px-4">{sAdmin.lastname}</td>
              <td className="py-3 px-4">{sAdmin.phonenumber}</td>
              <td className="py-3 px-4">{sAdmin.selectedCountry}</td>
              <td className="py-3 px-4">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                  onClick={() => sendEmail(sAdmin.email)}
                >
                  Send Email
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admins;
