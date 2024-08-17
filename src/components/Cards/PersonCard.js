import React from "react";

const PersonCard = ({ person }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <div className="flex justify-center md:justify-end -mt-16">
        <img
          className="w-20 h-20 object-cover rounded-full border-2 border-indigo-500"
          src={person.avatar}
          alt={person.name}
        />
      </div>
      <div>
        <h2 className="text-gray-800 text-3xl font-semibold">{person.name}</h2>
        <p className="mt-2 text-gray-600">{person.email}</p>
        <p className="mt-2 text-gray-600">{person.phone}</p>
        <p className="mt-2 text-gray-600">{person.address}</p>
      </div>
    </div>
  );
};

export default PersonCard;
