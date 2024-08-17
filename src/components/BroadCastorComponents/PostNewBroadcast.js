import React, { useState } from "react";
import { countries } from "countries-list";
import { firestore } from "../../Database/firebase";
import { collection, addDoc } from "firebase/firestore";

const olympicSports = [
  "Archery",
  "Athletics",
  "Badminton",
  "Basketball",
  "Boxing",
  "Canoeing",
  "Cycling",
  "Diving",
  "Equestrian",
  "Fencing",
  "Football",
  "Golf",
  "Gymnastics",
  "Handball",
  "Hockey",
  "Judo",
  "Karate",
  "Modern Pentathlon",
  "Rowing",
  "Rugby Sevens",
  "Sailing",
  "Shooting",
  "Skateboarding",
  "Sport Climbing",
  "Surfing",
  "Swimming",
  "Table Tennis",
  "Taekwondo",
  "Tennis",
  "Trampoline",
  "Triathlon",
  "Volleyball",
  "Water Polo",
  "Weightlifting",
  "Wrestling",
];

const PostNewBroadcast = () => {
  const [title, setTitle] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [sportName, setSportName] = useState("");
  const [venue, setVenue] = useState("");
  const [description, setDescription] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [validationError, setValidationError] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      title.trim() === "" ||
      dateTime.trim() === "" ||
      sportName.trim() === "" ||
      venue.trim() === "" ||
      selectedCountry.trim() === "" ||
      description.trim() === "" ||
      videoURL.trim() === ""
    ) {
      setValidationError(true);
      setRegistrationSuccess(false);
      return;
    }

    try {
      const docRef = await addDoc(collection(firestore, "broadcasts"), {
        title,
        dateTime,
        sportName,
        venue,
        country: selectedCountry,
        description,
        videoURL,
      });
      console.log("Document written with ID: ", docRef.id);
      setRegistrationSuccess(true);
      setValidationError(false);

      setTitle("");
      setDateTime("");
      setSportName("");
      setVenue("");
      setSelectedCountry("");
      setDescription("");
      setVideoURL("");
    } catch (error) {
      console.error("Error adding document: ", error);
      setRegistrationSuccess(false);
      setValidationError(true);
    }
  };

  const countryOptions = Object.values(countries);

  return (
    <div className="container mx-auto mt-5 p-10 bg-white shadow-md rounded">
      <h1 className="text-2xl font-semibold mb-5 text-center">
        Post New Broadcast
      </h1>
      {registrationSuccess && (
        <p className="text-green-600 mb-4">Broadcast successfully posted!</p>
      )}
      {validationError && (
        <p className="text-red-600 mb-4">Please fill in all fields.</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1 text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <div>
          <label htmlFor="dateTime" className="block mb-1 text-gray-700">
            Time and Date
          </label>
          <input
            type="datetime-local"
            id="dateTime"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <div>
          <label htmlFor="sportName" className="block mb-1 text-gray-700">
            Sport Name
          </label>
          <select
            id="sportName"
            value={sportName}
            onChange={(e) => setSportName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          >
            <option value="">Select a sport</option>
            {olympicSports.map((sport) => (
              <option key={sport} value={sport}>
                {sport}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="venue" className="block mb-1 text-gray-700">
            Venue
          </label>
          <input
            type="text"
            id="venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <div>
          <label htmlFor="country" className="block mb-1 text-gray-700">
            Country
          </label>
          <select
            className="bg-transparent w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            required
          >
            <option value="">Select a country</option>
            {countryOptions.map((country) => (
              <option key={country.alpha2Code} value={country.alpha2Code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="description" className="block mb-1 text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            rows="5"
            required
          />
        </div>
        <div>
          <label htmlFor="videoURL" className="block mb-1 text-gray-700">
            Video URL
          </label>
          <input
            type="url"
            id="videoURL"
            value={videoURL}
            onChange={(e) => setVideoURL(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Post Broadcast
        </button>
      </form>
    </div>
  );
};

export default PostNewBroadcast;
