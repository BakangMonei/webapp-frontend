import React, { useEffect, useState } from "react";
import { firestore } from "../../Database/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import { Bar, Pie, Line } from "react-chartjs-2";
import "chart.js/auto";

const WebLogs = () => {
  const [adminData, setAdminData] = useState([]);
  const [broadcastData, setBroadcastData] = useState([]);
  const [sAdminData, setSAdminData] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const adminQuery = query(collection(firestore, "admin"));
    const broadcastQuery = query(collection(firestore, "broadcasts"));
    const sAdminQuery = query(collection(firestore, "s_admin"));
    const userQuery = query(collection(firestore, "users"));

    const unsubscribeAdmin = onSnapshot(adminQuery, (snapshot) => {
      const admins = snapshot.docs.map((doc) => doc.data());
      setAdminData(admins);
    });

    const unsubscribeBroadcast = onSnapshot(broadcastQuery, (snapshot) => {
      const broadcasts = snapshot.docs.map((doc) => doc.data());
      setBroadcastData(broadcasts);
    });

    const unsubscribeSAdmin = onSnapshot(sAdminQuery, (snapshot) => {
      const sAdmins = snapshot.docs.map((doc) => doc.data());
      setSAdminData(sAdmins);
    });

    const unsubscribeUser = onSnapshot(userQuery, (snapshot) => {
      const users = snapshot.docs.map((doc) => doc.data());
      setUserData(users);
    });

    return () => {
      unsubscribeAdmin();
      unsubscribeBroadcast();
      unsubscribeSAdmin();
      unsubscribeUser();
    };
  }, []);

  const femaleCount = userData.filter((user) => user.gender?.toLowerCase() === "female").length;
  const maleCount = userData.filter((user) => user.gender?.toLowerCase() === "male").length;
  const sportCounts = userData.reduce((acc, user) => {
    acc[user.sport] = (acc[user.sport] || 0) + 1;
    return acc;
  }, {});

  const sportLabels = Object.keys(sportCounts);
  const sportData = Object.values(sportCounts);

  const adminCountryCounts = adminData.reduce((acc, admin) => {
    acc[admin.selectedCountry] = (acc[admin.selectedCountry] || 0) + 1;
    return acc;
  }, {});

  const adminCountryLabels = Object.keys(adminCountryCounts);
  const adminCountryData = Object.values(adminCountryCounts);

  const sAdminGenderCounts = sAdminData.reduce((acc, admin) => {
    acc[admin.gender?.toLowerCase()] = (acc[admin.gender?.toLowerCase()] || 0) + 1;
    return acc;
  }, {});

  const sAdminGenderLabels = Object.keys(sAdminGenderCounts);
  const sAdminGenderData = Object.values(sAdminGenderCounts);

  const userRegistrationDates = userData.map((user) => user.dateTime?.split("T")[0]);
  const userRegistrationCounts = userRegistrationDates.reduce((acc, date) => {
    if (date) {
      acc[date] = (acc[date] || 0) + 1;
    }
    return acc;
  }, {});

  const registrationDateLabels = Object.keys(userRegistrationCounts);
  const registrationDateData = Object.values(userRegistrationCounts);

  const sAdminSportCounts = sAdminData.reduce((acc, admin) => {
    acc[admin.sport] = (acc[admin.sport] || 0) + 1;
    return acc;
  }, {});

  const sAdminSportLabels = Object.keys(sAdminSportCounts);
  const sAdminSportData = Object.values(sAdminSportCounts);

  const broadcastVenueCounts = broadcastData.reduce((acc, broadcast) => {
    acc[broadcast.venue] = (acc[broadcast.venue] || 0) + 1;
    return acc;
  }, {});

  const broadcastVenueLabels = Object.keys(broadcastVenueCounts);
  const broadcastVenueData = Object.values(broadcastVenueCounts);

  return (
    <div className="p-8 border rounded-xl">
      <h1 className="text-3xl font-bold mb-8">Web Logs Statistics</h1>
      <div className="grid grid-cols-3 gap-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Gender Distribution</h2>
          <Pie
            data={{
              labels: ["Male", "Female"],
              datasets: [
                {
                  data: [maleCount, femaleCount],
                  backgroundColor: ["#36A2EB", "#FF6384"],
                },
              ],
            }}
          />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Sports Preferences</h2>
          <Bar
            data={{
              labels: sportLabels,
              datasets: [
                {
                  label: "Number of Users",
                  data: sportData,
                  backgroundColor: "#4BC0C0",
                },
              ],
            }}
          />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Admins per Country</h2>
          <Bar
            data={{
              labels: adminCountryLabels,
              datasets: [
                {
                  label: "Number of Admins",
                  data: adminCountryData,
                  backgroundColor: "#FF6384",
                },
              ],
            }}
          />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Admin Sports Preferences</h2>
          <Pie
            data={{
              labels: sportLabels,
              datasets: [
                {
                  data: sportData,
                  backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"],
                },
              ],
            }}
          />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Broadcasts Over Time</h2>
          <Line
            data={{
              labels: registrationDateLabels,
              datasets: [
                {
                  label: "Number of Broadcasts",
                  data: registrationDateData,
                  borderColor: "#FF6384",
                  backgroundColor: "rgba(255,99,132,0.2)",
                },
              ],
            }}
          />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Super Admin Gender Distribution</h2>
          <Pie
            data={{
              labels: sAdminGenderLabels,
              datasets: [
                {
                  data: sAdminGenderData,
                  backgroundColor: ["#FF6384", "#36A2EB"],
                },
              ],
            }}
          />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">User Registration Trends</h2>
          <Line
            data={{
              labels: registrationDateLabels,
              datasets: [
                {
                  label: "Number of Registrations",
                  data: registrationDateData,
                  borderColor: "#4BC0C0",
                  backgroundColor: "rgba(75,192,192,0.2)",
                },
              ],
            }}
          />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Super Admin Sports Preferences</h2>
          <Bar
            data={{
              labels: sAdminSportLabels,
              datasets: [
                {
                  label: "Number of Super Admins",
                  data: sAdminSportData,
                  backgroundColor: "#FF9F40",
                },
              ],
            }}
          />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Broadcasts by Venue</h2>
          <Pie
            data={{
              labels: broadcastVenueLabels,
              datasets: [
                {
                  data: broadcastVenueData,
                  backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"],
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default WebLogs;
