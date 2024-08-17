// components/RemoveTransmissions.js

import React, { useState } from "react";

const RemoveTransmissions = () => {
  // State variable to store selected transmission ID
  const [selectedTransmissionId, setSelectedTransmissionId] = useState("");

  // Function to handle removal of transmission
  const handleRemoveTransmission = () => {
    // Logic to remove transmission with selectedTransmissionId
    console.log("Removing transmission with ID:", selectedTransmissionId);
    // Reset selectedTransmissionId
    setSelectedTransmissionId("");
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Remove Transmission</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        {/* Transmission selection */}
        <div className="mb-4">
          <label
            htmlFor="transmissionId"
            className="block text-gray-700 font-semibold mb-2"
          >
            Select Transmission:
          </label>
          <select
            id="transmissionId"
            value={selectedTransmissionId}
            onChange={(e) => setSelectedTransmissionId(e.target.value)}
            className="border rounded py-2 px-3 w-full"
          >
            <option value="">Select Transmission</option>
            {/* Render transmission options dynamically */}
            <option value="1">Transmission 1</option>
            <option value="2">Transmission 2</option>
            <option value="3">Transmission 3</option>
          </select>
        </div>
        {/* Remove button */}
        <button
          onClick={handleRemoveTransmission}
          disabled={!selectedTransmissionId}
          className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${
            !selectedTransmissionId && "opacity-50 cursor-not-allowed"
          }`}
        >
          Remove Transmission
        </button>
      </div>
    </div>
  );
};

export default RemoveTransmissions;
