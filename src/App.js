import { lazy } from "react";
import {
  BrowserRouter as Router,
  Route, Routes, Navigate,
} from "react-router-dom";
import "./App.css";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/RegistrationPage" element={<RegistrationPage />} />
      </Routes>
    </Router>
  );

}


export default App;