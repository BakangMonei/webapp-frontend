// components/ReviewBroadcastLogs.js

import React, { useState } from "react";

const ReviewBroadcastLogs = () => {
  // Dummy data for broadcast logs
  const [broadcastLogs] = useState([
    {
      id: 1,
      time: "2022-01-01 08:00:00",
      event: "Started",
      details: "Broadcast started",
    },
    {
      id: 2,
      time: "2022-01-01 08:05:00",
      event: "Paused",
      details: "Broadcast paused by user",
    },
    {
      id: 3,
      time: "2022-01-01 08:10:00",
      event: "Resumed",
      details: "Broadcast resumed",
    },
    {
      id: 4,
      time: "2022-01-01 08:15:00",
      event: "Ended",
      details: "Broadcast ended",
    },
  ]);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Review Broadcast Logs</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Time</th>
              <th className="text-left">Event</th>
              <th className="text-left">Details</th>
            </tr>
          </thead>
          <tbody>
            {/* Render broadcast logs */}
            {broadcastLogs.map((log) => (
              <tr key={log.id}>
                <td className="border px-4 py-2">{log.time}</td>
                <td className="border px-4 py-2">{log.event}</td>
                <td className="border px-4 py-2">{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewBroadcastLogs;
