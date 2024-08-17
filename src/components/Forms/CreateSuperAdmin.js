import React, { useState } from "react";
import Modal from "react-modal";
import { auth, firestore } from "../../Database/firebase";
import { createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { countries } from "countries-list";
import SuperAdminNavBar from "../NavBars/SuperAdminNavBar";

Modal.setAppElement("#root");

const CreateSuperAdmin = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastame] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [sport, setSport] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const dispatch = useDispatch();
  const registrationState = useSelector((state) => state.auth);

  const countryOptions = Object.values(countries);
  const sports = [
    "Swimming", "Athletics", "Gymnastics", "Cycling", "Basketball",
    "Football", "Tennis", "Boxing", "Rowing", "Diving", "Wrestling",
    "Sailing", "Archery", "Equestrian", "Triathlon", "Volleyball",
    "Handball", "Table Tennis", "Taekwondo", "Canoeing", "Fencing",
    "Shooting", "Badminton", "Rhythmic Gymnastics", "Weightlifting",
    "Hockey", "Rugby Sevens", "Synchronized Swimming", "Water Polo",
    "Modern Pentathlon"
  ];
  const genders = ["Male", "Female", "Other"];

  const [validationError, setValidationError] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const navigate = useNavigate();

  const handleRegisterAdmin = async (e) => {
    e.preventDefault();

    if (
      firstname.trim() === "" ||
      lastname.trim() === "" ||
      email.trim() === "" ||
      username.trim() === "" ||
      sport.trim() === "" ||
      gender.trim() === "" ||
      selectedCountry.trim() === "" ||
      phonenumber.trim() === ""
    ) {
      setValidationError(true);
      setRegistrationSuccess(false);
      return;
    }

    const generatedPassword = generateRandomPassword();
    setGeneratedPassword(generatedPassword);

    try {
      await createUserWithEmailAndPassword(auth, email, generatedPassword);

      const userData = {
        firstname,
        lastname,
        email,
        username,
        sport,
        selectedCountry,
        phonenumber,
        gender,
        generatedPassword,
      };

      const docRef = await addDoc(collection(firestore, "s_admin"), userData);

      if (docRef) {
        setRegistrationSuccess(true);
        setGeneratedPassword(generatedPassword);
        await sendPasswordResetEmail(auth, email);

        setModalIsOpen(true);
      } else {
        console.error("Error adding user data to Firestore.");
        setRegistrationSuccess(false);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setRegistrationSuccess(false);
    }
  };

  const generateRandomPassword = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const passwordLength = 10;
    let password = "";
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters.charAt(randomIndex);
    }
    return password;
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setFirstname("");
    setLastame("");
    setEmail("");
    setUsername("");
    setSport("");
    setSelectedCountry("");
    setPhonenumber("");
    setGender("");
    setGeneratedPassword("");
    setValidationError(false);
    setRegistrationSuccess(false);
  };

  return (
    <div className="flex flex-auto">
      <div>
        <SuperAdminNavBar />
      </div>
      <div className="flex min-h-screen max-w-3xl mx-auto p-4 justify-center items-center">
        <div className="login_container items-center justify-center grid grid-cols-2 gap-4 p-8 rounded-xl shadow-md w-full max-w-4xl">
          <div className="col-span-2">
            <h1 className="text-2xl font-semibold text-center mb-4">
              Create A SuperAdmin
            </h1>
            {validationError && (
              <p className="text-red-500 mb-2 text-center">
                Please fill out all required fields.
              </p>
            )}
            <form onSubmit={handleRegisterAdmin}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Generated Password"
                    value={generatedPassword}
                    className="bg-transparent w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
                    disabled
                  />
                </div>
                <div>
                  <label htmlFor="firstname" className="block">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    value={firstname}
                    placeholder="First Name"
                    onChange={(e) => setFirstname(e.target.value)}
                    className="bg-transparent w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
                  />
                </div>
                <div>
                  <label htmlFor="lastname" className="block">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    value={lastname}
                    placeholder="Last Name"
                    onChange={(e) => setLastame(e.target.value)}
                    className="bg-transparent w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
                  />
                </div>
                <div>
                  <label htmlFor="phonenumber" className="block">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phonenumber"
                    name="phonenumber"
                    value={phonenumber}
                    placeholder="Phone Number"
                    onChange={(e) => setPhonenumber(e.target.value)}
                    className="bg-transparent w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
                  />
                </div>
                <div>
                  <label htmlFor="username" className="block">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    placeholder="UserName"
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-transparent w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
                  />
                </div>
                <div>
                  <label htmlFor="selectedCountry" className="block">
                    Country
                  </label>
                  <select
                    className="bg-transparent w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                  >
                    <option value="">Select Country</option>
                    {countryOptions.map((country, index) => (
                      <option key={index} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="sport" className="block">
                    Sporting Code
                  </label>
                  <select
                    className="bg-transparent w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
                    value={sport}
                    onChange={(e) => setSport(e.target.value)}
                  >
                    <option value="">Select Sport</option>
                    {sports.map((sport, index) => (
                      <option key={index} value={sport}>
                        {sport}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="gender" className="block">
                    Select Gender
                  </label>
                  <select
                    className="bg-transparent w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Select Gender</option>
                    {genders.map((gender, index) => (
                      <option key={index} value={gender}>
                        {gender}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2 text-center">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                  >
                    Create Super Admin
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Admin Created"
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">Super Admin Created Successfully</h2>
          <p>Email: {email}</p>
          <p>Password: {generatedPassword}</p>
          
          <div className="font-bold p-3">
          <p>It is advised that {email} should check email to change password</p>
          </div>
          <button
            onClick={closeModal}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 items-center justify-center"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CreateSuperAdmin;
